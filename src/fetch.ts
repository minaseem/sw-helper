/**
 * Created by imamudinnaseem on 6/9/17.
 */

'use strict';
import {Window} from './window'
import cacheFirst from './strategies/cacheFirst';
import {IOptions} from './IOptions'

declare var self: Window;


export default ({strategy, cacheName, cacheFiles}: IOptions) => {
    self.addEventListener('fetch', function (e: any) {
        console.log('[ServiceWorker] Fetch', e.request.url);
        switch (strategy) {
            case 'cacheFirst':
                cacheFirst(e, cacheName, cacheFiles);
                break;
            default:
                cacheFirst(e, cacheName, cacheFiles);
        }
    });
}

