import sgMail from '@sendgrid/mail';

export function sendgridClientFactory() {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'sendgrid-api-key');
  return sgMail;
}
