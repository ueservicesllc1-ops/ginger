'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { motion } from 'framer-motion';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticación básica (por ahora solo verifica si hay sesión en localStorage)
    // Más adelante se puede integrar con Firebase Auth
    const checkAuth = () => {
      const adminSession = localStorage.getItem('admin_session');
      if (adminSession) {
        setIsAuthenticated(true);
      } else {
        // Si no está en login, redirigir
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Permitir acceso a login sin autenticación
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    return null; // El redirect se maneja en el useEffect
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

