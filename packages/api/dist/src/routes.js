"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
const runtime_1 = require("@tsoa/runtime");
const user_controller_1 = require("./feature/user/user.controller");
const ioc_1 = require("./common/ioc");
const models = {
    "User": {
        "dataType": "refObject",
        "properties": {
            "givenName": { "dataType": "string", "required": true },
            "familyName": { "dataType": "string", "required": true },
            "preferredName": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "string", "required": true },
            "avatarUrl": { "dataType": "string", "required": true },
            "userId": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "SortOptions": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["asc"] }, { "dataType": "enum", "enums": ["desc"] }, { "dataType": "enum", "enums": ["ascending"] }, { "dataType": "enum", "enums": ["descending"] }, { "dataType": "enum", "enums": ["1"] }, { "dataType": "enum", "enums": ["-1"] }], "validators": {} },
    },
    "CreateUserDTO": {
        "dataType": "refObject",
        "properties": {
            "givenName": { "dataType": "string", "required": true },
            "familyName": { "dataType": "string", "required": true },
            "preferredName": { "dataType": "string", "required": true },
            "emailAddress": { "dataType": "string", "required": true },
            "avatarUrl": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "Partial_CreateUserDTO_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "givenName": { "dataType": "string" }, "familyName": { "dataType": "string" }, "preferredName": { "dataType": "string" }, "emailAddress": { "dataType": "string" }, "avatarUrl": { "dataType": "string" } }, "validators": {} },
    },
};
const validationService = new runtime_1.ValidationService(models);
function RegisterRoutes(app) {
    app.get('/users/:id', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.getUser)), async function UserController_getUser(request, response, next) {
        const args = {
            userId: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(user_controller_1.UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            const promise = controller.getUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.get('/users/:attribute/:value', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.getUsers)), async function UserController_getUsers(request, response, next) {
        const args = {
            attribute: { "in": "path", "name": "attribute", "required": true, "dataType": "string" },
            value: { "in": "path", "name": "value", "required": true, "dataType": "any" },
            skip: { "in": "query", "name": "skip", "dataType": "double" },
            limit: { "in": "query", "name": "limit", "dataType": "double" },
            sort: { "in": "query", "name": "sort", "ref": "SortOptions" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(user_controller_1.UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            const promise = controller.getUsers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/users', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.createUser)), async function UserController_createUser(request, response, next) {
        const args = {
            user: { "in": "body", "name": "user", "required": true, "ref": "CreateUserDTO" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(user_controller_1.UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            const promise = controller.createUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.patch('/users/:userId', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.updateUser)), async function UserController_updateUser(request, response, next) {
        const args = {
            userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
            userPatch: { "in": "body", "name": "userPatch", "required": true, "ref": "Partial_CreateUserDTO_" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(user_controller_1.UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            const promise = controller.updateUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.delete('/users/:userId', ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(user_controller_1.UserController.prototype.deleteUser)), async function UserController_deleteUser(request, response, next) {
        const args = {
            userId: { "in": "path", "name": "userId", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
            const controller = await container.get(user_controller_1.UserController);
            if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
            }
            const promise = controller.deleteUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map