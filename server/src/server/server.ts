import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Express from 'express';
import { buildProviderModule } from 'inversify-binding-decorators';
import { isNil } from 'lodash';
import { Connection } from 'mongoose';
import morgan from 'morgan';
import 'reflect-metadata';
import configuration from '../config/configuration';
import { MongoDbConnection } from '../data/mongo/mongo-db';
import { iocContainer } from '../ioc';
import log from '../log/logger';
import error404Middleware from '../middleware/404.mw';
// @ts-ignore
import { RegisterRoutes } from '../routes';

const logger = log.child({ service: 'Application' });
export async function initializeApp() {
    try {
        const app = Express();

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cookieParser(configuration.cookieSecret || 'secret'));
        app.use(morgan('dev'));

        const mongooseConnection = await MongoDbConnection.getConnection();
        if (isNil(mongooseConnection))
            throw new Error('Unable to connect to mongo');

        iocContainer
            .bind<Connection>(Connection)
            .toConstantValue(mongooseConnection!);

        iocContainer.load(buildProviderModule());

        RegisterRoutes(app);

        app.use(error404Middleware);

        return app;
    } catch (err) {
        logger.error(`Error initializing app`, err);
        throw err;
    }
}
