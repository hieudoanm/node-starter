import dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV || 'development';
NODE_ENV === 'development' && dotenv.config();

import logger from '@hieudoanm/pino';
import http from 'http';
import { HttpError } from 'http-errors';
import configs from './environments';
import { rabbitClient } from './libs/rabbit';
import app from './app';
import { normalizePort, onError, onListening } from './utils/server';

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

// Create HTTP server.
const httpServer = http.createServer(app);

const main = async () => {
  await rabbitClient.init();
  await rabbitClient.assertQueue(configs.rabbit.queue);

  httpServer.listen(port);
  httpServer.on('listening', () => onListening(httpServer));
  httpServer.on('error', (error: HttpError) => onError(error, port));
};

main().catch((error: Error) => logger.error('Error', error));

process.on('unhandledRejection', (reason: string) => {
  // I just caught an unhandled promise rejection,
  // since we already have fallback handler for unhandled errors (see below),
  // let throw and let him handle that
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  // I just received an error that was never handled, time to handle it and then decide whether a restart is needed
  logger.error('Error', error);
  process.exit(1);
});
