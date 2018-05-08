"use strict";
/**
 * Created by imamudinnaseem on 6/9/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ cacheName }) => {
    self.addEventListener('activate', function (e) {
        console.log('[SW] Activated');
        self.clients.claim();
        e.waitUntil(caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log('[SW] Removing Cached Files from Cache - ', thisCacheName);
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