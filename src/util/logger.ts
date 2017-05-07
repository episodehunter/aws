const raven = require('raven');

interface Logger {
    captureMessage(message: string): void;
    captureException(message: any): void;
}

function createLogger(dsn: string, projectId: string): Logger {
    raven.config('https://' + dsn + '@sentry.io/' + projectId).install();
    return raven;
}

export { createLogger, Logger };
