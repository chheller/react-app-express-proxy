import { Db, MongoClient } from 'mongodb';

let db: Db & { con?: MongoClient };
const connectionString = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}`;

async function getDb() {
  if (!db) {
    const con = await MongoClient.connect(connectionString);
    db = con.db(process.env.MONGO_DATABASE);
    db.con = con;
  }
  return db;
}
async function mongoDisconnect(db: Db & { con?: MongoClient }) {
  if (db?.con) {
    await db?.con.close();
  }
}

export async function seedCollection(collection: string, data: any) {
  const database = await getDb();
  await database.collection(collection).insertMany(data);
}
