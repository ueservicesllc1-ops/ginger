'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { Star, Plus, Minus, Check, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
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
              Producto no encontrado
            </h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors mt-4"
              >
                Volver a Productos
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center gap-2 text-sm sm:text-base transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Productos
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6 sm:p-8"
        >
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Información */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col"
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              {product.name}
            </motion.h1>

            {product.rating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 mb-4"
              >
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-lg text-gray-700">
                  {product.rating.toFixed(1)} ({product.reviews || 0} reseñas)
                </span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="mb-6"
            >
              <span className="text-4xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-600 mb-6 text-base sm:text-lg leading-relaxed"
            >
              {product.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-6"
            >
              <p className="text-sm text-gray-600 mb-2">
                <strong>Stock disponible:</strong> {product.stock} unidades
              </p>
              <p className="text-sm text-gray-600">
                <strong>Categoría:</strong> {product.category}
              </p>
            </motion.div>

            {isOutOfStock ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
              >
                <strong>Producto Agotado</strong>
              </motion.div>
            ) : (
              <>
                {/* Cantidad */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad:
                  </label>
                  <div className="flex items-center border-2 border-gray-200 rounded-lg w-fit">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg touch-manipulation"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="px-6 py-2 font-semibold min-w-[4rem] text-center">
                      {quantity}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg touch-manipulation"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Botones */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="space-y-3"
                >
                  <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all touch-manipulation text-lg flex items-center justify-center gap-2"
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Agregado al Carrito
                      </>
                    ) : (
                      'Agregar al Carrito'
                    )}
                  </motion.button>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/cart"
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-lg transition-all block text-center touch-manipulation"
                    >
                      Ver Carrito
                    </Link>
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
