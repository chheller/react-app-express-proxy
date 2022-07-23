import { Request, Response } from 'express';
import Logger from '../common/logger';

const logger = Logger.child({ name: 'NotFoundError' });
export default function (req: Request, res: Response) {
  logger.info('Route not found', { url: req.originalUrl });
  return res.status(404).send(`${req.originalUrl} not found`);
}
