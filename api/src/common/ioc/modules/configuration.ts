import { AsyncContainerModule, interfaces } from 'inversify';
import getConfiguration from '../../configuration';

export default new AsyncContainerModule(async (bind: interfaces.Bind) => {
  const config = await getConfiguration();
  bind('configuration').toConstantValue(config);
});
