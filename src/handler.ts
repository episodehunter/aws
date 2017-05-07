import { createResponse } from './util';

export const ping = (event: any, context: any, callback: any) => callback(null, createResponse(200, 'Pong'));
