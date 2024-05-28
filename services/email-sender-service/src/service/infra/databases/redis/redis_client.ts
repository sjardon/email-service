import * as redis from 'redis';
// console.warn

export class RedisClient {
  private client;

  private buildRedisUrl(
    host: string,
    port: number,
    username?: string,
    password?: string,
  ): string {
    let url = `redis://`;
    if (username && password) {
      url += `${encodeURIComponent(username)}:${encodeURIComponent(password)}@`;
    }
    url += `${host}:${port}`;
    return url;
  }

  constructor() {
    const url: any = this.buildRedisUrl(
      process.env.REDIS_HOST_CONNECTION || 'redis',
      Number(process.env.REDIS_PORT),
      process.env.REDIS_USERNAME,
      process.env.REDIS_PASSWORD,
    );

    this.client = redis.createClient({ url });

    this.client.on('error', (error: any) => {
      console.error(`Error connecting to Redis in [${url}]:`, error);
    });
  }

  async expire(key: string, expirationInSeconds: number): Promise<void> {
    await this.client.expire(key, expirationInSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async keys(pattern: string): Promise<string[] | null> {
    return this.client.keys(pattern);
  }

  async set(
    key: string,
    value: string,
    expirationInSeconds?: number,
  ): Promise<void> {
    await this.client.set(key, value);

    if (expirationInSeconds) {
      await this.expire(key, expirationInSeconds);
    }
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }

  async quit(): Promise<void> {
    await this.client.quit();
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async subscribe(
    channel: string,
    messageHandler: (channel: string, message: any) => void,
  ): Promise<void> {
    await this.client.subscribe(channel, messageHandler);
  }

  async testConnection(): Promise<void> {
    const testKey = 'startupTestKey';
    const testValue = 'testValue';
    try {
      await this.client.connect();
      await this.set(testKey, testValue, 30);
      const value = await this.get(testKey);
      if (value === testValue) {
        console.log('Successfully connected to redis');
      } else {
        const error = new Error(
          'Failed to connect to Redis. Unexpected value retrieved',
        );
        console.error('error connection to Redis', error);
        throw error;
      }
    } catch (error) {
      console.error('failed to connect to Redis:', error as Error);
      throw error;
    }
  }

  duplicate() {
    return this.client.duplicate();
  }
}
