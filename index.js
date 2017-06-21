"use strict";
/**
 * Created by imamudinnaseem on 6/9/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var install_1 = require("./src/install");
var activate_1 = require("./src/activate");
var fetch_1 = require("./src/fetch");
var defaultOptions = {
    prefetchFiles: [],
    cacheFiles: [],
    cacheName: 'v1',
    strategy: 'CacheFirst'
};
exports.default = function (options) {
    var _a = options.cacheFiles, cacheFiles = _a === void 0 ? defaultOptions.cacheFiles : _a, _b = options.cacheName, cacheName = _b === void 0 ? defaultOptions.cacheName : _b, _c = options.strategy, strategy = _c === void 0 ? defaultOptions.strategy : _c, _d = options.prefetchFiles, prefetchFiles = _d === void 0 ? defaultOptions.prefetchFiles : _d;
    install_1.default({ prefetchFiles: prefetchFiles, cacheName: cacheName });
    activate_1.default({ cacheName: cacheName });
    fetch_1.default({ cacheName: cacheName, strategy: strategy, cacheFiles: cacheFiles, prefetchFiles: prefetchFiles });
};
//# sourceMappingURL=sw.js.map