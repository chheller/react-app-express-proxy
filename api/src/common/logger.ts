import winston, { format, transports } from 'winston';
import config from './configuration';

export default winston.createLogger({
  level: config.loggerLevel,
  transports: [
    new transports.Console({
      format: format.colorize({ all: true }),
    }),
  ],
});
