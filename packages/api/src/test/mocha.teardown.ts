import { MongoMemoryServer } from 'mongodb-memory-server';

export async function mochaGlobalTeardown(this: {
  close: () => Promise<void>;
  mongod: MongoMemoryServer;
}) {
  try {
    await this.close();
  } catch (err) {
    console.error(err);
  } finally {
    await this.mongod.stop({ doCleanup: true, force: true });
  }
}
