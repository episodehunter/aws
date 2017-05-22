import { User } from '../types';

export const extractUserId = (user: User) => {
  if (!user || !user.sub) {
    return NaN;
  }
  if (typeof user.sub === 'string' && user.sub.includes('|')) {
    return Number(user.sub.split('|')[1]);
  }
  return Number(user.sub);
};

export const generatePolicy = (userId: number, resource: string) => {
  // http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html#api-gateway-custom-authorizer-output
  return {
    principalId: userId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: 'Allow',
        Resource: resource
      }]
    },
    context: {}
  };
};
