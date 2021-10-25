import { MongoTestMemoryServer } from './mongod';
import { TestApp } from './server';

let hasRun = false;
export default async function ({ watch }: any) {
  // Mongod
  await MongoTestMemoryServer.startMongodb();
  await TestApp.startServer();

  if (!watch || (watch && !hasRun)) {
    console.log('Running Jest Setup ... ');
    hasRun = true;
  }
  console.log('Jest setup complete.');
}