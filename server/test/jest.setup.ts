import { mongod } from './mongod';
import { TestApp } from './server';

export default async function () {
  // Mongod
  await mongod.start();
  const [url, port] = await Promise.all([mongod.getUri(), mongod.getPort()]);
  process.env.MONGO_HOSTNAME = url.substr(10, 9); // Trim the leading `mongodb://`
  process.env.MONGO_PORT = port.toString();

  await TestApp.startServer();
}
