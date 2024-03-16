import Logger from "./server/utils/logger";
import io from "./index";
import { User } from "@prisma/client";

declare global {
    export var getLog: (error: unknown) => string;
    export var logError: (fileName: string, error: unknown, user?: User) => void;
    export var logInfo: (fileName: string, msg: string, user?: User) => void;
}

export { };

global.getLog = (error) => {
    if (error instanceof Error) {
        return error.message;
    }
    return "Paring Error"
}

global.logError = (fileName, error, user) => {
    let msg = "";
    let log = "";
    if (error instanceof Error) {
        msg = error.message;
    } else if (typeof error === 'string') {
        msg = error;
    } else {
        msg = "error parsing log"
    }

    if (user) {
        log = `${fileName} -> ${user.email} ${msg}`
    } else {
        log = "log", `${fileName} -> ${msg}`
    }
    io.emit("log", { user, message: msg, file: fileName, type: "error" })
    Logger.error(`${fileName} -> ${msg}`);
}

global.logInfo = (fileName, msg, user) => {
    let log = "";
    if (user) {
        log = `${fileName} -> ${user.email} ${msg}`
    } else {
        log = `${fileName} -> ${msg}`;
    }
    io.emit("log", { user, message: msg, file: fileName, type: "info" });
    Logger.info(log)
}
