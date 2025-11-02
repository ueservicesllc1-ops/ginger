import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Ginbri Express",
  description: "Aplicación de gestión de envíos multiplataforma",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Ginbri Express',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ginbri Express" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
