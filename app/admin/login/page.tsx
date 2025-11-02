'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LogIn, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
  console.log('🔵 [LOGIN] Componente renderizado');
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // Obtener auth directamente - no usar try-catch porque los hooks deben estar siempre disponibles
  console.log('🟡 [LOGIN] Intentando obtener AuthContext...');
  
  const authContext = useAuth();
  
  console.log('✅ [LOGIN] AuthContext obtenido:', {
    hasUser: !!authContext?.user,
    loading: authContext?.loading,
    hasSignIn: !!authContext?.signIn,
    hasSignInWithGoogle: !!authContext?.signInWithGoogle,
    isAdmin: authContext?.isAdmin,
  });

  const signIn = authContext?.signIn;
  const signInWithGoogle = authContext?.signInWithGoogle;
  const user = authContext?.user || null;
  const isAdmin = authContext?.isAdmin || false;
  const loading = authContext?.loading ?? true;

  // Si ya está autenticado y es admin, redirigir al dashboard
  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.push('/admin');
    }
  }, [user, isAdmin, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!signIn) {
      setError('El sistema de autenticación no está disponible. Por favor, recarga la página.');
      setSubmitting(false);
      return;
    }

    try {
      await signIn(email, password);
      // Verificar que sea admin - el isAdmin del contexto se actualizará automáticamente
      // Esperar un momento para que el estado se actualice
      setTimeout(() => {
        if (isAdmin || email === 'admin@ginbristore.com' || email === 'ueservicesllc1@gmail.com') {
          router.push('/admin');
        } else {
          setError('Acceso denegado. Solo administradores autorizados.');
          setSubmitting(false);
        }
      }, 100);
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Credenciales incorrectas. Verifica tu email y contraseña.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Email inválido.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Intenta más tarde.');
      } else {
        setError('Error al iniciar sesión. Intenta de nuevo.');
      }
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setSubmitting(true);

    if (!signInWithGoogle) {
      setError('El sistema de autenticación no está disponible. Por favor, recarga la página.');
      setSubmitting(false);
      return;
    }

    try {
      await signInWithGoogle();
      // El useEffect se encargará de redirigir si es admin
      // Esperamos un momento para que el estado se actualice
      setTimeout(() => {
        if (!isAdmin) {
          setError('Acceso denegado. Solo administradores autorizados.');
          setSubmitting(false);
        }
      }, 500);
    } catch (err: any) {
      console.error('Error de autenticación con Google:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('El popup de Google fue cerrado. Intenta de nuevo.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('El popup de Google fue bloqueado. Por favor, permite popups para este sitio.');
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError('Ya existe una cuenta con este email. Usa el método de inicio de sesión original.');
      } else {
        setError('Error al iniciar sesión con Google. Intenta de nuevo.');
      }
      setSubmitting(false);
    }
  };

  console.log('🟡 [LOGIN] Verificando estado de renderizado:', {
    authError,
    hasAuthContext: !!authContext,
    loading,
    user: !!user,
    isAdmin,
  });

  // Mostrar loading mientras se inicializa auth
  if (loading) {
    console.log('🟡 [LOGIN] Mostrando pantalla de loading');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="mt-4 text-white">Cargando...</p>
        </div>
      </div>
    );
  }

  console.log('✅ [LOGIN] Renderizando formulario de login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-16">
              <Image
                src="/images/logo.png"
                alt="Admin Login"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Inicie sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="admin@ginbristore.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={submitting || loading}
            whileHover={{ scale: submitting || loading ? 1 : 1.02 }}
            whileTap={{ scale: submitting || loading ? 1 : 0.98 }}
            className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {submitting || loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Iniciando sesión...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">O continúa con</span>
          </div>
        </div>

        {/* Google Sign In Button */}
        <motion.button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={submitting || loading}
          whileHover={{ scale: submitting || loading ? 1 : 1.02 }}
          whileTap={{ scale: submitting || loading ? 1 : 0.98 }}
          className="w-full bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {submitting || loading ? 'Iniciando sesión...' : 'Continuar con Google'}
        </motion.button>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Credenciales: admin@ginbristore.com / admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}


