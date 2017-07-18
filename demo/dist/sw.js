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

// import sw from '../../index'
// import sw from 'sw-helper'

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
// Bye
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmVmNTA0NWFkZDQxNmEwYjIzNjUiLCJ3ZWJwYWNrOi8vLy4uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VXb3JrZXIvc3cuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9hY3RpdmF0ZS5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2ZldGNoLmpzIiwid2VicGFjazovLy8uLi9zcmMvaW5zdGFsbC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL3N0cmF0ZWdpZXMvY2FjaGVGaXJzdC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImluc3RhbGxfMSIsInJlcXVpcmUiLCJhY3RpdmF0ZV8xIiwiZmV0Y2hfMSIsImlkZW50aXR5IiwiYSIsImRlZmF1bHRPcHRpb25zIiwicHJlZmV0Y2hGaWxlcyIsImNhY2hlRmlsZXMiLCJjYWNoZU5hbWUiLCJzdHJhdGVneSIsImdldEtleSIsImRlZmF1bHQiLCJvcHRpb25zIiwiX2EiLCJfYiIsIl9jIiwiX2QiLCJfZSIsInNlbGYiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJjbGllbnRzIiwiY2xhaW0iLCJ3YWl0VW50aWwiLCJjYWNoZXMiLCJrZXlzIiwidGhlbiIsImNhY2hlTmFtZXMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwidGhpc0NhY2hlTmFtZSIsImRlbGV0ZSIsImNhY2hlRmlyc3RfMSIsInJlcXVlc3QiLCJ1cmwiLCJjYWNoZUxpc3QiLCJBcnJheSIsInByb3RvdHlwZSIsImNvbmNhdCIsIm9wZW4iLCJjYWNoZSIsImFkZEFsbCIsInNraXBXYWl0aW5nIiwidXBkYXRlQ2FjaGUiLCJyZXF1ZXN0Q2xvbmUiLCJjbG9uZSIsImZldGNoIiwicmVzcG9uc2UiLCJyZXNwb25zZUNsb25lIiwicHV0IiwiY2F0Y2giLCJlcnIiLCJtYXRjaFVybCIsInBhdGgiLCJVUkwiLCJwYXRobmFtZSIsInNvbWUiLCJ4IiwicmVnIiwiUmVnRXhwIiwidGVzdCIsImNhY2hpbmdSZXF1aXJlZCIsIm1vZGUiLCJpbmRleE9mIiwicmVzcG9uZFdpdGgiLCJtYXRjaCIsInNldFRpbWVvdXQiLCJyZXNwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDaEVBO0FBQ0E7Ozs7QUFHQUEsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkMsRUFBRUMsT0FBTyxJQUFULEVBQTdDO0FBQ0EsSUFBSUMsWUFBWSxtQkFBQUMsQ0FBUSxDQUFSLENBQWhCO0FBQ0EsSUFBSUMsYUFBYSxtQkFBQUQsQ0FBUSxDQUFSLENBQWpCO0FBQ0EsSUFBSUUsVUFBVSxtQkFBQUYsQ0FBUSxDQUFSLENBQWQ7QUFDQSxJQUFJRyxXQUFXLFVBQVVDLENBQVYsRUFBYTtBQUFFLFdBQU9BLENBQVA7QUFBVyxDQUF6QztBQUNBLElBQUlDLGlCQUFpQjtBQUNqQkMsbUJBQWUsRUFERTtBQUVqQkMsZ0JBQVksRUFGSztBQUdqQkMsZUFBVyxJQUhNO0FBSWpCQyxjQUFVLFlBSk87QUFLakJDLFlBQVFQO0FBTFMsQ0FBckI7QUFPQU4sUUFBUWMsT0FBUixHQUFrQixVQUFVQyxPQUFWLEVBQW1CO0FBQ2pDLFFBQUlDLEtBQUtE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QUFDSCxhQUpELE1BS0s7QUFDRCxvQkFBSW9CLE9BQU94QixZQUFZLEVBQUVWLFNBQVNoQixFQUFFZ0IsT0FBYixFQUFzQjVCLFdBQVdBLFNBQWpDLEVBQTRDRCxZQUFZQSxVQUF4RCxFQUFvRUcsUUFBUUEsTUFBNUUsRUFBWixDQUFYO0FBQ0EsdUJBQU80RCxJQUFQO0FBQ0g7QUFDSixTQVhhLENBQWQ7QUFZSDtBQUNKLENBZkQ7QUFnQkEsc0MiLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZlZjUwNDVhZGQ0MTZhMGIyMzY1IiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENyZWF0ZWQgYnkgaW1hbXVkaW5uYXNlZW0gb24gNi85LzE3LlxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW5zdGFsbF8xID0gcmVxdWlyZShcIi4vc3JjL2luc3RhbGxcIik7XG52YXIgYWN0aXZhdGVfMSA9IHJlcXVpcmUoXCIuL3NyYy9hY3RpdmF0ZVwiKTtcbnZhciBmZXRjaF8xID0gcmVxdWlyZShcIi4vc3JjL2ZldGNoXCIpO1xudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGE7IH07XG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJlZmV0Y2hGaWxlczogW10sXG4gICAgY2FjaGVGaWxlczogW10sXG4gICAgY2FjaGVOYW1lOiAndjEnLFxuICAgIHN0cmF0ZWd5OiAnQ2FjaGVGaXJzdCcsXG4gICAgZ2V0S2V5OiBpZGVudGl0eVxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIF9hID0gb3B0aW9ucy5jYWNoZUZpbGVzLCBjYWNoZUZpbGVzID0gX2EgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLmNhY2hlRmlsZXMgOiBfYSwgX2IgPSBvcHRpb25zLmNhY2hlTmFtZSwgY2FjaGVOYW1lID0gX2IgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLmNhY2hlTmFtZSA6IF9iLCBfYyA9IG9wdGlvbnMuc3RyYXRlZ3ksIHN0cmF0ZWd5ID0gX2MgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLnN0cmF0ZWd5IDogX2MsIF9kID0gb3B0aW9ucy5wcmVmZXRjaEZpbGVzLCBwcmVmZXRjaEZpbGVzID0gX2QgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLnByZWZldGNoRmlsZXMgOiBfZCwgX2UgPSBvcHRpb25zLmdldEtleSwgZ2V0S2V5ID0gX2UgPT09IHZvaWQgMCA/IGRlZmF1bHRPcHRpb25zLmdldEtleSA6IF9lO1xuICAgIGluc3RhbGxfMS5kZWZhdWx0KHsgcHJlZmV0Y2hGaWxlczogcHJlZmV0Y2hGaWxlcywgY2FjaGVOYW1lOiBjYWNoZU5hbWUgfSk7XG4gICAgYWN0aXZhdGVfMS5kZWZhdWx0KHsgY2FjaGVOYW1lOiBjYWNoZU5hbWUgfSk7XG4gICAgZmV0Y2hfMS5kZWZhdWx0KHsgY2FjaGVOYW1lOiBjYWNoZU5hbWUsIHN0cmF0ZWd5OiBzdHJhdGVneSwgY2FjaGVGaWxlczogY2FjaGVGaWxlcywgcHJlZmV0Y2hGaWxlczogcHJlZmV0Y2hGaWxlcywgZ2V0S2V5OiBnZXRLZXkgfSk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL2luZGV4LmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGltYW11ZGlubmFzZWVtIG9uIDYvMTIvMTcuXG4gKi9cblxuLy8gaW1wb3J0IHN3IGZyb20gJy4uLy4uL2luZGV4J1xuLy8gaW1wb3J0IHN3IGZyb20gJ3N3LWhlbHBlcidcbmltcG9ydCBzdyBmcm9tICcuLi8uLi9pbmRleCdcbnZhciBjYWNoZUZpbGVzID0gWydzdHlsZXMuY3NzJ11cbnZhciBwcmVmZXRjaEZpbGVzID0gWydhcHAuanMnLCAncm9ja2V0LmpwZyddXG52YXIgc3RyYXRlZ3kgPSAnY2FjaGVGaXJzdCdcblxuc3coe2NhY2hlTmFtZTogJ3YxJywgY2FjaGVGaWxlcywgc3RyYXRlZ3ksIHByZWZldGNoRmlsZXN9KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NlcnZpY2VXb3JrZXIvc3cuanMiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ3JlYXRlZCBieSBpbWFtdWRpbm5hc2VlbSBvbiA2LzkvMTcuXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBjYWNoZU5hbWUgPSBfYS5jYWNoZU5hbWU7XG4gICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdhY3RpdmF0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbU2VydmljZVdvcmtlcl0gQWN0aXZhdGVkJyk7XG4gICAgICAgIHNlbGYuY2xpZW50cy5jbGFpbSgpO1xuICAgICAgICBlLndhaXRVbnRpbChjYWNoZXMua2V5cygpLnRoZW4oZnVuY3Rpb24gKGNhY2hlTmFtZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChjYWNoZU5hbWVzLm1hcChmdW5jdGlvbiAodGhpc0NhY2hlTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzQ2FjaGVOYW1lICE9PSBjYWNoZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tTZXJ2aWNlV29ya2VyXSBSZW1vdmluZyBDYWNoZWQgRmlsZXMgZnJvbSBDYWNoZSAtICcsIHRoaXNDYWNoZU5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVzLmRlbGV0ZSh0aGlzQ2FjaGVOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hY3RpdmF0ZS5qcy5tYXBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2FjdGl2YXRlLmpzIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGltYW11ZGlubmFzZWVtIG9uIDYvOS8xNy5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNhY2hlRmlyc3RfMSA9IHJlcXVpcmUoXCIuL3N0cmF0ZWdpZXMvY2FjaGVGaXJzdFwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBzdHJhdGVneSA9IF9hLnN0cmF0ZWd5LCBjYWNoZU5hbWUgPSBfYS5jYWNoZU5hbWUsIGNhY2hlRmlsZXMgPSBfYS5jYWNoZUZpbGVzLCBwcmVmZXRjaEZpbGVzID0gX2EucHJlZmV0Y2hGaWxlcywgZ2V0S2V5ID0gX2EuZ2V0S2V5O1xuICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignZmV0Y2gnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIEZldGNoJywgZS5yZXF1ZXN0LnVybCk7XG4gICAgICAgIHZhciBjYWNoZUxpc3QgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0KGNhY2hlRmlsZXMsIHByZWZldGNoRmlsZXMpO1xuICAgICAgICBzd2l0Y2ggKHN0cmF0ZWd5KSB7XG4gICAgICAgICAgICBjYXNlICdjYWNoZUZpcnN0JzpcbiAgICAgICAgICAgICAgICBjYWNoZUZpcnN0XzEuZGVmYXVsdChlLCBjYWNoZU5hbWUsIGNhY2hlTGlzdCwgZ2V0S2V5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY2FjaGVGaXJzdF8xLmRlZmF1bHQoZSwgY2FjaGVOYW1lLCBjYWNoZUxpc3QsIGdldEtleSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mZXRjaC5qcy5tYXBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2ZldGNoLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgY2FjaGVOYW1lID0gX2EuY2FjaGVOYW1lLCBwcmVmZXRjaEZpbGVzID0gX2EucHJlZmV0Y2hGaWxlcztcbiAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIEluc3RhbGxlZCcpO1xuICAgICAgICBlLndhaXRVbnRpbChjYWNoZXMub3BlbihjYWNoZU5hbWUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnW1NlcnZpY2VXb3JrZXJdIENhY2hpbmcgY2FjaGVGaWxlcycpO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlLmFkZEFsbChwcmVmZXRjaEZpbGVzKTtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnNraXBXYWl0aW5nKCk7XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnN0YWxsLmpzLm1hcFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvaW5zdGFsbC5qcyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHVwZGF0ZUNhY2hlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgcmVxdWVzdENsb25lID0gb3B0aW9ucy5yZXF1ZXN0LmNsb25lKCk7XG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3RDbG9uZSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW1NlcnZpY2VXb3JrZXJdIE5vIHJlc3BvbnNlIGZyb20gZmV0Y2ggXCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlQ2xvbmUgPSByZXNwb25zZS5jbG9uZSgpO1xuICAgICAgICAgICAgY2FjaGVzLm9wZW4ob3B0aW9ucy5jYWNoZU5hbWUpLnRoZW4oZnVuY3Rpb24gKGNhY2hlKSB7XG4gICAgICAgICAgICAgICAgY2FjaGUucHV0KG9wdGlvbnMuZ2V0S2V5KG9wdGlvbnMucmVxdWVzdCksIHJlc3BvbnNlQ2xvbmUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbU2VydmljZVdvcmtlcl0gTmV3IERhdGEgQ2FjaGVkJywgb3B0aW9ucy5yZXF1ZXN0LnVybCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1tTZXJ2aWNlV29ya2VyXSBFcnJvciBGZXRjaGluZyAmIENhY2hpbmcgTmV3IERhdGEnLCBlcnIpO1xuICAgIH0pO1xufTtcbnZhciBtYXRjaFVybCA9IGZ1bmN0aW9uIChjYWNoZUZpbGVzLCB1cmwpIHtcbiAgICB2YXIgcGF0aCA9IG5ldyBVUkwodXJsKS5wYXRobmFtZTtcbiAgICByZXR1cm4gY2FjaGVGaWxlcy5zb21lKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKHgpO1xuICAgICAgICByZXR1cm4gcmVnLnRlc3QocGF0aCk7XG4gICAgfSk7XG59O1xudmFyIGNhY2hpbmdSZXF1aXJlZCA9IGZ1bmN0aW9uIChfYSwgY2FjaGVGaWxlcykge1xuICAgIHZhciBtb2RlID0gX2EubW9kZSwgdXJsID0gX2EudXJsO1xuICAgIHJldHVybiAobW9kZSA9PT0gJ25hdmlnYXRlJyAmJiBjYWNoZUZpbGVzLmluZGV4T2YoJ2luZGV4Lmh0bWwnKSA+IC0xKSB8fCBtYXRjaFVybChjYWNoZUZpbGVzLCB1cmwpO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChlLCBjYWNoZU5hbWUsIGNhY2hlRmlsZXMsIGdldEtleSkge1xuICAgIGlmIChjYWNoaW5nUmVxdWlyZWQoZS5yZXF1ZXN0LCBjYWNoZUZpbGVzKSkge1xuICAgICAgICBlLnJlc3BvbmRXaXRoKGNhY2hlcy5tYXRjaChnZXRLZXkoZS5yZXF1ZXN0KSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbU2VydmljZVdvcmtlcl0gRm91bmQgaW4gQ2FjaGVcIiwgZS5yZXF1ZXN0LnVybCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyByZXR1cm4gdXBkYXRlQ2FjaGUoeyByZXF1ZXN0OiBlLnJlcXVlc3QsIGNhY2hlTmFtZTogY2FjaGVOYW1lLCBjYWNoZUZpbGVzOiBjYWNoZUZpbGVzLCBnZXRLZXk6IGdldEtleSB9KTsgfSwgMCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3AgPSB1cGRhdGVDYWNoZSh7IHJlcXVlc3Q6IGUucmVxdWVzdCwgY2FjaGVOYW1lOiBjYWNoZU5hbWUsIGNhY2hlRmlsZXM6IGNhY2hlRmlsZXMsIGdldEtleTogZ2V0S2V5IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfVxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhY2hlRmlyc3QuanMubWFwXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9zdHJhdGVnaWVzL2NhY2hlRmlyc3QuanMiXSwic291cmNlUm9vdCI6IiJ9