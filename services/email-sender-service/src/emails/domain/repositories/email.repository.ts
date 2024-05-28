import { EmailDto } from '../dto/email.dto';
import { EmailEntity } from '../entities/email.entity';

export interface IEmailRepository {
  get(externalId: string): Promise<EmailEntity | null>;
  save(email: EmailDto): Promise<EmailEntity>;
}
