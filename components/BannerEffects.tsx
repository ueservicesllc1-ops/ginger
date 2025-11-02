'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BannerEffects() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generar posiciones aleatorias para los destellos (solo en el cliente)
  const sparkles = isMounted ? Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
  })) : [];

  // Partículas flotantes (solo en el cliente)
  const particles = isMounted ? Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 3,
    size: 4 + Math.random() * 8,
  })) : [];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Destellos animados */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={`sparkle-${sparkle.id}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Destellos grandes */}
      {sparkles.slice(0, 3).map((sparkle) => (
        <motion.div
          key={`big-sparkle-${sparkle.id}`}
          className="absolute w-2 h-2 bg-white rounded-full blur-sm"
          style={{
            left: sparkle.left,
            top: sparkle.top,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: sparkle.duration + 1,
            delay: sparkle.delay + 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Partículas flotantes */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute bg-white/30 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Efecto de brillo deslizante */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          width: '100%',
          height: '100%',
          transform: 'skewX(-20deg)',
        }}
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2,
        }}
      />
    </div>
  );
}

