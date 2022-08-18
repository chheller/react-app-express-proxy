import { AsyncContainerModule, interfaces } from 'inversify';
import { MongoPersistence } from '../../mongo-persistence';
import { MongoProvider } from '../../mongo-provider';

export default new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<MongoPersistence>(MongoProvider).to(MongoProvider).inSingletonScope();
});
