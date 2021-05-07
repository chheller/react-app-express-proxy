import { MongoTestMemoryServer } from './mongod';
import { TestApp } from './server';

export default async function ({ watch, watchAll }: any) {
  if (!watch && !watchAll) {
    console.log('Stopping Server...');
    await TestApp.stopServer();
    console.log('Server stopped.');
    console.log('Shutting down Mongod ...');
    await MongoTestMemoryServer.stopMongodb();
    console.log('Mongod shut down.');
  }
}
