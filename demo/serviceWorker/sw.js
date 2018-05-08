/**
 * Created by imamudinnaseem on 6/12/17.
 */

// import sw from 'sw-helper'

import sw from '../../index'

// var cacheFiles = ['styles.css', "index.html"]
var prefetchFiles = ['app.js', 'rocket.jpg']
var strategy = 'cacheFirst';
var cacheFiles = [
    {
        url: "index.html",
        maxAgeSeconds: 1000000,
        strategy: 'cacheFirstUpdate'
    },
    {
        url: new RegExp(".*\\.css"),
        strategy: 'cacheFirstUpdate'
    },
    {
        url: new RegExp("^((?!\/sw\\.js).)*((\\.)(js)){1}.*$"),
        maxAgeSeconds: 5
    }];

sw({cacheName: 'NOTES', cacheFiles, strategy, prefetchFiles});

