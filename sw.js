const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
}

self.addEventListener('install', (event) => {
    event.waitUntil(
        addResourcesToCache([
            './index.html',
            './app.js',
            './sw.js',
            './style/app.css'
        ]),
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request)
      .then(cachedResponse => {
          return cachedResponse || fetch(event.request);
      }
    )
   )
 });
