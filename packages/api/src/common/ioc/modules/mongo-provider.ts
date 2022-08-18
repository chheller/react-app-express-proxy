import { AsyncContainerModule, interfaces } from 'inversify';
import { MongoPersistence } from '../../../db/mongo/mongo-persistence';
import { MongoProvider } from '../../../db/mongo/mongo-provider';

export default new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<MongoPersistence>(MongoProvider).to(MongoProvider).inSingletonScope();
});
