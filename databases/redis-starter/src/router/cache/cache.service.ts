import redisClient from '../../clients/redis';
import { CacheResponse } from './cache.types';

export const getCache = async (key: string): Promise<CacheResponse> => {
  const value: string = (await redisClient.get<string>(key)) || '';
  return { key, value };
};

export const setCache = async (
  key: string,
  value: string
): Promise<CacheResponse> => {
  await redisClient.set<string>(key, value);
  return { key, value };
};
