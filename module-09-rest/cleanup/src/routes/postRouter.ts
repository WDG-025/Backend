import { Router } from 'express';
import { getPosts, createPost, getPostById, updatePost, deletePost } from '#controllers';

const postRouter = Router();

postRouter.get('/', getPosts);
postRouter.post('/', createPost);
postRouter.get('/:id', getPostById);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);

//alternative
// postRouter.route('/').get(getPosts).post(createPost);
// postRouter.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

export default postRouter;
