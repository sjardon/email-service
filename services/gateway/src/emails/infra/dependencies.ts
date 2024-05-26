import { CreateEmailUseCase } from '../domain/services';
import { CreateEmailService } from '../application/services';

export const createEmailService: CreateEmailUseCase = new CreateEmailService();
