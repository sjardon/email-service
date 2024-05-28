import { listenEmailSubscribers } from '../../../emails/infra/subscribers/emails.subscribers';

export async function listenServiceSubscribers() {
  await listenEmailSubscribers();
}
