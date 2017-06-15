/**
 * Created by imamudinnaseem on 6/15/17.
 */
var updateCache:<T>(Request: T, cacheName: string) => Promise<T> = function (request: Request, cacheName: string){
    var requestClone: Request = request.clone();
    return fetch(requestClone)
        .then(function (response) {
            if (!response) {
                console.log("[ServiceWorker] No response from fetch ");
            } else {
                var responseClone = response.clone();
                caches.open(cacheName).then(function (cache) {
                    cache.put(request.url, responseClone);
                    console.log('[ServiceWorker] New Data Cached', request.url);
                });
            }
            return response;
        })
        .catch(function (err) {
            console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
        });
};
export default (e: any, cacheName: string) => {
    e.respondWith(
        caches.match(e.request.url)
            .then(function (response) {
                if (response) {
                    console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                    updateCache(e.request, cacheName);
                    return response;
                } else {
                    var resp = updateCache(e.request, cacheName);
                    return resp;
                }
            })
    );
}
