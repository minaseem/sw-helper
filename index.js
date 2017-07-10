(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sw-helper"] = factory();
	else
		root["sw-helper"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by imamudinnaseem on 6/9/17.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var install_1 = __webpack_require__(1);
var activate_1 = __webpack_require__(2);
var fetch_1 = __webpack_require__(3);
var identity = function (a) {
    return a;
};
var defaultOptions = {
    prefetchFiles: [],
    cacheFiles: [],
    cacheName: 'v1',
    strategy: 'CacheFirst',
    getKey: identity
};
exports.default = function (options) {
    var _a = options.cacheFiles,
        cacheFiles = _a === void 0 ? defaultOptions.cacheFiles : _a,
        _b = options.cacheName,
        cacheName = _b === void 0 ? defaultOptions.cacheName : _b,
        _c = options.strategy,
        strategy = _c === void 0 ? defaultOptions.strategy : _c,
        _d = options.prefetchFiles,
        prefetchFiles = _d === void 0 ? defaultOptions.prefetchFiles : _d,
        _e = options.getKey,
        getKey = _e === void 0 ? defaultOptions.getKey : _e;
    install_1.default({ prefetchFiles: prefetchFiles, cacheName: cacheName });
    activate_1.default({ cacheName: cacheName });
    fetch_1.default({ cacheName: cacheName, strategy: strategy, cacheFiles: cacheFiles, prefetchFiles: prefetchFiles, getKey: getKey });
};
//# sourceMappingURL=main.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var cacheName = _a.cacheName,
        prefetchFiles = _a.prefetchFiles;
    self.addEventListener('install', function (e) {
        console.log('[ServiceWorker] Installed');
        e.waitUntil(caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(prefetchFiles);
        }).then(function () {
            return self.skipWaiting();
        }));
    });
};
//# sourceMappingURL=install.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by imamudinnaseem on 6/9/17.
 */

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var cacheName = _a.cacheName;
    self.addEventListener('activate', function (e) {
        console.log('[ServiceWorker] Activated');
        self.clients.claim();
        e.waitUntil(caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (thisCacheName) {
                if (thisCacheName !== cacheName) {
                    console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
                    return caches.delete(thisCacheName);
                } else {
                    return false;
                }
            }));
        }));
    });
};
//# sourceMappingURL=activate.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by imamudinnaseem on 6/9/17.
 */


Object.defineProperty(exports, "__esModule", { value: true });
var cacheFirst_1 = __webpack_require__(4);
exports.default = function (_a) {
    var strategy = _a.strategy,
        cacheName = _a.cacheName,
        cacheFiles = _a.cacheFiles,
        prefetchFiles = _a.prefetchFiles,
        getKey = _a.getKey;
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var updateCache = function (options) {
    var requestClone = options.request.clone();
    return fetch(requestClone).then(function (response) {
        if (!response) {
            console.log("[ServiceWorker] No response from fetch ");
        } else {
            var responseClone = response.clone();
            caches.open(options.cacheName).then(function (cache) {
                cache.put(options.getKey(options.request), responseClone);
                console.log('[ServiceWorker] New Data Cached', options.request.url);
            });
        }
        return response;
    }).catch(function (err) {
        console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
    });
};
var matchUrl = function (cacheFiles, url) {
    var path = new URL(url).pathname;
    return cacheFiles.some(function (x) {
        var reg = new RegExp(x);
        return reg.test(path);
    });
};
var cachingRequired = function (_a, cacheFiles) {
    var mode = _a.mode,
        url = _a.url;
    return mode === 'navigate' && cacheFiles.indexOf('index.html') > -1 || matchUrl(cacheFiles, url);
};
exports.default = function (e, cacheName, cacheFiles, getKey) {
    if (cachingRequired(e.request, cacheFiles)) {
        e.respondWith(caches.match(getKey(e.request)).then(function (response) {
            if (response) {
                console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                setTimeout(function () {
                    return updateCache({ request: e.request, cacheName: cacheName, cacheFiles: cacheFiles, getKey: getKey });
                }, 0);
                return response;
            } else {
                var resp = updateCache({ request: e.request, cacheName: cacheName, cacheFiles: cacheFiles, getKey: getKey });
                return resp;
            }
        }));
    }
};
//# sourceMappingURL=cacheFirst.js.map

/***/ })
/******/ ]);
});