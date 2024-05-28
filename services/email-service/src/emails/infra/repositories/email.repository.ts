import { EmailEntity, EmailModel } from '../../domain/entities/email.entity';
import { IEmailRepository } from '../../domain/repositories/email.repository';

export class EmailRepository implements IEmailRepository {
  // constructor(private readonly dbClient: MongoClient) {}
  get(externalId: string): Promise<EmailEntity | null> {
    throw new Error('Method not implemented.' + externalId);
  }

  async save(email: EmailEntity): Promise<EmailEntity> {
    try {
      const emailModel = new EmailModel(email);

      const { externalId, from, to, body, createdAt, status, _id } =
        await emailModel.save();

      return new EmailEntity(
        externalId,
        from,
        to,
        body,
        createdAt,
        status,
        _id.toString(),
      );
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
