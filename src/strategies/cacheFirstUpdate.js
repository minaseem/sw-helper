"use strict";
/**
 * Created by imamudinnaseem on 5/8/18
 */
Object.defineProperty(exports, "__esModule", { value: true });
const idb_1 = require("../dao/idb");
const log_1 = require("../extras/log");
var updateCache = function (options) {
    var requestClone = options.request.clone();
    return fetch(requestClone)
        .then(function (response) {
        if (response && response.status === 200) {
            var responseClone = response.clone();
            caches.open(options.cacheName).then(function (cache) {
                cache.put(options.getKey(options.request), responseClone);
                log_1.default('[SW] New Data Cached', options.request.url);
                if (options.config.maxAgeSeconds !== undefined) {
                    idb_1.default.getDb(options.cacheName)
                        .then((db) => idb_1.default.setTimestampForUrl(db, {
                        url: JSON.stringify(options.getKey(options.request)),
                        timestamp: Date.now() + (options.config.maxAgeSeconds * 1000)
                    }))
                        .then((db) => {
                        let urls = idb_1.default.expireEntries(db);
                        urls.then(urlsToDelete => {
                            var deletionPromises = urlsToDelete.map(function (urlToDelete) {
                                return cache.delete(urlToDelete);
                            });
                            return Promise.all(deletionPromises).then(function () {
                                log_1.default('Done with cache cleanup.');
                            });
                        });
                    });
                }
            });
        }
        return response;
    })
        .catch(function (err) {
        log_1.default('[SW] Error Fetching & Caching New Data', err);
    });
};
exports.default = (e, cacheName, cacheFiles, getKey, config) => {
    e.respondWith(caches.match(getKey(e.request))
        .then(function (response) {
        if (response) {
            log_1.default("[SW] Found in Cache", e.request.url, response);
            if (config.maxAgeSeconds) {
                return idb_1.default.getDb(cacheName).then((db) => idb_1.default.getTimestampForUrl(db, JSON.stringify(getKey(e.request)))
                    .then((result) => {
                    if (result && result.timestamp > Date.now()) {
                        setTimeout(() => updateCache({ request: e.request, cacheName, getKey, config }), 0);
                        return response;
                    }
                    else {
                        log_1.default("[SW] Cache expired for ", e.request.url);
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