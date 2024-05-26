import { Request, Response } from 'express';
import { createEmailService } from '../../dependencies';

export async function createEmailController(req: Request, res: Response) {
  const { body } = req;

  const emailCreationResult = await createEmailService.execute(body);

  res.json({ emailCreationResult });
}
