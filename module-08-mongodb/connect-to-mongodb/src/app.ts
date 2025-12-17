import { db } from '#db';
import { ObjectId } from 'mongodb';

const posts = db('project_a').collection('posts');

// console.log(await posts.insertOne({ test: 'Hello' }));
//

// console.log(await posts.find().toArray());

console.log(
	await posts
		.find({ _id: new ObjectId('69426fd6a93105b3ebafba9d') })
		.toArray()
);

process.exit(0);
