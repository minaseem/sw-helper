/**
 * Created by imamudinnaseem on 5/9/18
 */

export interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Promise<Response>|Response): Promise<Response>;
}