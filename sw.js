const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v2";

const assets = [
  "/",
  "/index.html",
  "/pages/fallback.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/icon/what2do-icon-72x72.png",
  "/img/icon/icon-96.png",
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
  //cache versioning
  e.waitUntil(
    caches.keys().then(keys => {
      // console.log(keys);
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName && key !== dynamicCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", e => {
  //console.log('fetch event', e);
  //get cache
  e.respondWith(
    caches
      .match(e.request)
      .then(cacheRes => {
        return (
          cacheRes ||
          fetch(e.request)
            //dynamic cache
            .then(fetchRes => {
              return caches.open(dynamicCacheName).then(cache => {
                cache.put(e.request.url, fetchRes.clone());
                return fetchRes;
              });
            })
        );
      })
      .catch(() => caches.match("/pages/fallback.html"))
  );
});
