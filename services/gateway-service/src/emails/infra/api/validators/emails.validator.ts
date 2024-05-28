import Joi from 'joi';

export const emailsValidator = Joi.object({
  from: Joi.string().min(6).email().required(),
  to: Joi.string().min(6).email().required(),
  body: Joi.allow(),
});
