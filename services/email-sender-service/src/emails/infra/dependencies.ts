import { CreateEmailUseCase } from '../domain/services';
import { CreateEmailService } from '../application/services';
import { EmailRepository } from './repositories/email.repository';
import { IEmailRepository } from '../domain/repositories/email.repository';
import {
  mailgunEmailProvider,
  redisPublisher,
  sendgridEmailProvider,
} from '../../service/infra/dependencies';

export const emailReposiory: IEmailRepository = new EmailRepository();

export const createEmailService: CreateEmailUseCase = new CreateEmailService(
  redisPublisher,
  emailReposiory,
  sendgridEmailProvider,
  mailgunEmailProvider,
);
