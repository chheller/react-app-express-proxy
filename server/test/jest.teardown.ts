import { mongod } from './mongod';
import { TestApp } from './server';

export default async function () {
  console.log('Shutting down Mongod ...');
  await mongod.stop();
  console.log('Mongod shut down.');
  await TestApp.stopServer();
}
