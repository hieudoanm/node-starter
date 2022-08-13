import { Client } from 'elasticsearch';
import logger from '../logger';

let client: Client | null = null;

const getClient = () => {
  if (client !== null) {
    return client;
  }

  client = new Client({ hosts: [] });
  return client;
};

export const healthCheck = () => {
  const esClient = getClient();
  return new Promise((resolve, reject) => {
    esClient.cluster.health({}, (error, response) => {
      logger.error({ error, response }, 'healthCheck');
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

export const createIndex = (index: string) => {
  const esClient = getClient();
  return new Promise((resolve, reject) => {
    esClient.indices.create({ index }, (error, response, status) => {
      logger.error({ error, response, status }, 'deleteIndex');
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

export const deleteIndex = (index: string) => {
  const esClient = getClient();
  return new Promise((resolve, reject) => {
    esClient.indices.delete({ index }, (error, response, status) => {
      logger.error({ error, response, status }, 'deleteIndex');
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

export const addItemToIndex = <T>(
  index: string,
  type: string,
  item: T & { id: string }
) => {
  const esClient = getClient();
  return new Promise((resolve, reject) => {
    esClient.index(
      { index, type, id: item.id, body: item },
      (error, response) => {
        logger.error({ error, response }, 'addItemToIndex');
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  });
};

export const deleteItemFromIndex = (
  index: string,
  type: string,
  id: string
) => {
  const esClient = getClient();
  return new Promise((resolve, reject) => {
    esClient.delete({ index, type, id }, (error, response) => {
      logger.error({ error, response }, 'deleteItemFromIndex');
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};

export const search = (index: string, type: string, body: any) => {
  const esClient = getClient();
  return new Promise((resolve, reject) => {
    esClient.search({ index, type, body }, (error, response) => {
      logger.error({ error, response }, 'search');
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
};
