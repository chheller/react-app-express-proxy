"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCollection = void 0;
const mongodb_1 = require("mongodb");
let db;
const connectionString = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}`;
async function getDb() {
    if (!db) {
        const con = await mongodb_1.MongoClient.connect(connectionString);
        db = con.db(process.env.MONGO_DATABASE);
        db.con = con;
    }
    return db;
}
async function mongoDisconnect(db) {
    if (db?.con) {
        await db?.con.close();
    }
}
async function seedCollection(collection, data) {
    const database = await getDb();
    await database.collection(collection).insertMany(data);
    await mongoDisconnect(db);
}
exports.seedCollection = seedCollection;
//# sourceMappingURL=seed-mongodb.js.map