import { MongoMemoryServer } from 'mongodb-memory-server';

export async function mochaGlobalTeardown(this: {
  close: () => Promise<void>;
  mongod: MongoMemoryServer;
}) {
  try {
    console.log('Mocha teardown started');
    await this.close();
    await this.mongod.stop({ doCleanup: true, force: true });
    console.log('Mocha teardown completed');
  } catch (err) {
    console.error(err);
  }
}
