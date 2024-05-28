import { Publisher } from '../../../domain';
import { RedisClient } from '../../databases/redis/redis_client';

export class RedisPublisher implements Publisher {
  private client;

  constructor(redisClient: RedisClient) {
    this.client = redisClient.duplicate();
  }

  async connect() {
    await this.client.connect();
  }

  async publish(channel: string, message: string): Promise<number> {
    return await this.client.publish(channel, message);
  }

  async quit(): Promise<void> {
    await this.client.quit();
  }
}
