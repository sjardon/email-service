import { IEmailRepository } from '../../domain/repositories/email.repository';
import { EmailEntity } from '../../domain/entities';
import { GetEmailUseCase } from '../../domain/services';

export class GetEmailService implements GetEmailUseCase {
  constructor(private readonly emailRepository: IEmailRepository) {}

  async execute(externalId: string): Promise<EmailEntity | null> {
    try {
      return this.emailRepository.get(externalId);
    } catch (error) {
      const { message } = error as Error;

      console.error(
        `Error trying to get an email with externalId [${externalId}]: ${message}`,
      );

      throw new Error(
        `Error trying to get an email with externalId [${externalId}]`,
      );
    }
  }
}
