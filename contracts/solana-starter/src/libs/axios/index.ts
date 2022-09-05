import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import logger from '../logger';

export const axiosGet = <T>(
  url: string,
  configs: AxiosRequestConfig = {}
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios
      .get<T>(url, configs)
      .then((response: AxiosResponse<T>) => {
        return resolve(response.data);
      })
      .catch((error: AxiosError<T>) => {
        logger.error({ error }, 'AxiosError');
        return reject(error.response?.data);
      });
  });
};

export const axiosPost = <T, D>(
  url: string,
  data: D,
  configs: AxiosRequestConfig = {}
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios
      .post<T, AxiosResponse<T>>(url, data, configs)
      .then((response: AxiosResponse<T>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<T>) => {
        logger.error(error, 'AxiosError');
        reject(error.response?.data);
      });
  });
};
