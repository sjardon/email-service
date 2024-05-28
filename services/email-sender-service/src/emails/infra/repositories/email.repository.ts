import { EmailEntity, EmailModel } from '../../domain/entities/email.entity';
import { IEmailRepository } from '../../domain/repositories/email.repository';

export class EmailRepository implements IEmailRepository {
  // constructor(private readonly dbClient: MongoClient) {}
  async get(externalId: string): Promise<EmailEntity | null> {
    const foundEmail = await EmailModel.findOne({ externalId }).exec();

    if (!foundEmail) {
      return null;
    }

    const { from, to, body, createdAt, status, _id } = foundEmail;

    return new EmailEntity(
      externalId,
      from,
      to,
      body,
      createdAt,
      status,
      _id.toString(),
    );
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
