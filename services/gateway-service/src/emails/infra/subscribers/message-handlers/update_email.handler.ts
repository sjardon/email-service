// import { createEmailService } from '../../dependencies';

import { updateEmailService } from '../../dependencies';

export async function updateEmailHandler(
  message: string,
  channel: string,
): Promise<void> {
  try {
    console.log('Update Email Handler:', message);

    const { externalId, from, to, body, createdAt, status } =
      JSON.parse(message);

    await updateEmailService.execute(externalId, {
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
