import { EmailEntity } from '../entities';

export interface IEmailRepository {
  get(externalId: string): Promise<EmailEntity | null>;
  save(externalId: string, email: EmailEntity): Promise<boolean>;
}
