import { ValidationError } from 'express-validator';
import { CustomError } from './customError';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      if (err.hasOwnProperty('msg')) {
        return { message: err.msg, field: err.param };
      } else {
        return { message: err, field: '' };
      }
    });
  }
}
