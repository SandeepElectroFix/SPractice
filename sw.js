/* =========================================================
   SANDEEP ELECTROFIX
   SERVICE WORKER (PWA & OFFLINE CACHING)
   Version 3.0.0
========================================================= */

const CACHE_NAME = "sandeep-electrofix-v3.0.0";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./config.js",
  "./script.js",
  "./manifest.json",
  "./material-catalogue.html",
  "./material-catalogue.css",
  "./material-catalogue.js",
  "./our-work.html",
  "./our-work.css",
  "./our-work.js",
  "./assets/logo.png",
  "./assets/qr-card.png"
];

/* =========================================================
   INSTALL EVENT
========================================================= */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("⚡ [Service Worker] Pre-caching offline assets");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

/* =========================================================
   ACTIVATE EVENT (CLEAR OLD CACHE)
========================================================= */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("⚡ [Service Worker] Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

/* =========================================================
   FETCH EVENT (STALE-WHILE-REVALIDATE STRATEGY)
========================================================= */
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed, return cached response if exists
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
