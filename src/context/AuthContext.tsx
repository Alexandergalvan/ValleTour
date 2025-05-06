import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, signIn, signOut, signUp, resetPassword, updatePassword, AuthUser, UserCredentials, SignUpData } from '../services/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: UserCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  changePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si hay un usuario autenticado al cargar
  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoading(true);
        const { user, error } = await getCurrentUser();
        
        if (error) {
          console.error('Error al obtener usuario:', error.message);
        }
        
        setUser(user);
      } catch (err) {
        console.error('Error inesperado:', err);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (credentials: UserCredentials): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      const { user: authUser, error: signInError } = await signIn(credentials);
      
      if (signInError) {
        setError(signInError.message);
        return { success: false, error: signInError.message };
      }
      
      if (!authUser) {
        const errorMsg = 'No se pudo iniciar sesión';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      setUser(authUser);
      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      const { user: authUser, error: signUpError } = await signUp(data);
      
      if (signUpError) {
        setError(signUpError.message);
        return { success: false, error: signUpError.message };
      }
      
      if (!authUser) {
        const errorMsg = 'No se pudo registrar el usuario';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
      
      setUser(authUser);
      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al registrar usuario';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    
    try {
      const { error: signOutError } = await signOut();
      
      if (signOutError) {
        setError(signOutError.message);
        console.error('Error al cerrar sesión:', signOutError.message);
      }
      
      setUser(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al cerrar sesión';
      setError(errorMsg);
      console.error('Error inesperado al cerrar sesión:', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      const { error: resetError } = await resetPassword(email);
      
      if (resetError) {
        setError(resetError.message);
        return { success: false, error: resetError.message };
      }
      
      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al solicitar reset de contraseña';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      const { error: updateError } = await updatePassword(password);
      
      if (updateError) {
        setError(updateError.message);
        return { success: false, error: updateError.message };
      }
      
      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al actualizar contraseña';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    changePassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
}; 