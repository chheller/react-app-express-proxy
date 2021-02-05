import { startMongodb } from './mongod';
import { TestApp } from './server';

let hasRun = false;
export default async function ({ watch }: any) {
  // Mongod
  if (watch && !hasRun) {
    console.log('Running Jest Setup ... ');
    await startMongodb();
    await TestApp.startServer();
    hasRun = true;
    console.log('Jest setup complete.');
  }
}
