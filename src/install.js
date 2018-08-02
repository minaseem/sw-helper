"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./extras/log");
exports.default = ({ cacheName, prefetchFiles }) => {
    self.addEventListener('install', function (e) {
        log_1.default('[SW] Installed');
        e.waitUntil(caches.open(cacheName).then(function (cache) {
            log_1.default('[SW] Caching cacheFiles');
            return cache.addAll(prefetchFiles);
        })
            .then(function () {
            return self.skipWaiting();
        }));
    });
};
//# sourceMappingURL=install.js.map