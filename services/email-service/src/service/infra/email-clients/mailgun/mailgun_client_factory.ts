import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { IMailgunClient } from 'mailgun.js/Interfaces';

export function mailgunClientFactory(): IMailgunClient {
  const mailgun = new Mailgun(formData);

  return mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || 'mailgun-api-key',
  });
}
