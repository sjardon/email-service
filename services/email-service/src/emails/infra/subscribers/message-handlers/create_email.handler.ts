import { createEmailService } from '../../dependencies';

export async function createEmailHandler(
  message: string,
  channel: string,
): Promise<void> {
  try {
    console.log('Create Email Handler:', message);

    const { externalId, from, to, body, createdAt, status } =
      JSON.parse(message);
    await createEmailService.execute({
      externalId,
      from,
      to,
      body,
      createdAt,
      status,
    });
  } catch (error) {
    console.error('Error: ', error);
  }
}
