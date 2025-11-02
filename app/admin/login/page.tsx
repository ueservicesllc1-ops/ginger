'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLoginPage() {
  console.log('🔵 [LOGIN] Componente renderizado');
  
  const router = useRouter();
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
        className="bg-black border-2 border-gray-700 rounded-2xl shadow-2xl p-8 w-full max-w-md"
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
              <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
              <p className="text-gray-300">Inicie sesión para continuar</p>
        </div>

        <div className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/50 border-2 border-red-600 text-red-200 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}
        </div>

        {/* Google Sign In Button */}
          <motion.button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting || loading}
            whileHover={{ scale: submitting || loading ? 1 : 1.02 }}
            whileTap={{ scale: submitting || loading ? 1 : 0.98 }}
            className="w-full bg-gray-900 hover:bg-gray-800 border-2 border-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-3 shadow-sm"
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

      </motion.div>
    </div>
  );
}


