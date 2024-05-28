import { v4 as uuidv4 } from 'uuid';
import {
  CreateEmailUseCase,
  CreateEmailInput,
} from '../../domain/services/create_email.usecase';
import { Publisher } from '../../../service/domain';
import { CHANNEL_SEND_EMAIL } from '../../infra/dependencies';
import { IEmailRepository } from '../../domain/repositories/email.repository';
import { EmailEntity } from '../../domain/entities';

export class CreateEmailService implements CreateEmailUseCase {
  constructor(
    private readonly emailRepository: IEmailRepository,
    private readonly publisher: Publisher,
  ) {}

  async execute(input: CreateEmailInput): Promise<EmailEntity> {
    const { from, to, body } = input;

    try {
      const externalId = uuidv4();

      const email = new EmailEntity(externalId, from, to, body);

      await Promise.all([
        this.publisher.publish(CHANNEL_SEND_EMAIL, JSON.stringify(email)),
        this.emailRepository.save(externalId, email),
      ]);

      return email;
    } catch (error) {
      const { message } = error as Error;
      console.error(message);

      throw new Error(
        `Error trying to send an email from [${from}] to [${to}]`,
      );
    }
  }
}
