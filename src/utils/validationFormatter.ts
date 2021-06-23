import { ValidationError } from 'express-validator';

export function validationFormatter({
  location,
  param,
  msg,
  value,
  nestedErrors,
}: ValidationError) {
  return msg;
}
