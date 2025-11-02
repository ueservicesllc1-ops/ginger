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
  // Solo interceptar requests GET para cachear
  if (event.request.method !== 'GET') {
    return; // Dejar pasar requests que no son GET sin cachear
  }

  // Solo cachear requests HTTP/HTTPS (no chrome-extension://, etc.)
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Solo cachear respuestas exitosas y válidas
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clonar la respuesta para cachear
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });
        
        return response;
      })
      .catch(() => {
        // Si falla la red, intentar obtener del cache
        return caches.match(event.request);
      })
  );
});

