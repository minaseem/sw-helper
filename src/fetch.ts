/**
 * Created by imamudinnaseem on 6/9/17.
 */

'use strict';
import {Window} from './window'

var cacheName = 'v1';
declare var self: Window;

interface IFetch {
    strategy: string;
    cacheName: string;
}
var updateCache:<T>(Request: T, cacheName: string) => Promise<T> = function (request: Request){
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
export default ({strategy, cacheName}: IFetch) => {
    self.addEventListener('fetch', function (e: any) {
        if (e.request.mode === 'navigate') { // cache only html file
            console.log('[ServiceWorker] Fetch', e.request.url);
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
    });
}

