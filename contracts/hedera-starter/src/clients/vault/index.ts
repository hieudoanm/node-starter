import { VAULT_ENDPOINT, VAULT_TOKEN } from '../../configs';
import { axiosGet, axiosPost } from '../../libs/axios';

export const getVaultSecret = async <T>(path: string): Promise<T> => {
  try {
    const url = `${VAULT_ENDPOINT}/v1/secret/data/${path}`;
    const headers = { 'X-Vault-Token': VAULT_TOKEN };
    const response = await axiosGet<{ data: { data: T } }>(url, { headers });
    return response.data.data || ({} as T);
  } catch (error) {
    throw new Error('getVaultSecret Error');
  }
};

export const setVaultSecret = async <T>(
  path: string,
  data: T
): Promise<void> => {
  const url = `${VAULT_ENDPOINT}/v1/secret/data/${path}`;
  const headers = { 'X-Vault-Token': VAULT_TOKEN };
  const {
    data: { destroyed },
  } = await axiosPost<{ data: { destroyed: boolean } }, { data: T }>(
    url,
    { data },
    { headers }
  );
  if (destroyed) {
    throw new Error('Secret Destroyed');
  }
};
