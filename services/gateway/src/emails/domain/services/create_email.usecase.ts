export interface CreateEmailInput {
  from: string;
  to: string;
  body: string;
}

export interface CreateEmailUseCase {
  execute(input: CreateEmailInput): Promise<boolean>;
}
