import express from '@hieudoanm/express';
import { errorHandler } from './middlewares/error';
import { notFoundHandler } from './middlewares/not-found';
import { RegisterRoutes } from './routes';

const app = express({ cors: true });

RegisterRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
