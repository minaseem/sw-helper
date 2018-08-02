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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./serviceWorker/sw.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Created by imamudinnaseem on 6/9/17.\n */\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst install_1 = __webpack_require__(/*! ./src/install */ \"../src/install.js\");\nconst activate_1 = __webpack_require__(/*! ./src/activate */ \"../src/activate.js\");\nconst fetch_1 = __webpack_require__(/*! ./src/fetch */ \"../src/fetch.js\");\nconst config_1 = __webpack_require__(/*! ./src/extras/config */ \"../src/extras/config.js\");\nconst identity = a => a;\nvar defaultOptions = {\n    prefetchFiles: [],\n    cacheFiles: [],\n    cacheName: 'SW-V1',\n    strategy: 'CacheFirst',\n    getKey: identity,\n    disableLogging: false\n};\nexports.default = options => {\n    var { cacheFiles = defaultOptions.cacheFiles, cacheName = defaultOptions.cacheName, strategy = defaultOptions.strategy, prefetchFiles = defaultOptions.prefetchFiles, disableLogging = defaultOptions.disableLogging, getKey = defaultOptions.getKey } = options;\n    config_1.default.disableLogging = disableLogging;\n    install_1.default({ prefetchFiles, cacheName });\n    activate_1.default({ cacheName });\n    fetch_1.default({ cacheName, strategy, cacheFiles, prefetchFiles, getKey });\n};\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack:///../index.js?");

/***/ }),

/***/ "../src/activate.js":
/*!**************************!*\
  !*** ../src/activate.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Created by imamudinnaseem on 6/9/17.\n */\nconst log_1 = __webpack_require__(/*! ./extras/log */ \"../src/extras/log.js\");\nexports.default = ({ cacheName }) => {\n    self.addEventListener('activate', function (e) {\n        log_1.default('[SW] Activated');\n        self.clients.claim();\n        e.waitUntil(caches.keys().then(function (cacheNames) {\n            return Promise.all(cacheNames.map(function (thisCacheName) {\n                if (thisCacheName !== cacheName) {\n                    log_1.default('[SW] Removing Cached Files from Cache - ', thisCacheName);\n                    return caches.delete(thisCacheName);\n                } else {\n                    return false;\n                }\n            }));\n        }));\n    });\n};\n//# sourceMappingURL=activate.js.map\n\n//# sourceURL=webpack:///../src/activate.js?");

/***/ }),

/***/ "../src/dao/idb.js":
/*!*************************!*\
  !*** ../src/dao/idb.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar DB_PREFIX = 'sw-helper-';\nvar DB_VERSION = 1;\nvar STORE_NAME = 'store';\nvar URL_PROPERTY = 'url';\nvar TIMESTAMP_PROPERTY = 'timestamp';\nvar cacheNameToDbPromise = {};\nfunction openDb(cacheName) {\n    return new Promise(function (resolve, reject) {\n        var request = indexedDB.open(DB_PREFIX + cacheName, DB_VERSION);\n        request.onupgradeneeded = function () {\n            var objectStore = request.result.createObjectStore(STORE_NAME, { keyPath: URL_PROPERTY });\n            objectStore.createIndex(TIMESTAMP_PROPERTY, TIMESTAMP_PROPERTY, { unique: false });\n        };\n        request.onsuccess = function () {\n            resolve(request.result);\n        };\n        request.onerror = function () {\n            reject(request.error);\n        };\n    });\n}\nfunction getDb(cacheName) {\n    if (!(cacheName in cacheNameToDbPromise)) {\n        cacheNameToDbPromise[cacheName] = openDb(cacheName);\n    }\n    return cacheNameToDbPromise[cacheName];\n}\nfunction setTimestampForUrl(db, data) {\n    return new Promise(function (resolve, reject) {\n        var transaction = db.transaction(STORE_NAME, 'readwrite');\n        var objectStore = transaction.objectStore(STORE_NAME);\n        objectStore.put(data);\n        transaction.oncomplete = function () {\n            resolve(db);\n        };\n        transaction.onabort = function () {\n            reject(transaction.error);\n        };\n    });\n}\nfunction expireOldEntries(db) {\n    return new Promise(function (resolve, reject) {\n        var urls = [];\n        var transaction = db.transaction(STORE_NAME, 'readwrite');\n        var objectStore = transaction.objectStore(STORE_NAME);\n        var index = objectStore.index(TIMESTAMP_PROPERTY);\n        let now = Date.now();\n        index.openCursor().onsuccess = function (cursorEvent) {\n            let cursor = cursorEvent.target.result;\n            if (cursor) {\n                if (now > cursor.value[TIMESTAMP_PROPERTY]) {\n                    let url = cursor.value[URL_PROPERTY];\n                    urls.push(url);\n                    objectStore.delete(url);\n                    cursor.continue();\n                }\n            }\n        };\n        transaction.oncomplete = function () {\n            resolve(urls);\n        };\n        transaction.onabort = reject;\n    });\n}\nfunction expireEntries(db) {\n    return expireOldEntries(db).then(function (oldUrls) {\n        return oldUrls;\n    });\n}\nfunction getTimestampForUrl(db, url) {\n    return new Promise(function (resolve, reject) {\n        var transaction = db.transaction(STORE_NAME, 'readonly');\n        var objectStore = transaction.objectStore(STORE_NAME);\n        var request = objectStore.get(url);\n        request.onsuccess = function () {\n            resolve(request.result);\n        };\n        request.onerror = function () {\n            reject(request.result);\n        };\n    });\n}\nexports.default = {\n    getDb,\n    setTimestampForUrl,\n    expireEntries,\n    getTimestampForUrl\n};\n//# sourceMappingURL=idb.js.map\n\n//# sourceURL=webpack:///../src/dao/idb.js?");

/***/ }),

/***/ "../src/extras/config.js":
/*!*******************************!*\
  !*** ../src/extras/config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Created by imamudinnaseem on 8/2/18\n */\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config = {\n  disableLogging: false\n};\nexports.default = config;\n//# sourceMappingURL=config.js.map\n\n//# sourceURL=webpack:///../src/extras/config.js?");

/***/ }),

/***/ "../src/extras/log.js":
/*!****************************!*\
  !*** ../src/extras/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Created by imamudinnaseem on 8/2/18\n */\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ./config */ \"../src/extras/config.js\");\nfunction default_1(...args) {\n    if (!config_1.default.disableLogging) {\n        console.log.apply(null, args);\n    }\n}\nexports.default = default_1;\n//# sourceMappingURL=log.js.map\n\n//# sourceURL=webpack:///../src/extras/log.js?");

/***/ }),

/***/ "../src/fetch.js":
/*!***********************!*\
  !*** ../src/fetch.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Created by imamudinnaseem on 6/9/17.\n */\nconst log_1 = __webpack_require__(/*! ./extras/log */ \"../src/extras/log.js\");\n'use strict';\nconst cacheFirst_1 = __webpack_require__(/*! ./strategies/cacheFirst */ \"../src/strategies/cacheFirst.js\");\nconst cacheFirstUpdate_1 = __webpack_require__(/*! ./strategies/cacheFirstUpdate */ \"../src/strategies/cacheFirstUpdate.js\");\nconst getConfig = ({ mode, url }, cacheFiles) => {\n    var path = new URL(url).pathname;\n    var config = cacheFiles.find(x => {\n        if (x.url === 'index.html' && mode === 'navigate') {\n            return true;\n        } else {\n            if (x.url instanceof RegExp) {\n                return x.url.test(path);\n            } else {\n                return path.indexOf(x.url) > -1;\n            }\n        }\n    });\n    return config;\n};\nexports.default = ({ strategy, cacheName, cacheFiles, prefetchFiles, getKey }) => {\n    self.addEventListener('fetch', function (e) {\n        log_1.default('[SW] Fetch', e.request.url);\n        const config = getConfig(e.request, cacheFiles);\n        if (config) {\n            const cacheList = Array.prototype.concat(cacheFiles, prefetchFiles);\n            let cachingStrategy = config.strategy || strategy;\n            switch (cachingStrategy) {\n                case 'cacheFirst':\n                    cacheFirst_1.default(e, cacheName, cacheList, getKey, config);\n                    break;\n                case 'cacheFirstUpdate':\n                    cacheFirstUpdate_1.default(e, cacheName, cacheList, getKey, config);\n                    break;\n                default:\n                    cacheFirst_1.default(e, cacheName, cacheList, getKey, config);\n            }\n        }\n    });\n};\n//# sourceMappingURL=fetch.js.map\n\n//# sourceURL=webpack:///../src/fetch.js?");

/***/ }),

/***/ "../src/install.js":
/*!*************************!*\
  !*** ../src/install.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst log_1 = __webpack_require__(/*! ./extras/log */ \"../src/extras/log.js\");\nexports.default = ({ cacheName, prefetchFiles }) => {\n    self.addEventListener('install', function (e) {\n        log_1.default('[SW] Installed');\n        e.waitUntil(caches.open(cacheName).then(function (cache) {\n            log_1.default('[SW] Caching cacheFiles');\n            return cache.addAll(prefetchFiles);\n        }).then(function () {\n            return self.skipWaiting();\n        }));\n    });\n};\n//# sourceMappingURL=install.js.map\n\n//# sourceURL=webpack:///../src/install.js?");

/***/ }),

/***/ "../src/strategies/cacheFirst.js":
/*!***************************************!*\
  !*** ../src/strategies/cacheFirst.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst idb_1 = __webpack_require__(/*! ../dao/idb */ \"../src/dao/idb.js\");\nconst log_1 = __webpack_require__(/*! ../extras/log */ \"../src/extras/log.js\");\nvar updateCache = function (options) {\n    var requestClone = options.request.clone();\n    return fetch(requestClone).then(function (response) {\n        if (response && response.status === 200) {\n            var responseClone = response.clone();\n            caches.open(options.cacheName).then(function (cache) {\n                cache.put(options.getKey(options.request), responseClone);\n                log_1.default('[SW] New Data Cached', options.request.url);\n                if (options.config.maxAgeSeconds !== undefined) {\n                    idb_1.default.getDb(options.cacheName).then(db => idb_1.default.setTimestampForUrl(db, {\n                        url: JSON.stringify(options.getKey(options.request)),\n                        timestamp: Date.now() + options.config.maxAgeSeconds * 1000\n                    })).then(db => {\n                        let urls = idb_1.default.expireEntries(db);\n                        urls.then(urlsToDelete => {\n                            var deletionPromises = urlsToDelete.map(function (urlToDelete) {\n                                return cache.delete(urlToDelete);\n                            });\n                            return Promise.all(deletionPromises).then(function () {\n                                log_1.default('Done with cache cleanup.');\n                            });\n                        });\n                    });\n                }\n            });\n        }\n        return response;\n    }).catch(function (err) {\n        log_1.default('[SW] Error Fetching & Caching New Data', err);\n    });\n};\nexports.default = (e, cacheName, cacheFiles, getKey, config) => {\n    e.respondWith(caches.match(getKey(e.request)).then(function (response) {\n        if (response) {\n            log_1.default(\"[SW] Found in Cache\", e.request.url, response);\n            if (config.maxAgeSeconds) {\n                return idb_1.default.getDb(cacheName).then(db => idb_1.default.getTimestampForUrl(db, JSON.stringify(getKey(e.request))).then(result => {\n                    if (result && result.timestamp > Date.now()) {\n                        return response;\n                    } else {\n                        log_1.default(\"[SW] Cache expired for \", e.request.url);\n                        return updateCache({ request: e.request, cacheName, getKey, config });\n                    }\n                }));\n            } else {\n                return response;\n            }\n        } else {\n            return updateCache({ request: e.request, cacheName, getKey, config });\n        }\n    }));\n};\n//# sourceMappingURL=cacheFirst.js.map\n\n//# sourceURL=webpack:///../src/strategies/cacheFirst.js?");

/***/ }),

/***/ "../src/strategies/cacheFirstUpdate.js":
/*!*********************************************!*\
  !*** ../src/strategies/cacheFirstUpdate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Created by imamudinnaseem on 5/8/18\n */\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst idb_1 = __webpack_require__(/*! ../dao/idb */ \"../src/dao/idb.js\");\nconst log_1 = __webpack_require__(/*! ../extras/log */ \"../src/extras/log.js\");\nvar updateCache = function (options) {\n    var requestClone = options.request.clone();\n    return fetch(requestClone).then(function (response) {\n        if (response && response.status === 200) {\n            var responseClone = response.clone();\n            caches.open(options.cacheName).then(function (cache) {\n                cache.put(options.getKey(options.request), responseClone);\n                log_1.default('[SW] New Data Cached', options.request.url);\n                if (options.config.maxAgeSeconds !== undefined) {\n                    idb_1.default.getDb(options.cacheName).then(db => idb_1.default.setTimestampForUrl(db, {\n                        url: JSON.stringify(options.getKey(options.request)),\n                        timestamp: Date.now() + options.config.maxAgeSeconds * 1000\n                    })).then(db => {\n                        let urls = idb_1.default.expireEntries(db);\n                        urls.then(urlsToDelete => {\n                            var deletionPromises = urlsToDelete.map(function (urlToDelete) {\n                                return cache.delete(urlToDelete);\n                            });\n                            return Promise.all(deletionPromises).then(function () {\n                                log_1.default('Done with cache cleanup.');\n                            });\n                        });\n                    });\n                }\n            });\n        }\n        return response;\n    }).catch(function (err) {\n        log_1.default('[SW] Error Fetching & Caching New Data', err);\n    });\n};\nexports.default = (e, cacheName, cacheFiles, getKey, config) => {\n    e.respondWith(caches.match(getKey(e.request)).then(function (response) {\n        if (response) {\n            log_1.default(\"[SW] Found in Cache\", e.request.url, response);\n            if (config.maxAgeSeconds) {\n                return idb_1.default.getDb(cacheName).then(db => idb_1.default.getTimestampForUrl(db, JSON.stringify(getKey(e.request))).then(result => {\n                    if (result && result.timestamp > Date.now()) {\n                        setTimeout(() => updateCache({ request: e.request, cacheName, getKey, config }), 0);\n                        return response;\n                    } else {\n                        log_1.default(\"[SW] Cache expired for \", e.request.url);\n                        return updateCache({ request: e.request, cacheName, getKey, config });\n                    }\n                }));\n            } else {\n                setTimeout(() => updateCache({ request: e.request, cacheName, getKey, config }), 0);\n                return response;\n            }\n        } else {\n            return updateCache({ request: e.request, cacheName, getKey, config });\n        }\n    }));\n};\n//# sourceMappingURL=cacheFirstUpdate.js.map\n\n//# sourceURL=webpack:///../src/strategies/cacheFirstUpdate.js?");

/***/ }),

/***/ "./serviceWorker/sw.js":
/*!*****************************!*\
  !*** ./serviceWorker/sw.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _index = __webpack_require__(/*! ../../index */ \"../index.js\");\n\nvar _index2 = _interopRequireDefault(_index);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n// var cacheFiles = ['styles.css', \"index.html\"]\nvar prefetchFiles = ['app.js', 'rocket.jpg']; /**\n                                               * Created by imamudinnaseem on 6/12/17.\n                                               */\n\n// import sw from 'sw-helper'\n\nvar strategy = 'cacheFirst';\nvar cacheFiles = [{\n    url: \"index.html\",\n    maxAgeSeconds: 1000000,\n    strategy: 'cacheFirstUpdate'\n}, {\n    url: new RegExp(\".*\\\\.css\"),\n    strategy: 'cacheFirstUpdate'\n}, {\n    url: new RegExp(\"^((?!\\/sw\\\\.js).)*((\\\\.)(js)){1}.*$\"),\n    maxAgeSeconds: 5\n}];\n\n(0, _index2.default)({ cacheName: 'NOTES', cacheFiles: cacheFiles, strategy: strategy, prefetchFiles: prefetchFiles, disableLogging: true });\n\n//# sourceURL=webpack:///./serviceWorker/sw.js?");

/***/ })

/******/ });