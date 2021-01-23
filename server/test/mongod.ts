import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer | undefined;

function createMongodb() {
  return new MongoMemoryServer({
    instance: {
      port: 27017,
    },
    binary: {},
    autoStart: false,
  });
}

export async function startMongodb() {
  mongod = createMongodb();
  await mongod.start();
  return mongod;
}

export async function stopMongodb() {
  if (mongod) {
    await mongod.stop();
    mongod = undefined;
  }
}
