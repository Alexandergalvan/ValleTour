import { createContext, useContext, useState, ReactNode } from 'react';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  const signIn = async (email: string, password: string) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular validación de credenciales
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    setCurrentUser(user);
  };

  const signUp = async (email: string, password: string) => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular creación de usuario
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name: email.split('@')[0],
      email,
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}`,
    };

    setCurrentUser(newUser);
  };

  const signInWithGoogle = async () => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular inicio de sesión con Google
    const mockGoogleUser = mockUsers[0];
    setCurrentUser(mockGoogleUser);
  };

  const logout = async () => {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signIn,
        signUp,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 