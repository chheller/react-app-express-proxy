import { AsyncContainerModule, interfaces } from 'inversify';
import { Connection } from 'mongoose';
import { iocContainer } from '..';
import { MongoProvider } from '../../../db/mongo/mongo-db';
import { MongoPersistence } from '../../../db/Repository';

export default new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<MongoPersistence>(MongoProvider).to(MongoProvider).inSingletonScope();
  // This is really circularly awkward...
  const mongo = await iocContainer.getAsync<MongoPersistence>(MongoProvider);
  const connection = await mongo.getConnection();
  bind<Connection>(Connection).toConstantValue(connection);
});
