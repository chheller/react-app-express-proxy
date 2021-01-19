import { MongoMemoryServer } from 'mongodb-memory-server';

export const mongod = new MongoMemoryServer({
  instance: {
    port: 27017,
  },
  binary: {},
  autoStart: false,
});
