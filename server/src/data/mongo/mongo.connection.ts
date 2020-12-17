import { Db, MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://mongo:27017';

// Database Name
const dbName = 'database';

// Use connect method to connect to the server
let database: Db | undefined;

MongoClient.connect(url).then((client) => {
    database = client.db(dbName);
});

export default database;
