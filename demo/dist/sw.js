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
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by imamudinnaseem on 6/9/17.
 */

Object.defineProperty(exports, "__esModule", { value: true });
var install_1 = __webpack_require__(7);
var activate_1 = __webpack_require__(5);
var fetch_1 = __webpack_require__(6);
var defaultOptions = {
    prefetchFiles: [],
    cacheFiles: [],
    cacheName: 'v1',
    strategy: 'CacheFirst'
};
exports.default = function (options) {
    var _a = options.cacheFiles,
        cacheFiles = _a === void 0 ? defaultOptions.cacheFiles : _a,
        _b = options.cacheName,
        cacheName = _b === void 0 ? defaultOptions.cacheName : _b,
        _c = options.strategy,
        strategy = _c === void 0 ? defaultOptions.strategy : _c,
        _d = options.prefetchFiles,
        prefetchFiles = _d === void 0 ? defaultOptions.prefetchFiles : _d;
    install_1.default({ prefetchFiles: prefetchFiles, cacheName: cacheName });
    activate_1.default({ cacheName: cacheName });
    fetch_1.default({ cacheName: cacheName, strategy: strategy, cacheFiles: cacheFiles, prefetchFiles: prefetchFiles });
};
//# sourceMappingURL=index.js.map

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cacheFiles = ['styles.css']; /**
                                  * Created by imamudinnaseem on 6/12/17.
                                  */

var prefetchFiles = ['app.js', 'rocket.jpg'];
var strategy = 'cacheFirst';

(0, _index2.default)({ cacheName: 'v1', cacheFiles: cacheFiles, strategy: strategy, prefetchFiles: prefetchFiles });

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
                } else {
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
    var strategy = _a.strategy,
        cacheName = _a.cacheName,
        cacheFiles = _a.cacheFiles,
        prefetchFiles = _a.prefetchFiles;
    self.addEventListener('fetch', function (e) {
        console.log('[ServiceWorker] Fetch', e.request.url);
        var cacheList = Array.prototype.concat(cacheFiles, prefetchFiles);
        switch (strategy) {
            case 'cacheFirst':
                cacheFirst_1.default(e, cacheName, cacheList);
                break;
            default:
                cacheFirst_1.default(e, cacheName, cacheList);
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
/* 8 */
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
                cache.put(options.request, responseClone);
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
exports.default = function (e, cacheName, cacheFiles) {
    if (cachingRequired(e.request, cacheFiles)) {
        e.respondWith(caches.match(e.request).then(function (response) {
            if (response) {
                console.log("[ServiceWorker] Found in Cache", e.request.url, response);
                updateCache({ request: e.request, cacheName: cacheName, cacheFiles: cacheFiles });
                return response;
            } else {
                var resp = updateCache({ request: e.request, cacheName: cacheName, cacheFiles: cacheFiles });
                return resp;
            }
        }));
    }
};
//# sourceMappingURL=cacheFirst.js.map

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGNmYzkzODk3NTJiMWI0ZDhjZTEiLCJ3ZWJwYWNrOi8vLy4uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VXb3JrZXIvc3cuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9hY3RpdmF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2ZldGNoLmpzIiwid2VicGFjazovLy8uLi9zcmMvaW5zdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3N0cmF0ZWdpZXMvY2FjaGVGaXJzdC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImluc3RhbGxfMSIsInJlcXVpcmUiLCJhY3RpdmF0ZV8xIiwiZmV0Y2hfMSIsImRlZmF1bHRPcHRpb25zIiwicHJlZmV0Y2hGaWxlcyIsImNhY2hlRmlsZXMiLCJjYWNoZU5hbWUiLCJzdHJhdGVneSIsImRlZmF1bHQiLCJvcHRpb25zIiwiX2EiLCJfYiIsIl9jIiwiX2QiLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjb25zb2xlIiwibG9nIiwiY2xpZW50cyIsImNsYWltIiwid2FpdFVudGlsIiwiY2FjaGVzIiwia2V5cyIsInRoZW4iLCJjYWNoZU5hbWVzIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsInRoaXNDYWNoZU5hbWUiLCJkZWxldGUiLCJjYWNoZUZpcnN0XzEiLCJyZXF1ZXN0IiwidXJsIiwiY2FjaGVMaXN0IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjb25jYXQiLCJvcGVuIiwiY2FjaGUiLCJhZGRBbGwiLCJza2lwV2FpdGluZyIsInVwZGF0ZUNhY2hlIiwicmVxdWVzdENsb25lIiwiY2xvbmUiLCJmZXRjaCIsInJlc3BvbnNlIiwicmVzcG9uc2VDbG9uZSIsInB1dCIsImNhdGNoIiwiZXJyIiwibWF0Y2hVcmwiLCJwYXRoIiwiVVJMIiwicGF0aG5hbWUiLCJzb21lIiwieCIsInJlZyIsIlJlZ0V4cCIsInRlc3QiLCJjYWNoaW5nUmVxdWlyZWQiLCJtb2RlIiwiaW5kZXhPZiIsInJlc3BvbmRXaXRoIiwibWF0Y2giLCJyZXNwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDaEVBO0FBQ0E7Ozs7QUFHQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkMsRUFBRUMsT0FBTyxJQUFULEVBQTdDO0FBQ0EsSUFBSUMsWUFBWSxtQkFBQUMsQ0FBUSxDQUFSLENBQWhCO0FBQ0EsSUFBSUMsYUFBYSxtQkFBQUQsQ0FBUSxDQUFSLENBQWpCO0FBQ0EsSUFBSUUsVUFBVSxtQkFBQUYsQ0FBUSxDQUFSLENBQWQ7QUFDQSxJQUFJRyxpQkFBaUI7QUFDakJDLG1CQUFlLEVBREU7QUFFakJDLGdCQUFZLEVBRks7QUFHakJDLGVBQVcsSUFITTtBQUlqQkMsY0FBVTtBQUpPLENBQXJCO0FBTUFWLFFBQVFXLE9BQVIsR0FBa0IsVUFBVUMsT0FBVixFQUFtQjtBQUNqQyxRQUFJQyxLQUFLRCxRQUFRSixVQUFqQjtBQUFBLFFBQTZCQSxhQUFhSyxPQUFPLEtBQUssQ0FBWixHQUFnQlAsZUFBZUUsVUFBL0IsR0FBNENLLEVBQXRGO0FBQUEsUUFBMEZDLEtBQUtGLFFBQVFILFNBQXZHO0FBQUEsUUFBa0hB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SUFBbUMsQ0FBQyxDQUE1RCxJQUFrRVgsU0FBUzlDLFVBQVQsRUFBcUI0QixHQUFyQixDQUF6RTtBQUNILENBSEQ7QUFJQXBDLFFBQVFXLE9BQVIsR0FBa0IsVUFBVVEsQ0FBVixFQUFhVixTQUFiLEVBQXdCRCxVQUF4QixFQUFvQztBQUNsRCxRQUFJdUQsZ0JBQWdCNUMsRUFBRWdCLE9BQWxCLEVBQTJCM0IsVUFBM0IsQ0FBSixFQUE0QztBQUN4Q1csVUFBRStDLFdBQUYsQ0FBY3pDLE9BQU8wQyxLQUFQLENBQWFoRCxFQUFFZ0IsT0FBZixFQUNUUixJQURTLENBQ0osVUFBVXNCLFFBQVYsRUFBb0I7QUFDMUIsZ0JBQUlBLFFBQUosRUFBYztBQUNWN0Isd0JBQVFDLEdBQVIsQ0FBWSxnQ0FBWixFQUE4Q0YsRUFBRWdCLE9BQUYsQ0FBVUMsR0FBeEQsRUFBNkRhLFFBQTdEO0FBQ0FKLDRCQUFZLEVBQUVWLFNBQVNoQixFQUFFZ0IsT0FBYixFQUFzQjFCLFdBQVdBLFNBQWpDLEVBQTRDRCxZQUFZQSxVQUF4RCxFQUFaO0FBQ0EsdUJBQU95QyxRQUFQO0FBQ0gsYUFKRCxNQUtLO0FBQ0Qsb0JBQUltQixPQUFPdkIsWUFBWSxFQUFFVixTQUFTaEIsRUFBRWdCLE9BQWIsRUFBc0IxQixXQUFXQSxTQUFqQyxFQUE0Q0QsWUFBWUEsVUFBeEQsRUFBWixDQUFYO0FBQ0EsdUJBQU80RCxJQUFQO0FBQ0g7QUFDSixTQVhhLENBQWQ7QUFZSDtBQUNKLENBZkQ7QUFnQkEsc0MiLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhjZmM5Mzg5NzUyYjFiNGQ4Y2UxIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENyZWF0ZWQgYnkgaW1hbXVkaW5uYXNlZW0gb24gNi85LzE3LlxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW5zdGFsbF8xID0gcmVxdWlyZShcIi4vc3JjL2luc3RhbGxcIik7XG52YXIgYWN0aXZhdGVfMSA9IHJlcXVpcmUoXCIuL3NyYy9hY3RpdmF0ZVwiKTtcbnZhciBmZXRjaF8xID0gcmVxdWlyZShcIi4vc3JjL2ZldGNoXCIpO1xudmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHByZWZldGNoRmlsZXM6IFtdLFxuICAgIGNhY2hlRmlsZXM6IFtdLFxuICAgIGNhY2hlTmFtZTogJ3YxJyxcbiAgICBzdHJhdGVneTogJ0NhY2hlRmlyc3QnXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgX2EgPSBvcHRpb25zLmNhY2hlRmlsZXMsIGNhY2hlRmlsZXMgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdGlvbnMuY2FjaGVGaWxlcyA6IF9hLCBfYiA9IG9wdGlvbnMuY2FjaGVOYW1lLCBjYWNoZU5hbWUgPSBfYiA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdGlvbnMuY2FjaGVOYW1lIDogX2IsIF9jID0gb3B0aW9ucy5zdHJhdGVneSwgc3RyYXRlZ3kgPSBfYyA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdGlvbnMuc3RyYXRlZ3kgOiBfYywgX2QgPSBvcHRpb25zLnByZWZldGNoRmlsZXMsIHByZWZldGNoRmlsZXMgPSBfZCA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdGlvbnMucHJlZmV0Y2hGaWxlcyA6IF9kO1xuICAgIGluc3RhbGxfMS5kZWZhdWx0KHsgcHJlZmV0Y2hGaWxlczogcHJlZmV0Y2hGaWxlcywgY2FjaGVOYW1lOiBjYWNoZU5hbWUgfSk7XG4gICAgYWN0aXZhdGVfMS5kZWZhdWx0KHsgY2FjaGVOYW1lOiBjYWNoZU5hbWUgfSk7XG4gICAgZmV0Y2hfMS5kZWZhdWx0KHsgY2FjaGVOYW1lOiBjYWNoZU5hbWUsIHN0cmF0ZWd5OiBzdHJhdGVneSwgY2FjaGVGaWxlczogY2FjaGVGaWxlcywgcHJlZmV0Y2hGaWxlczogcHJlZmV0Y2hGaWxlcyB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vaW5kZXguanMiLCIvKipcbiAqIENyZWF0ZWQgYnkgaW1hbXVkaW5uYXNlZW0gb24gNi8xMi8xNy5cbiAqL1xuXG5pbXBvcnQgc3cgZnJvbSAnLi4vLi4vaW5kZXgnXG5cbnZhciBjYWNoZUZpbGVzID0gWydzdHlsZXMuY3NzJ11cbnZhciBwcmVmZXRjaEZpbGVzID0gWydhcHAuanMnLCAncm9ja2V0LmpwZyddXG52YXIgc3RyYXRlZ3kgPSAnY2FjaGVGaXJzdCdcblxuc3coe2NhY2hlTmFtZTogJ3YxJywgY2FjaGVGaWxlcywgc3RyYXRlZ3ksIHByZWZldGNoRmlsZXN9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZpY2VXb3JrZXIvc3cuanMiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ3JlYXRlZCBieSBpbWFtdWRpbm5hc2VlbSBvbiA2LzkvMTcuXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBjYWNoZU5hbWUgPSBfYS5jYWNoZU5hbWU7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbU2VydmljZVdvcmtlcl0gQWN0aXZhdGVkJyk7XG4gICAgICAgIHNlbGYuY2xpZW50cy5jbGFpbSgpO1xuICAgICAgICBlLndhaXRVbnRpbChjYWNoZXMua2V5cygpLnRoZW4oZnVuY3Rpb24gKGNhY2hlTmFtZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChjYWNoZU5hbWVzLm1hcChmdW5jdGlvbiAodGhpc0NhY2hlTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzQ2FjaGVOYW1lICE9PSBjYWNoZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tTZXJ2aWNlV29ya2VyXSBSZW1vdmluZyBDYWNoZWQgRmlsZXMgZnJvbSBDYWNoZSAtICcsIHRoaXNDYWNoZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVzLmRlbGV0ZSh0aGlzQ2FjaGVOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hY3RpdmF0ZS5qcy5tYXBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2FjdGl2YXRlLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGltYW11ZGlubmFzZWVtIG9uIDYvOS8xNy5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNhY2hlRmlyc3RfMSA9IHJlcXVpcmUoXCIuL3N0cmF0ZWdpZXMvY2FjaGVGaXJzdFwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzdHJhdGVneSA9IF9hLnN0cmF0ZWd5LCBjYWNoZU5hbWUgPSBfYS5jYWNoZU5hbWUsIGNhY2hlRmlsZXMgPSBfYS5jYWNoZUZpbGVzLCBwcmVmZXRjaEZpbGVzID0gX2EucHJlZmV0Y2hGaWxlcztcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tTZXJ2aWNlV29ya2VyXSBGZXRjaCcsIGUucmVxdWVzdC51cmwpO1xuICAgICAgICB2YXIgY2FjaGVMaXN0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdChjYWNoZUZpbGVzLCBwcmVmZXRjaEZpbGVzKTtcbiAgICAgICAgc3dpdGNoIChzdHJhdGVneSkge1xuICAgICAgICAgICAgY2FzZSAnY2FjaGVGaXJzdCc6XG4gICAgICAgICAgICAgICAgY2FjaGVGaXJzdF8xLmRlZmF1bHQoZSwgY2FjaGVOYW1lLCBjYWNoZUxpc3QpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBjYWNoZUZpcnN0XzEuZGVmYXVsdChlLCBjYWNoZU5hbWUsIGNhY2hlTGlzdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZXRjaC5qcy5tYXBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2ZldGNoLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgY2FjaGVOYW1lID0gX2EuY2FjaGVOYW1lLCBwcmVmZXRjaEZpbGVzID0gX2EucHJlZmV0Y2hGaWxlcztcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIEluc3RhbGxlZCcpO1xuICAgICAgICBlLndhaXRVbnRpbChjYWNoZXMub3BlbihjYWNoZU5hbWUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIENhY2hpbmcgY2FjaGVGaWxlcycpO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChwcmVmZXRjaEZpbGVzKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnNraXBXYWl0aW5nKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnN0YWxsLmpzLm1hcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvaW5zdGFsbC5qcyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHVwZGF0ZUNhY2hlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgcmVxdWVzdENsb25lID0gb3B0aW9ucy5yZXF1ZXN0LmNsb25lKCk7XG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3RDbG9uZSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW1NlcnZpY2VXb3JrZXJdIE5vIHJlc3BvbnNlIGZyb20gZmV0Y2ggXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlQ2xvbmUgPSByZXNwb25zZS5jbG9uZSgpO1xuICAgICAgICAgICAgY2FjaGVzLm9wZW4ob3B0aW9ucy5jYWNoZU5hbWUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgY2FjaGUucHV0KG9wdGlvbnMucmVxdWVzdCwgcmVzcG9uc2VDbG9uZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tTZXJ2aWNlV29ya2VyXSBOZXcgRGF0YSBDYWNoZWQnLCBvcHRpb25zLnJlcXVlc3QudXJsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIEVycm9yIEZldGNoaW5nICYgQ2FjaGluZyBOZXcgRGF0YScsIGVycik7XG4gICAgfSk7XG59O1xudmFyIG1hdGNoVXJsID0gZnVuY3Rpb24gKGNhY2hlRmlsZXMsIHVybCkge1xuICAgIHZhciBwYXRoID0gbmV3IFVSTCh1cmwpLnBhdGhuYW1lO1xuICAgIHJldHVybiBjYWNoZUZpbGVzLnNvbWUoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoeCk7XG4gICAgICAgIHJldHVybiByZWcudGVzdChwYXRoKTtcbiAgICB9KTtcbn07XG52YXIgY2FjaGluZ1JlcXVpcmVkID0gZnVuY3Rpb24gKF9hLCBjYWNoZUZpbGVzKSB7XG4gICAgdmFyIG1vZGUgPSBfYS5tb2RlLCB1cmwgPSBfYS51cmw7XG4gICAgcmV0dXJuIChtb2RlID09PSAnbmF2aWdhdGUnICYmIGNhY2hlRmlsZXMuaW5kZXhPZignaW5kZXguaHRtbCcpID4gLTEpIHx8IG1hdGNoVXJsKGNhY2hlRmlsZXMsIHVybCk7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGUsIGNhY2hlTmFtZSwgY2FjaGVGaWxlcykge1xuICAgIGlmIChjYWNoaW5nUmVxdWlyZWQoZS5yZXF1ZXN0LCBjYWNoZUZpbGVzKSkge1xuICAgICAgICBlLnJlc3BvbmRXaXRoKGNhY2hlcy5tYXRjaChlLnJlcXVlc3QpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW1NlcnZpY2VXb3JrZXJdIEZvdW5kIGluIENhY2hlXCIsIGUucmVxdWVzdC51cmwsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB1cGRhdGVDYWNoZSh7IHJlcXVlc3Q6IGUucmVxdWVzdCwgY2FjaGVOYW1lOiBjYWNoZU5hbWUsIGNhY2hlRmlsZXM6IGNhY2hlRmlsZXMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3AgPSB1cGRhdGVDYWNoZSh7IHJlcXVlc3Q6IGUucmVxdWVzdCwgY2FjaGVOYW1lOiBjYWNoZU5hbWUsIGNhY2hlRmlsZXM6IGNhY2hlRmlsZXMgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FjaGVGaXJzdC5qcy5tYXBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL3N0cmF0ZWdpZXMvY2FjaGVGaXJzdC5qcyJdLCJzb3VyY2VSb290IjoiIn0=