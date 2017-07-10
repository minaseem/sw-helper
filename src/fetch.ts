/**
 * Created by imamudinnaseem on 6/9/17.
 */

'use strict';
import {Window} from './window'
import cacheFirst from './strategies/cacheFirst';
import {IOptions} from './IOptions'

declare var self: Window;


export default ({strategy, cacheName, cacheFiles, prefetchFiles, getKey}: IOptions) => {
    self.addEventListener('fetch', function (e: any) {
        console.log('[ServiceWorker] Fetch', e.request.url);
        const cacheList = Array.prototype.concat(cacheFiles, prefetchFiles)
        switch (strategy) {
            case 'cacheFirst':
                cacheFirst(e, cacheName, cacheList, getKey);
                break;
            default:
                cacheFirst(e, cacheName, cacheList, getKey);
        }
    });
}

