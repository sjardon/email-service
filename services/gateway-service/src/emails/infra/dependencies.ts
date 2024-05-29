import {
  CreateEmailUseCase,
  GetEmailUseCase,
  UpdateEmailUseCase,
} from '../domain/services';
import { CreateEmailService, GetEmailService } from '../application/services';
import { redisClient, redisPublisher } from '../../service/infra/dependencies';
import { IEmailRepository } from '../domain/repositories/email.repository';
import { EmailRepository } from './repositories/email.repository';
import { UpdateEmailService } from '../application/services/update_email.service';

export const CHANNEL_SEND_EMAIL =
  process.env.CHANNEL_SEND_EMAIL || 'email.send';

const emailRepository: IEmailRepository = new EmailRepository(redisClient);

export const createEmailService: CreateEmailUseCase = new CreateEmailService(
  emailRepository,
  redisPublisher,
);

export const updateEmailService: UpdateEmailUseCase = new UpdateEmailService(
  emailRepository,
);

export const getEmailService: GetEmailUseCase = new GetEmailService(
  emailRepository,
);
