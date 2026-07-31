import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Lock, User, AlertCircle, CheckCircle2, Loader2, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthPageProps {
  initialMode: 'signin' | 'signup';
  onBack: () => void;
}

export function AuthPage({ initialMode, onBack }: AuthPageProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { signInWithEmail, signUpWithEmail } = useAuth();

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [initialMode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (mode === 'signin') {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMessage(error.message);
        } else {
          setSuccessMessage('Successfully signed in! Redirecting to home...');
          setTimeout(() => {
            onBack();
          }, 1200);
        }
      } else {
        const { error, user } = await signUpWithEmail(email, password, fullName);
        if (error) {
          setErrorMessage(error.message);
        } else if (user && user.identities && user.identities.length === 0) {
          setErrorMessage('An account with this email already exists. Please sign in instead.');
        } else {
          setSuccessMessage('Account created successfully! Free website access unlocked.');
          setTimeout(() => {
            onBack();
          }, 1500);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[128px] pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-10 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-cyan-400 font-semibold text-sm transition-colors group"
        >
          <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Syntrix</span>
        </button>

        <div className="flex items-center space-x-2">
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pageLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path d="M30 70 L30 40 C30 25, 45 20, 55 25 L75 35 L75 50 L25 50 L25 65 L45 75 C55 80, 70 75, 70 60 L70 30" 
                  stroke="url(#pageLogoGrad)" 
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none" />
          </svg>
          <span className="font-black text-xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            SYNTRIX
          </span>
        </div>
      </div>

      {/* Main Form & Showcase Grid */}
      <div className="max-w-5xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10 py-6">
        {/* Left Side: Brand Value Showcase */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-cyan-400">
            <Sparkles size={14} className="text-cyan-400 animate-pulse" />
            <span>Free Membership Access</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {mode === 'signin' ? 'Welcome Back to ' : 'Start Your Journey with '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
              Syntrix
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Create an account or sign in to get complimentary access to our AI marketing insights, technical SEO audit tools, and high-performance agency solutions.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-start space-x-3 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl">
              <ShieldCheck size={20} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Access Included</h4>
                <p className="text-slate-400 text-xs mt-0.5">Explore full services, pricing models, and agency capabilities.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-slate-900/60 border border-slate-800/80 p-3.5 rounded-xl">
              <Zap size={20} className="text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Supabase Powered Authentication</h4>
                <p className="text-slate-400 text-xs mt-0.5">Fast, encrypted, and secure email authentication.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
        >
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {mode === 'signin' ? 'Sign In to Your Account' : 'Create Your Free Account'}
            </h2>
            <p className="text-slate-400 text-sm">
              {mode === 'signin' 
                ? 'Enter your credentials below to access your account.' 
                : 'Fill in your details to register for free.'}
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                    placeholder="Alex Morgan"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 rounded-xl border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500 text-sm transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 text-base disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : mode === 'signin' ? (
                'Sign In'
              ) : (
                'Create Account Free'
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMessage(null); setSuccessMessage(null); }}
                  className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 ml-1"
                >
                  Create a free account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setErrorMessage(null); setSuccessMessage(null); }}
                  className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 ml-1"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-slate-500 z-10 pt-4">
        &copy; {new Date().getFullYear()} Syntrix Technologies. All rights reserved.
      </div>
    </div>
  );
}
