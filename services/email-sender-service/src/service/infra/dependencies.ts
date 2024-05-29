import { CircuitBreaker } from './circuit-breaker/circuit_breaker';
import { MongoClient } from './databases/mongo/mongo_client';
import { RedisClient } from './databases/redis/redis_client';
import { mailgunClientFactory } from './email-clients/mailgun/mailgun_client_factory';
import { sendgridClientFactory } from './email-clients/sendgrid/sendgrid_client_factory';
import { MailgunEmailProvider } from './providers/email/mailgun/mailgun_email_provider';
import { SendgridEmailProvider } from './providers/email/sendgrid/sendgrid_email_provider';
import { RedisPublisher } from './pub-sub/redis/redis_publisher';
import { RedisSubscriber } from './pub-sub/redis/redis_subscriber';

export const redisClient = new RedisClient();
export const redisPublisher = new RedisPublisher(redisClient);
export const redisSubscriber = new RedisSubscriber(redisClient);
export const mongoClient = new MongoClient();

export const mailgunClient = mailgunClientFactory();

export const sendgridClient = sendgridClientFactory();

const circuitBreakerConfig = {
  failureThreshold: 1,
  recoveryTimeout: 10000,
};

export const mailgunEmailProvider = new MailgunEmailProvider(
  new CircuitBreaker(circuitBreakerConfig),
  mailgunClient,
);

export const sendgridEmailProvider = new SendgridEmailProvider(
  new CircuitBreaker(circuitBreakerConfig),
  sendgridClient,
);
