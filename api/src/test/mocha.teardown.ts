import { MongoMemoryServer } from 'mongodb-memory-server';

export async function mochaGlobalTeardown(this: {
  close: () => Promise<void>;
  mongod: MongoMemoryServer;
}) {
  try {
    await this.close();
    await this.mongod.stop({ doCleanup: true, force: true });
  } catch (err) {
    console.error(err);
  }
}
