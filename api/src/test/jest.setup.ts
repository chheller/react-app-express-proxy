import { MongoTestMemoryServer } from './mongod';
import { TestApp } from './server';

let hasRun = false;
export default async function ({ watch }: any) {
  // Mongod
  if (!watch || (watch && !hasRun)) {
    console.log('Running Jest Setup ... ');
    await MongoTestMemoryServer.startMongodb();
    await TestApp.startServer();
    hasRun = true;
    console.log('Jest setup complete.');
  }
}
