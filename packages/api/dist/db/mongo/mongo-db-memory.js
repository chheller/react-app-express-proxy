"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoMemoryRepository = void 0;
const mongodb_memory_server_core_1 = __importDefault(require("mongodb-memory-server-core"));
const mongoose_1 = require("mongoose");
const configuration_1 = __importDefault(require("../../common/configuration"));
const logger_1 = __importDefault(require("../../common/logger"));
const Repository_1 = require("../Repository");
class MongoMemoryRepository extends Repository_1.MongoPersistence {
    constructor() {
        super();
        this.logger = logger_1.default.child({ name: 'MongoDB' });
    }
    async close() {
        if (this.connection != null) {
            await this.connection.close();
        }
        if (this.mongod) {
            return await this.mongod.cleanup(true);
        }
    }
    async initializeMemoryDatabase() { }
    async getConnection() {
        try {
            this.mongod = await mongodb_memory_server_core_1.default.create({
                instance: {
                    port: 27017,
                    ip: configuration_1.default.mongo.hostname,
                    dbName: configuration_1.default.mongo.database,
                },
                binary: {},
            });
            const connectionString = `mongodb://${configuration_1.default.mongo.hostname}:${configuration_1.default.mongo.port}`;
            this.logger.info(`Connecting to ${connectionString} MongoDb`);
            return await (0, mongoose_1.createConnection)(connectionString, {
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
        }
        catch (err) {
            this.logger.error(`Error connecting to mongo`, { err });
            throw new Error('Failed to establish connection to Mongo');
        }
    }
}
exports.MongoMemoryRepository = MongoMemoryRepository;
//# sourceMappingURL=mongo-db-memory.js.map