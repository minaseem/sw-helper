This library provides an easy approach towards working with service worker.
<br/>
Contains Vanilla JS. Does not depend on any library.

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
const cacheFiles = [
    'styles.css',
    'app.js',
    ...
]
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


**cacheFiles** : string[]

These are the files that should be cached whenever its first request is made.

`cacheFiles` accepts regex too.

To cache all the `js` files, use

```js
const cacheFiles = [ '.js' ]

```

**getKey** : Function : Request => any

It is the function to specify key of the cache. If not specified,  key is Request



```js
const getKey = request => request.url

```


To cache index.html, specifying `index.html` in `cacheFiles` array is mandatory.

 To cache all js files and index.html, use
```js
const cacheFiles = [ '.js' , 'index.html']
```

**strategy** 

Currently following caching strategies are supported

- `cacheFirst`: Every time a resource is needed, it is first served from the cache and then cache is updated in the background so that user gets the latest data next time.

PS - we will increase the list going forward.

