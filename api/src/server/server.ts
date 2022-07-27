import bodyParser from 'body-parser';
import Express, { ErrorRequestHandler } from 'express';
import correlator from 'express-correlation-id';
import { buildProviderModule } from 'inversify-binding-decorators';
import { isNil } from 'lodash';
import { Connection } from 'mongoose';
import morgan from 'morgan';
import 'reflect-metadata';
import Configuration, { IConfiguration } from '../common/configuration';
import { iocContainer } from '../common/ioc';
import { bindDependencies } from '../common/ioc/bindDependencies';
import Logger from '../common/logger';
import { MongoRepository } from '../db/mongo/mongo-db';
import { MongoPersistence } from '../db/Repository';
import error400Middleware from '../middleware/400.mw';
import error404Middleware from '../middleware/404.mw';
import error500Middleware from '../middleware/500.mw';
import { RegisterRoutes } from '../routes';
const logger = Logger.child({ name: 'App' });

export async function initializeApp() {
  try {
    // TODO: Extract all these IoC bindings into a separate function or declaratively somehow
    logger.info('Resolving service configuration');
    await Configuration.initializeConfiguration();
    logger.info('Resolved service configuration');

    logger.info('Binding config to IoC Container');
    iocContainer
      .bind<IConfiguration>('configuration')
      .toConstantValue(Configuration.config);

    const mongo: MongoPersistence = new MongoRepository(Configuration.config);
    logger.info('Creating Mongoose connection');
    const mongooseConnection = await mongo.getConnection();
    logger.info('Mongoose connection successfully created');

    if (isNil(mongooseConnection))
      throw new Error('Unable to connect to mongo');

    logger.info('Binding Mongoose connection to IoC Container');

    iocContainer
      .bind<Connection>(Connection)
      .toConstantValue(mongooseConnection);

    iocContainer.load(buildProviderModule());

    const app = Express();
    app.use(correlator());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(
      morgan('common', {
        stream: {
          write: (message) => Logger.child({ name: 'Request' }).info(message),
        },
      })
    );

    RegisterRoutes(app);
    // TODO: Consider a cleaner alternative to this.. it's pretty ugly
    app.use(
      bindDependencies<ErrorRequestHandler>(error400Middleware, 'configuration')
    );
    app.use(
      bindDependencies<ErrorRequestHandler>(error500Middleware, 'configuration')
    );
    app.use(error404Middleware);

    async function close() {
      logger.info('Closing Mongo connection');
      await mongo.close();

      setTimeout(function () {
        console.error('Could not close connections in time, forcing shut down');
        process.exit(1);
      }, 30 * 1000);

      process.exit();
    }

    process.on('SIGINT', async () => {
      logger.info('Handling SIGINT Signal');
      await close();
    });
    process.on('SIGTERM', async () => {
      logger.info('Handling SIGTERM Signal');
      await close();
    });
    logger.info('App successfully initialized');

    return [app, close] as const;
  } catch (error) {
    logger.error('Unhandled error initializing application', { error });
    throw error;
  }
}
