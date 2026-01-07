import express, { type RequestHandler } from 'express';
import { postRouter, userRouter } from '#routes';
import '#db';
import type { Request, Response, NextFunction } from 'express';
import { errorHandler, logger } from '#middlewares';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.use('/main', express.static('./public'));

//application level middleware
app.use(logger);

// app.get('/error-from-sync', (req, res) => {
//   throw new Error('Throwing openly in sync code');
// });

// app.get('/error-from-async', async (req, res) => {
//   throw new Error('throwing openly in async code');
// });

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.use('*splat', (req, res) => {
  throw new Error('Not found', { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => console.log(`\x1b[34mMain app listening at http://localhost:${port}\x1b[0m`));
