const CACHE_NAME = 'fridgeiq-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png',
  '/icon-192.png',
  '/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Gracefully catch cache additions to prevent install failures in dev mode
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Pre-caching assets warning during install:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Let the browser handle API POST requests (like object detection) directly
  if (event.request.method !== 'GET') {
    return;
  }

  // Bypass cache for development hot module reloading (HMR) websocket, chrome-extension, or chrome devtools
  if (event.request.url.includes('ws') || event.request.url.includes('chrome-extension')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If it's a valid network response, clone it and cache it for offline use
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if offline
        return caches.match(event.request);
      })
  );
});
