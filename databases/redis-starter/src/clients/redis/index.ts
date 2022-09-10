import { RedisClient } from '@turtle/redis';
import { REDIS_URL } from '../../configs';

const redisClient = new RedisClient({ url: REDIS_URL });

export default redisClient;
