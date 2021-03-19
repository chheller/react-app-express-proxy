import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, createConnection } from 'mongoose';

const mongod: MongoMemoryServer = new MongoMemoryServer({
  instance: {
    port: 27017,
    ip: '127.0.0.1',
    dbName: 'default-database',
  },
  binary: {},
  autoStart: false,
});

export async function startMongodb() {
  await mongod.start();
  return mongod;
}

export async function stopMongodb() {
  if (mongod) {
    await mongod.stop();
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}
let connection: Connection;

export async function getMongooseConnection() {
  if (!connection) {
    connection = await createConnection('mongodb://127.0.0.1:27017');
  }
  return connection;
}
