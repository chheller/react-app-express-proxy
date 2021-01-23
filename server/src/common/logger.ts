import winston, { format, transports } from 'winston';
import configuration from './configuration';

const logger = winston.createLogger({
  level: configuration.loggerLevel,
  transports: [
    new transports.Console({
      format: format.colorize({ all: true }),
    }),
  ],
});

export default logger;
