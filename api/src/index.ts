import Logger from './common/logger';
import { initializeApp } from './server/server';

const logger = Logger.child({ service: 'App' });
(async () => {
  try {
    const app = await initializeApp();
    await app.listen(8080);
  } catch (error) {
    logger.error('Error initializing application', { error });
    process.exit(1);
  }
})();
