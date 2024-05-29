import { EmailEntity } from '../../../domain/entities/email.entity';
import { IEmailRepository } from '../../../domain/repositories/email.repository';

export class MockedEmailRepository implements IEmailRepository {
  source: Map<string, EmailEntity> = new Map();

  async get(externalId: string): Promise<EmailEntity | null> {
    const foundEmail = this.source.get(externalId);

    return foundEmail || null;
  }

  async save(email: EmailEntity): Promise<EmailEntity> {
    const { externalId } = email;

    this.source.set(externalId, email);

    return email;
  }
}
