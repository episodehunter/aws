import { validateEpisode } from '../handler';

test('An episode is valid if all keys are numbers', () => {
  const episode = {
    theTvDbId: 1,
    season: 2,
    episode: 3
  };
  const result = validateEpisode(episode);

  expect(result).toBe(true);
});

test('An episode is invalid if some key is a string', () => {
  const episode = {
    theTvDbId: 1,
    season: '2',
    episode: 3
  };
  const result = validateEpisode(episode as any);

  expect(result).toBe(false);
});

test('An episode is invalid if some key is missing', () => {
  const episode = {
    theTvDbId: 1,
    episode: 3
  };
  const result = validateEpisode(episode as any);

  expect(result).toBe(false);
});
