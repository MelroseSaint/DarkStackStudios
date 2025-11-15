import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Get these from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured. Using mock data.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: localStorage,
    storageKey: 'mental-health-app-auth',
  },
  global: {
    headers: {
      'x-application-name': 'mental-health-app',
    },
  },
  db: {
    schema: 'public',
  },
});

// Helper function to check if user has required role
export const hasRole = (user: any, roles: string[]): boolean => {
  if (!user?.user_metadata?.role) return false;
  return roles.includes(user.user_metadata.role);
};

// Helper function to get current user role
export const getUserRole = (user: any): string => {
  return user?.user_metadata?.role || 'anonymous';
};

// Auth state change listener
export const setupAuthListener = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Error handling wrapper
export const handleSupabaseError = (error: any): string => {
  if (error?.message) {
    // Map common Supabase errors to user-friendly messages
    if (error.message.includes('JWT')) {
      return 'Your session has expired. Please log in again.';
    }
    if (error.message.includes('RLS')) {
      return 'You do not have permission to access this resource.';
    }
    if (error.message.includes('duplicate key')) {
      return 'This resource already exists.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};

// Health check function
export const checkSupabaseHealth = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.from('users').select('id').limit(1);
    return !error;
  } catch (error) {
    console.error('Supabase health check failed:', error);
    return false;
  }
};