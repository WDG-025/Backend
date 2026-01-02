import express, { type Request } from 'express';

type PostRequestBody = {
	title: string;
	content: string;
};

const app = express();

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/posts', (req, res) => {
	res.json({ message: 'GET Posts' });
});

app.post('/posts', (req: Request<{}, {}, PostRequestBody>, res) => {
	console.log(req.body);
	console.log(req.body.content);

	res.send('posts data');
});

app.get('/posts/:id/:name', (req, res) => {
	console.log(req.params.id);
	console.log(req.params);
	res.json({ message: 'GET a post by id' });
});

app.put('/posts/:id', (req, res) => {
	//
	res.json({ message: 'PUT post by id' });
});

app.delete('/posts/:id', (req, res) => {
	res.json({ message: 'Delete post by id' });
});

app.listen(port, () => console.log('Server is running'));
