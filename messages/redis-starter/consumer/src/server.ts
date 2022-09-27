import dotenv from 'dotenv';
const NODE_ENV = process.env.NODE_ENV || 'development';
NODE_ENV === 'development' && dotenv.config();

import logger from '@hieudoanm/pino';
import http from 'http';
import { HttpError } from 'http-errors';
import app from './app';
import configs from './environments';
import { redis } from './libs/redis';
import { normalizePort, onError, onListening } from './utils/server';

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '4001');
app.set('port', port);

// Create HTTP server.
const httpServer = http.createServer(app);

const main = async () => {
  redis.subscribe(configs.redis.channel, (error, count) => {
    if (error) logger.error(error.message);
    logger.info(`Subscribed to ${count} channels.`);
  });

  redis.on('message', (channel, message) => {
    logger.info(`Received message from ${channel} channel.`);
    logger.info(JSON.parse(message));
  });

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
