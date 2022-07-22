import express, { json, urlencoded } from 'express';
import { errorHandler } from './middlewares/error';
import { notFoundHandler } from './middlewares/not-found';
import { RegisterRoutes } from './routes';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

RegisterRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
