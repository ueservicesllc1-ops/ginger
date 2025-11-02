'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import PromotionCard from '@/components/PromotionCard';
import TestimonialCard from '@/components/TestimonialCard';
import ProductModal from '@/components/ProductModal';
import Footer from '@/components/Footer';
import BannerEffects from '@/components/BannerEffects';
import { products } from '@/data/products';
import { promotions } from '@/data/promotions';
import { testimonials } from '@/data/testimonials';
import Image from 'next/image';
import { ArrowRight, Truck, Shield, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Product } from '@/types/product';

export default function Home() {
  const featuredProducts = products.slice(0, 5);
  const featuredPromotions = promotions.slice(0, 3);
  const featuredTestimonials = testimonials.slice(0, 3);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px]">
          <Image
            src="/images/banner.png"
            alt="Banner"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          {/* Efectos flotantes y destellos */}
          <BannerEffects />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Promociones */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Promociones Especiales
            </h2>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base flex items-center gap-1 transition-colors"
            >
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPromotions.map((promotion, index) => (
              <PromotionCard key={promotion.id} promotion={promotion} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Productos Destacados */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Productos Destacados
            </h2>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base flex items-center gap-1 transition-colors"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                compact={true}
                onCardClick={handleProductClick}
              />
            ))}
          </div>
        </motion.section>

        {/* Testimonios */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-12"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="text-gray-600">
              Miles de clientes satisfechos confían en nosotros
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
        </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center"
            >
              <Truck className="w-6 h-6 text-blue-600" />
            </motion.div>
            <h3 className="font-bold text-lg mb-2">Envío Rápido</h3>
            <p className="text-gray-600 text-sm">
              Recibe tus productos en 24-48 horas
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center"
            >
              <Shield className="w-6 h-6 text-green-600" />
            </motion.div>
            <h3 className="font-bold text-lg mb-2">Compra Segura</h3>
            <p className="text-gray-600 text-sm">
              Tus datos están protegidos
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center"
            >
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </motion.div>
            <h3 className="font-bold text-lg mb-2">Devoluciones</h3>
            <p className="text-gray-600 text-sm">
              30 días para devolver tu compra
            </p>
          </motion.div>
        </motion.section>
        </div>

      {/* Modal de Producto */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
