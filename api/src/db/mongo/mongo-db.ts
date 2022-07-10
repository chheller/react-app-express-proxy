import { Connection, createConnection } from 'mongoose';
import config from '../../common/configuration';
import Logger from '../../common/logger';
import { MongoPersistence } from '../Repository';

export class MongoRepository extends MongoPersistence {
  private connection: Connection | undefined;

  private logger = Logger.child({ name: 'MongoDB' });

  async close() {
    if (this.connection) {
      await this.connection.close();
    }
  }

  constructor() {
    super();
  }

  async getConnection() {
    try {
      const connectionString = `mongodb://${config.mongo.hostname}:${config.mongo.port}`;
      this.logger.info(`Connecting to MongoDb @ ${connectionString} `);

      return createConnection(connectionString, {
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
      this.logger.error(`Error connecting to mongo`, err);
      throw new Error('Failed to establish connection to Mongo');
    }
  }
}
