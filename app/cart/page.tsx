'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getSubtotal, getShipping, getTax, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center"
            >
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-600 mb-6">
              Agrega productos para comenzar
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Ver Productos
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Carrito de Compras
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium text-sm sm:text-base"
          >
            Limpiar Carrito
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items del carrito */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Imagen */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 96px"
                      />
                    </motion.div>

                    {/* Información */}
                    <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {item.description}
                        </p>
                        <p className="text-xl font-bold text-blue-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Controles */}
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        {/* Cantidad */}
                        <div className="flex items-center border-2 border-gray-200 rounded-lg">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg touch-manipulation"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg touch-manipulation"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Total del item */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Eliminar */}
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 p-2 touch-manipulation"
                          aria-label="Eliminar producto"
                          title="Eliminar"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-20"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumen del Pedido
              </h2>

              <div className="space-y-3 mb-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-between text-gray-600"
                >
                  <span>Subtotal:</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between text-gray-600"
                >
                  <span>Envío:</span>
                  <span>{getShipping() === 0 ? 'Gratis' : `$${getShipping().toFixed(2)}`}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-between text-gray-600"
                >
                  <span>Impuesto:</span>
                  <span>${getTax().toFixed(2)}</span>
                </motion.div>
                <div className="border-t pt-3 mt-3">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                    className="flex justify-between text-lg font-bold text-gray-900"
                  >
                    <span>Total:</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </motion.div>
                </div>
              </div>

              {getSubtotal() < 50 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-sm text-blue-600 mb-4 bg-blue-50 p-2 rounded flex items-center gap-2"
                >
                  <Info className="w-4 h-4 flex-shrink-0" />
                  <span>Agrega ${(50 - getSubtotal()).toFixed(2)} más para envío gratis</span>
                </motion.p>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/checkout"
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all block text-center touch-manipulation"
                >
                  Proceder al Checkout
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
