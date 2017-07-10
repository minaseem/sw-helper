/**
 * Created by imamudinnaseem on 6/9/17.
 */

import {IOptions} from './src/IOptions';
import install from './src/install'
import activate from './src/activate'
import fetch from './src/fetch'

interface IInput {
    prefetchFiles?: string[]
    cacheFiles?: string[]
    cacheName?: string
    strategy?: string
    getKey?: Function
}
type I = <T>(value: T) => T;
const identity: I = <T>(a: T): T => a;

var defaultOptions: IOptions = {
    prefetchFiles: [],
    cacheFiles: [],
    cacheName: 'v1',
    strategy: 'CacheFirst',
    getKey: identity
}

export default (options: IInput) => {
    var {
        cacheFiles = defaultOptions.cacheFiles,
        cacheName = defaultOptions.cacheName,
        strategy = defaultOptions.strategy,
        prefetchFiles = defaultOptions.prefetchFiles,
        getKey = defaultOptions.getKey
    } = options
    install({prefetchFiles, cacheName})
    activate({cacheName})
    fetch({cacheName, strategy, cacheFiles, prefetchFiles, getKey})
}
