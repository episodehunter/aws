export function createResponse(statusCode: number, message: string) {
  return {
    statusCode,
    body: JSON.stringify({ message })
  };
}

export function isNaturalNumber(num: number) {
  return (typeof num === 'number') && (num > 0);
}

export function parseBody<T = any>(body: string): T {
  try {
    return JSON.parse(body);
  } catch (error) {
    return {} as T;
  }
}
