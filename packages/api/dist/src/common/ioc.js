"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorate = exports.autoProvide = exports.provide = exports.inject = exports.injectable = exports.provideTransient = exports.provideSingleton = exports.iocContainer = void 0;
const inversify_1 = require("inversify");
Object.defineProperty(exports, "decorate", { enumerable: true, get: function () { return inversify_1.decorate; } });
Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return inversify_1.inject; } });
Object.defineProperty(exports, "injectable", { enumerable: true, get: function () { return inversify_1.injectable; } });
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
Object.defineProperty(exports, "autoProvide", { enumerable: true, get: function () { return inversify_binding_decorators_1.autoProvide; } });
Object.defineProperty(exports, "provide", { enumerable: true, get: function () { return inversify_binding_decorators_1.provide; } });
const tsoa_1 = require("tsoa");
const iocContainer = new inversify_1.Container();
exports.iocContainer = iocContainer;
(0, inversify_1.decorate)((0, inversify_1.injectable)(), tsoa_1.Controller);
const provideSingleton = function (identifier) {
    return (0, inversify_binding_decorators_1.fluentProvide)(identifier).inSingletonScope().done(true);
};
exports.provideSingleton = provideSingleton;
const provideTransient = function (identifier) {
    return (0, inversify_binding_decorators_1.fluentProvide)(identifier).inTransientScope().done();
};
exports.provideTransient = provideTransient;
//# sourceMappingURL=ioc.js.map