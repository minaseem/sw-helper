"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DB_PREFIX = 'sw-helper-';
var DB_VERSION = 1;
var STORE_NAME = 'store';
var URL_PROPERTY = 'url';
var TIMESTAMP_PROPERTY = 'timestamp';
var cacheNameToDbPromise = {};
function openDb(cacheName) {
    return new Promise(function (resolve, reject) {
        var request = indexedDB.open(DB_PREFIX + cacheName, DB_VERSION);
        request.onupgradeneeded = function () {
            var objectStore = request.result.createObjectStore(STORE_NAME, { keyPath: URL_PROPERTY });
            objectStore.createIndex(TIMESTAMP_PROPERTY, TIMESTAMP_PROPERTY, { unique: false });
        };
        request.onsuccess = function () {
            resolve(request.result);
        };
        request.onerror = function () {
            reject(request.error);
        };
    });
}
function getDb(cacheName) {
    if (!(cacheName in cacheNameToDbPromise)) {
        cacheNameToDbPromise[cacheName] = openDb(cacheName);
    }
    return cacheNameToDbPromise[cacheName];
}
function setTimestampForUrl(db, data) {
    return new Promise(function (resolve, reject) {
        var transaction = db.transaction(STORE_NAME, 'readwrite');
        var objectStore = transaction.objectStore(STORE_NAME);
        objectStore.put(data);
        transaction.oncomplete = function () {
            resolve(db);
        };
        transaction.onabort = function () {
            reject(transaction.error);
        };
    });
}
function expireOldEntries(db) {
    return new Promise(function (resolve, reject) {
        var urls = [];
        var transaction = db.transaction(STORE_NAME, 'readwrite');
        var objectStore = transaction.objectStore(STORE_NAME);
        var index = objectStore.index(TIMESTAMP_PROPERTY);
        let now = Date.now();
        index.openCursor().onsuccess = function (cursorEvent) {
            let cursor = cursorEvent.target.result;
            if (cursor) {
                if (now > cursor.value[TIMESTAMP_PROPERTY]) {
                    let url = cursor.value[URL_PROPERTY];
                    urls.push(url);
                    objectStore.delete(url);
                    cursor.continue();
                }
            }
        };
        transaction.oncomplete = function () {
            resolve(urls);
        };
        transaction.onabort = reject;
    });
}
function expireEntries(db) {
    return expireOldEntries(db).then(function (oldUrls) {
        return oldUrls;
    });
}
function getTimestampForUrl(db, url) {
    return new Promise(function (resolve, reject) {
        var transaction = db.transaction(STORE_NAME, 'readonly');
        var objectStore = transaction.objectStore(STORE_NAME);
        var request = objectStore.get(url);
        request.onsuccess = function () {
            resolve(request.result);
        };
        request.onerror = function () {
            reject(request.result);
        };
    });
}
exports.default = {
    getDb,
    setTimestampForUrl,
    expireEntries,
    getTimestampForUrl
};
//# sourceMappingURL=idb.js.map