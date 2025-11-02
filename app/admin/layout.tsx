'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('🔵 [ADMIN LAYOUT] AdminLayout renderizado');
  
  const pathname = usePathname();
  const router = useRouter();
  
  console.log('🟡 [ADMIN LAYOUT] pathname:', pathname);
  
  let authContext = null;
  try {
    authContext = useAuth();
    console.log('✅ [ADMIN LAYOUT] AuthContext obtenido:', {
      hasUser: !!authContext?.user,
      loading: authContext?.loading,
      isAdmin: authContext?.isAdmin,
    });
  } catch (err: any) {
    console.error('❌ [ADMIN LAYOUT] Error obteniendo AuthContext:', err);
  }
  
  const user = authContext?.user || null;
  const loading = authContext?.loading ?? true;
  const isAdmin = authContext?.isAdmin || false;

  useEffect(() => {
    console.log('🟡 [ADMIN LAYOUT] useEffect ejecutándose:', {
      loading,
      hasUser: !!user,
      isAdmin,
      pathname,
    });
    
    // Si ya terminó de cargar y no hay usuario o no es admin, redirigir
    if (!loading) {
      if (!user || !isAdmin) {
        if (pathname !== '/admin/login') {
          console.log('🔄 [ADMIN LAYOUT] Redirigiendo a /admin/login');
          // Redirigir inmediatamente al login
          router.replace('/admin/login');
        }
      }
    }
  }, [user, loading, isAdmin, pathname, router]);

  // Permitir acceso a login sin autenticación
  if (pathname === '/admin/login') {
    console.log('🟢 [ADMIN LAYOUT] Ruta es /admin/login, renderizando children sin verificación');
    console.log('🟢 [ADMIN LAYOUT] Children:', children);
    return (
      <div className="min-h-screen bg-gray-50">
        {(() => {
          console.log('🟢 [ADMIN LAYOUT] Renderizando children dentro del div');
          return children;
        })()}
      </div>
    );
  }

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    console.log('🟡 [ADMIN LAYOUT] Mostrando loading screen');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado o no es admin, no mostrar contenido (redirect se maneja en useEffect)
  if (!user || !isAdmin) {
    console.log('⚠️ [ADMIN LAYOUT] No hay usuario o no es admin, retornando null');
    console.log('⚠️ [ADMIN LAYOUT] Estado:', { hasUser: !!user, isAdmin, pathname });
    return null;
  }

  console.log('✅ [ADMIN LAYOUT] Renderizando layout completo con sidebar y navbar');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminNavbar />
        <main className="flex-1 px-4 sm:px-6 py-6 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

