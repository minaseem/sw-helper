/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by imamudinnaseem on 6/9/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var install_1 = __webpack_require__(7);
var activate_1 = __webpack_require__(5);
var fetch_1 = __webpack_require__(6);
var identity = function (a) { return a; };
var defaultOptions = {
    prefetchFiles: [],
    cacheFiles: [],
    cacheName: 'v1',
    strategy: 'CacheFirst',
    getKey: identity
};
exports.default = function (options) {
    var _a = options.cacheFiles, cacheFiles = _a === void 0 ? defaultOptions.cacheFiles : _a, _b = options.cacheName, cacheName = _b === void 0 ? defaultOptions.cacheName : _b, _c = options.strategy, strategy = _c === void 0 ? defaultOptions.strategy : _c, _d = options.prefetchFiles, prefetchFiles = _d === void 0 ? defaultOptions.prefetchFiles : _d, _e = options.getKey, getKey = _e === void 0 ? defaultOptions.getKey : _e;
    install_1.default({ prefetchFiles: prefetchFiles, cacheName: cacheName });
    activate_1.default({ cacheName: cacheName });
    fetch_1.default({ cacheName: cacheName, strategy: strategy, cacheFiles: cacheFiles, prefetchFiles: prefetchFiles, getKey: getKey });
};
//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _swHelper = __webpack_require__(2);

var _swHelper2 = _interopRequireDefault(_swHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import sw from '../../index'
var cacheFiles = ['styles.css']; /**
                                  * Created by imamudinnaseem on 6/12/17.
                                  */

var prefetchFiles = ['app.js', 'rocket.jpg'];
var strategy = 'cacheFirst';

(0, _swHelper2.default)({ cacheName: 'v1', cacheFiles: cacheFiles, strategy: strategy, prefetchFiles: prefetchFiles });

/***/ }),
/* 5 */
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
                }
                else {
                    return false;
                }
            }));
        }));
    });
};
//# sourceMappingURL=activate.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by imamudinnaseem on 6/9/17.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var cacheFirst_1 = __webpack_require__(8);
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (_a) {
    var cacheName = _a.cacheName, prefetchFiles = _a.prefetchFiles;
    self.addEventListener('install', function (e) {
        console.log('[ServiceWorker] Installed');
        e.waitUntil(caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(prefetchFiles);
        })
            .then(function () {
            return self.skipWaiting();
        }));
    });
};
//# sourceMappingURL=install.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var updateCache = function (options) {
    var requestClone = options.request.clone();
    return fetch(requestClone)
        .then(function (response) {
        if (!response) {
            console.log("[ServiceWorker] No response from fetch ");
        }
        else {
            var responseClone = response.clone();
            caches.open(options.cacheName).then(function (cache) {
                cache.put(options.getKey(options.request), responseClone);
                console.log('[ServiceWorker] New Data Cached', options.request.url);
            });
        }
        return response;
    })
        .catch(function (err) {
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
    var mode = _a.mode, url = _a.url;
    return (mode === 'navigate' && cacheFiles.indexOf('index.html') > -1) || matchUrl(cacheFiles, url);
};
exports.default = function (e, cacheName, cacheFiles, getKey) {
    if (cachingRequired(e.request, cacheFiles)) {
        e.respondWith(caches.match(getKey(e.request))
            .then(function (response) {
            if (response) {
                console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                setTimeout(function () { return updateCache({ request: e.request, cacheName: cacheName, cacheFiles: cacheFiles, getKey: getKey }); }, 0);
                return response;
            }
            else {
                var resp = updateCache({ request: e.request, cacheName: cacheName, cacheFiles: cacheFiles, getKey: getKey });
                return resp;
            }
        }));
    }
};
//# sourceMappingURL=cacheFirst.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGQ4ZjVkOTBmNzQ1ZWE3NzVhODEiLCJ3ZWJwYWNrOi8vLy4vfi9zdy1oZWxwZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZVdvcmtlci9zdy5qcyIsIndlYnBhY2s6Ly8vLi9+L3N3LWhlbHBlci9zcmMvYWN0aXZhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9zdy1oZWxwZXIvc3JjL2ZldGNoLmpzIiwid2VicGFjazovLy8uL34vc3ctaGVscGVyL3NyYy9pbnN0YWxsLmpzIiwid2VicGFjazovLy8uL34vc3ctaGVscGVyL3NyYy9zdHJhdGVnaWVzL2NhY2hlRmlyc3QuanMiXSwibmFtZXMiOlsiY2FjaGVGaWxlcyIsInByZWZldGNoRmlsZXMiLCJzdHJhdGVneSIsImNhY2hlTmFtZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLFVBQVU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFEQUFxRDtBQUM1RSx3QkFBd0IsdUJBQXVCO0FBQy9DLHFCQUFxQixpSEFBaUg7QUFDdEk7QUFDQSxpQzs7Ozs7Ozs7OztBQ2xCQTs7Ozs7O0FBQ0E7QUFDQSxJQUFJQSxhQUFhLENBQUMsWUFBRCxDQUFqQixDLENBTkE7Ozs7QUFPQSxJQUFJQyxnQkFBZ0IsQ0FBQyxRQUFELEVBQVcsWUFBWCxDQUFwQjtBQUNBLElBQUlDLFdBQVcsWUFBZjs7QUFFQSx3QkFBRyxFQUFDQyxXQUFXLElBQVosRUFBa0JILHNCQUFsQixFQUE4QkUsa0JBQTlCLEVBQXdDRCw0QkFBeEMsRUFBSCxFOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxvQzs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsaUM7Ozs7Ozs7QUNwQkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLG1DOzs7Ozs7O0FDZkE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHFCQUFxQixtRkFBbUYsRUFBRSxFQUFFO0FBQ3BKO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxtRkFBbUY7QUFDM0g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esc0MiLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDRkOGY1ZDkwZjc0NWVhNzc1YTgxIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENyZWF0ZWQgYnkgaW1hbXVkaW5uYXNlZW0gb24gNi85LzE3LlxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW5zdGFsbF8xID0gcmVxdWlyZShcIi4vc3JjL2luc3RhbGxcIik7XG52YXIgYWN0aXZhdGVfMSA9IHJlcXVpcmUoXCIuL3NyYy9hY3RpdmF0ZVwiKTtcbnZhciBmZXRjaF8xID0gcmVxdWlyZShcIi4vc3JjL2ZldGNoXCIpO1xudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGE7IH07XG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJlZmV0Y2hGaWxlczogW10sXG4gICAgY2FjaGVGaWxlczogW10sXG4gICAgY2FjaGVOYW1lOiAndjEnLFxuICAgIHN0cmF0ZWd5OiAnQ2FjaGVGaXJzdCcsXG4gICAgZ2V0S2V5OiBpZGVudGl0eVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIF9hID0gb3B0aW9ucy5jYWNoZUZpbGVzLCBjYWNoZUZpbGVzID0gX2EgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLmNhY2hlRmlsZXMgOiBfYSwgX2IgPSBvcHRpb25zLmNhY2hlTmFtZSwgY2FjaGVOYW1lID0gX2IgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLmNhY2hlTmFtZSA6IF9iLCBfYyA9IG9wdGlvbnMuc3RyYXRlZ3ksIHN0cmF0ZWd5ID0gX2MgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLnN0cmF0ZWd5IDogX2MsIF9kID0gb3B0aW9ucy5wcmVmZXRjaEZpbGVzLCBwcmVmZXRjaEZpbGVzID0gX2QgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLnByZWZldGNoRmlsZXMgOiBfZCwgX2UgPSBvcHRpb25zLmdldEtleSwgZ2V0S2V5ID0gX2UgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLmdldEtleSA6IF9lO1xuICAgIGluc3RhbGxfMS5kZWZhdWx0KHsgcHJlZmV0Y2hGaWxlczogcHJlZmV0Y2hGaWxlcywgY2FjaGVOYW1lOiBjYWNoZU5hbWUgfSk7XG4gICAgYWN0aXZhdGVfMS5kZWZhdWx0KHsgY2FjaGVOYW1lOiBjYWNoZU5hbWUgfSk7XG4gICAgZmV0Y2hfMS5kZWZhdWx0KHsgY2FjaGVOYW1lOiBjYWNoZU5hbWUsIHN0cmF0ZWd5OiBzdHJhdGVneSwgY2FjaGVGaWxlczogY2FjaGVGaWxlcywgcHJlZmV0Y2hGaWxlczogcHJlZmV0Y2hGaWxlcywgZ2V0S2V5OiBnZXRLZXkgfSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N3LWhlbHBlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENyZWF0ZWQgYnkgaW1hbXVkaW5uYXNlZW0gb24gNi8xMi8xNy5cbiAqL1xuXG5pbXBvcnQgc3cgZnJvbSAnc3ctaGVscGVyJ1xuLy8gaW1wb3J0IHN3IGZyb20gJy4uLy4uL2luZGV4J1xudmFyIGNhY2hlRmlsZXMgPSBbJ3N0eWxlcy5jc3MnXVxudmFyIHByZWZldGNoRmlsZXMgPSBbJ2FwcC5qcycsICdyb2NrZXQuanBnJ11cbnZhciBzdHJhdGVneSA9ICdjYWNoZUZpcnN0J1xuXG5zdyh7Y2FjaGVOYW1lOiAndjEnLCBjYWNoZUZpbGVzLCBzdHJhdGVneSwgcHJlZmV0Y2hGaWxlc30pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc2VydmljZVdvcmtlci9zdy5qcyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDcmVhdGVkIGJ5IGltYW11ZGlubmFzZWVtIG9uIDYvOS8xNy5cbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKF9hKSB7XG4gICAgdmFyIGNhY2hlTmFtZSA9IF9hLmNhY2hlTmFtZTtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2FjdGl2YXRlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tTZXJ2aWNlV29ya2VyXSBBY3RpdmF0ZWQnKTtcbiAgICAgICAgc2VsZi5jbGllbnRzLmNsYWltKCk7XG4gICAgICAgIGUud2FpdFVudGlsKGNhY2hlcy5rZXlzKCkudGhlbihmdW5jdGlvbiAoY2FjaGVOYW1lcykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKGNhY2hlTmFtZXMubWFwKGZ1bmN0aW9uICh0aGlzQ2FjaGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNDYWNoZU5hbWUgIT09IGNhY2hlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIFJlbW92aW5nIENhY2hlZCBGaWxlcyBmcm9tIENhY2hlIC0gJywgdGhpc0NhY2hlTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZXMuZGVsZXRlKHRoaXNDYWNoZU5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFjdGl2YXRlLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdy1oZWxwZXIvc3JjL2FjdGl2YXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ3JlYXRlZCBieSBpbWFtdWRpbm5hc2VlbSBvbiA2LzkvMTcuXG4gKi9cbid1c2Ugc3RyaWN0Jztcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjYWNoZUZpcnN0XzEgPSByZXF1aXJlKFwiLi9zdHJhdGVnaWVzL2NhY2hlRmlyc3RcIik7XG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgc3RyYXRlZ3kgPSBfYS5zdHJhdGVneSwgY2FjaGVOYW1lID0gX2EuY2FjaGVOYW1lLCBjYWNoZUZpbGVzID0gX2EuY2FjaGVGaWxlcywgcHJlZmV0Y2hGaWxlcyA9IF9hLnByZWZldGNoRmlsZXMsIGdldEtleSA9IF9hLmdldEtleTtcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tTZXJ2aWNlV29ya2VyXSBGZXRjaCcsIGUucmVxdWVzdC51cmwpO1xuICAgICAgICB2YXIgY2FjaGVMaXN0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdChjYWNoZUZpbGVzLCBwcmVmZXRjaEZpbGVzKTtcbiAgICAgICAgc3dpdGNoIChzdHJhdGVneSkge1xuICAgICAgICAgICAgY2FzZSAnY2FjaGVGaXJzdCc6XG4gICAgICAgICAgICAgICAgY2FjaGVGaXJzdF8xLmRlZmF1bHQoZSwgY2FjaGVOYW1lLCBjYWNoZUxpc3QsIGdldEtleSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNhY2hlRmlyc3RfMS5kZWZhdWx0KGUsIGNhY2hlTmFtZSwgY2FjaGVMaXN0LCBnZXRLZXkpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZmV0Y2guanMubWFwXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3N3LWhlbHBlci9zcmMvZmV0Y2guanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgY2FjaGVOYW1lID0gX2EuY2FjaGVOYW1lLCBwcmVmZXRjaEZpbGVzID0gX2EucHJlZmV0Y2hGaWxlcztcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIEluc3RhbGxlZCcpO1xuICAgICAgICBlLndhaXRVbnRpbChjYWNoZXMub3BlbihjYWNoZU5hbWUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIENhY2hpbmcgY2FjaGVGaWxlcycpO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChwcmVmZXRjaEZpbGVzKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnNraXBXYWl0aW5nKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnN0YWxsLmpzLm1hcFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdy1oZWxwZXIvc3JjL2luc3RhbGwuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgdXBkYXRlQ2FjaGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciByZXF1ZXN0Q2xvbmUgPSBvcHRpb25zLnJlcXVlc3QuY2xvbmUoKTtcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdENsb25lKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbU2VydmljZVdvcmtlcl0gTm8gcmVzcG9uc2UgZnJvbSBmZXRjaCBcIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VDbG9uZSA9IHJlc3BvbnNlLmNsb25lKCk7XG4gICAgICAgICAgICBjYWNoZXMub3BlbihvcHRpb25zLmNhY2hlTmFtZSkudGhlbihmdW5jdGlvbiAoY2FjaGUpIHtcbiAgICAgICAgICAgICAgICBjYWNoZS5wdXQob3B0aW9ucy5nZXRLZXkob3B0aW9ucy5yZXF1ZXN0KSwgcmVzcG9uc2VDbG9uZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tTZXJ2aWNlV29ya2VyXSBOZXcgRGF0YSBDYWNoZWQnLCBvcHRpb25zLnJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIEVycm9yIEZldGNoaW5nICYgQ2FjaGluZyBOZXcgRGF0YScsIGVycik7XG4gICAgfSk7XG59O1xudmFyIG1hdGNoVXJsID0gZnVuY3Rpb24gKGNhY2hlRmlsZXMsIHVybCkge1xuICAgIHZhciBwYXRoID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIHJldHVybiBjYWNoZUZpbGVzLnNvbWUoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoeCk7XG4gICAgICAgIHJldHVybiByZWcudGVzdChwYXRoKTtcbiAgICB9KTtcbn07XG52YXIgY2FjaGluZ1JlcXVpcmVkID0gZnVuY3Rpb24gKF9hLCBjYWNoZUZpbGVzKSB7XG4gICAgdmFyIG1vZGUgPSBfYS5tb2RlLCB1cmwgPSBfYS51cmw7XG4gICAgcmV0dXJuIChtb2RlID09PSAnbmF2aWdhdGUnICYmIGNhY2hlRmlsZXMuaW5kZXhPZignaW5kZXguaHRtbCcpID4gLTEpIHx8IG1hdGNoVXJsKGNhY2hlRmlsZXMsIHVybCk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGUsIGNhY2hlTmFtZSwgY2FjaGVGaWxlcywgZ2V0S2V5KSB7XG4gICAgaWYgKGNhY2hpbmdSZXF1aXJlZChlLnJlcXVlc3QsIGNhY2hlRmlsZXMpKSB7XG4gICAgICAgIGUucmVzcG9uZFdpdGgoY2FjaGVzLm1hdGNoKGdldEtleShlLnJlcXVlc3QpKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltTZXJ2aWNlV29ya2VyXSBGb3VuZCBpbiBDYWNoZVwiLCBlLnJlcXVlc3QudXJsLCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7IHJldHVybiB1cGRhdGVDYWNoZSh7IHJlcXVlc3Q6IGUucmVxdWVzdCwgY2FjaGVOYW1lOiBjYWNoZU5hbWUsIGNhY2hlRmlsZXM6IGNhY2hlRmlsZXMsIGdldEtleTogZ2V0S2V5IH0pOyB9LCAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzcCA9IHVwZGF0ZUNhY2hlKHsgcmVxdWVzdDogZS5yZXF1ZXN0LCBjYWNoZU5hbWU6IGNhY2hlTmFtZSwgY2FjaGVGaWxlczogY2FjaGVGaWxlcywgZ2V0S2V5OiBnZXRLZXkgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FjaGVGaXJzdC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3ctaGVscGVyL3NyYy9zdHJhdGVnaWVzL2NhY2hlRmlyc3QuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==