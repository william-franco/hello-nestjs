import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import { hello } from './hello';
import { user } from './user';

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 7000;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({ responseText: hello });
});

app.get('/user', (req: Request, res: Response, next: NextFunction) => {
    res.json({ responseText: user });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});