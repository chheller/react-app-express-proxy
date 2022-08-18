"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbConnection = void 0;
const mongoose_1 = require("mongoose");
const configuration_1 = __importDefault(require("../../common/configuration"));
const logger_1 = __importDefault(require("../../common/logger"));
class MongoDbConnection {
    constructor() { }
    static async close() {
        await MongoDbConnection.connection.close();
    }
    static async getConnection() {
        try {
            const connectionString = `mongodb://${configuration_1.default.mongo.hostname}:${configuration_1.default.mongo.port}`;
            this.logger.info(`Connecting to ${connectionString} MongoDb`);
            this.connection = await (0, mongoose_1.createConnection)(connectionString, {
                dbName: configuration_1.default.mongo.database,
                ...(configuration_1.default.mongo.username && configuration_1.default.mongo.password
                    ? {
                        authSource: 'admin',
                        auth: {
                            username: configuration_1.default.mongo.username,
                            password: configuration_1.default.mongo.password,
                        },
                    }
                    : {}),
            }).asPromise();
            return this.connection;
        }
        catch (err) {
            this.logger.error(`Error connecting to mongo`, err);
        }
    }
}
exports.MongoDbConnection = MongoDbConnection;
MongoDbConnection.logger = logger_1.default.child({ name: 'MongoDB' });
//# sourceMappingURL=mongo.js.map