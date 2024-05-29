import { Request, Response } from 'express';
import { getEmailService } from '../../dependencies';

export async function getEmailController(req: Request, res: Response) {
  try {
    const { externalId } = req.params;

    const email = await getEmailService.execute(externalId);

    res.json(email);
  } catch (error) {
    const { message } = error as Error;

    // TODO: Parse error response
    res.json({ error: message });
  }
}
