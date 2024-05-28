import { Request, Response } from 'express';
import { createEmailService } from '../../dependencies';

export async function createEmailController(req: Request, res: Response) {
  try {
    const { body } = req;

    const emailCreationResult = await createEmailService.execute(body);

    res.json(emailCreationResult);
  } catch (error) {
    const { message } = error as Error;

    // TODO: Parse error response
    res.json({ error: message });
  }
}
