import bodyParser from 'body-parser';
import Express from 'express';
import correlator from 'express-correlation-id';
import { buildProviderModule } from 'inversify-binding-decorators';
import morgan from 'morgan';
import 'reflect-metadata';
import { iocContainer } from '../common/ioc';
import configuration from '../common/ioc/modules/configuration';
import persistence from '../common/ioc/modules/persistence';
import Logger from '../common/logger';
import { MongoProvider } from '../db/mongo/mongo-db';
import { MongoPersistence } from '../db/Repository';
import ErrorMiddleware from '../middleware/error.middleware';
import { RegisterRoutes } from '../routes';
const logger = Logger.child({ name: 'App' });

export async function initializeApp() {
  try {
    await iocContainer.loadAsync(configuration, persistence);
    iocContainer.load(buildProviderModule());
    const errorMiddleware = await iocContainer.get(ErrorMiddleware);

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
    errorMiddleware.registerMiddleware(app);

    async function close() {
      logger.info('Closing Mongo connection');
      await (await iocContainer.get<MongoPersistence>(MongoProvider)).close();

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
