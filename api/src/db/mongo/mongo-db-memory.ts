import MongoMemoryServer from 'mongodb-memory-server-core';
import { Connection, createConnection } from 'mongoose';
import config from '../../common/configuration';
import Logger from '../../common/logger';
import { MongoPersistence } from '../Repository';

export class MongoMemoryRepository extends MongoPersistence {
  private connection?: Connection;
  private mongod?: MongoMemoryServer;

  private logger = Logger.child({ name: 'MongoDB' });

  async close() {
    if (this.connection != null) {
      await this.connection.close();
    }
    if (this.mongod) {
      return await this.mongod.cleanup(true);
    }
  }

  constructor() {
    super();
  }

  async initializeMemoryDatabase() {}

  async getConnection() {
    try {
      this.mongod = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          ip: config.mongo.hostname,
          dbName: config.mongo.database,
        },
        binary: {},
      });

      const connectionString = `mongodb://${config.mongo.hostname}:${config.mongo.port}`;
      this.logger.info(`Connecting to ${connectionString} MongoDb`);

      return await createConnection(connectionString, {
        dbName: config.mongo.database,
        ...(config.mongo.username && config.mongo.password
          ? {
              authSource: 'admin',
              auth: {
                username: config.mongo.username,
                password: config.mongo.password,
              },
            }
          : {}),
      }).asPromise();
    } catch (err) {
      this.logger.error(`Error connecting to mongo`, { err });
      throw new Error('Failed to establish connection to Mongo');
    }
  }
}
