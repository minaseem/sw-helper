"use strict";
/**
 * Created by imamudinnaseem on 6/9/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var install_1 = require("./src/install");
var activate_1 = require("./src/activate");
var fetch_1 = require("./src/fetch");
var defaultOptions = {
    cacheFiles: [],
    cacheName: 'v1',
    strategy: 'CacheFirst'
};
exports.default = function (options) {
    var _a = options.cacheFiles, cacheFiles = _a === void 0 ? defaultOptions.cacheFiles : _a, _b = options.cacheName, cacheName = _b === void 0 ? defaultOptions.cacheName : _b, _c = options.strategy, strategy = _c === void 0 ? defaultOptions.strategy : _c;
    install_1.default({ cacheFiles: cacheFiles, cacheName: cacheName });
    activate_1.default({ cacheName: cacheName });
    fetch_1.default({ cacheName: cacheName, strategy: strategy });
};
//# sourceMappingURL=index.js.map