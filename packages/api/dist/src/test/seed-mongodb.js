"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCollection = exports.cleanUpCollection = void 0;
const mongodb_1 = require("mongodb");
const using_1 = require("../../utils/using");
const connectionString = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}`;
async function getDb() {
    const client = await mongodb_1.MongoClient.connect(connectionString);
    const db = client.db(process.env.MONGO_DATABASE);
    const dispose = () => {
        mongoDisconnect(client);
    };
    return { client, db, dispose };
}
async function mongoDisconnect(client) {
    if (client) {
        await client.close();
    }
}
async function cleanUpCollection(collection) {
    await (0, using_1.usingAsync)(await getDb(), async ({ db }) => {
        try {
            await db.collection(collection).drop();
        }
        catch (err) {
        }
    });
}
exports.cleanUpCollection = cleanUpCollection;
async function seedCollection(collection, data) {
    await cleanUpCollection(collection);
    await (0, using_1.usingAsync)(await getDb(), async ({ db }) => {
        await db.collection(collection).insertMany(data);
    });
}
exports.seedCollection = seedCollection;
//# sourceMappingURL=seed-mongodb.js.map