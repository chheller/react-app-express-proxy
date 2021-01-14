import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Express from 'express';
import morgan from 'morgan';
import configuration from '../config/configuration';
import '../feature/controller';
import error404Middleware from '../middleware/404.mw';
// @ts-ignore
import { RegisterRoutes } from '../routes';
const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser(configuration.cookieSecret || 'secret'));
app.use(morgan('dev'));

RegisterRoutes(app);

app.use(error404Middleware);

export default app;
