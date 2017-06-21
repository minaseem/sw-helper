/**
 * Created by imamudinnaseem on 6/12/17.
 */

// import sw from '../../index'
import sw from 'sw-helper'

var cacheFiles = ['styles.css']
var prefetchFiles = ['app.js', 'rocket.jpg']
var strategy = 'cacheFirst'

sw({cacheName: 'v1', cacheFiles, strategy, prefetchFiles});
