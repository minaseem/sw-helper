/**
 * Created by imamudinnaseem on 6/9/17.
 */
import {IConfig} from "./Iconfig";

export interface IOptions {
    cacheName: string;
    cacheFiles: IConfig[];
    strategy: string;
    prefetchFiles: string[];
    getKey: Function;
}
