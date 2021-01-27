import { startMongodb } from './mongod';
import { TestApp } from './server';

let hasRun = false;
export default async function () {
  // Mongod
  console.log('Running Jest Setup ... ');
  const mongod = await startMongodb();
  const [url, port] = await Promise.all([mongod.getUri(), mongod.getPort()]);
  process.env.MONGO_HOSTNAME = url.substr(10, 9); // Trim the leading `mongodb://`
  process.env.MONGO_PORT = port.toString();

  await TestApp.startServer();
  hasRun = true;
  console.log('Jest setup complete.');
}
