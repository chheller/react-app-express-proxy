import { AsyncContainerModule, interfaces } from 'inversify';
import { Connection } from 'mongoose';
import { MongoProvider } from '../../mongo-provider';

type ConnectionProvider = () => Promise<Connection>;
export default new AsyncContainerModule(async (bind: interfaces.Bind) => {
  bind<ConnectionProvider>('ConnectionProvider').toProvider<Connection>(
    (ctx: interfaces.Context) => async () =>
      ctx.container.get<MongoProvider>(MongoProvider).getConnection()
  );
});
