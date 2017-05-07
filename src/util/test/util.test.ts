import { isNaturalNumber } from '../util';

test('A user is valid if the id key is a number', () => {
  const userId = 1;
  const result = isNaturalNumber(userId);

  expect(result).toBe(true);
});

test('A user is invalid if the id key is less then 1', () => {
  const userId = 0;
  const result = isNaturalNumber(userId);

  expect(result).toBe(false);
});

test('A user is invalid if the id key is NaN', () => {
  const userId = NaN;
  const result = isNaturalNumber(userId);

  expect(result).toBe(false);
});
