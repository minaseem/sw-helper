/**
 * Created by imamudinnaseem on 8/2/18
 */

import config from './config';

export default function (...args: any[]) {
    if (!config.disableLogging) {
        console.log.apply(null, args)
    }
}