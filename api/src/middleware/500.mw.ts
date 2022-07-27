import { NextFunction, Request, Response } from 'express';
import { IConfiguration } from '../common/configuration';
import Logger from '../common/logger';

const logger = Logger.child({ name: 'InternalServerError' });

// TODO: Figure out a better way to fit this into IoC
export default function (
  configuration: IConfiguration,
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err);
  // TODO: Test that middleware only returns details when environment explicitly enables it
  res.status(500).json({
    message: 'Internal Server Error',
    // Return the details of the validation only if enabled in the environment e.g. in dev
    ...(configuration.returnInternalServerErrorDetails ? { details: err } : {}),
  });
}
