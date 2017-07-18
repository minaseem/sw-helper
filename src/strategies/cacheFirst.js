"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var updateCache = function (options) {
    var requestClone = options.request.clone();
    return fetch(requestClone)
        .then(function (response) {
        if (!response) {
            console.log("[ServiceWorker] No response from fetch ");
        }
        else {
            var responseClone = response.clone();
            caches.open(options.cacheName).then(function (cache) {
                cache.put(options.getKey(options.request), responseClone);
                console.log('[ServiceWorker] New Data Cached', options.request.url);
            });
        }
        return response;
    })
        .catch(function (err) {
        console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
    });
};
var matchUrl = function (cacheFiles, url) {
    var path = new URL(url).pathname;
    return cacheFiles.some(function (x) {
        var reg = new RegExp(x);
        return reg.test(path);
    });
};
var cachingRequired = function (_a, cacheFiles) {
    var mode = _a.mode, url = _a.url;
    return (mode === 'navigate' && cacheFiles.indexOf('index.html') > -1) || matchUrl(cacheFiles, url);
};
exports.default = function (e, cacheName, cacheFiles, getKey) {
    if (cachingRequired(e.request, cacheFiles)) {
        e.respondWith(caches.match(getKey(e.request))
            .then(function (response) {
            if (response) {
                console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                setTimeout(function () { return updateCache({ request: e.request, cacheName: cacheName, cacheFiles: cacheFiles, getKey: getKey }); }, 0);
                return response;
            }
            else {
                var resp = updateCache({ request: e.request, cacheName: cacheName, cacheFiles: cacheFiles, getKey: getKey });
                return resp;
            }
        }));
    }
};
//# sourceMappingURL=cacheFirst.js.map