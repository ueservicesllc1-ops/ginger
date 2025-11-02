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
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    // Si ya terminó de cargar y no hay usuario o no es admin, redirigir
    if (!loading) {
      if (!user || !isAdmin) {
        if (pathname !== '/admin/login') {
          // Redirigir inmediatamente al login
          router.replace('/admin/login');
        }
      }
    }
  }, [user, loading, isAdmin, pathname, router]);

  // Permitir acceso a login sin autenticación
  if (pathname === '/admin/login') {
    console.log('🟢 [ADMIN LAYOUT] Ruta es /admin/login, renderizando children sin verificación');
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  // Mostrar loading mientras verifica autenticación
  if (loading) {
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
    return null;
  }

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

