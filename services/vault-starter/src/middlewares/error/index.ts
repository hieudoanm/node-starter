import { NextFunction, Request, Response } from 'express';
import { ValidateError } from 'tsoa';
import logger from '../../libs/logger';

type BasicError = {
  message: string;
};

export const errorHandler = (
  error: Error | ValidateError | BasicError | undefined,
  _request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (error instanceof ValidateError) {
    logger.error(error, 'ValidateError');
    return response.status(422).json({
      message: 'Validation Failed',
      details: error.fields,
    });
  }

  if (error instanceof Error) {
    logger.error(error, 'Error');
    return response.status(500).json({
      message: error.message || 'Internal Server Error',
    });
  }

  if (error) {
    logger.error(error, 'FallbackError');
    return response.status(500).json({
      message: error.message || 'Internal Server Error',
    });
  }

  next();
};
