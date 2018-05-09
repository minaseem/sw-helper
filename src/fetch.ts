/**
 * Created by imamudinnaseem on 6/9/17.
 */


'use strict';
import {Window} from './window'
import cacheFirst from './strategies/cacheFirst';
import cacheFirstUpdate from './strategies/cacheFirstUpdate';
import {IOptions} from './interfaces/IOptions'
import {IConfig} from "./interfaces/Iconfig";

declare var self: Window;


const getConfig: (e: Request, a: Array<IConfig>) => IConfig | undefined = ({mode, url}, cacheFiles) => {
    var path: string = new URL(url).pathname;
    var config: (IConfig | undefined) = cacheFiles.find((x: IConfig) => {
        if (x.url === 'index.html' && mode === 'navigate') {
            return true;
        } else {
            if (x.url instanceof RegExp) {
                return x.url.test(path);
            } else {
                return path.indexOf(x.url) > -1;
            }
        }
    });
    return config;
}
export default ({strategy, cacheName, cacheFiles, prefetchFiles, getKey}: IOptions) => {
    self.addEventListener('fetch', function (e: FetchEvent) {
        console.log('[SW] Fetch', e.request.url);
        const config: IConfig | undefined = getConfig(e.request, cacheFiles);
        if (config) {
            const cacheList = Array.prototype.concat(cacheFiles, prefetchFiles)
            let cachingStrategy = config.strategy || strategy;
            switch (cachingStrategy) {
                case 'cacheFirst':
                    cacheFirst(e, cacheName, cacheList, getKey, config);
                    break;
                case 'cacheFirstUpdate':
                    cacheFirstUpdate(e, cacheName, cacheList, getKey, config);
                    break;
                default:
                    cacheFirst(e, cacheName, cacheList, getKey, config);
            }
        }
    });
}

