'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products, getCategories } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Product } from '@/types/product';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categories = ['All', ...getCategories()];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Nuestros Productos
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Encuentra todo lo que necesitas
          </p>
        </motion.header>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 space-y-4"
        >
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-base transition-colors"
            />
          </div>

          {/* Categorías */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Resultados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <p className="text-gray-600 text-sm">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Grid de productos */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                  compact={true}
                  onCardClick={handleProductClick}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-products"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <p className="text-gray-600 text-lg">No se encontraron productos</p>
              <p className="text-gray-500 text-sm mt-2">Intenta con otros filtros</p>
            </motion.div>
          )}
        </AnimatePresence>
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
