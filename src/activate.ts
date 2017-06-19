/**
 * Created by imamudinnaseem on 6/9/17.
 */

interface IActivate {
    cacheName: string;
}
declare var Promise: any;

export default ({cacheName}: IActivate) => {
    self.addEventListener('activate', function (e: any) {
        console.log('[ServiceWorker] Activated');
        (<any>self).clients.claim()
        e.waitUntil(
            caches.keys().then(function (cacheNames: string[]) {
                return Promise.all(cacheNames.map(function (thisCacheName) {
                    if (thisCacheName !== cacheName) {
                        console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
                        return caches.delete(thisCacheName);
                    } else {
                        return false;
                    }
                }));
            }))
    });
}
