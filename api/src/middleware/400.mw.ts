import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import Logger from '../common/logger';

const logger = Logger.child({ service: 'ValidateErrorMiddleware' });

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidateError) {
    logger.warn(`Caught validation error for ${req.path}:`, err.fields);
    return res.status(400).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  next(err);
}
