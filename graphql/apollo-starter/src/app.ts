import compression from 'compression';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import { NODE_ENV } from './environments';

const isProduction = NODE_ENV === 'production';

const app = express();
app.use(json());
app.use(
  helmet({
    contentSecurityPolicy: isProduction ? true : false,
    crossOriginEmbedderPolicy: isProduction ? true : false,
  })
);
app.use(compression());
app.use(urlencoded({ extended: true }));

export default app;
