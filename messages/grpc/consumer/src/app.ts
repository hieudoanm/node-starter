import express, { errorHandler, notFoundHandler } from '@hieudoanm/fast';
import { RegisterRoutes } from './routes';

const app = express();

RegisterRoutes(app);

app.use(notFoundHandler());
app.use(errorHandler);

export default app;
