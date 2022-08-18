import { initializeApp } from './server/server';

(async () => {
  const [app] = await initializeApp();
  await app.listen(8080);
})();
