import { createLMSCompletion, createOllamaComletion } from '#controllers';
import { validateBodyZod } from '#middlewares';
import { promptBodySchema } from '#schemas';
import { Router } from 'express';

const completionsRouter = Router();

completionsRouter.use(validateBodyZod(promptBodySchema));

completionsRouter.post('/ollama', createOllamaComletion);
completionsRouter.post('/lms', createLMSCompletion);

export default completionsRouter;
