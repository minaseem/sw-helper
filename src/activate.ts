/**
 * Created by imamudinnaseem on 6/9/17.
 */
import log from './extras/log';


interface IActivate {
    cacheName: string;
}

export default ({cacheName}: IActivate) => {
    self.addEventListener('activate', function (e: any) {
        log('[SW] Activated');
        (<any>self).clients.claim()
        e.waitUntil(
            caches.keys().then(function (cacheNames: string[]) {
                return Promise.all(cacheNames.map(function (thisCacheName) {
                    if (thisCacheName !== cacheName) {
                        log('[SW] Removing Cached Files from Cache - ', thisCacheName);
                        return caches.delete(thisCacheName);
                    } else {
                        return false;
                    }
                }));
            }))
    });
}
