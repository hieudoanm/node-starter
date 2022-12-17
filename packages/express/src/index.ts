import compression, { CompressionOptions } from 'compression';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';
import express, { Express, json, urlencoded } from 'express';
import helmet, { HelmetOptions } from 'helmet';
import morgan from 'morgan';

type ExpressOptions = {
  compressionOptions?: CompressionOptions;
  corsOptions?: CorsOptions;
  helmetOptions: HelmetOptions;
};

const expressDefaultOptions = {
  compressionOptions: {},
  corsOptions: {},
  helmetOptions: {},
};

const init = (
  expressOptions: ExpressOptions = expressDefaultOptions
): Express => {
  const {
    compressionOptions = {},
    corsOptions = {},
    helmetOptions = {},
  } = expressOptions;

  const app = express();
  app.use(json());
  app.use(cookieParser());
  app.use(cors(corsOptions));
  app.use(morgan('combined'));
  app.use(helmet(helmetOptions));
  app.use(urlencoded({ extended: true }));
  app.use(compression(compressionOptions));

  return app;
};

export * from 'tsoa';
export * from './middlewares';
export * from './utils';
export default init;
