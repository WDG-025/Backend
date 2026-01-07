import { Router, type NextFunction, type Request, type Response } from 'express';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '#controllers';
import { authMiddleWare } from '#middlewares';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.post('/', authMiddleWare, createPost);
postRouter.get('/:id', getPostById);
postRouter.put('/:id', authMiddleWare, updatePost);
postRouter.delete('/:id', authMiddleWare, deletePost);

//alternative
// postRouter.route('/').get(getPosts).post(createPost);
// postRouter.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

export default postRouter;
