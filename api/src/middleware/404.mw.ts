import { Request, Response } from 'express';
import Logger from '../common/logger';

const logger = Logger.child({ service: '404Middleware' });
export default function (req: Request, res: Response) {
  logger.info('Route not found', { url: req.originalUrl });
  res.status(404).send(`${req.originalUrl} not found`);
}
