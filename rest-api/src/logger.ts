import * as winston from "winston";

export const logger = winston.createLogger({
    level: process.env.LOGGER_LEVEL,
    format: winston.format.json({
        space: 4
    }),
    //These will be logged in production env
    transports: [
        new winston.transports.File({
            filename: 'logs/combined.log'
        }),
        new winston.transports.File({
            filename: 'logs/errors.log',
            level: 'error'
        })
    ]

});

//
// If we're not in production then log to the `console` with the format:
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  };