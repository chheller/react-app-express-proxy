"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRepository = void 0;
const mongoose_1 = require("mongoose");
const configuration_1 = __importDefault(require("../../common/configuration"));
const logger_1 = __importDefault(require("../../common/logger"));
const Repository_1 = require("../Repository");
class MongoRepository extends Repository_1.MongoPersistence {
    constructor() {
        super();
        this.logger = logger_1.default.child({ name: 'MongoDB' });
    }
    async close() {
        if (this.connection) {
            await this.connection.close(true);
        }
    }
    async getConnection() {
        try {
            const connectionString = `mongodb://${configuration_1.default.mongo.hostname}:${configuration_1.default.mongo.port}`;
            this.logger.info(`Connecting to MongoDb @ ${connectionString} `);
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
            this.logger.error(`Error connecting to mongo`, err);
            throw new Error('Failed to establish connection to Mongo');
        }
    }
}
exports.MongoRepository = MongoRepository;
//# sourceMappingURL=mongo-db.js.map