import { Client } from 'elasticsearch';

export class ElasticSearchClient {
  private client: Client;

  constructor({ hosts = [] }: { hosts: string[] }) {
    this.client = new Client({ hosts });
  }

  public async healthCheck<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.cluster.health({}, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  public async createIndex<T>(index: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.indices.create({ index }, (error, response, status) => {
        console.log('createIndex() status', status);
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  public async deleteIndex<T>(index: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.client.indices.delete({ index }, (error, response, status) => {
        console.log('deleteIndex() status', status);
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  public addItemToIndex<T>(
    index: string,
    type: string,
    item: T & { id: string }
  ) {
    return new Promise((resolve, reject) => {
      this.client.index(
        { index, type, id: item.id, body: item },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }

  public async deleteItemFromIndex(index: string, type: string, id: string) {
    return new Promise((resolve, reject) => {
      this.client.delete({ index, type, id }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  public async search<T>(index: string, type: string, body: T) {
    return new Promise((resolve, reject) => {
      this.client.search({ index, type, body }, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }
}
