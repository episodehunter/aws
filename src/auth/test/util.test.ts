import { extractUserId } from '../util';

test('Extract the user id from a sub string', () => {
  const user = {
    sub: 'hello|5'
  };
  const result = extractUserId(user as any);

  expect(result).toBe(5);
});

test('Convert the id from a string to a id', () => {
  const user = {
    sub: '7'
  };
  const result = extractUserId(user as any);

  expect(result).toBe(7);
});

test('Return NaN if it doesn\'t make any sense', () => {
  const user = {
    sub: 'one'
  };
  const result = extractUserId(user as any);

  expect(isNaN(result)).toBe(true);
});

test('Return NaN if the sub is missing', () => {
  const user = {};
  const result = extractUserId(user as any);

  expect(isNaN(result)).toBe(true);
});
