import redisClient from '../../libs/redis';
import { CacheResponse } from './cache.types';

export const getCache = async (key: string): Promise<CacheResponse> => {
  const value = (await redisClient.get(key)) || '';
  return { key, value };
};

export const setCache = async (
  key: string,
  value: string
): Promise<CacheResponse> => {
  await redisClient.set(key, value);
  return { key, value };
};
