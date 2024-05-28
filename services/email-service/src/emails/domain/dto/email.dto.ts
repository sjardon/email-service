import { EmailStatusEnum } from '../entities/email.entity';

export interface EmailDto {
  externalId: string;
  from: string;
  to: string;
  body: string;
  createdAt: Date;
  status: EmailStatusEnum;
}
