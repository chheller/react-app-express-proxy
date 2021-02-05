import { Container, decorate, inject, injectable, interfaces } from 'inversify';
import {
  autoProvide,
  fluentProvide,
  provide,
} from 'inversify-binding-decorators';
import { Controller } from 'tsoa';

// Assign a container to `iocContainer`.
const iocContainer = new Container();

decorate(injectable(), Controller);

const provideSingleton = function <T>(
  identifier: interfaces.ServiceIdentifier<T>
) {
  return fluentProvide(identifier).inSingletonScope().done(true);
};

// export according to convention
export {
  iocContainer,
  provideSingleton,
  injectable,
  inject,
  provide,
  autoProvide,
  decorate,
};
