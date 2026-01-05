import type { Request, Response } from 'express';
import { Post } from '#models';

type PostType = {
	title: string;
	content: string;
};

export async function getPosts(req: Request, res: Response) {
	const posts = await Post.find();
	res.status(200).json(posts);
}

export async function createPost(
	req: Request<{}, {}, PostType>,
	res: Response
) {
	const { title, content } = req.body;
	if (!title || !content) {
		return res.status(400).json({ message: 'Invalid request body' });
	}
	const post = new Post({ title, content });
	await post.save();
	res.status(201).json(post);
}
