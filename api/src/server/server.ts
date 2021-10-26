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
import { MongoDbConnection } from '../db/mongo/mongo-db';
import error400Middleware from '../middleware/400.mw';
import error404Middleware from '../middleware/404.mw';
import error500Middleware from '../middleware/500.mw';
// @ts-ignore
import { RegisterRoutes } from '../routes';

const logger = Logger.child({ service: 'App' });
export async function initializeApp(serverConfiguration?: any) {
  const mongooseConnection = await MongoDbConnection.getConnection();

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

  return app;
}

export async function listen() {}

export async function close() {
  await MongoDbConnection.close();
}
