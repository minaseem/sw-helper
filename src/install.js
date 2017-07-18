"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var cacheName = _a.cacheName, prefetchFiles = _a.prefetchFiles;
    self.addEventListener('install', function (e) {
        console.log('[ServiceWorker] Installed');
        e.waitUntil(caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(prefetchFiles);
        })
            .then(function () {
            return self.skipWaiting();
        }));
    });
};
//# sourceMappingURL=install.js.map