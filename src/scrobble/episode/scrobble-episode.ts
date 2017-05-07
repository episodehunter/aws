import { Connection, entities, getEntityManager } from '@episodehunter/datastore';
import { ScobbleEpisode, User } from '../../types';
import { statusCodes, scrobbleType, Logger } from '../../util';

export const catchDbError = (log: Logger) => (error: Error) => {
  log.captureException(error);
  throw error;
};

export function unixtimestap() {
  return (((new Date()).getTime() / 1000) | 0);
}

async function getSerieId(episode: ScobbleEpisode, db: Connection, log: Logger): Promise<number> {
  const showRepo = db.getRepository(entities.Show);
  const show = await showRepo.findOne({
    tvdb_id: episode.theTvDbId
  });
  if (!show) {
    return NaN;
  }
  return show.id;
}

function addShow(episode: ScobbleEpisode, log: Logger) {
  return;
}

function insertWatchedEpisode(userId: number, showId: number, episode: ScobbleEpisode, db: Connection, log: Logger) {
  const watchedEpisodeRepo = db.getRepository(entities.TvWatched);
  const watchedEpisode = new entities.TvWatched();
  watchedEpisode.user_id = userId;
  watchedEpisode.serie_id = showId;
  watchedEpisode.season = episode.season;
  watchedEpisode.episode = episode.episode;
  watchedEpisode.time = unixtimestap();
  watchedEpisode.type = scrobbleType.plexScrobble;

  return watchedEpisodeRepo.persist(watchedEpisode)
    .catch(catchDbError(log));
}

export async function scrobbleEpisode(episode: ScobbleEpisode, userId: number, database: Connection, log: Logger) {
  const showId = await getSerieId(episode, database, log);
  if (isNaN(showId)) {
    log.captureMessage(`Could not find show with theTvDbId: ${episode.theTvDbId}`);
    return addShow(episode, log);
  }

  return insertWatchedEpisode(userId, showId, episode, database, log);
}
