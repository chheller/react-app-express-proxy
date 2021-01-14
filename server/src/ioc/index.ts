import { Controller } from '@tsoa/runtime';
import { inject, Container, decorate, injectable, interfaces } from 'inversify';
import {
    buildProviderModule,
    fluentProvide,
    provide,
    autoProvide,
} from 'inversify-binding-decorators';
import { Db } from 'mongodb';

// Assign a container to `iocContainer`.
const iocContainer = new Container();

decorate(injectable(), Controller);

const provideSingleton = function <T>(
    identifier: interfaces.ServiceIdentifier<T>
) {
    return fluentProvide(identifier).inSingletonScope().done();
};

iocContainer.load(buildProviderModule());

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
