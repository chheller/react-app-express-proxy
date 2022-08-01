import { inject, injectable } from 'inversify';
import { Connection, createConnection } from 'mongoose';
import { IConfiguration } from '../../common/configuration';
import Logger from '../../common/logger';
import { MongoPersistence } from './mongo-persistence';

@injectable()
export class MongoProvider extends MongoPersistence {
  private connection: Connection | undefined;

  private logger = Logger.child({ name: 'MongoDB' });

  async close() {
    if (this.connection) {
      await this.connection.close(true);
    }
  }

  constructor(@inject('configuration') private config: IConfiguration) {
    super();
  }

  async getConnection(): Promise<Connection> {
    try {
      const connectionString = `mongodb://${this.config.mongo.hostname}:${this.config.mongo.port}`;
      this.logger.info(`Connecting to MongoDb @ ${connectionString} `);

      return await createConnection(connectionString, {
        dbName: this.config.mongo.database,
        authSource: 'admin',
        auth: {
          username: this.config.mongo.username,
          password: this.config.mongo.password,
        },
      }).asPromise();
    } catch (err) {
      this.logger.error(`Error connecting to mongo`, err);
      throw new Error('Failed to establish connection to Mongo');
    }
  }
}
