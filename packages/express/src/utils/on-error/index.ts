import { HttpError } from 'http-errors';

export const onError = (
  error: HttpError,
  port: string | number | boolean
): string => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  if (error.code === 'EACCES') return `${bind} requires elevated privileges`;
  if (error.code === 'EADDRINUSE') return `${bind} is already in use`;
  return error.stack || error.message;
};

export default onError;
