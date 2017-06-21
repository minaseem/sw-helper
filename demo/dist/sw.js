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
/******/ ({

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by imamudinnaseem on 6/9/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var install_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./src/install\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var activate_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./src/activate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
var fetch_1 = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./src/fetch\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
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
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _swHelper = __webpack_require__(13);

var _swHelper2 = _interopRequireDefault(_swHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cacheFiles = ['styles.css']; /**
                                  * Created by imamudinnaseem on 6/12/17.
                                  */

// import sw from '../../index'

var prefetchFiles = ['app.js', 'rocket.jpg'];
var strategy = 'cacheFirst';

(0, _swHelper2.default)({ cacheName: 'v1', cacheFiles: cacheFiles, strategy: strategy, prefetchFiles: prefetchFiles });

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDEzZjFkZTZmM2YzNzViN2VkZWEiLCJ3ZWJwYWNrOi8vLy4vfi9zdy1oZWxwZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZVdvcmtlci9zdy5qcyJdLCJuYW1lcyI6WyJjYWNoZUZpbGVzIiwicHJlZmV0Y2hGaWxlcyIsInN0cmF0ZWd5IiwiY2FjaGVOYW1lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscURBQXFEO0FBQzVFLHdCQUF3Qix1QkFBdUI7QUFDL0MscUJBQXFCLGlHQUFpRztBQUN0SDtBQUNBLGlDOzs7Ozs7Ozs7O0FDZkE7Ozs7OztBQUVBLElBQUlBLGFBQWEsQ0FBQyxZQUFELENBQWpCLEMsQ0FQQTs7OztBQUlBOztBQUlBLElBQUlDLGdCQUFnQixDQUFDLFFBQUQsRUFBVyxZQUFYLENBQXBCO0FBQ0EsSUFBSUMsV0FBVyxZQUFmOztBQUVBLHdCQUFHLEVBQUNDLFdBQVcsSUFBWixFQUFrQkgsc0JBQWxCLEVBQThCRSxrQkFBOUIsRUFBd0NELDRCQUF4QyxFQUFILEUiLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGQxM2YxZGU2ZjNmMzc1YjdlZGVhIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENyZWF0ZWQgYnkgaW1hbXVkaW5uYXNlZW0gb24gNi85LzE3LlxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgaW5zdGFsbF8xID0gcmVxdWlyZShcIi4vc3JjL2luc3RhbGxcIik7XG52YXIgYWN0aXZhdGVfMSA9IHJlcXVpcmUoXCIuL3NyYy9hY3RpdmF0ZVwiKTtcbnZhciBmZXRjaF8xID0gcmVxdWlyZShcIi4vc3JjL2ZldGNoXCIpO1xudmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIHByZWZldGNoRmlsZXM6IFtdLFxuICAgIGNhY2hlRmlsZXM6IFtdLFxuICAgIGNhY2hlTmFtZTogJ3YxJyxcbiAgICBzdHJhdGVneTogJ0NhY2hlRmlyc3QnXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgX2EgPSBvcHRpb25zLmNhY2hlRmlsZXMsIGNhY2hlRmlsZXMgPSBfYSA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdGlvbnMuY2FjaGVGaWxlcyA6IF9hLCBfYiA9IG9wdGlvbnMuY2FjaGVOYW1lLCBjYWNoZU5hbWUgPSBfYiA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdGlvbnMuY2FjaGVOYW1lIDogX2IsIF9jID0gb3B0aW9ucy5zdHJhdGVneSwgc3RyYXRlZ3kgPSBfYyA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdGlvbnMuc3RyYXRlZ3kgOiBfYywgX2QgPSBvcHRpb25zLnByZWZldGNoRmlsZXMsIHByZWZldGNoRmlsZXMgPSBfZCA9PT0gdm9pZCAwID8gZGVmYXVsdE9wdGlvbnMucHJlZmV0Y2hGaWxlcyA6IF9kO1xuICAgIGluc3RhbGxfMS5kZWZhdWx0KHsgcHJlZmV0Y2hGaWxlczogcHJlZmV0Y2hGaWxlcywgY2FjaGVOYW1lOiBjYWNoZU5hbWUgfSk7XG4gICAgYWN0aXZhdGVfMS5kZWZhdWx0KHsgY2FjaGVOYW1lOiBjYWNoZU5hbWUgfSk7XG4gICAgZmV0Y2hfMS5kZWZhdWx0KHsgY2FjaGVOYW1lOiBjYWNoZU5hbWUsIHN0cmF0ZWd5OiBzdHJhdGVneSwgY2FjaGVGaWxlczogY2FjaGVGaWxlcywgcHJlZmV0Y2hGaWxlczogcHJlZmV0Y2hGaWxlcyB9KTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXBcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vc3ctaGVscGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENyZWF0ZWQgYnkgaW1hbXVkaW5uYXNlZW0gb24gNi8xMi8xNy5cbiAqL1xuXG4vLyBpbXBvcnQgc3cgZnJvbSAnLi4vLi4vaW5kZXgnXG5pbXBvcnQgc3cgZnJvbSAnc3ctaGVscGVyJ1xuXG52YXIgY2FjaGVGaWxlcyA9IFsnc3R5bGVzLmNzcyddXG52YXIgcHJlZmV0Y2hGaWxlcyA9IFsnYXBwLmpzJywgJ3JvY2tldC5qcGcnXVxudmFyIHN0cmF0ZWd5ID0gJ2NhY2hlRmlyc3QnXG5cbnN3KHtjYWNoZU5hbWU6ICd2MScsIGNhY2hlRmlsZXMsIHN0cmF0ZWd5LCBwcmVmZXRjaEZpbGVzfSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJ2aWNlV29ya2VyL3N3LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==