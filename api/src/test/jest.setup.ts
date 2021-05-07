import { MongoTestMemoryServer } from './mongod';
import { TestApp } from './server';

let hasRun = false;
export default async function ({ watch }: any) {
  // Mongod
  console.log('Running Jest Setup ... ');
  if (!watch || (watch && !hasRun)) {
    await MongoTestMemoryServer.startMongodb();
    await TestApp.startServer();
    hasRun = true;
  }
  console.log('Jest setup complete.');
}
