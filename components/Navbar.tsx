'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Shield, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const pathname = usePathname();
  const totalItems = getTotalItems();

  const isActive = (path: string) => pathname === path;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-black shadow-md sticky top-0 z-50 safe-top"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-2 sm:py-0 sm:h-16">
          {/* Logo - Centrado en móvil, izquierda en desktop */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-2 sm:mb-0"
          >
            <Link href="/" className="flex items-center gap-2 justify-center sm:justify-start">
              <div className="relative w-28 h-14 sm:w-24 sm:h-10">
                <Image
                  src="/images/logo.png"
                  alt="Ginbri Store"
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
            </Link>
          </motion.div>

          {/* Navegación - Abajo del logo en móvil */}
          <div className="flex items-center gap-2 sm:gap-1 md:gap-2 lg:gap-4 w-full sm:w-auto justify-center sm:justify-end">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className={`px-4 sm:px-2 md:px-3 py-2.5 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-xs md:text-sm lg:text-base ${
                  isActive('/')
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Home
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className={`px-4 sm:px-2 md:px-3 py-2.5 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-xs md:text-sm lg:text-base ${
                  isActive('/products')
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Productos
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/personal-shopper"
                className={`px-4 sm:px-2 md:px-3 py-2.5 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-xs md:text-sm lg:text-base flex items-center gap-1 sm:gap-2 ${
                  isActive('/personal-shopper')
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <User className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                <span className="sm:hidden md:inline">Personal Shopper</span>
                <span className="hidden sm:inline md:hidden">PS</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/cart"
                className="relative px-4 sm:px-2 md:px-3 py-2.5 sm:py-2 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-xs md:text-sm lg:text-base"
              >
                <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span>Carrito</span>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs sm:text-[10px] md:text-xs font-bold rounded-full w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/admin"
                className={`px-4 sm:px-2 md:px-3 py-2.5 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-xs md:text-sm lg:text-base flex items-center gap-1 sm:gap-2 ${
                  isActive('/admin')
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                title="Área de Administración"
                aria-label="Área de Administración"
              >
                <Shield className="w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                <span className="sm:hidden md:inline">Admin</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
