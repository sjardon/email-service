import { RedisClient } from './databases/redis/redis_client';
import { RedisPublisher } from './pub-sub/redis/redis_publisher';
import { RedisSubscriber } from './pub-sub/redis/redis_subscriber';

export const redisClient = new RedisClient();
export const redisPublisher = new RedisPublisher(redisClient);
export const redisSubscriber = new RedisSubscriber(redisClient);
