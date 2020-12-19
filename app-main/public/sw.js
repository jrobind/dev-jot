const CACHE_NAME = "devJotPWA-v1";
const CACHE_FILE = [
  "./index.html",
  "./js/index.js",
  "./css/style.css",
  "https://cdn.quilljs.com/1.3.6/quill.js",
  "https://cdn.quilljs.com/1.3.6/quill.snow.css",
];

// Install service worker, then caches all the files
self.addEventListener("install", function (e) {
  console.log("[Service Worker] Install");
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("[Service Worker] Caching all: app shell and content");
      return cache.addAll(CACHE_FILE);
    })
  );
});

// Fetch content from the cache if it is available there
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        let responseToCache = response.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
