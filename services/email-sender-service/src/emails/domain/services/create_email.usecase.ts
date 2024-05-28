import { EmailEntity, EmailStatusEnum } from '../entities/email.entity';

export interface CreateEmailInput {
  externalId: string;
  from: string;
  to: string;
  body: string;
  createdAt: Date;
  status: EmailStatusEnum;
}

export interface CreateEmailUseCase {
  execute(input: CreateEmailInput): Promise<EmailEntity>;
}
