import { MongoTestMemoryServer } from './mongod';
import { TestApp } from './server';

export default async function ({ watch, watchAll }: any) {
  try {
    console.log('Stopping Server...');
    const teardownServerStart = process.hrtime();
    await TestApp.stopServer();
    console.log(
      `Server down in ${process.hrtime(teardownServerStart)[1] / 1000000}ms`
    );
    if (!watch && !watchAll) {
      console.log('Shutting down Mongod ...');
      const tearDownMongoStart = process.hrtime();
      await MongoTestMemoryServer.stopMongodb();
      console.log(
        `Mongod down in ${process.hrtime(tearDownMongoStart)[1] / 1000000}ms`
      );
    }
  } catch (err) {
    console.error('Error tearing down tests');
    console.error(err);
  }
}
