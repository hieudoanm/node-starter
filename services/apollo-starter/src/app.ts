import express, { errorHandler, notFoundHandler } from '@hieudoanm/express';
import { NODE_ENV } from './environments';

const isProduction = NODE_ENV === 'production';
const helmetOptions = {
  contentSecurityPolicy: isProduction ? true : false,
  crossOriginEmbedderPolicy: isProduction ? true : false,
};

const app = express({ helmetOptions });

app.use(notFoundHandler({ whitelist: ['/graphql'] }));
app.use(errorHandler);

export default app;
