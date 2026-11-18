const CACHE_NAME = 'caredigipad-v10';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=10',
  './lang.js?v=10',
  './core.js?v=10',
  './modules.js?v=10',
  './manifest.json?v=10',
  './icon.png?v=10'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(exactCached => {
      const cachedPromise = exactCached
        ? Promise.resolve(exactCached)
        : caches.match(event.request, { ignoreSearch: true }).then( looseCached => {
            if (looseCached) return looseCached;
            if (event.request.mode === 'navigate') return caches.match('./index.html');
            return undefined;
          });

      return cachedPromise.then(cached => {
        const networkFetch = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || networkFetch;
      });
    })
  );
});
