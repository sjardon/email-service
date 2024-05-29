import { IMailgunClient } from 'mailgun.js/Interfaces';
import { ICircuitBreaker } from '../../../../domain/circuit-breaker/circuit_breaker';
import { EmailProvider } from '../../../../domain/providers/email/email_provider';

export class MailgunEmailProvider implements EmailProvider {
  constructor(
    private readonly circuitBreaker: ICircuitBreaker,
    private readonly mailgunClient: IMailgunClient,
  ) {}

  async send(from: string, to: string, body: string): Promise<boolean> {
    const msg = {
      to: [to],
      from: 'Excited User <mailgun@sandbox397e76e861034dff8b67e036be5f8463.mailgun.org>',
      subject: 'Test Message',
      text: body,
    };

    return await this.circuitBreaker.call<boolean>(async () => {
      try {
        const sendedEmail = await this.mailgunClient.messages.create(
          process.env.MAILGUN_DOMAIN || 'mail.com', //TODO: check it
          msg,
        );
        console.log('sended email:', sendedEmail);
        return true;
      } catch (error) {
        console.error('Error trying to send an email', error);
        throw error;
      }
    });
  }
}
