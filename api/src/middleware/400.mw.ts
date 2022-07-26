import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import Logger from '../common/logger';

const logger = Logger.child({ name: 'ValidationError' });

export default function (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidateError) {
    logger.warn(err.message, {
      fields: err.fields,
    });
    // TODO: Test that middleware only returns details when environment explicitly enables it
    return res.status(err.status).json({
      message: 'Validation Failed',
      // Return the details of the validation only if enabled in the environment e.g. in dev
      // ...(config.returnValidationErrorDetails ? { details: err.fields } : {}),
    });
  }
  next(err);
}
