//install service worker

self.addEventListener("install", e => {
  console.log("sw has been installed");
});

self.addEventListener("activate", e => {
  console.log("sw has been actived");
});
