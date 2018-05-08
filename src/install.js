"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ cacheName, prefetchFiles }) => {
    self.addEventListener('install', function (e) {
        console.log('[SW] Installed');
        e.waitUntil(caches.open(cacheName).then(function (cache) {
            console.log('[SW] Caching cacheFiles');
            return cache.addAll(prefetchFiles);
        })
            .then(function () {
            return self.skipWaiting();
        }));
    });
};
//# sourceMappingURL=install.js.map