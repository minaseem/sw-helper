# sw-helper

[![NPM](http://img.shields.io/npm/v/preact-router.svg)](https://www.npmjs.com/package/preact-router)

This library provides an easy approach towards working with service worker, highly inspired from [sw-toolbox](http://npmjs.com/package/sw-toolbox)


# Install
```
npm install sw-helper --save
```

# Usage
```js
import sw from 'sw-helper'

const prefetchFiles = [
    'css/modal.css'
]
var cacheFiles = [
    {
        url: ".css"
    },
    {
        url: ".js"
    }];
const strategy = 'cacheFirst'

sw({cacheName: 'v1', cacheFiles, prefetchFiles, strategy});

```

And you are done!

# Options

**cacheName**

This the name of the cache. Change the name when you want to flush all the resources cached by browser.

**prefetchFiles** : string[]

These are the files that should be cached as soon as page loads (Actually whenever service worker is installed).

```js
const prefetchFiles = [ 'css/modal.css' ]

```


**cacheFiles** : Object[]

These are the files that should be cached whenever its first request is made.

`cacheFiles` accepts regex too.

To cache all the `js` files, use

```js
const cacheFiles = [{ url: new RegExp(".*\\.js") }]

```
*Options:*

1. **maxAgeSeconds:** If resource is requested `maxAgeSeconds` after it was cached, it will be served directly from network.
    <br>*Default value:* Infinity

    ```js
    const cacheFiles = [{
    url: new RegExp(".*\\.js"),
    maxAgeSeconds: 86400    // 24 hours
    }]

    ```

2. **strategy:** Caching strategy for the resource

```js
    const cacheFiles = [{
    url: new RegExp(".*\\.js"),
    strategy: 'cacheFirstUpdate'
    }]
```
*Default value:* The one globally defined<br>

**getKey** : Function : Request => any

It is the function to specify key of the cache. If not specified,  key is Request


```js
const getKey = request => request.url
```


To cache index.html i.e navigation request/document page, specify `index.html` in `cacheFiles`.

 To cache all js files and index.html, use
```js
const cacheFiles = [ new RegExp(".*\\.js") , 'index.html']
```

**strategy** 

Currently following caching strategies are supported

- `cacheFirst`: Every time a resource is requested, it is served from cache if available, otherwise from network.
- `cacheFirstUpdate`: Every time a resource is requested, it is served from the cache and then cache is updated in the background so that user gets the latest data next time.

PS - we will increase the list going forward.

