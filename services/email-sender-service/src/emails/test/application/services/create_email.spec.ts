import { Publisher } from '../../../../service/domain';
import { EmailProvider } from '../../../../service/domain/providers/email/email_provider';
import { MockedSuccessfulEmailProvider } from '../../../../service/infra/providers/email/mocked/mocked_successful_email_provider copy';
import { MockedUnsuccessfulEmailProvider } from '../../../../service/infra/providers/email/mocked/mocked_unsuccessful_email_provider';
import { MockedPublisher } from '../../../../service/infra/pub-sub/mocked/mocked_publisher';
import { CreateEmailService } from '../../../application/services';
import { EmailStatusEnum } from '../../../domain/entities/email.entity';
import { CreateEmailInput, CreateEmailUseCase } from '../../../domain/services';
import { MockedEmailRepository } from '../../../infra/repositories/mocked/mocked-email.repository';

describe('Email', () => {
  describe('Application', () => {
    describe('CreateEmailService', () => {
      let createEmailService: CreateEmailUseCase;
      let createEmailServiceWithUnsuccessfulProviders: CreateEmailUseCase;
      let createEmailServiceWithFirstUnsuccessfulProvider: CreateEmailUseCase;
      let publisher: Publisher;
      let repository: MockedEmailRepository;
      let successfulEmailProvider: EmailProvider;
      let unsuccessfulEmailProvider: EmailProvider;
      let createEmailInput: CreateEmailInput;

      beforeAll(() => {
        repository = new MockedEmailRepository();

        publisher = new MockedPublisher();
        publisher.publish = jest.fn();

        successfulEmailProvider = new MockedSuccessfulEmailProvider();
        unsuccessfulEmailProvider = new MockedUnsuccessfulEmailProvider();

        createEmailService = new CreateEmailService(
          publisher,
          repository,
          successfulEmailProvider,
          successfulEmailProvider,
        );

        createEmailServiceWithUnsuccessfulProviders = new CreateEmailService(
          publisher,
          repository,
          unsuccessfulEmailProvider,
          unsuccessfulEmailProvider,
        );

        createEmailServiceWithFirstUnsuccessfulProvider =
          new CreateEmailService(
            publisher,
            repository,
            unsuccessfulEmailProvider,
            successfulEmailProvider,
          );

        createEmailInput = {
          externalId: '8458dc0c-8a39-4afd-b884-749e055ccdaa',
          from: 'mailgun@sandbox-123.mailgun.org',
          to: 'santiagohernanjardon@gmail.com',
          body: 'no important info',
          createdAt: new Date('2024-05-28T11:00:00.000Z'),
          status: EmailStatusEnum.PENDING,
        };
      });

      beforeEach(() => {
        repository.source.clear();
      });

      it('should send an email', async () => {
        const sentEmail = await createEmailService.execute(createEmailInput);

        expect(sentEmail).toBeDefined();
      });

      it('throw an error if externalId exists', async () => {
        expect.assertions(1);
        try {
          await createEmailService.execute(createEmailInput);
          await createEmailService.execute(createEmailInput);
        } catch (error) {
          expect(error).toBeDefined();
        }
      });

      it('set sent status if email has been sent', async () => {
        const sentEmail = await createEmailService.execute(createEmailInput);

        const { status } = sentEmail;

        expect(status).toBe(EmailStatusEnum.SENT);
      });

      it('set error status if both providers are down', async () => {
        const sentEmail =
          await createEmailServiceWithUnsuccessfulProviders.execute(
            createEmailInput,
          );

        const { status } = sentEmail;

        expect(status).toBe(EmailStatusEnum.ERROR);
      });

      it('should publish in channel', async () => {
        const spy = jest.spyOn(publisher, 'publish');

        await createEmailService.execute(createEmailInput);

        expect(spy).toHaveBeenCalled();
      });

      it('set error status if both providers are down', async () => {
        const sentEmail =
          await createEmailServiceWithUnsuccessfulProviders.execute(
            createEmailInput,
          );

        const { status } = sentEmail;

        expect(status).toBe(EmailStatusEnum.ERROR);
      });

      it('should publish in channel', async () => {
        const spyOnFail = jest.spyOn(unsuccessfulEmailProvider, 'send');
        const spyOnSuccess = jest.spyOn(successfulEmailProvider, 'send');

        await createEmailServiceWithFirstUnsuccessfulProvider.execute(
          createEmailInput,
        );

        expect(spyOnFail).toHaveBeenCalled();
        expect(spyOnSuccess).toHaveBeenCalled();
      });
    });
  });
});
