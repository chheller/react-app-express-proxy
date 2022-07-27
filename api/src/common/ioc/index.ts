import { Container, decorate, injectable, interfaces } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { Controller } from 'tsoa';
const iocContainer = new Container();

decorate(injectable(), Controller);

const provideSingleton = function <T>(
  identifier: interfaces.ServiceIdentifier<T>
) {
  return fluentProvide(identifier).inSingletonScope().done(true);
};

const provideTransient = function <T>(
  identifier: interfaces.ServiceIdentifier<T>
) {
  return fluentProvide(identifier).inTransientScope().done();
};

export { iocContainer, provideSingleton, provideTransient };
