import winston, { transports, format } from "winston";

const logger = winston.createLogger({
  level: "info",
  transports: [
    new transports.Console({
      format: format.colorize({ all: true }),
    }),
  ],
});

export default logger;
