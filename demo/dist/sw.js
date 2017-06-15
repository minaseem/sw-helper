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
eval("\n/**\n * Created by imamudinnaseem on 6/9/17.\n */\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar install_1 = __webpack_require__(7);\nvar activate_1 = __webpack_require__(5);\nvar fetch_1 = __webpack_require__(6);\nvar defaultOptions = {\n    cacheFiles: [],\n    cacheName: 'v1',\n    strategy: 'CacheFirst'\n};\nexports.default = function (options) {\n    var _a = options.cacheFiles,\n        cacheFiles = _a === void 0 ? defaultOptions.cacheFiles : _a,\n        _b = options.cacheName,\n        cacheName = _b === void 0 ? defaultOptions.cacheName : _b,\n        _c = options.strategy,\n        strategy = _c === void 0 ? defaultOptions.strategy : _c;\n    install_1.default({ cacheFiles: cacheFiles, cacheName: cacheName });\n    activate_1.default({ cacheName: cacheName });\n    fetch_1.default({ cacheName: cacheName, strategy: strategy });\n};\n//# sourceMappingURL=index.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ../index.js\n// module id = 0\n// module chunks = 0\n\n//# sourceURL=webpack:///../index.js?");

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _index = __webpack_require__(0);\n\nvar _index2 = _interopRequireDefault(_index);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar cacheFiles = ['style.css', 'app.js']; /**\n                                           * Created by imamudinnaseem on 6/12/17.\n                                           */\n\nvar strategy = 'cacheFirst';\n\n(0, _index2.default)({ cacheName: 'v1', cacheFiles: cacheFiles, strategy: strategy });\n\n//////////////////\n// WEBPACK FOOTER\n// ./serviceWorker/sw.js\n// module id = 4\n// module chunks = 0\n\n//# sourceURL=webpack:///./serviceWorker/sw.js?");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Created by imamudinnaseem on 6/9/17.\n */\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = function (_a) {\n    var cacheName = _a.cacheName;\n    self.addEventListener('activate', function (e) {\n        console.log('[ServiceWorker] Activated');\n        //delete caches with cachName other than current cacheName\n        e.waitUntil(caches.keys().then(function (cacheNames) {\n            return Promise.all(cacheNames.map(function (thisCacheName) {\n                if (thisCacheName !== cacheName) {\n                    console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);\n                    return caches.delete(thisCacheName);\n                } else {\n                    return false;\n                }\n            }));\n        }));\n    });\n};\n//# sourceMappingURL=activate.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ../src/activate.js\n// module id = 5\n// module chunks = 0\n\n//# sourceURL=webpack:///../src/activate.js?");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Created by imamudinnaseem on 6/9/17.\n */\n\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cacheName = 'v1';\nvar updateCache = function (request) {\n    var requestClone = request.clone();\n    return fetch(requestClone).then(function (response) {\n        if (!response) {\n            console.log(\"[ServiceWorker] No response from fetch \");\n        } else {\n            var responseClone = response.clone();\n            caches.open(cacheName).then(function (cache) {\n                cache.put(request.url, responseClone);\n                console.log('[ServiceWorker] New Data Cached', request.url);\n            });\n        }\n        return response;\n    }).catch(function (err) {\n        console.log('[ServiceWorker] Error Fetching & Caching New Data', err);\n    });\n};\nexports.default = function (_a) {\n    var strategy = _a.strategy,\n        cacheName = _a.cacheName;\n    self.addEventListener('fetch', function (e) {\n        if (e.request.mode === 'navigate') {\n            console.log('[ServiceWorker] Fetch', e.request.url);\n            e.respondWith(caches.match(e.request.url).then(function (response) {\n                if (response) {\n                    console.log(\"[ServiceWorker] Found in Cache\", e.request.url, response);\n                    updateCache(e.request, cacheName);\n                    return response;\n                } else {\n                    var resp = updateCache(e.request, cacheName);\n                    return resp;\n                }\n            }));\n        }\n    });\n};\n//# sourceMappingURL=fetch.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ../src/fetch.js\n// module id = 6\n// module chunks = 0\n\n//# sourceURL=webpack:///../src/fetch.js?");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = function (_a) {\n    var cacheName = _a.cacheName,\n        cacheFiles = _a.cacheFiles;\n    self.addEventListener('install', function (e) {\n        console.log('[ServiceWorker] Installed');\n        e.waitUntil(caches.open(cacheName).then(function (cache) {\n            console.log('[ServiceWorker] Caching cacheFiles');\n            return cache.addAll(cacheFiles);\n        }).then(function () {\n            return self.skipWaiting();\n        }));\n    });\n};\n//# sourceMappingURL=install.js.map\n\n//////////////////\n// WEBPACK FOOTER\n// ../src/install.js\n// module id = 7\n// module chunks = 0\n\n//# sourceURL=webpack:///../src/install.js?");

/***/ })
/******/ ]);