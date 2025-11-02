'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { createOrUpdateUser } from '@/utils/firestore-users';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getShipping, getTax, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No hay productos en el carrito
            </h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-4"
              >
                Ver Productos
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Guardar o actualizar usuario en Firestore
      await createOrUpdateUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        orderTotal: getTotal(),
      });

      // Crear orden (aquí iría la llamada a tu API para guardar la orden)
      const order = {
        id: `ORD-${Date.now()}`,
        items,
        total: getTotal(),
        subtotal: getSubtotal(),
        shipping: getShipping(),
        tax: getTax(),
        customer: formData,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
      };

      // Limpiar carrito y redirigir
      clearCart();
      router.push(`/order-confirmation?orderId=${order.id}`);
    } catch (error: any) {
      console.error('Error procesando pedido:', error);
      alert('Error al procesar el pedido. Por favor, intenta de nuevo.');
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Información de Envío
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'name', label: 'Nombre Completo *', type: 'text' },
                  { id: 'email', label: 'Email *', type: 'email' },
                  { id: 'phone', label: 'Teléfono *', type: 'tel' },
                  { id: 'zipCode', label: 'Código Postal *', type: 'text' },
                ].map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  >
                    <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      required
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-base transition-colors"
                    />
                  </motion.div>
                ))}
              </div>

              {[
                { id: 'address', label: 'Dirección *' },
                { id: 'city', label: 'Ciudad *' },
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                >
                  <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    id={field.id}
                    name={field.id}
                    required
                    value={formData[field.id as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-base transition-colors"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all touch-manipulation"
                >
                  {loading ? 'Procesando...' : 'Confirmar Pedido'}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Resumen */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        x{item.quantity} - ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="border-t pt-4 space-y-2"
              >
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío:</span>
                  <span>{getShipping() === 0 ? 'Gratis' : `$${getShipping().toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impuesto:</span>
                  <span>${getTax().toFixed(2)}</span>
                </div>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="border-t pt-2 mt-2"
                >
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
