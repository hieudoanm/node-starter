import { createClient } from 'redis';
import { REDIS_URL } from '../../configs';
import logger from '../logger';

const redisClient = createClient({ url: REDIS_URL });

redisClient.on('error', (error) => logger.error(error, 'Redis Client Error'));

export default redisClient;
