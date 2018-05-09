/**
 * Created by imamudinnaseem on 6/9/17.
 */
import {Window} from './window'

declare var self: Window;

interface IInstall {
    cacheName: string;
    prefetchFiles: string[];
}

interface InstallEvent {
    waitUntil(a: Promise<any>): Promise<Response>;
}

export default ({cacheName, prefetchFiles}: IInstall) => {
    self.addEventListener('install', function (e: InstallEvent) {
        console.log('[SW] Installed');
        e.waitUntil(
            caches.open(cacheName).then(function (cache) {
                console.log('[SW] Caching cacheFiles');
                return cache.addAll(prefetchFiles);
            })
                .then(function () {
                    return self.skipWaiting();
                })
        );
    });
}
