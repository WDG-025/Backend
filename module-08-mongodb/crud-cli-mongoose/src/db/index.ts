import mongoose from 'mongoose';
import { envOrThrow } from '#utils';

const CONNECTION_STRING = envOrThrow('MONGO_URI');

try {
	await mongoose.connect(CONNECTION_STRING, {
		dbName: 'shop',
	});
	console.log('MongoDB connected via Mongoose');
} catch (error) {
	console.log('MongoDb connection error', error);
	process.exit(1);
}
