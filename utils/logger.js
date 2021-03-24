const winston = require('winston');

const loggerLevel = process.env.LOGGER_LEVEL || 'warn';

function jsonFormat(obj) {
    return JSON.stringify(obj, null, 4)
}

const prettyPrint = winston.format.printf((info) => {
    const { level, ...rest } = info;
    let log;

    if (rest.stack) {
        const { stack, ...others } = rest;
        log =
            `[${info.level}][${info.timestamp}]: ${jsonFormat(others)}\n\n` +
            `[${info.level}][${info.timestamp}]: ${stack}\n\n`;
    } 
    else {
        log = `[${info.level}][${info.timestamp}]: ${jsonFormat(rest)}\n\n`;
    }

    return log;
});


const prettyJson = winston.format.printf(info => {
    if (typeof info.message !== "undefined" && info.message !== null) {
        info.message = JSON.stringify(info.message, null, 4)
    }

    return `${info.level}: ${info.message}`
})

const prettyError = err => {
    if (err instanceof Error) {
        logger.log({ level: 'error', message: `${err.stack || err}` });
    } else {
        logger.log({ level: 'error', message: err });
    }
};

const devLogger =  {
    transports: [ 
        new winston.transports.Console({
            level: loggerLevel,
            prettyPrint: true,
            handleExceptions: true,
            exitOnError: false,
            format: winston.format.combine(
                winston.format.errors( {stack: true} ),
                winston.format.colorize(),
                winston.format.timestamp(),
                prettyPrint
            )
        })
    ],
}

const liveLogger = {
    level: loggerLevel, 
    prettyPrint: true,
    handleExceptions: true,
    exitOnError: false,
    format: winston.format.combine(
        winston.format.errors( {stack: true} ),
        winston.format.splat(),
        winston.format.simple(),
        prettyJson,              
    ),
    transports: [ 
        new winston.transports.Console()
    ],
}

let logger;

if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development'){
    logger = winston.createLogger( devLogger );
}
else{
    logger = winston.createLogger( liveLogger );
}

if(process.env.NODE_ENV !== 'production'){
    logger.warn(process.env.APP_NAME+' Node Server runing in DEVELOPMENT MODE.');
}

logger.error = prettyError;

module.exports = {
    logger
}  