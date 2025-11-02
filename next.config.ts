import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para Capacitor, necesitamos exportar estáticamente
  // Esto limitará algunas funcionalidades dinámicas pero permitirá la app móvil
  // PWA funciona sin export estático
  output: undefined, // Sin export para permitir PWA completa
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Asegurar que el service worker se sirva correctamente
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/manifest+json',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
