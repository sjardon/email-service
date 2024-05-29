import { model, Schema } from 'mongoose';

export enum EmailStatusEnum {
  PENDING = 'pending',
  DRAFT = 'draft',
  ERROR = 'error',
  SENT = 'sent',
}

interface IEmailEntity {
  externalId: string;
  from: string;
  to: string;
  body: string;
  createdAt: Date;
  status: EmailStatusEnum;
}

export class EmailEntity implements IEmailEntity {
  constructor(
    public readonly externalId: string,
    public readonly from: string,
    public readonly to: string,
    public readonly body: string,
    public readonly createdAt: Date = new Date(),
    public readonly status: EmailStatusEnum = EmailStatusEnum.PENDING,
    public readonly id?: string,
  ) {}
}

const userSchema = new Schema<IEmailEntity>({
  externalId: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  body: String,
  createdAt: { type: Date, required: true },
  status: { type: String, required: true },
});

export const EmailModel = model<IEmailEntity>('User', userSchema);
