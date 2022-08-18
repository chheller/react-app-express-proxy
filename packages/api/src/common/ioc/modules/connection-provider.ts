import { AsyncContainerModule, interfaces } from 'inversify';
import { Connection } from 'mongoose';
import { MongoProvider } from '../../../db/mongo/mongo-provider';

export default new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<Connection>(Connection)
    .toDynamicValue(async (ctx: interfaces.Context) =>
      ctx.container.get(MongoProvider).getConnection()
    )
    .inSingletonScope();
});
