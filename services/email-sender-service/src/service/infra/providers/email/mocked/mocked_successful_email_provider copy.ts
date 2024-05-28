import { EmailProvider } from '../../../../domain/providers/email/email_provider';

export class MockedSuccessfulEmailProvider implements EmailProvider {
  async send(from: string, to: string, body: string): Promise<boolean> {
    return true;
  }
}
