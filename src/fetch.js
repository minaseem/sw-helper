/**
 * Created by imamudinnaseem on 6/9/17.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const cacheFirst_1 = require("./strategies/cacheFirst");
const cacheFirstUpdate_1 = require("./strategies/cacheFirstUpdate");
const getConfig = ({ mode, url }, cacheFiles) => {
    var path = new URL(url).pathname;
    var config = cacheFiles.find((x) => {
        if (x.url === 'index.html' && mode === 'navigate') {
            return true;
        }
        else {
            if (x.url instanceof RegExp) {
                return x.url.test(path);
            }
            else {
                return path.indexOf(x.url) > -1;
            }
        }
    });
    return config;
};
exports.default = ({ strategy, cacheName, cacheFiles, prefetchFiles, getKey }) => {
    self.addEventListener('fetch', function (e) {
        console.log('[SW] Fetch', e.request.url);
        const config = getConfig(e.request, cacheFiles);
        if (config) {
            const cacheList = Array.prototype.concat(cacheFiles, prefetchFiles);
            let cachingStrategy = config.strategy || strategy;
            switch (cachingStrategy) {
                case 'cacheFirst':
                    cacheFirst_1.default(e, cacheName, cacheList, getKey, config);
                    break;
                case 'cacheFirstUpdate':
                    cacheFirstUpdate_1.default(e, cacheName, cacheList, getKey, config);
                    break;
                default:
                    cacheFirst_1.default(e, cacheName, cacheList, getKey, config);
            }
        }
    });
};
//# sourceMappingURL=fetch.js.map