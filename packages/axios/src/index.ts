import axios, { AxiosError, AxiosRequestConfig } from 'axios';

class Http {
  private errorHandler(error: Error): string {
    if (error instanceof AxiosError) {
      return error.message || error.stack || 'AxiosError';
    }
    return error.message;
  }

  public async get<T>(
    url: string,
    config: AxiosRequestConfig = {},
    { max = 4, time = 1 }: { max?: number; time?: number } = { max: 4, time: 1 }
  ): Promise<T> {
    try {
      const { data } = await axios.get<T>(url, config);
      return data;
    } catch (error) {
      if (time >= max) {
        const message = this.errorHandler(error as Error);
        throw new Error(message);
      }
      return this.get<T>(url, config, { max, time: time + 1 });
    }
  }

  public async post<T, D>(
    url: string,
    data: D = {} as D,
    config: AxiosRequestConfig = {},
    { max = 4, time = 1 }: { max?: number; time?: number } = { max: 4, time: 1 }
  ): Promise<T> {
    try {
      const response = await axios.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (time >= max) {
        const message = this.errorHandler(error as Error);
        throw new Error(message);
      }
      return this.post<T, D>(url, data, config, { max, time: time + 1 });
    }
  }

  public async put<T, D>(
    url: string,
    data: D = {} as D,
    config: AxiosRequestConfig = {},
    { max = 4, time = 1 }: { max?: number; time?: number } = { max: 4, time: 1 }
  ): Promise<T> {
    try {
      const response = await axios.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (time >= max) {
        const message = this.errorHandler(error as Error);
        throw new Error(message);
      }
      return this.put<T, D>(url, data, config, { max, time: time + 1 });
    }
  }

  public async patch<T, D>(
    url: string,
    data: D = {} as D,
    config: AxiosRequestConfig = {},
    { max = 4, time = 1 }: { max?: number; time?: number } = { max: 4, time: 1 }
  ): Promise<T> {
    try {
      const response = await axios.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (time >= max) {
        const message = this.errorHandler(error as Error);
        throw new Error(message);
      }
      return this.patch<T, D>(url, data, config, { max, time: time + 1 });
    }
  }

  public async delete<T>(
    url: string,
    config: AxiosRequestConfig = {},
    { max = 4, time = 1 }: { max?: number; time?: number } = { max: 4, time: 1 }
  ): Promise<T> {
    try {
      const response = await axios.delete<T>(url, config);
      return response.data;
    } catch (error) {
      if (time >= max) {
        const message = this.errorHandler(error as Error);
        throw new Error(message);
      }
      return this.delete<T>(url, config, { max, time: time + 1 });
    }
  }
}

const http = new Http();

export default http;
