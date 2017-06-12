/**
 * Created by imamudinnaseem on 6/9/17.
 */
import {Window} from './window'

declare var self: Window;
interface IInstall {
    cacheName: string;
    cacheFiles: string[];
}

export default ({cacheName, cacheFiles}: IInstall) => {
    self.addEventListener('install', function (e: any) {
        console.log('[ServiceWorker] Installed');
        e.waitUntil(
            caches.open(cacheName).then(function (cache) {
                console.log('[ServiceWorker] Caching cacheFiles');
                return cache.addAll(cacheFiles);
            })
                .then(function () {
                    return self.skipWaiting();
                })
        );
    });
}
