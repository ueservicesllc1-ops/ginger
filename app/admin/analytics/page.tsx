'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    revenueChange: 0,
    ordersChange: 0,
  });

  useEffect(() => {
    // La autenticación se maneja en el layout
    // TODO: Cargar analíticas desde Firebase
    loadAnalytics();
  }, [router]);

  const loadAnalytics = async () => {
    // Simular carga de analíticas
    setAnalytics({
      totalRevenue: 0,
      totalOrders: 0,
      totalCustomers: 0,
      revenueChange: 0,
      ordersChange: 0,
    });
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Analíticas y Reportes</h1>
        <p className="text-gray-600 mt-1">Estadísticas detalladas de la tienda</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className={`flex items-center gap-1 ${analytics.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analytics.revenueChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{Math.abs(analytics.revenueChange)}%</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Ingresos Totales</h3>
          <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toFixed(2)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <div className={`flex items-center gap-1 ${analytics.ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analytics.ordersChange >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{Math.abs(analytics.ordersChange)}%</span>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Pedidos Totales</h3>
          <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Clientes Totales</h3>
          <p className="text-2xl font-bold text-gray-900">{analytics.totalCustomers}</p>
        </motion.div>
      </div>

      {/* Mensaje de próximamente */}
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Reportes Detallados</h3>
        <p className="text-gray-600 mb-4">
          Los reportes detallados y gráficos se implementarán próximamente.
        </p>
        <p className="text-sm text-gray-500">
          Esta sección mostrará gráficos de ventas, tendencias, productos más vendidos y más estadísticas avanzadas.
        </p>
      </div>
    </div>
  );
}


