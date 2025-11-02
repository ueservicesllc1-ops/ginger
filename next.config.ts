import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Para Capacitor, necesitamos exportar estáticamente
  // Esto limitará algunas funcionalidades dinámicas pero permitirá la app móvil
  output: process.env.CAPACITOR_BUILD === 'true' ? 'export' : undefined,
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
