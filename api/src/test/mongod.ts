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
    return this.mongod;
  }

  public static async stopMongodb() {
    if (this.mongod) {
      await this.mongod.stop(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  public static async getMongooseConnection() {
    if (!this.connection) {
      this.connection = await createConnection('mongodb://127.0.0.1:27017');
    }
    return this.connection;
  }
}
