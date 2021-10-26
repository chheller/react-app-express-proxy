import { Connection, createConnection } from 'mongoose';
import config from '../../common/configuration';
import Logger from '../../common/logger';

export class MongoDbConnection {
  private static connection: Connection;

  private static logger = Logger.child({ name: 'MongoDB' });

  static async close() {
    await MongoDbConnection.connection.close();
  }

  constructor() {}

  static async getConnection() {
    try {
      const connectionString = `mongodb://${config.mongo.hostname}:${config.mongo.port}`;
      this.logger.info(`Connecting to ${connectionString} MongoDb`);

      this.connection = await createConnection(connectionString, {
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
      return this.connection;
    } catch (err) {
      this.logger.error(`Error connecting to mongo`, err);
    }
  }
}
