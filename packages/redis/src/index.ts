import {
  createClient,
  RedisClientOptions,
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';

class RedisClient {
  private client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;

  constructor(options: RedisClientOptions) {
    this.client = createClient(options);

    this.client.on('error', (error: Error) => {
      console.error('Redis Error', error);
    });
  }

  public async connect(): Promise<void> {
    await this.client.connect();

    this.client.on('connect', () => {
      console.info('Redis is connected');
    });
  }

  public async get<T>(key: string): Promise<T> {
    const valueString = (await this.client.get(key)) || '';
    try {
      return JSON.parse(valueString);
    } catch (error) {
      return valueString as T;
    }
  }

  public async set<T = string>(key: string, value: T): Promise<string> {
    const valueString: string =
      typeof value === 'object' ? JSON.stringify(value) : (value as string);
    return (await this.client.set(key, valueString)) || '';
  }

  public async delete(key: string): Promise<number> {
    return this.client.del(key);
  }

  public async publish(channel: string, message: string): Promise<number> {
    return this.client.publish(channel, message);
  }

  public async subscribe(
    channel: string | string[],
    callback: (message: string) => void
  ): Promise<void> {
    return this.client.subscribe(channel, callback);
  }

  public async pSubscribe(
    channel: string | string[],
    callback: (message: string) => void
  ): Promise<void> {
    return this.client.pSubscribe(channel, callback);
  }
}

export * from 'redis';
export default RedisClient;
