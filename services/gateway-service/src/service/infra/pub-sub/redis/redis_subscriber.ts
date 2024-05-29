import { Subscriber } from '../../../domain';
import { RedisClient } from '../../databases/redis/redis_client';

export class RedisSubscriber implements Subscriber {
  private client;

  constructor(redisClient: RedisClient) {
    this.client = redisClient.duplicate();
  }

  async subscribe(
    channel: string,
    messageHandler: (channel: string, message: string) => void,
  ): Promise<void> {
    await this.client.connect();

    await this.client.subscribe(channel, messageHandler);
  }

  async quit(): Promise<void> {
    await this.client.quit();
  }
}
