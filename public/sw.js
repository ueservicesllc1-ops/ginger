// Service Worker básico para PWA
const CACHE_NAME = 'ginbri-store-v1';
const urlsToCache = [
  '/',
  '/products',
  '/cart',
  '/personal-shopper',
  '/manifest.json',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia: Network First, luego Cache
// Solo cachear requests GET para evitar errores con POST, PUT, DELETE, etc.
self.addEventListener('fetch', (event) => {
  // Ignorar completamente requests que no son GET
  if (event.request.method !== 'GET') {
    // No hacer nada, dejar que el navegador maneje el request normalmente
    return;
  }

  // Solo cachear requests HTTP/HTTPS (no chrome-extension://, etc.)
  if (!event.request.url.startsWith('http://') && !event.request.url.startsWith('https://')) {
    return;
  }

  // Ignorar requests a APIs y otros recursos dinámicos
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('_next/') ||
      event.request.url.includes('hot-update')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Solo cachear respuestas exitosas y válidas para GET
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clonar la respuesta para cachear (solo GET requests)
        const responseToCache = response.clone();
        
        // Cachear de forma asíncrona sin bloquear la respuesta
        caches.open(CACHE_NAME)
          .then((cache) => {
            // Solo cachear si es GET y la respuesta es cacheable
            if (event.request.method === 'GET') {
              cache.put(event.request, responseToCache).catch((err) => {
                console.warn('Error cacheando:', err);
              });
            }
          })
          .catch((err) => {
            console.warn('Error abriendo cache:', err);
          });
        
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar obtener del cache solo para GET
        return caches.match(event.request);
      })
  );
});

