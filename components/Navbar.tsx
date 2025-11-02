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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-24 h-10">
                <Image
                  src="/images/logo.png"
                  alt="Ginbri Store"
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
            </Link>
          </motion.div>

          {/* Navegación */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className={`px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base ${
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
                className={`px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base ${
                  isActive('/products')
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="hidden sm:inline">Productos</span>
                <span className="sm:hidden">Prod.</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/personal-shopper"
                className={`px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2 ${
                  isActive('/personal-shopper')
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <User className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">Personal Shopper</span>
                <span className="md:hidden">PS</span>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/cart"
                className="relative px-2 sm:px-3 py-2 rounded-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Carrito</span>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/admin"
                className={`px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm md:text-base flex items-center gap-1 sm:gap-2 ${
                  isActive('/admin')
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
                title="Área de Administración"
                aria-label="Área de Administración"
              >
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
