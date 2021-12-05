import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Express from 'express';
import { buildProviderModule } from 'inversify-binding-decorators';
import { isNil } from 'lodash';
import { Connection } from 'mongoose';
import morgan from 'morgan';
import 'reflect-metadata';
import config from '../common/configuration';
import { iocContainer } from '../common/ioc';
import Logger from '../common/logger';
import { MongoRepository } from '../db/mongo/mongo-db';
import { MongoMemoryRepository } from '../db/mongo/mongo-db-memory';
import { MongoPersistence } from '../db/Repository';
import error400Middleware from '../middleware/400.mw';
import error404Middleware from '../middleware/404.mw';
import error500Middleware from '../middleware/500.mw';
import { RegisterRoutes } from '../routes';

const logger = Logger.child({ service: 'App' });
export async function initializeApp() {
  const mongo: MongoPersistence = config.mongo.useMemoryServer
    ? new MongoMemoryRepository()
    : new MongoRepository();

  const mongooseConnection = await mongo.getConnection();

  if (isNil(mongooseConnection)) throw new Error('Unable to connect to mongo');

  iocContainer.bind<Connection>(Connection).toConstantValue(mongooseConnection);

  iocContainer.load(buildProviderModule());

  const app = Express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser(config.cookieSecret));
  app.use(
    morgan('tiny', { stream: { write: (message) => logger.info(message) } })
  );

  RegisterRoutes(app);

  app.use(error400Middleware);
  app.use(error500Middleware);

  app.use(error404Middleware);

  async function close() {
    await mongo.close();
  }

  return [app, close] as const;
}
