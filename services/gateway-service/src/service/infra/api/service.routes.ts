import { Application, Router } from 'express';
import { getEmailRoutes } from '../../../emails/infra/api/emails.routes';

export function setServiceRoutes(expressApp: Application): void {
  const healthRoutes = Router();

  // TODO: Add service
  healthRoutes.get('/health', (req, res) => {
    res.send('pending implementation');
  });

  expressApp.use(healthRoutes);

  const emailRoutes = getEmailRoutes();

  expressApp.use(emailRoutes);
}
