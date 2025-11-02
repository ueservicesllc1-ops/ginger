import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: 'export', // Comentado para permitir rutas dinámicas
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
