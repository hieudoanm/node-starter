import logger from '@hieudoanm/pino';
import RedisClient from '@hieudoanm/redis';
import configs from '../environments';

export const subscribers = (redis: RedisClient) => {
  redis.subscribe(configs.redis.channel, (message: string) => {
    logger.info(`Message: ${message}`);
  });
};
