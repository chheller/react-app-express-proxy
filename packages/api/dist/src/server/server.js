"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const express_correlation_id_1 = __importDefault(require("express-correlation-id"));
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const lodash_1 = require("lodash");
const mongoose_1 = require("mongoose");
const morgan_1 = __importDefault(require("morgan"));
require("reflect-metadata");
const configuration_1 = __importDefault(require("../common/configuration"));
const ioc_1 = require("../common/ioc");
const logger_1 = __importDefault(require("../common/logger"));
const mongo_db_1 = require("../db/mongo/mongo-db");
const _400_mw_1 = __importDefault(require("../middleware/400.mw"));
const _404_mw_1 = __importDefault(require("../middleware/404.mw"));
const _500_mw_1 = __importDefault(require("../middleware/500.mw"));
const routes_1 = require("../routes");
const logger = logger_1.default.child({ name: 'App' });
async function initializeApp() {
    try {
        const mongo = new mongo_db_1.MongoRepository();
        logger.info('Creating Mongoose connection');
        const mongooseConnection = await mongo.getConnection();
        logger.info('Mongoose connection successfully created');
        if ((0, lodash_1.isNil)(mongooseConnection))
            throw new Error('Unable to connect to mongo');
        logger.info('Binding Mongoose connection to IoC Container');
        ioc_1.iocContainer
            .bind(mongoose_1.Connection)
            .toConstantValue(mongooseConnection);
        ioc_1.iocContainer.load((0, inversify_binding_decorators_1.buildProviderModule)());
        const app = (0, express_1.default)();
        app.use((0, express_correlation_id_1.default)());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        app.use(body_parser_1.default.json());
        app.use((0, cookie_parser_1.default)(configuration_1.default.cookieSecret));
        app.use((0, morgan_1.default)('common', {
            stream: {
                write: (message) => logger_1.default.child({ name: 'Request' }).info(message),
            },
        }));
        (0, routes_1.RegisterRoutes)(app);
        app.use(_400_mw_1.default);
        app.use(_500_mw_1.default);
        app.use(_404_mw_1.default);
        async function close() {
            logger.info('Closing Mongo connection');
            await mongo.close();
            setTimeout(function () {
                console.error('Could not close connections in time, forcing shut down');
                process.exit(1);
            }, 30 * 1000);
            process.exit();
        }
        process.on('SIGINT', async () => {
            logger.info('Handling SIGINT Signal');
            await close();
        });
        process.on('SIGTERM', async () => {
            logger.info('Handling SIGTERM Signal');
            await close();
        });
        logger.info('App successfully initialized');
        return [app, close];
    }
    catch (error) {
        logger.error('Unhandled error initializing application', { error });
        throw error;
    }
}
exports.initializeApp = initializeApp;
//# sourceMappingURL=server.js.map