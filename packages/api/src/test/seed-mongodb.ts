import 'dotenv/config';
import { MongoClient } from 'mongodb';
import { usingAsync } from '../../utils/using';

const connectionString = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}`;

async function getDb() {
  const client = await MongoClient.connect(connectionString);
  const db = client.db(process.env.MONGO_DATABASE);
  const dispose = () => {
    mongoDisconnect(client);
  };
  return { client, db, dispose };
}
async function mongoDisconnect(client: MongoClient) {
  if (client) {
    await client.close();
  }
}

export async function cleanUpCollection(collection: string) {
  await usingAsync(await getDb(), async ({ db }) => {
    try {
      await db.collection(collection).drop();
    } catch (err) {
      // Ignore ns not found error from collection not already existing.
    }
  });
}

export async function seedCollection(collection: string, data: any) {
  await cleanUpCollection(collection);
  await usingAsync(await getDb(), async ({ db }) => {
    try {
      await db.collection(collection).insertMany(data);
    } catch (err) {
      console.error('Error seeding data');
    }
  });
}
