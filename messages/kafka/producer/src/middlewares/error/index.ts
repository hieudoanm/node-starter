import { ValidateError } from '@hieudoanm/fast';
import logger from '@hieudoanm/pino';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error | ValidateError | undefined,
  _request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (error instanceof ValidateError) {
    logger.error('ValidateError', error);
    return response.status(422).json({
      message: 'Validation Failed',
      details: error.fields,
    });
  }

  if (error instanceof Error) {
    logger.error('Error', error);
    return response.status(500).json({
      message: error.message || 'Internal Server Error',
    });
  }

  if (error) {
    logger.error('FallbackError', error);
    return response.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
};
