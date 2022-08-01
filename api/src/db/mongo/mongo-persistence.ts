import { injectable } from 'inversify';
import { Connection } from 'mongoose';

@injectable()
export abstract class MongoPersistence {
  abstract getConnection(): Promise<Connection>;
  abstract close(): Promise<void>;
}
