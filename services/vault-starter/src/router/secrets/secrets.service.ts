import logger from '../../libs/logger';
import { getSecret, setSecret } from '../../libs/vault';
import { SecretResponse } from './secrets.types';

export const getSecretAsString = async (
  path: string
): Promise<SecretResponse> => {
  logger.info(path, 'path');
  const value: string = await getSecret<string>(path);
  return { path, value };
};
export const setSecretAsString = async (
  path: string,
  value: string
): Promise<SecretResponse> => {
  logger.info(path, 'path');
  await setSecret<string>(path, value);
  return { path, value };
};
