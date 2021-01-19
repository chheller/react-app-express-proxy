import env from './common/configuration';
import logger from './common/logger';
import { initializeApp } from './server/server';

(async () => {
  const app = await initializeApp();
  await app.listen(env.port);
  logger.info(`App started on port ${env.port}`);
})();
