import { Router } from 'express';
import { createEmailController } from './controllers/create_email.controller';
import { validateMiddleware } from '../../../service/infra/api/middlewares/validate.middleware';
import { emailsValidator } from './validators/emails.validator';

export function getEmailRoutes(): Router {
  const router = Router();

  // router.get('/emails/:id');

  //TODO: Add validation middleware
  router.post(
    '/emails',
    validateMiddleware(emailsValidator),
    createEmailController,
  );

  return router;
}
