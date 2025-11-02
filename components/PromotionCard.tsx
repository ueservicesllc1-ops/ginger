'use client';

import Image from 'next/image';
import { Promotion } from '@/data/promotions';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface PromotionCardProps {
  promotion: Promotion;
  index?: number;
}

export default function PromotionCard({ promotion, index = 0 }: PromotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="relative bg-white rounded-xl shadow-lg overflow-hidden h-full"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <Image
            src={promotion.image}
            alt={promotion.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.15 + 0.3, type: 'spring' }}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm"
        >
          {promotion.discount}
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {promotion.title}
        </h3>
        <p className="text-gray-600 mb-4">
          {promotion.description}
        </p>
        {promotion.code && (
          <motion.div
            whileHover={{ scale: 1.05, backgroundColor: '#dbeafe' }}
            className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg transition-colors cursor-pointer"
          >
            <Tag className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Código:</span>
            <span className="font-mono font-bold text-blue-600">{promotion.code}</span>
          </motion.div>
        )}
        {promotion.validUntil && (
          <p className="text-xs text-gray-500 mt-3">
            Válido hasta {new Date(promotion.validUntil).toLocaleDateString('es-ES')}
          </p>
        )}
      </div>
    </motion.div>
  );
}
