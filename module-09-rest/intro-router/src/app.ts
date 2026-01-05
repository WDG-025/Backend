import '#db';
import { Post } from '#models';
import { isValidObjectId } from 'mongoose';
import type { Request } from 'express';
import { postsRouter, userRouter } from '#routes';

import express from 'express';

const app = express();

app.use(express.json());
app.use('/posts', postsRouter);
app.use('/users', userRouter);

app.get('/posts/:id', async (req, res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		return res.status(400).json({ message: 'Id not valid' });
	}
	const post = await Post.findById(id);
	if (!post) return res.status(404).json({ message: 'Post not found' });
	res.json(post);
});

app.put(
	'/posts/:id',
	async (req: Request<{ id: string }, {}, PostType>, res) => {
		const { id } = req.params;
		const { title, content } = req.body;
		if (!isValidObjectId(id)) {
			return res.status(400).json({ message: 'Id not valid' });
		}
		if (!title || !content) {
			return res.status(400).json({ message: 'Invalid request body' });
		}
		const post = await Post.findByIdAndUpdate(
			id,
			{ title, content },
			{
				new: true,
			}
		);
		if (!post) return res.status(404).json({ message: 'Post not found' });
		res.json(post);
	}
);

app.delete('/posts/:id', async (req, res) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		return res.status(400).json({ message: 'Id not valid' });
	}

	const post = await Post.findByIdAndDelete(id);
	console.log(post);
	if (!post) return res.status(404).json({ message: 'Post not found' });
	res.json({ message: 'Post deleted' });
});

const port = 3000;
app.listen(port, () =>
	console.log(`Server running at http://localhost:${port}`)
);
