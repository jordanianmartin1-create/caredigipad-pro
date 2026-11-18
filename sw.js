const CACHE_NAME = 'caredigipad-v12';
const ASSETS = [
  './',
  './index.html',
  './style.css?v=12',
  './lang.js?v=12',
  './core.js?v=12',
  './modules.js?v=12',
  './manifest.json?v=12',
  './icon.png?v=12'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(ASSETS.map(url => cache.add(url)))
    )
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

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', clone));
        }
        return response;
      }).catch(() =>
        caches.match('./index.html').then(cached => cached || caches.match(event.request, { ignoreSearch: true }))
      )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(exactCached => {
      const cachedPromise = exactCached
        ? Promise.resolve(exactCached)
        : caches.match(event.request, { ignoreSearch: true });

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
