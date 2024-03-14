import winston from "winston"
import winstonTimestampColorize from "winston-timestamp-colorize";
const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';
let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all: true
    }),
    winston.format.label({
        label: '[LOGGER]'
    }),
    winston.format.timestamp({
        format: "MM-DD-YY HH:mm:ss"
    }),
    winston.format.printf(
        info => `${info.timestamp}  ${info.level.includes("info") ? `${info.level}  ` : `${info.level} `} :   ${info.message}`
    )
);

const Logger = winston.createLogger({
    format: combine(
        timestamp({ format: timestampFormat }),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({
                    colors: {
                        "info": "green",
                        "error": "red",
                        "debug": "yellow",
                    }
                }),
                alignColorsAndTime,
            )
        })
    ],
})


export default Logger;