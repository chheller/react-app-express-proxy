import 'dotenv/config';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { initializeApp } from '../server/server';

export async function mochaGlobalSetup(this: {
  close: () => Promise<void>;
  mongod: MongoMemoryServer;
}) {
  try {
    this.mongod = await MongoMemoryServer.create({
      instance: {
        port: parseInt(process.env.MONGO_PORT ?? '27017', 10),
        ip: process.env.MONGO_HOSTNAME,
        dbName: process.env.MONGO_DATABASE,
        auth: true,
      },
      auth: {
        extraUsers: [
          {
            createUser: process.env.MONGO_USERNAME!,
            pwd: process.env.MONGO_PASSWORD!,
            roles: ['readWrite'],
          },
        ],
      },
      binary: {},
    });
    const [app, close] = await initializeApp();
    const server = await app.listen(8888);
    this.close = async () => {
      await close();
      await server.close();
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}
