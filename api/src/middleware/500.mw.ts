import { NextFunction, Request, Response } from 'express';

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    console.error(err);
    if (process.env['NODE_ENV'] === 'development') {
      return res.status(500).json({ error: err });
    }
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
  next();
}
