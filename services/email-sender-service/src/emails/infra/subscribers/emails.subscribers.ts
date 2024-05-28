import { redisSubscriber } from '../../../service/infra/dependencies';
import { createEmailHandler } from './message-handlers';

export async function listenEmailSubscribers() {
  await redisSubscriber.subscribe('email.send', createEmailHandler);
}
