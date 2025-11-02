'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  index?: number;
  compact?: boolean;
  onCardClick?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, compact = false, onCardClick }: ProductCardProps) {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart(product, 1);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (onCardClick) {
      e.preventDefault();
      onCardClick(product);
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="h-full"
      >
        <div 
          onClick={handleCardClick}
          className="cursor-pointer"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
            {/* Imagen del producto - más pequeña */}
            <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 20vw"
                />
              </motion.div>
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    Agotado
                  </span>
                </div>
              )}
            </div>

            {/* Información del producto - compacta */}
            <div className="p-2 flex-1 flex flex-col">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm leading-tight">
                {product.name}
              </h3>
              {product.rating && (
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-gray-600">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              )}
              
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium text-xs py-2 px-3 rounded-lg transition-all touch-manipulation"
                >
                  {isOutOfStock ? 'Agotado' : 'Agregar'}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Versión normal (sin cambios)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
          {/* Imagen del producto */}
          <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                  Agotado
                </span>
              </div>
            )}
            {product.stock > 0 && product.stock < 10 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold"
              >
                Solo {product.stock} disponibles
              </motion.div>
            )}
          </div>

          {/* Información del producto */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-base sm:text-lg">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              {product.rating && (
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviews || 0} reseñas)
                  </span>
                </div>
              )}
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  Stock: {product.stock}
                </span>
              </div>

              <motion.button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all touch-manipulation"
              >
                {isOutOfStock ? 'Agotado' : 'Agregar al Carrito'}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
