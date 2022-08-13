import { Request, Response } from 'express';

export const notFoundHandler = (_request: Request, response: Response) => {
  return response.status(404).json({ message: 'Not Found' });
};
