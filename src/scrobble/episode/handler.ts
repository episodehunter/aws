import { connect } from '@episodehunter/datastore';
import { ServerlessEvent, Context, ScobbleEpisode } from '../../types';
import { statusCodes, createLogger, createResponse, isNaturalNumber, parseBody } from '../../util';
import { scrobbleEpisode } from './scrobble-episode';

const haveAllConfig = [
  'EH_DB_HOST',
  'EH_DB_PORT',
  'EH_DB_USERNAME',
  'EH_DB_PASSWORD',
  'EH_DB_DATABASE',
  'EH_RAVEN_DSN',
  'EH_RAVEN_PROJECT'
]
  .map(key => process.env[key])
  .every(Boolean);

if (!haveAllConfig) {
  throw new Error('Missing config!');
}

const logger = createLogger(process.env.EH_RAVEN_DSN, process.env.EH_RAVEN_PROJECT);

export function validateEpisode(episode: ScobbleEpisode) {
  return ['theTvDbId', 'season', 'episode'].every(key => typeof episode[key] === 'number');
}

module.exports.scrobble = async (event: ServerlessEvent, context: any, callback: any) => {
  const userId = event.requestContext.authorizer.principalId;
  if (!isNaturalNumber(userId)) {
    return callback(new Error('[500] Somthing is wrong, your user id is missing in the request'));
  }
  const episode = parseBody<ScobbleEpisode>(event.body);
  if (!validateEpisode(episode)) {
    return callback(null, createResponse(200, 'Invalid episode'));
  }

  const connection = await connect({
    database: process.env.EH_DB_DATABASE,
    host: process.env.EH_DB_HOST,
    password: process.env.EH_DB_PASSWORD,
    port: process.env.EH_DB_PORT,
    username: process.env.EH_DB_USERNAME
  });

  try {
    await scrobbleEpisode(episode, userId, connection, logger);
    callback(null, createResponse(200, 'Great success!'));
  } catch (error) {
    logger.captureException(error);
    callback(new Error('Internal Server Error'));
  } finally {
    connection.close();
  }
};
