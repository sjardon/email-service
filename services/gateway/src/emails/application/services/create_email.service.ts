import {
  CreateEmailUseCase,
  CreateEmailInput,
} from 'emails/domain/services/create_email.usecase';

export class CreateEmailService implements CreateEmailUseCase {
  async execute(input: CreateEmailInput): Promise<boolean> {
    console.log(input);

    return true;
  }
}
