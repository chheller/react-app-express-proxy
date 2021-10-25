import { NextFunction, Request, Response } from 'express';
import Logger from '../common/logger';

const logger = Logger.child({ service: '500ErrorMiddleware' });

export default function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof Error) {
    logger.error(err);
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
