/**
 * Created by imamudinnaseem on 6/9/17.
 */

import {IOptions} from './src/IOptions';
import install from './src/install'
import activate from './src/activate'
import fetch from './src/fetch'

declare var Object: Object;

interface Object {
    assign: Function,
    keys: Function,
    prototype: any
}

var defaultOptions: IOptions = {
    cacheFiles: [],
    cacheName: 'v1',
    strategy: 'CacheFirst'
}

export default (options: IOptions) => {
    var {cacheFiles = defaultOptions.cacheFiles, cacheName = defaultOptions.cacheName, strategy = defaultOptions.strategy} = options;
    install({cacheFiles, cacheName})
    activate({cacheName})
    fetch({cacheName, strategy})
}
