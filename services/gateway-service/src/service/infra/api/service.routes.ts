import { Application } from 'express';
import { getEmailRoutes } from '../../../emails/infra/api/emails.routes';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';

export function setServiceRoutes(expressApp: Application): void {
  expressApp.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );

  const emailRoutes = getEmailRoutes();

  expressApp.use(emailRoutes);
}
