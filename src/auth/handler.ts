import { ServerlessEvent, Context } from '../types';
import { createValidator, assertSupportedTokenSchema } from './token-validator';
import { extractUserId, generatePolicy } from './util';

const haveAllConfig = [ 'EH_JWT_SECRET', 'EH_JWT_AUDIENCE' ]
  .map(key => process.env[key])
  .every(Boolean);

if (!haveAllConfig) {
  throw new Error('Missing config!');
}

const jwtValidator = createValidator(process.env.EH_JWT_SECRET, process.env.EH_JWT_AUDIENCE);

export function auth(event: ServerlessEvent, context: Context, callback: (error: Error | null, data?: any) => void) {
  Promise.resolve(event.authorizationToken)
    .then(token => token.split(' '))
    .then(([ type, token ]) => {
      assertSupportedTokenSchema(type);
      return jwtValidator(token);
    })
    .then(user => extractUserId(user))
    .then(userId => callback(null, generatePolicy(userId, event.methodArn)))
    .catch(error => callback(error));
}
