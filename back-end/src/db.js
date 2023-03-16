import { MongoClient } from 'mongodb';

let client;

export const initializeDbConnection = async () => {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}