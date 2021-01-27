import { stopMongodb } from './mongod';
import { TestApp } from './server';

export default async function (watch: boolean) {
  console.log('Shutting down Mongod ...');
  await stopMongodb();
  console.log('Mongod shut down.');
  await TestApp.stopServer();
}
