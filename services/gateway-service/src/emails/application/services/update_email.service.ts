import { EmailEntity } from '../../domain/entities';
import { IEmailRepository } from '../../domain/repositories/email.repository';
import {
  UpdateEmailInput,
  UpdateEmailUseCase,
} from '../../domain/services/update_email.usecase';

export class UpdateEmailService implements UpdateEmailUseCase {
  constructor(private readonly emailRepository: IEmailRepository) {}

  async execute(
    externalId: string,
    input: UpdateEmailInput,
  ): Promise<EmailEntity> {
    const { from, to, body, createdAt, status } = input;

    try {
      const email = new EmailEntity(
        externalId,
        from,
        to,
        body,
        createdAt,
        status,
      );

      await this.emailRepository.save(externalId, email);

      return email;
    } catch (error) {
      const { message } = error as Error;
      console.error(message);

      throw new Error(
        `Error trying to update an email with from [${from}] and to [${to}]`,
      );
    }
  }
}
