import Logger from "./server/utils/logger";

declare global {
    export var getLog: (error: unknown) => string;
    export var logError: (fileName: string, error: unknown, email?: string) => void;
    export var logInfo: (fileName: string, msg: string, email?: string) => void;
}

export { };

global.getLog = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return "Paring Error"
}
global.logError = (fileName, error, email) => {
    let msg = "";
    if (error instanceof Error) {
        msg = error.message;
    } else if (error instanceof String) {
        msg = error.toString();
    } else {
        msg = "error parsing log"
    }
    if (email) {
        Logger.error(`${fileName} -> ${email} ${msg}`);
    }
    Logger.error(`${fileName} -> ${msg}`);
}

global.logInfo = (fileName, msg, email) => {
    if (email) {
        Logger.info(`${fileName} -> ${email} ${msg}`)
    }
    Logger.info(`${fileName} -> ${msg}`)
}
