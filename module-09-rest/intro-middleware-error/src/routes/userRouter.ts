import { Router } from 'express';
import { getUsers, createUser, getUserById, updateUser, deleteUser } from '#controllers';
import { userLogger } from '#middlewares';

const userRouter = Router();

//route level middleware
userRouter.use(userLogger);

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUserById);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
