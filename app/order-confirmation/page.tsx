'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pedido Confirmado
          </h1>
          <p className="text-gray-600 mb-6">
            Gracias por tu compra. Tu pedido ha sido procesado exitosamente.
          </p>
          {orderId && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Número de Pedido:</p>
              <p className="text-lg font-bold text-blue-600 font-mono">
                {orderId}
              </p>
            </div>
          )}
          <p className="text-gray-600 text-sm mb-8">
            Te enviaremos un email con los detalles de tu pedido y el seguimiento del envío.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors touch-manipulation"
            >
              Continuar Comprando
            </Link>
            <Link
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors touch-manipulation"
            >
              Ir al Inicio
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p>Cargando...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}

