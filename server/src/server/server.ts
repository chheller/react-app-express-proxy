import Express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// @ts-ignore This file won't always exist because it's auto-generated
import { RegisterRoutes } from '../routes';
import morgan from 'morgan';

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));

RegisterRoutes(app);

export default app;
