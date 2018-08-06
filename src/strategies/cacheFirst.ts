/**
 * Created by imamudinnaseem on 6/15/17.
 */
import {IConfig} from "../interfaces/Iconfig";
import idb from '../dao/idb';
import {ICacheData} from "../interfaces/ICacheData";
import {FetchEvent} from "../interfaces/FetchEvent";
import log from "../extras/log";

interface IUpdateCache {
    request: Request;
    cacheName: string;
    getKey: Function,
    config: IConfig
}

var updateCache: <T>(O: IUpdateCache) => Promise<T | void | Response> = function (options: IUpdateCache) {
    var requestClone: Request = options.request.clone();
    return fetch(requestClone)
        .then(function (response) {
            if (response && response.status === 200) {
                var responseClone = response.clone();
                caches.open(options.cacheName).then(function (cache) {
                    cache.put(options.getKey(options.request), responseClone);
                    log('[SW] New Data Cached', options.request.url);
                    if (options.config.maxAgeSeconds !== undefined) {
                        idb.getDb(options.cacheName)
                            .then((db: IDBDatabase) => idb.setTimestampForUrl(db, {
                                url: JSON.stringify(options.getKey(options.request)),
                                timestamp: Date.now() + (options.config.maxAgeSeconds * 1000)
                            }))
                            .then((db: IDBDatabase) => {
                                let urls = idb.expireEntries(db);
                                urls.then(urlsToDelete => {
                                    var deletionPromises = urlsToDelete.map(function (urlToDelete) {
                                        return cache.delete(urlToDelete);
                                    });

                                    return Promise.all(deletionPromises).then(function () {
                                        log('Done with cache cleanup.');
                                    });
                                })
                            })
                    }
                });
            }
            return response;
        })
        .catch(function (err) {
            log('[SW] Error Fetching & Caching New Data', err);
        });
};

export default (e: FetchEvent, cacheName: string, cacheFiles: string[], getKey: Function, config: IConfig) => {
    e.respondWith(
        caches.match(getKey(e.request))
            .then(function (response) {
                if (response && response.status === 200) {
                    log("[SW] Found in Cache", e.request.url, response);
                    if (config.maxAgeSeconds) {
                        return idb.getDb(cacheName).then((db: IDBDatabase) => idb.getTimestampForUrl(db, JSON.stringify(getKey(e.request)))
                            .then((result: ICacheData) => {
                                if (result && result.timestamp > Date.now()) {
                                    return response;
                                } else {
                                    log("[SW] Cache expired for ", e.request.url);
                                    return updateCache({request: e.request, cacheName, getKey, config});
                                }
                            }));
                    } else {
                        return response;
                    }
                } else {
                    return updateCache({request: e.request, cacheName, getKey, config});
                }
            })
    );
}
