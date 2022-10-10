import { RedisClient } from '@hieudoanm/redis';

export const redis = new RedisClient({ url: 'redis://localhost:6379' });
