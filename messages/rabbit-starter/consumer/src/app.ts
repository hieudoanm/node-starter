import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import { RegisterRoutes } from './routes';
import { notFoundHandler } from './middlewares/not-found';
import { errorHandler } from './middlewares/error';

const app = express();
app.use(json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(urlencoded({ extended: true }));

RegisterRoutes(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
