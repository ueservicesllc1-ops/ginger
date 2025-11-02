'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Star, X, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setAddedToCart(false);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col">
              {/* Header con botón cerrar */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold text-gray-900">Detalle del Producto</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              {/* Contenido scrollable */}
              <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Imagen grande */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                          Agotado
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Información */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col"
                  >
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h1>

                    {product.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        <span className="text-lg text-gray-700">
                          {product.rating.toFixed(1)} ({product.reviews || 0} reseñas)
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <span className="text-4xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-6 text-base leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mb-6 space-y-2">
                      <p className="text-sm text-gray-600">
                        <strong>Stock disponible:</strong> {product.stock} unidades
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Categoría:</strong> {product.category}
                      </p>
                    </div>

                    {isOutOfStock ? (
                      <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                        <strong>Producto Agotado</strong>
                      </div>
                    ) : (
                      <>
                        {/* Cantidad */}
                        <div className="mb-6">
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
                        </div>

                        {/* Botones */}
                        <div className="space-y-3">
                          <motion.button
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all touch-manipulation text-lg flex items-center justify-center gap-2"
                          >
                            {addedToCart ? (
                              <>
                                <span>✓</span>
                                Agregado al Carrito
                              </>
                            ) : (
                              <>
                                <Plus className="w-5 h-5" />
                                Agregar al Carrito
                              </>
                            )}
                          </motion.button>
                        </div>
                      </>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


