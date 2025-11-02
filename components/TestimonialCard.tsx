'use client';

import { Testimonial } from '@/data/testimonials';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col"
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: index * 0.15 + i * 0.1, type: 'spring' }}
          >
            <Star
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-300'
              }`}
            />
          </motion.div>
        ))}
      </div>
      <p className="text-gray-700 mb-4 flex-1 italic">
        "{testimonial.comment}"
      </p>
      <div className="border-t pt-4">
        <p className="font-semibold text-gray-900">{testimonial.name}</p>
        <p className="text-sm text-gray-500">
          {new Date(testimonial.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </motion.div>
  );
}
