import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import csurf from 'csurf';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error';
import { notFoundHandler } from './middlewares/not-found';
import { RegisterRoutes } from './routes';

const app = express();
app.use(json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use(urlencoded({ extended: true }));

RegisterRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
