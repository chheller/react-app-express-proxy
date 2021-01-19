import { MongoMemoryServer } from 'mongodb-memory-server';

export const mongod = new MongoMemoryServer({
  instance: {},
  binary: {},
  autoStart: false,
});
