import { Router } from 'express';
import { validateMiddleware } from '../../../service/infra/api/middlewares/validate.middleware';
import { emailsValidator } from './validators/emails.validator';
import { createEmailController, getEmailController } from './controllers';

export function getEmailRoutes(): Router {
  const router = Router();

  router.get('/emails/:externalId', getEmailController);

  //TODO: Add validation middleware
  router.post(
    '/emails',
    validateMiddleware(emailsValidator),
    createEmailController,
  );

  return router;
}
