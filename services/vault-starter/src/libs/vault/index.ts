import { VAULT_ENDPOINT, VAULT_TOKEN } from '../../configs';
import { axiosGet, axiosPost } from '../axios';

export const getSecret = async <T>(path: string): Promise<T> => {
  const url = `${VAULT_ENDPOINT}/v1/secret/data/${path}`;
  const headers = { 'X-Vault-Token': VAULT_TOKEN };
  const response = await axiosGet<{ data: { data: T } }>(url, { headers });
  return response.data.data || ({} as T);
};

export const setSecret = async <T>(path: string, data: T): Promise<T> => {
  const url = `${VAULT_ENDPOINT}/v1/secret/data/${path}`;
  const headers = { 'X-Vault-Token': VAULT_TOKEN };
  const { value } = await axiosPost<{ value: T }, { data: T }>(
    url,
    { data },
    { headers }
  );
  return value;
};
