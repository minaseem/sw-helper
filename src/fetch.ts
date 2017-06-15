/**
 * Created by imamudinnaseem on 6/9/17.
 */

'use strict';
import {Window} from './window'
import cacheFirst from './strategies/cacheFirst';

declare var self: Window;

interface IFetch {
    strategy: string;
    cacheName: string;
}

export default ({strategy, cacheName = "v1"}: IFetch) => {
    self.addEventListener('fetch', function (e: any) {
        console.log('[ServiceWorker] Fetch', e.request.url);
        switch (strategy) {
            case 'cacheFirst':
                cacheFirst(e, cacheName);
                break;
        }
    });
}

