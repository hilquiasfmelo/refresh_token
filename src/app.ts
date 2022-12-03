import 'express-async-errors';
import express from 'express';

import { routes } from './routes';
import { errors } from './errors';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors);

app.listen(3333, () => {
  console.log('Server is running on port 3333');
});
