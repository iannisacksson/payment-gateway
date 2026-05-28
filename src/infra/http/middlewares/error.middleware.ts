import { Exception } from '@payment-gateway/shared/exception';
import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  console.error(error);
  if (error instanceof Exception) {
    return response
      .status(error.statusCode)
      .json({ error: true, message: error.message });
  }
  return response
    .status(500)
    .json({ error: true, message: 'Internal Server Error' });
};
