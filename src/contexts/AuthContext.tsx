import { createContext, useContext, useState, ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { currentUser as defaultUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser); // Demo: auto-logged in

  const login = async (email: string, password: string): Promise<boolean> => {
    // TODO: Conectar con Supabase Auth
    console.log('Login attempt:', email, password);
    setUser(defaultUser);
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    // TODO: Conectar con Supabase Auth + Google OAuth
    console.log('Google login attempt');
    setUser(defaultUser);
    return true;
  };

  const logout = () => {
    // TODO: Conectar con Supabase Auth
    setUser(null);
  };

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      loginWithGoogle,
      logout,
      hasRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
