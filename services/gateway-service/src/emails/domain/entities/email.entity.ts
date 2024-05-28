export enum EmailStatusEnum {
  PENDING = 'pending',
  DRAFT = 'draft',
  SENT = 'sent',
}

export class EmailEntity {
  constructor(
    public readonly externalId: string,
    public readonly from: string,
    public readonly to: string,
    public readonly body: string,
    public readonly createdAt: Date = new Date(),
    public readonly status: EmailStatusEnum = EmailStatusEnum.PENDING,
  ) {}
}
