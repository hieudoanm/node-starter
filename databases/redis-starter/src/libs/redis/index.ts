import logger from '@turtle/logger';
import { createClient } from 'redis';
import { REDIS_URL } from '../../configs';

const redisClient = createClient({ url: REDIS_URL });

redisClient.on('error', (error) => logger.error(error, 'Redis Client Error'));

export default redisClient;
