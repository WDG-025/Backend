import { Router } from 'express';
import { getPosts, createPost } from '#controllers';

const postsRouter = Router();

// /posts

postsRouter.get('/', getPosts);

postsRouter.post('/', createPost);

postsRouter.get('/:id', (req, res) => {
	res.json({ message: 'Single Post' });
});
postsRouter.put('/:id', (req, res) => {});
postsRouter.delete('/:id', (req, res) => {});

export default postsRouter;
