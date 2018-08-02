"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by imamudinnaseem on 6/9/17.
 */
const log_1 = require("./extras/log");
exports.default = ({ cacheName }) => {
    self.addEventListener('activate', function (e) {
        log_1.default('[SW] Activated');
        self.clients.claim();
        e.waitUntil(caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (thisCacheName) {
                if (thisCacheName !== cacheName) {
                    log_1.default('[SW] Removing Cached Files from Cache - ', thisCacheName);
                    return caches.delete(thisCacheName);
                }
                else {
                    return false;
                }
            }));
        }));
    });
};
//# sourceMappingURL=activate.js.map