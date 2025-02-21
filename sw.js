const cacheName = 'stopwatch-v1';

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(cacheName);
    await cache.addAll(resources);
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        addResourcesToCache([
            './index.html',
            './app.js',
            './sw.js',
            './style/app.css',
            './scripts/stopwatch.js',
            './images/1.png',
            './images/2.png',
            './images/5.png',
            './images/10.png',
            './images/15.png',
            './images/30.png',
            './images/60.png',
            './images/favicon.png',
            './images/stopwatch-icon64.png',
            './images/stopwatch-icon512.png',
            './images/stopwatch-icon.svg',
            './images/stopwatch-logo.svg'
        ]),
    );
});

self.addEventListener('fetch', (event) => {
    // Is this one of our precached assets?
    const url = new URL(event.request.url);
    const isPrecachedRequest = precachedAssets.includes(url.pathname);
  
    if (isPrecachedRequest) {
      // Grab the precached asset from the cache
      event.respondWith(caches.open(cacheName).then((cache) => {
        return cache.match(event.request.url);
      }));
    } else {
      // Go to the network
      return;
    }
  });


