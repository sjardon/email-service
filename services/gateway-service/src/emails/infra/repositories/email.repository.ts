import { RedisClient } from '../../../service/infra/databases/redis/redis_client';
import { EmailEntity } from '../../domain/entities';
import { IEmailRepository } from '../../domain/repositories/email.repository';

export class EmailRepository implements IEmailRepository {
  constructor(private readonly dbClient: RedisClient) {}

  private map(email: string) {
    const { externalId, from, to, body, createdAt, status } = JSON.parse(email);

    return new EmailEntity(
      externalId,
      from,
      to,
      body,
      new Date(createdAt),
      status,
    );
  }

  async get(externalId: string): Promise<EmailEntity | null> {
    try {
      const email = await this.dbClient.get(externalId);

      if (email) {
        return this.map(email);
      }

      return null;
    } catch (error) {
      throw new Error(
        `Error trying to save an email with externalId [${externalId}]`,
      );
    }
  }

  async save(externalId: string, email: EmailEntity): Promise<boolean> {
    try {
      await this.dbClient.set(externalId, JSON.stringify(email));

      return true;
    } catch (error) {
      throw new Error(
        `Error trying to save an email with externalId [${externalId}]`,
      );
    }
  }
}
