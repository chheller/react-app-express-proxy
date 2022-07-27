import correlator from 'express-correlation-id';
import winston, { format, transports } from 'winston';

const correlationIdFormatter = winston.format((info) => {
  const correlationId = correlator.getId();
  if (info.correlationId == null && correlationId != null) {
    info.correlationId = correlationId;
  }
  return info;
});

const Logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL, // Circular dependency when using Configuration.LOGGER_LEVEL

  format: format.combine(
    correlationIdFormatter(),
    format.prettyPrint(),
    format.timestamp(),
    format.colorize()
  ),
  transports: [new transports.Console()],
});

export default Logger;
