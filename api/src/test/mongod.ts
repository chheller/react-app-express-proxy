import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, createConnection } from 'mongoose';

export class MongoTestMemoryServer {
  private static connection: Connection;
  private static mongod: MongoMemoryServer;

  public static async startMongodb() {
    if (!this.mongod) {
      this.mongod = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          ip: '127.0.0.1',
          dbName: 'default-database',
        },
        binary: {},
      });
    }
    if (this.mongod.state === 'stopped') {
      this.mongod.start();
    }

    return this.mongod;
  }

  public static async stopMongodb() {
    console.log('Shutting down Mongod ...');
    const tearDownMongoStart = process.hrtime();

    if (this.connection) {
      await this.closeMongooseConnection();
    }
    if (this.mongod) {
      await this.mongod.stop(true);
    }
    console.log(
      `Mongod down in ${process.hrtime(tearDownMongoStart)[1] / 1000000}ms`
    );
  }

  public static async getMongooseConnection() {
    if (!this.connection) {
      this.connection = await createConnection('mongodb://127.0.0.1:27017');
    }
    return this.connection;
  }

  public static async closeMongooseConnection() {
    if (this.connection) {
      this.connection.close();
    }
  }
}
