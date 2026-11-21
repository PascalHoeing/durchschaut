// Offline-Speicher für Durchschaut. Wird von make_sw.py erzeugt – nicht von Hand ändern.
const VERSION = "durchschaut-a0e565c1a4";
const FILES = [
  "./",
  "index.html",
  "rechtliches.html",
  "manifest.webmanifest",
  "css/app.css",
  "js/app.js",
  "js/art.js",
  "js/chapters.js",
  "js/common.js",
  "js/content.js",
  "js/content_c2.js",
  "js/content_c3.js",
  "js/content_c4.js",
  "js/content_c5.js",
  "js/content_k2.js",
  "js/content_k3.js",
  "js/content_k4.js",
  "js/content_k5.js",
  "js/daylight.js",
  "js/sim.js",
  "js/town.js",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-192.png",
  "icons/maskable-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Zuerst aus dem Speicher, sonst aus dem Netz. Eine neue Version kommt mit einer neuen VERSION.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request)));
});
