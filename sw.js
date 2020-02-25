const staticCacheName = "site-static";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/icon/what2do-icon-72x72.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

//install service worker
self.addEventListener("install", e => {
  // console.log("sw has been installed");

  // resolve until finish cache
  e.waitUntil(
    caches.open(staticCacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

//activate sevice worker
self.addEventListener("activate", e => {
  // console.log("sw has been actived");
});

//fetch event
self.addEventListener("fetch", e => {
  // console.log("fetch event", e);
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});
