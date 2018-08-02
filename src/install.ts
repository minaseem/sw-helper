/**
 * Created by imamudinnaseem on 6/9/17.
 */
import {Window} from './window'
import log from './extras/log';

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
        log('[SW] Installed');
        e.waitUntil(
            caches.open(cacheName).then(function (cache) {
                log('[SW] Caching cacheFiles');
                return cache.addAll(prefetchFiles);
            })
                .then(function () {
                    return self.skipWaiting();
                })
        );
    });
}
