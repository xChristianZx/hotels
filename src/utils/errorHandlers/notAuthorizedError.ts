import { CustomError } from './customError';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  constructor(message: string = 'Please log in') {
    super(message);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
