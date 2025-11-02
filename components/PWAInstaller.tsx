'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Detectar si ya está instalada
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Para Android/Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Mostrar prompt en iOS después de un delay
    if (iOS && !standalone) {
      setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android/Chrome
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      // iOS - mostrar instrucciones
      setShowInstallPrompt(false);
      // Puedes mostrar un modal con instrucciones aquí
      alert('Para instalar en iOS:\n1. Toca el botón compartir (cuadrado con flecha)\n2. Selecciona "Añadir a pantalla de inicio"');
    }
  };

  // No mostrar si ya está instalada
  if (isStandalone) {
    return null;
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96"
        >
          <div className="bg-black text-white rounded-xl shadow-2xl p-4 flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                <Download className="w-6 h-6 text-black" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm mb-1">Instalar Ginbri Store</h3>
              <p className="text-xs text-gray-300">
                {isIOS 
                  ? 'Agrega esta app a tu pantalla de inicio'
                  : 'Instala esta app para acceso rápido'
                }
              </p>
            </div>
            <button
              onClick={handleInstall}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
            >
              Instalar
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

