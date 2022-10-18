import RedisClient from '@hieudoanm/redis';
import { REDIS_URL } from '../../environments';

const redisClient = new RedisClient({ url: REDIS_URL });

export default redisClient;
