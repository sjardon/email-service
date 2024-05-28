import { Publisher } from '../../../service/domain';
import { EmailProvider } from '../../../service/domain/providers/email/email_provider';
import {
  EmailEntity,
  EmailStatusEnum,
} from '../../domain/entities/email.entity';
import { IEmailRepository } from '../../domain/repositories/email.repository';
import {
  CreateEmailUseCase,
  CreateEmailInput,
} from '../../domain/services/create_email.usecase';

export class CreateEmailService implements CreateEmailUseCase {
  constructor(
    private readonly publisher: Publisher,
    private readonly emailReposiory: IEmailRepository,
    private readonly emailProvider: EmailProvider,
    private readonly emailProviderBackup: EmailProvider,
  ) {}

  async execute(input: CreateEmailInput): Promise<EmailEntity> {
    try {
      const { externalId } = input;

      const foundEmail = await this.emailReposiory.get(externalId);

      if (foundEmail) {
        throw new Error('Repeated email asked for creation');
      }

      const emailSent = await this.send(input);

      let status = emailSent ? EmailStatusEnum.SENT : EmailStatusEnum.ERROR;

      const savedEmail = await this.emailReposiory.save({ ...input, status });

      this.publisher.publish('email.update', JSON.stringify(savedEmail));

      return savedEmail;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async send(
    input: CreateEmailInput,
    backup: boolean = false,
  ): Promise<boolean> {
    const { from, to, body } = input;

    try {
      if (!backup) {
        await this.emailProvider.send(from, to, body);
      } else {
        await this.emailProviderBackup.send(from, to, body);
      }

      return true;
    } catch (error) {
      if (!backup) {
        return await this.send(input, true);
      }

      return false;
    }
  }
}
