import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import csurf from 'csurf';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';

const app = express();
app.use(json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
// app.use(csurf({ cookie: true }));
app.use(urlencoded({ extended: true }));

export default app;
