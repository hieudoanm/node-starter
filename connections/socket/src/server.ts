import dotenv from '@hieudoanm/dotenv';
const NODE_ENV = process.env.NODE_ENV || 'development';
NODE_ENV === 'development' && dotenv.config();

import { normalizePort, onError, onListening } from '@hieudoanm/fast';
import logger from '@hieudoanm/pino';
import http from 'http';
import { HttpError } from 'http-errors';
import { Server } from 'socket.io';
import app from './app';

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

// Create HTTP server.
const httpServer = http.createServer(app);

const main = async () => {
  // Socket Server
  const io = new Server(httpServer, {
    cors: { origin: ['http://localhost:3000'], credentials: true },
  });
  io.on('connection', (webSocket) => {
    const { id, connected } = webSocket;
    logger.info('Client connected', { id, connected });
    webSocket.on('close', () => logger.info('Client disconnected'));

    const oneSecond = 1000;
    setInterval(() => {
      const dateTime = new Date().toISOString();
      webSocket.emit('date-time', dateTime);
    }, oneSecond * 5);
  });
  // HTTP Server
  httpServer.listen(port);
  httpServer.on('listening', () => {
    const message = onListening(httpServer);
    logger.info(message);
  });
  httpServer.on('error', (error: HttpError) => {
    const message = onError(error, port);
    logger.info(message);
    process.exit(1);
  });
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
