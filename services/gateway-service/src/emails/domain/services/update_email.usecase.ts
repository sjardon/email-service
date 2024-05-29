import { EmailEntity, EmailStatusEnum } from '../entities';

export interface UpdateEmailInput {
  externalId: string;
  from: string;
  to: string;
  body: string;
  createdAt: Date;
  status: EmailStatusEnum;
}

export interface UpdateEmailUseCase {
  execute(externalId: string, input: UpdateEmailInput): Promise<EmailEntity>;
}
