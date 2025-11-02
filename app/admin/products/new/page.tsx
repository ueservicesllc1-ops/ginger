'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, X, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';
import { createProduct } from '@/utils/firestore-products';

export default function NewProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    rating: '',
    reviews: '',
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      // Validar que la imagen esté subida
      if (!formData.image) {
        setError('Por favor, sube una imagen del producto');
        setUploading(false);
        return;
      }

      // Crear producto en Firestore
      await createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        category: formData.category,
        stock: parseInt(formData.stock, 10),
        rating: formData.rating ? parseFloat(formData.rating) : undefined,
        reviews: formData.reviews ? parseInt(formData.reviews, 10) : undefined,
      });

      router.push('/admin/products');
    } catch (err: any) {
      console.error('Error guardando producto:', err);
      setError(err.message || 'Error al guardar el producto');
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUploadComplete = (result: {
    url: string;
    fileName: string;
    originalName: string;
  }) => {
    setFormData({
      ...formData,
      image: result.url,
    });
    setImagePreview(result.url);
  };

  const handleImageUploadError = (error: string) => {
    setError(error);
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Productos
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Nuevo Producto</h1>
        <p className="text-gray-600 mt-1">Agrega un nuevo producto a la tienda</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información básica */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Información Básica</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
                placeholder="Ej: Laptop HP 15"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none transition-colors resize-none"
                placeholder="Descripción detallada del producto..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (USD) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
              >
                <option value="">Seleccione una categoría</option>
                <option value="Electrónica">Electrónica</option>
                <option value="Ropa">Ropa</option>
                <option value="Hogar">Hogar</option>
                <option value="Deportes">Deportes</option>
                <option value="Libros">Libros</option>
                <option value="Juguetes">Juguetes</option>
              </select>
            </div>
          </div>

          {/* Imagen y detalles adicionales */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Imagen y Detalles</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen del Producto *
              </label>
              <FileUpload
                folder="products"
                accept="image/*"
                maxSize={10 * 1024 * 1024} // 10MB
                onUploadComplete={handleImageUploadComplete}
                onError={handleImageUploadError}
              />
              {imagePreview && (
                <div className="mt-4 relative w-full aspect-square max-w-xs bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Vista previa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 384px) 100vw, 384px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación (1-5)
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
                  placeholder="4.5"
                />
              </div>

              <div>
                <label htmlFor="reviews" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Reseñas
                </label>
                <input
                  type="number"
                  id="reviews"
                  name="reviews"
                  min="0"
                  value={formData.reviews}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Error</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="mt-8 pt-6 border-t flex gap-4 justify-end">
          <Link
            href="/admin/products"
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancelar
          </Link>
          <motion.button
            type="submit"
            disabled={uploading || !formData.image}
            whileHover={{ scale: uploading ? 1 : 1.02 }}
            whileTap={{ scale: uploading ? 1 : 0.98 }}
            className="px-6 py-3 bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            {uploading ? 'Guardando...' : 'Guardar Producto'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

