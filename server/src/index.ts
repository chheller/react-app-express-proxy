import 'reflect-metadata';
import env from './config/configuration';
import logger from './log/logger';
import app from './server/server';

app.listen(env.port, () => {
    logger.info(`App started on port ${env.port}`);
});
