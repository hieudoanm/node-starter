import logger from '../../libs/logger';
import { getSecret, setSecret } from '../../libs/vault';
import { SecretResponse } from './secrets.types';

export const getSecretAsString = async (
  path: string
): Promise<SecretResponse> => {
  logger.info(path, 'path');
  const data = await getSecret<Record<string, string>>(path);
  return { path, data };
};
export const setSecretAsString = async (
  path: string,
  data: Record<string, string>
): Promise<SecretResponse> => {
  logger.info(path, 'path');
  await setSecret(path, data);
  return { path, data };
};
