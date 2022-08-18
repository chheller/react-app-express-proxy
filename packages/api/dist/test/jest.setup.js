"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongod;
jest.setTimeout(30000);
beforeAll(async () => {
    try {
        mongod = await mongodb_memory_server_1.MongoMemoryServer.create({
            instance: {
                port: parseInt(process.env.MONGO_PORT ?? '27017', 10),
                ip: process.env.MONGO_HOSTNAME,
                dbName: process.env.MONGO_DATABASE,
            },
            binary: {},
        });
    }
    catch (err) {
        console.error(err);
    }
});
beforeEach(() => { });
afterEach(() => { });
afterAll(async () => {
    try {
        await mongod.stop({ doCleanup: true, force: true });
    }
    catch (err) {
        console.error(err);
    }
});
//# sourceMappingURL=jest.setup.js.map