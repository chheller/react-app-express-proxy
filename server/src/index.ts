import app from './server/server';
import env from './config/configuration';
import logger from './log/logger';

app.listen(env.port, () => {
    logger.info(`App started on port ${env.port}`);
});
