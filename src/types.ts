export interface ScobbleEpisode {
  theTvDbId: number;
  season: number;
  episode: number;
  [index: string]: number;
}

export interface User {
  sub: string;
  id: string;
}

export interface ServerlessEvent {
  body: string;
  headers: any;
  path: string;
  pathParameters: any;
  requestContext: {
    authorizer: {
      principalId: number;
    };
    stage: string;
    accountId: string;
    resourceId: string;
    requestId: string;
    resourcePath: string;
    httpMethod: string;
  };
  authorizationToken: string;
  methodArn: string;
  resource: string;
  httpMethod: string;
  queryStringParameters: any;
  stageVariables: any;
  isOffline: boolean;
}

export interface Context {
  done: () => void;
  succeed: () => void;
  fail: () => void;
  getRemainingTimeInMillis: () => number;
  functionName: string;
  memoryLimitInMB: number;
  functionVersion: string;
  invokedFunctionArn: string;
  awsRequestId: string;
  logGroupName: string;
  logStreamName: string;
  identity: any;
  clientContext: any;
}
