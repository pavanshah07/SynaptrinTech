import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rrgukdrjnralziksqglh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ3VrZHJqbnJhbHppa3NxZ2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MjEzNDYsImV4cCI6MjEwMDk5NzM0Nn0.piAZEn2QXjelvupgbzHgNH4rC8N1ThcnG0fy6ZP9uSU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
