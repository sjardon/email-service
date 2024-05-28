import { MailService } from '@sendgrid/mail';
import { ICircuitBreaker } from '../../../../domain/circuit-breaker/circuit_breaker';
import { EmailProvider } from '../../../../domain/providers/email/email_provider';

export class SendgridEmailProvider implements EmailProvider {
  constructor(
    private readonly circuitBreaker: ICircuitBreaker,
    private readonly sendgridClient: MailService,
  ) {}

  async send(from: string, to: string, body: string): Promise<boolean> {
    const msg = {
      to,
      from: process.env.SENDGRID_VERIFIED_SENDER || 'gridtestsend@gmail.com',
      subject: 'Test Message',
      text: body,
    };

    return await this.circuitBreaker.call<boolean>(async () => {
      try {
        await this.sendgridClient.send(msg);
        return true;
      } catch (error) {
        console.error('Error trying to send an email', error);
        throw error;
      }
    });
  }
}
