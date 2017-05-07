const jwt = require('jsonwebtoken');
import { User } from '../types';

export function createValidator(secret: string, audience: string): (token: string) => Promise<User> {
  return (token: string) => {
    return new Promise<User>((resolve, reject) => {
      jwt.verify(token, secret, { audience }, (err: Error, decoded: User) => {
        if (err) {
          reject(new Error('Unauthorized'));
        } else {
          resolve(decoded);
        }
      });
    });
  };
}

export function assertSupportedTokenSchema(type: string) {
  if (type !== 'Bearer') {
    throw new Error('[400] Unknown token schema');
  }
  return true;
}
