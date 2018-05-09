/**
 * Created by imamudinnaseem on 5/9/18
 */

interface FetchEvent extends Event {
    request: Request;
    respondWith(response: Promise<Response>|Response): Promise<Response>;
}