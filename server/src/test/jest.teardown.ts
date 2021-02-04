import { stopMongodb } from './mongod';
import { TestApp } from './server';

export default async function ({ watch }: any) {
  if (!watch) {
    await TestApp.stopServer();
    console.log('Shutting down Mongod ...');
    await stopMongodb();
    console.log('Mongod shut down.');
  }
}
