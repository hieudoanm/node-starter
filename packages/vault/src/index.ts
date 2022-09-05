import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class Vault {
  private endpoint = '';
  private token = '';

  constructor({ endpoint, token }: { endpoint: string; token: string }) {
    this.endpoint = endpoint;
    this.token = token;
  }

  private request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      axios(config)
        .then((response: AxiosResponse<T>) => resolve(response.data))
        .catch((error: AxiosError) => reject(error));
    });
  }

  public async getVaultSecret<T>(path: string): Promise<T> {
    try {
      const url = `${this.endpoint}/v1/secret/data/${path}`;
      const headers = { 'X-Vault-Token': this.token };
      const response = await this.request<{ data: { data: T } }>({
        url,
        headers,
      });
      return response.data.data || ({} as T);
    } catch (error) {
      throw new Error('getVaultSecret Error');
    }
  }

  public async setVaultSecret<T>(path: string, data: T): Promise<void> {
    const url = `${this.endpoint}/v1/secret/data/${path}`;
    const headers = { 'X-Vault-Token': this.token };
    const {
      data: { destroyed },
    } = await this.request<{ data: { destroyed: boolean } }>({
      url,
      data,
      headers,
      method: 'POST',
    });
    if (destroyed) {
      throw new Error('Secret Destroyed');
    }
  }
}
