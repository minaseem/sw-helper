export interface Window {
    skipWaiting(): void;

    addEventListener(type: string, callback: (arg: any) => void): void;
}