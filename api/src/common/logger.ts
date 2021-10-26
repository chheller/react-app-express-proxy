import winston, { format, transports } from 'winston';
import config from './configuration';

const Logger = winston.createLogger({
  level: config.loggerLevel,
  format: format.combine(
    format.prettyPrint(),
    format.timestamp(),
    format.colorize()
  ),
  transports: [new transports.Console()],
});

export default Logger;
