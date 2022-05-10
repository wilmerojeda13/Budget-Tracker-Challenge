const FILES_TO_CACHE = [
    "./index.html",
    "./css/styles.css",
    "./js/index.js",
    "./js/idb.js",
    "./manifest.json",
    "./icons/icon-512x512.png",
    "./icons/icon-384x384.png",
    "./icons/icon-192x192.png",
    "./icons/icon-152x152.png",
    "./icons/icon-144x144.png",
    "./icons/icon-128x128.png",
    "./icons/icon-96x96.png",
    "./icons/icon-72x72.png", 
];

const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

//install
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('installing cache :' + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE);
        })
    )
})