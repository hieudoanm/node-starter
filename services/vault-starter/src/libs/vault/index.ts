import Vault from 'node-vault';
import { VAULT_ENDPOINT, VAULT_TOKEN } from '../../configs';
import logger from '../logger';

let vault: Vault.client | null = null;

export const getVault = () => {
  if (vault !== null) {
    return vault;
  }

  logger.info(VAULT_ENDPOINT);
  logger.info(VAULT_TOKEN);

  vault = Vault({
    apiVersion: 'v2',
    endpoint: VAULT_ENDPOINT,
    token: VAULT_TOKEN,
  });

  vault
    .init({ secret_shares: 1, secret_threshold: 1 })
    .then((result) => logger.info(result))
    .catch((error) => logger.error(error, 'Vault Init Error'));

  return vault;
};

export const getSecret = async <T>(path: string): Promise<T> => {
  return getVault().read(path);
};

export const setSecret = async <T>(path: string, value: T): Promise<T> => {
  return getVault().write(path, { data: value });
};
