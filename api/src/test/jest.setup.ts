import 'dotenv/config';
import { Server } from 'http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { initializeApp } from '../server/server';

let mongod: MongoMemoryServer;
let close: () => Promise<void>;
let server: Server;
jest.setTimeout(30000);
beforeAll(async () => {
  try {
    mongod = await MongoMemoryServer.create({
      instance: {
        port: parseInt(process.env.MONGO_PORT ?? '27017', 10),
        ip: process.env.MONGO_HOSTNAME,
        dbName: process.env.MONGO_DATABASE,
      },
      binary: {},
    });
    const app = await initializeApp();
    close = app[1];
    server = app[0].listen(8888);
  } catch (err) {
    console.error(err);
  }
});

beforeEach(() => {});

afterEach(() => {});

afterAll(async () => {
  try {
    await close();
    await new Promise<void>((resolve, reject) =>
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      })
    );
    await mongod.stop({ doCleanup: true, force: true });
  } catch (err) {
    console.error(err);
  }
});
