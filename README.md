# WoowUp challenge

WoowUp challenge repository. I hope you enjoy this code review!

## Introducción

Tech stack (and my experience in each one):

1. Turborepo for monorepo management (low experience).
2. NodeJs with Express framework (high experienc) for microservices (middle experience).
3. Hexagonal architecture (middle experience)
4. Mongo DB (middle experiencie).
5. Redis DB (middle to high experience).
6. Redis pub-sub (middle experience).
7. Docker and Docker Compose for local deployment (middle experience).
8. Github action for CI/CD (middle experience). Disclaimer: I had some issues trying the continuous deployment, finally I deployed all manually.

## Local stack deployment

1. Run in root folder and each service folder: `cp .env.example .env`.
2. In `services/email-sender-service` there are some variables which will need your oun configuration: SENDGRID_API_KEY, SENDGRID_VERIFIED_SENDER, MAILGUN_API_KEY, MAILGUN_DOMAIN.
3. Run `docker compose up`
4. In order to test the services you can run: `npm run test`

## Workflow

In order to send and get an email you can run the following commands:

```curl
curl --location 'http://144.126.246.17:3000/emails' \
--header 'Content-Type: application/json' \
--data-raw '{
    "to": "sample@mail.com",
    "from": "sample_from@mail.com",
    "body": "Some important info"
}'
```

Copy the id retrieved and past it here: 

```curl
curl --location 'http://144.126.246.17:3000/emails/{{externalId}}'
```

You can check the Swagger documentation in your local environment, but not in the server (it's not working there :pensive:). Check `http://localhost:3000/api-docs` for it.

Disclaimer: Emails will be sent from the email setted for each email provider.

You can check the stack and the process in the following diagram:

![image](https://github.com/sjardon/email-service/assets/71879650/c6b53b23-def3-4325-a0e8-5eaa090286a7)

1. Client ask to the gateway by HTTP to send an email
2. Gateway publish a message asking to email service to send an email
3. Email service ask to an abstracted service to send and email. If it goes well, it return a confirmed status, if not, sends a pending status.
4. If the Email Service has any error, it apply an resolution strategy sending the email by another provider. This is handle by circuit breaker pattern.
5. Email Sender Service inform Gateway service to update its cache.
6. Client can ask to Gateway service in order to get updates about the status on its email.

## Disclaimers

Some important developments are pendings:

1. Error handling
2. Add useful logs
3. Improve abstraction in controllers, routes, and other infrastructure services.
4. There are only one service tested: `CreateEmailService` from `email-sender-service`.
5. Parse responses
6. Some kind of security and throttling system.

Some other development details could be missing due to lack of time.

Thanks for your time!
