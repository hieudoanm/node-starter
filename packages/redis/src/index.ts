import { createClient } from 'redis';

export class RedisClient {
  private client: any;
  private url: string;

  constructor({ url }: { url: string }) {
    this.url = url;
  }

  public async connect() {
    this.client = createClient({ url: this.url });

    await this.client.connect();

    this.client.on('error', (error: Error) =>
      console.error('Redis Client Error', error)
    );
  }

  public async get<T>(key: string): Promise<T> {
    return this.client.get(key);
  }

  public async set<T = string>(key: string, value: T): Promise<void> {
    const valueString: string =
      typeof value === 'object' ? JSON.stringify(value) : (value as string);
    this.client.set(key, valueString);
  }
}
