/**
 * Created by imamudinnaseem on 6/9/17.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var cacheFirst_1 = require("./strategies/cacheFirst");
exports.default = function (_a) {
    var strategy = _a.strategy, cacheName = _a.cacheName, cacheFiles = _a.cacheFiles, prefetchFiles = _a.prefetchFiles, getKey = _a.getKey;
    self.addEventListener('fetch', function (e) {
        console.log('[ServiceWorker] Fetch', e.request.url);
        var cacheList = Array.prototype.concat(cacheFiles, prefetchFiles);
        switch (strategy) {
            case 'cacheFirst':
                cacheFirst_1.default(e, cacheName, cacheList, getKey);
                break;
            default:
                cacheFirst_1.default(e, cacheName, cacheList, getKey);
        }
    });
};
//# sourceMappingURL=fetch.js.map