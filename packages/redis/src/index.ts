import { createClient } from 'redis';

export class RedisClient {
  private client: any;
  private url: string;

  constructor({ url }: { url: string }) {
    this.url = url;
    this.client = createClient({ url: this.url });
  }

  public async connect() {
    await this.client.connect();

    this.client.on('connect', function () {
      console.log('Redis is connected');
    });

    this.client.on('ready', function () {
      console.log('Redis is ready');
    });

    this.client.on('error', (error: Error) =>
      console.error('Redis Error', error)
    );
  }

  public async get<T = string>(key: string): Promise<T> {
    const valueString = this.client.get(key);
    try {
      return JSON.parse(valueString);
    } catch (error) {
      console.error('Redis get() Error', error);
      return valueString;
    }
  }

  public async set<T = string>(key: string, value: T): Promise<void> {
    const valueString: string =
      typeof value === 'object' ? JSON.stringify(value) : (value as string);
    return this.client.set(key, valueString);
  }

  public async delete(key: string): Promise<void> {
    return this.client.del(key);
  }
}
