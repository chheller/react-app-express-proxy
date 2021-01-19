import { NextFunction, Request, Response } from 'express';

export default function (req: Request, res: Response, next: NextFunction) {
  res.status(404).send(`${req.originalUrl} not found`);
}
