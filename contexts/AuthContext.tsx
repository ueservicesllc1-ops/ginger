'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') {
      return;
    }

    setMounted(true);

    // Verificar que auth esté disponible
    if (!auth) {
      console.warn('Firebase Auth no está disponible');
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      }, (error) => {
        console.error('Error en onAuthStateChanged:', error);
        setLoading(false);
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    } catch (error) {
      console.error('Error inicializando auth:', error);
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if (typeof window === 'undefined') {
      throw new Error('Auth solo está disponible en el cliente');
    }
    if (!auth) {
      throw new Error('Firebase Auth no está inicializado');
    }
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error en signIn:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (typeof window === 'undefined') {
      throw new Error('Auth solo está disponible en el cliente');
    }
    if (!auth) {
      throw new Error('Firebase Auth no está inicializado');
    }
    
    try {
      const provider = new GoogleAuthProvider();
      // Solicitar acceso al perfil y email
      provider.addScope('profile');
      provider.addScope('email');
      
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error en signInWithGoogle:', error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    if (!auth) throw new Error('Firebase Auth no está inicializado');
    await sendPasswordResetEmail(auth, email);
  };

  // Verificar si el usuario es admin (por email por ahora, después se puede usar custom claims)
  const isAdmin = user?.email === 'admin@ginbristore.com' || false;

  const value = {
    user,
    loading,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}

