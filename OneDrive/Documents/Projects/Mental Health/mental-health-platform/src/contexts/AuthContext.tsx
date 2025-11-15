import { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '../types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Simulate checking for existing auth token
      const token = localStorage.getItem('auth_token');
      if (token) {
        // In a real app, this would validate the token with your backend
        const mockUser: User = {
          id: '1',
          email: 'user@example.com',
          role: UserRole.REGISTERED,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setUser(mockUser);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '1',
        email,
        role: UserRole.REGISTERED,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, userData: Partial<User>) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        role: UserRole.REGISTERED,
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem('auth_token', 'mock_token');
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = { ...user, ...updates, updated_at: new Date().toISOString() };
      setUser(updatedUser);
    } catch (error) {
      throw new Error('Profile update failed');
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    isAuthenticated: !!user,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}