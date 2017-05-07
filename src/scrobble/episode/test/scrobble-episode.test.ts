import { spy } from 'simple-spy';
import { catchDbError, unixtimestap } from '../scrobble-episode';

test('Throw an error and log the code', () => {
  const logger = { captureException: spy(() => ({})) };
  const error = new Error('Fel');
  const fn = catchDbError(logger as any).bind(null, error);

  expect(fn).toThrowError('Fel');
  expect(logger.captureException.callCount).toBe(1);
  expect(logger.captureException.args[0][0]).toBe(error);
});

test('Return a unix timestamp', () => {
  const result = unixtimestap();

  expect(result).toBeGreaterThan(1000000000);
  expect(result).toBeLessThan(9000000000);
});
