"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mochaGlobalSetup = void 0;
require("dotenv/config");
const mongodb_memory_server_1 = require("mongodb-memory-server");
const server_1 = require("../server/server");
async function mochaGlobalSetup() {
    try {
        console.log('Mocha setup started');
        this.mongod = await mongodb_memory_server_1.MongoMemoryServer.create({
            instance: {
                port: parseInt(process.env.MONGO_PORT ?? '27017', 10),
                ip: process.env.MONGO_HOSTNAME,
                dbName: process.env.MONGO_DATABASE,
            },
            binary: {},
        });
        const app = await (0, server_1.initializeApp)();
        const server = await app.listen(8888);
        this.close = async () => {
            await app.close();
            await server.close();
        };
        console.log('Mocha setup complete');
    }
    catch (err) {
        console.error(err);
    }
}
exports.mochaGlobalSetup = mochaGlobalSetup;
//# sourceMappingURL=mocha.setup.js.map