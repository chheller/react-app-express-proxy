import { initializeApp } from './app/app';
import env from './common/configuration';
import logger from './common/logger';

(async () => {
    const app = await initializeApp();
    await app.listen(env.port);
    logger.info(`App started on port ${env.port}`);
})();
