import { EmailEntity } from '../entities';

export interface GetEmailUseCase {
  execute(externalId: string): Promise<EmailEntity | null>;
}
