const CACHE_NAME = 'caredigipad-v14';
const CORE_ASSETS = [
  './',
  './index.html',
  './style.css?v=14',
  './lang.js?v=14',
  './core.js?v=14',
  './modules.js?v=14'
];
const OPTIONAL_ASSETS = [
  './manifest.json?v=14',
  './icon.png?v=14'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache =>
        cache.addAll(CORE_ASSETS).then(() =>
          Promise.allSettled(OPTIONAL_ASSETS.map(url => cache.add(url)))
        )
      )
      .then(() => self.skipWaiting())
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
      if (exactCached) {
        fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
        }).catch(() => {});
        return exactCached;
      }

      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() =>
        caches.match(event.request, { ignoreSearch: true })
      );
    })
  );
});
