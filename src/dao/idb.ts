/**
 * Created by imamudinnaseem on 5/7/18
 */
import {ICacheData} from "../interfaces/ICacheData";

var DB_PREFIX = 'sw-helper-';
var DB_VERSION = 1;
var STORE_NAME = 'store';
var URL_PROPERTY = 'url';
var TIMESTAMP_PROPERTY = 'timestamp';
var cacheNameToDbPromise: any = {};

function openDb(cacheName: string) {
    return new Promise(function (resolve, reject) {
        var request: IDBOpenDBRequest = indexedDB.open(DB_PREFIX + cacheName, DB_VERSION);

        request.onupgradeneeded = function () {
            var objectStore = request.result.createObjectStore(STORE_NAME,
                {keyPath: URL_PROPERTY});
            objectStore.createIndex(TIMESTAMP_PROPERTY, TIMESTAMP_PROPERTY,
                {unique: false});
        };

        request.onsuccess = function () {
            resolve(request.result);
        };

        request.onerror = function () {
            reject(request.error);
        };
    });
}

function getDb(cacheName: string) {
    if (!(cacheName in cacheNameToDbPromise)) {
        cacheNameToDbPromise[cacheName] = openDb(cacheName);
    }

    return cacheNameToDbPromise[cacheName];
}

function setTimestampForUrl(db: IDBDatabase, data: ICacheData) {
    return new Promise(function (resolve, reject) {
        var transaction: IDBTransaction = db.transaction(STORE_NAME, 'readwrite');
        var objectStore: IDBObjectStore = transaction.objectStore(STORE_NAME);
        objectStore.put(data);

        transaction.oncomplete = function () {
            resolve(db);
        };

        transaction.onabort = function () {
            reject(transaction.error);
        };
    });
}

function expireOldEntries(db: IDBDatabase) {
    return new Promise(function (resolve, reject) {
        var urls: string[] = [];
        var transaction = db.transaction(STORE_NAME, 'readwrite');
        var objectStore = transaction.objectStore(STORE_NAME);
        var index = objectStore.index(TIMESTAMP_PROPERTY);
        let now = Date.now();
        index.openCursor().onsuccess = function (cursorEvent: any) {
            let cursor = cursorEvent.target.result;
            if (cursor) {
                if (now > cursor.value[TIMESTAMP_PROPERTY]) {
                    let url: string = cursor.value[URL_PROPERTY];
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


function expireEntries(db: IDBDatabase) {
    return expireOldEntries(db).then(function (oldUrls: any[]) {
        return oldUrls;
    });
}

function getTimestampForUrl(db: IDBDatabase, url: string) {
    return new Promise(function (resolve, reject) {
        var transaction = db.transaction(STORE_NAME, 'readonly');
        var objectStore = transaction.objectStore(STORE_NAME);
        var request: IDBRequest = objectStore.get(url);
        request.onsuccess = function () {
            resolve(request.result);
        };
        request.onerror = function () {
            reject(request.result);
        };
    });
}

export default {
    getDb,
    setTimestampForUrl,
    expireEntries,
    getTimestampForUrl
};
