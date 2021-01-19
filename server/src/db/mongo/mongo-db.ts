import { Connection, createConnection } from 'mongoose';
import configuration from '../../common/configuration';
import Logger from '../../common/logger';

const logger = Logger.child({ name: 'MongoDB' });

const {
  mongo: { hostname, port, username, password, database },
} = configuration;

export class MongoDbConnection {
  private static connection: Connection;
  constructor() {}

  static async close() {
    await MongoDbConnection.connection.close();
  }
  static async getConnection() {
    try {
      const connectionString = `mongodb://${hostname}:${port}`;
      logger.info(`Connecting to ${connectionString} MongoDb`);

      MongoDbConnection.connection = createConnection(connectionString, {
        dbName: database,
        ...(username && password
          ? {
              authSource: 'admin',
              auth: {
                user: username,
                password: password,
              },
            }
          : {}),
      });
      return MongoDbConnection.connection;
    } catch (err) {
      logger.error(`Error connecting to mongo`, err);
    }
  }
}
