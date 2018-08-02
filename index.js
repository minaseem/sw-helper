"use strict";
/**
 * Created by imamudinnaseem on 6/9/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const install_1 = require("./src/install");
const activate_1 = require("./src/activate");
const fetch_1 = require("./src/fetch");
const config_1 = require("./src/extras/config");
const identity = (a) => a;
var defaultOptions = {
    prefetchFiles: [],
    cacheFiles: [],
    cacheName: 'SW-V1',
    strategy: 'CacheFirst',
    getKey: identity,
    disableLogging: false
};
exports.default = (options) => {
    var { cacheFiles = defaultOptions.cacheFiles, cacheName = defaultOptions.cacheName, strategy = defaultOptions.strategy, prefetchFiles = defaultOptions.prefetchFiles, disableLogging = defaultOptions.disableLogging, getKey = defaultOptions.getKey } = options;
    config_1.default.disableLogging = disableLogging;
    install_1.default({ prefetchFiles, cacheName });
    activate_1.default({ cacheName });
    fetch_1.default({ cacheName, strategy, cacheFiles, prefetchFiles, getKey });
};
//# sourceMappingURL=index.js.map