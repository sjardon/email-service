import { redisSubscriber } from '../../../service/infra/dependencies';
import { updateEmailHandler } from './message-handlers';

export async function listenEmailSubscribers() {
  await redisSubscriber.subscribe('email.update', updateEmailHandler);
}
