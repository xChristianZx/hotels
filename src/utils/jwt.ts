import jwt from 'jsonwebtoken';

type Payload = string | object | Buffer;

const TOKEN_EXPIRATION = '30 days';
const SECRET_KEY = process.env.JWT_KEY!;

export class JWT {
  static async sign(
    payload: Payload,
    options: jwt.SignOptions = { expiresIn: TOKEN_EXPIRATION }
  ) {
    try {
      const token = await jwt.sign(payload, SECRET_KEY, options);
      return token;
    } catch (err) {
      throw new Error('Error signing token');
    }
  }

  static async verify(token: string, options?: jwt.VerifyOptions) {
    try {
      const res = await jwt.verify(token, SECRET_KEY, options);
      return res;
    } catch (err) {
      throw new Error('Invalid Token');
    }
  }
}
