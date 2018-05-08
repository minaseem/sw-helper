"use strict";
/**
 * Created by imamudinnaseem on 5/8/18
 */
Object.defineProperty(exports, "__esModule", { value: true });
const idb_1 = require("../dao/idb");
var updateCache = function (options) {
    var requestClone = options.request.clone();
    return fetch(requestClone)
        .then(function (response) {
        if (!response || response.status >= 400) {
            console.log("[SW] Invalid response from fetch ");
        }
        else {
            var responseClone = response.clone();
            caches.open(options.cacheName).then(function (cache) {
                cache.put(options.getKey(options.request), responseClone);
                console.log('[SW] New Data Cached', options.request.url);
                if (options.config.maxAgeSeconds !== undefined) {
                    idb_1.default.getDb(options.cacheName)
                        .then((db) => idb_1.default.setTimestampForUrl(db, {
                        url: options.getKey(options.request),
                        timestamp: Date.now() + (options.config.maxAgeSeconds * 1000)
                    }))
                        .then((db) => {
                        let urls = idb_1.default.expireEntries(db);
                        urls.then(urlsToDelete => {
                            var deletionPromises = urlsToDelete.map(function (urlToDelete) {
                                return cache.delete(urlToDelete);
                            });
                            return Promise.all(deletionPromises).then(function () {
                                console.log('Done with cache cleanup.');
                            });
                        });
                    });
                }
            });
        }
        return response;
    })
        .catch(function (err) {
        console.log('[SW] Error Fetching & Caching New Data', err);
    });
};
exports.default = (e, cacheName, cacheFiles, getKey, config) => {
    e.respondWith(caches.match(getKey(e.request))
        .then(function (response) {
        if (response) {
            console.log("[SW] Found in Cache", e.request.url, response);
            if (config.maxAgeSeconds) {
                return idb_1.default.getDb(cacheName).then((db) => idb_1.default.getTimestampForUrl(db, getKey(e.request))
                    .then((result) => {
                    if (result && result.timestamp > Date.now()) {
                        setTimeout(() => updateCache({ request: e.request, cacheName, getKey, config }), 0);
                        return response;
                    }
                    else {
                        console.log("[SW] Cache expired for ", e.request.url);
                        return updateCache({ request: e.request, cacheName, getKey, config });
                    }
                }));
            }
            else {
                setTimeout(() => updateCache({ request: e.request, cacheName, getKey, config }), 0);
                return response;
            }
        }
        else {
            return updateCache({ request: e.request, cacheName, getKey, config });
        }
    }));
};
//# sourceMappingURL=cacheFirstUpdate.js.map