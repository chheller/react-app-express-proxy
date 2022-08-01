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
import { MongoPersistence } from '../db/mongo/mongo-persistence';
import { MongoProvider } from '../db/mongo/mongo-provider';
import ErrorMiddleware from '../middleware/error.middleware';
import { RegisterRoutes } from '../routes';

const logger = Logger.child({ name: 'App' });

export async function initializeApp() {
  try {
    // Load configuration and persistence container modules into IoC Container
    await iocContainer.loadAsync(configuration, persistence);
    // Load @Provider bindings into IoC Container
    iocContainer.load(buildProviderModule());
    // Get the ErrorMiddleware out of the IoC container to register with the app
    const errorMiddleware = await iocContainer.get(ErrorMiddleware);

    const app = Express();
    // Setup basic middleware
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
    // Register TSOA and ErrorMiddleware handlers
    RegisterRoutes(app);
    errorMiddleware.registerMiddleware(app);

    // Create a handler for closing out the Mongoose connection
    // TODO: Maybe move this to the IoC Container as an unbind handler
    // https://github.com/inversify/InversifyJS/blob/master/wiki/deactivation_handler.md
    async function close() {
      try {
        setTimeout(function () {
          console.error(
            'Could not close connections in time, forcing shut down'
          );
          process.exit(1);
        }, 30 * 1000);

        logger.info('Closing Mongo connection');
        await (await iocContainer.get<MongoPersistence>(MongoProvider)).close();

        process.exit();
      } catch (err) {
        logger.error('An error occurred trying to teardown server', { err });
        process.exit(1);
      }
    }

    // Create SIGINT handlers to call server close
    process.on('SIGINT', async () => {
      logger.info('Handling SIGINT Signal');
      await close();
    });
    process.on('SIGTERM', async () => {
      logger.info('Handling SIGTERM Signal');
      await close();
    });

    logger.info('App successfully initialized');

    // Return app and close method
    // TODO: Figure out how to call close from the test suite setup. Test setup is currently
    // the only reason to return close, as SIGTERM/SIGINT handles most other use-cases.
    return [app, close] as const;
  } catch (error) {
    logger.error('Unhandled error initializing application', { error });
    throw error;
  }
}
