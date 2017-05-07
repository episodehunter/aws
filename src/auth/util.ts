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

export const generatePolicy = (principalId: number, resource: any) => {
  const statementOne = {
    Action: 'execute-api:Invoke',
    Effect: 'Allow',
    Resource: resource
  };
  const policyDocument = {
    Version: 1,
    Statement: [ statementOne ]
  };
  return {
    principalId,
    policyDocument
  };
};
