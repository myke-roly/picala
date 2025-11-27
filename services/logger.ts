/**
 * Logger service to handle application logging.
 * Can be extended to send logs to a remote service (e.g., Sentry) in the future.
 */
declare const __DEV__: boolean;

const Logger = {
    log: (message: string, ...args: any[]) => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.log(message, ...args);
        }
    },
    warn: (message: string, ...args: any[]) => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(message, ...args);
        }
    },
    error: (message: string, error?: any) => {
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.error(message, error);
        }
        // TODO: Send to error reporting service (e.g., Sentry)
    },
};

export default Logger;
