import correlator from 'express-correlation-id';
import winston, { format, transports } from 'winston';
import config from './configuration';

const correlationIdFormatter = winston.format((info) => {
  const correlationId = correlator.getId();
  if (info.correlationId == null && correlationId != null) {
    info.correlationId = correlationId;
  }
  return info;
});

const Logger = winston.createLogger({
  level: config.loggerLevel,
  format: format.combine(
    correlationIdFormatter(),
    format.prettyPrint(),
    format.timestamp(),
    format.colorize()
  ),
  transports: [new transports.Console()],
});

export default Logger;
