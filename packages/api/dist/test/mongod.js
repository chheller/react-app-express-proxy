"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoTestMemoryServer = void 0;
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = require("mongoose");
class MongoTestMemoryServer {
    static async startMongodb() {
        if (!this.mongod) {
            this.mongod = await mongodb_memory_server_1.MongoMemoryServer.create({
                instance: {
                    port: 27017,
                    ip: '127.0.0.1',
                    dbName: 'default-database',
                },
                binary: {},
            });
        }
        if (this.mongod.state === 'stopped') {
            this.mongod.start();
        }
        return this.mongod;
    }
    static async stopMongodb() {
        if (this.connection) {
            await this.closeMongooseConnection();
        }
        if (this.mongod) {
            await this.mongod.stop(true);
        }
    }
    static async getMongooseConnection() {
        if (!this.connection) {
            this.connection = await (0, mongoose_1.createConnection)('mongodb://127.0.0.1:27017');
        }
        return this.connection;
    }
    static async closeMongooseConnection() {
        if (this.connection) {
            this.connection.close();
        }
    }
}
exports.MongoTestMemoryServer = MongoTestMemoryServer;
//# sourceMappingURL=mongod.js.map