import { EmailProvider } from '../../../../domain/providers/email/email_provider';

export class MockedUnsuccessfulEmailProvider implements EmailProvider {
  async send(from: string, to: string, body: string): Promise<boolean> {
    throw new Error();
  }
}
