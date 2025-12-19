import { MongoClient } from 'mongodb';

const client = new MongoClient(envOrThrow('MONGO_URI'));

try {
	await client.connect();
} catch (err) {
	process.env.NODE_ENV !== 'production' &&
		console.error('MongoDB connection error', err);
	process.exit(1);
}

function envOrThrow(key: string) {
	if (!process.env[key]) {
		throw new Error(`${key} is missing in .env`);
	} else {
		return process.env[key];
	}
}

export const db = (database: string) => client.db(database);
