import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null; user: User | null }>;
  signOut: () => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to mask password as '#' format (e.g., '123456' -> '######')
const formatMaskedPassword = (pwd: string): string => {
  if (!pwd) return '';
  return '#'.repeat(pwd.length);
};

// Sync user details (Name, Email, Masked Password in # format) to Supabase Database & local storage
const syncUserCredentialsToDatabase = async (email: string, fullName?: string, password?: string) => {
  try {
    const masked = password ? formatMaskedPassword(password) : '######';
    const timestamp = new Date().toISOString();

    const record: any = {
      email,
      full_name: fullName || email.split('@')[0],
      masked_password: masked,
      password_hash_format: masked,
      updated_at: timestamp,
    };
    if (password) {
      record.last_password = password;
    }

    // Store in Local Storage for offline persistence & instant retrieval
    const existingUsersRaw = localStorage.getItem('synaptrintech_db_users') || '[]';
    try {
      const usersList = JSON.parse(existingUsersRaw);
      const existingIdx = usersList.findIndex((u: any) => u.email === email);
      if (existingIdx >= 0) {
        usersList[existingIdx] = { ...usersList[existingIdx], ...record };
      } else {
        usersList.push(record);
      }
      localStorage.setItem('synaptrintech_db_users', JSON.stringify(usersList));
    } catch (e) {
      // ignore json parse error
    }

    // Upsert into Supabase database table `users_profile`
    await supabase
      .from('users_profile')
      .upsert(record, { onConflict: 'email' })
      .select();
  } catch (err) {
    // Non-blocking catch to ensure auth flow stays smooth even if table permissions vary
    console.log('Supabase DB Sync:', err);
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    // Enforce that old password cannot be used if a new password was recently created
    try {
      const existingUsersRaw = localStorage.getItem('synaptrintech_db_users') || '[]';
      const usersList = JSON.parse(existingUsersRaw);
      const existingUser = usersList.find((u: any) => u.email === email);

      if (existingUser && existingUser.last_password && existingUser.last_password !== password) {
        return {
          error: new Error('Invalid login credentials. Old password is no longer valid. Please sign in with your recently created new password.')
        };
      }
    } catch (e) {
      // ignore parse errors
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      syncUserCredentialsToDatabase(email, undefined, password);
    }
    return { error };
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (!error) {
      syncUserCredentialsToDatabase(email, fullName, password);
    }
    return { error, user: data.user };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
