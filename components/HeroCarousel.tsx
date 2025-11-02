'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';

export interface HeroSlide {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  primaryButton?: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

interface HeroCarouselProps {
  slides: HeroSlide[];
  autoPlayInterval?: number; // en milisegundos
}

export default function HeroCarousel({ slides, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [slides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden min-h-[250px] sm:min-h-[300px] lg:min-h-[350px]">
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={slides[currentIndex].image}
                alt={slides[currentIndex].title || 'Banner'}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="100vw"
                quality={90}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10 h-full flex items-center"
            >
              <div className="text-center w-full">
                {slides[currentIndex].title && (
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                  >
                    {slides[currentIndex].title}
                  </motion.h1>
                )}
                {slides[currentIndex].subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto"
                  >
                    {slides[currentIndex].subtitle}
                  </motion.p>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  {slides[currentIndex].primaryButton && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={slides[currentIndex].primaryButton!.link}
                        className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl transition-all text-lg shadow-lg hover:shadow-xl touch-manipulation"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        {slides[currentIndex].primaryButton!.text}
                      </Link>
                    </motion.div>
                  )}
                  {slides[currentIndex].secondaryButton && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={slides[currentIndex].secondaryButton!.link}
                        className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all text-lg border-2 border-white/30 touch-manipulation"
                      >
                        {slides[currentIndex].secondaryButton!.text}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Botones de navegación */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-[60%] -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all touch-manipulation shadow-lg"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-[60%] -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all touch-manipulation shadow-lg"
              aria-label="Slide siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Indicadores */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'bg-white w-8 h-2'
                    : 'bg-white/50 w-2 h-2 hover:bg-white/75'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

