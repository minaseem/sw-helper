/**
 * Created by imamudinnaseem on 6/15/17.
 */
interface IUpdateCache {
    request: Request;
    cacheName: string;
    cacheFiles: string[];
}
var updateCache: <T>(O: IUpdateCache) => Promise<T> = function (options: IUpdateCache) {
    var requestClone: Request = options.request.clone();
    return fetch(requestClone)
        .then(function (response) {
            if (!response) {
                console.log("[ServiceWorker] No response from fetch ");
            } else {
                var responseClone = response.clone();
                caches.open(options.cacheName).then(function (cache) {
                    cache.put(options.request.url, responseClone);
                    console.log('[ServiceWorker] New Data Cached', options.request.url);
                });
            }
            return response;
        })
        .catch(function (err) {
            console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
        });
};
const matchUrl: (a: string[], b: string) => boolean = (cacheFiles, url) => {
    var path: string = new URL(url).pathname;
    return cacheFiles.some(x => {
        var reg: RegExp = new RegExp(x);
        return reg.test(path);
    });
}
const cachingRequired: (a: Request, b: string[]) => boolean = ({mode, url}, cacheFiles) =>
(mode === 'navigate' && cacheFiles.indexOf('index.html') > -1) || matchUrl(cacheFiles, url);

export default (e: any, cacheName: string, cacheFiles: string[]) => {
    if (cachingRequired(e.request, cacheFiles)) {
        e.respondWith(
            caches.match(e.request.url)
                .then(function (response) {
                    if (response) {
                        console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                        updateCache({request: e.request, cacheName, cacheFiles});
                        return response;
                    } else {
                        var resp = updateCache({request: e.request, cacheName, cacheFiles});
                        return resp;
                    }
                })
        );
    }
}
