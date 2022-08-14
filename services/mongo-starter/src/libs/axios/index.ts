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
        const axiosError = { message: error.message, status: error.status };
        reject(error.response?.data || axiosError);
      });
  });
};
