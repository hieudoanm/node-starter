import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import logger from '../logger';

export const axiosGet = <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios
      .get<T>(url, config)
      .then((response: AxiosResponse<T>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<T>) => {
        logger.error(error, 'AxiosError');
        reject(error.response?.data);
      });
  });
};

export const axiosPost = <T, D>(
  url: string,
  data: D,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios
      .post<T>(url, data, config)
      .then((response: AxiosResponse<T>) => {
        resolve(response.data);
      })
      .catch((error: AxiosError<T>) => {
        logger.error(error, 'AxiosError');
        reject(error.response?.data);
      });
  });
};
