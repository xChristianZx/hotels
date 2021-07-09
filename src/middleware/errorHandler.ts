import { ErrorRequestHandler } from 'express';
import { CustomError } from '../utils/errorHandlers/customError';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (!err.statusCode) err.statusCode = 500;

  console.error(err);
  return res.status(err.statusCode).send({ errors: [err.toString()] });
};
