# Source: https://docs.novu.co/platform/integrations/email/resend

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Resend email integration guide

Learn how to use the Resend provider to send email notifications using Novu

You can use the [Resend](https://resend.com/) provider to send transactional emails to your customers using the Novu Platform with a single API to create multi-channel experiences.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Resend provider in the email channel, you will need to create a Resend account and add your API key to the Resend integration on the Novu platform.

## [Generating an API Key](https://docs.novu.co/#generating-an-api-key)

To generate a new API key in Resend, you can follow these steps:

- [Sign up](https://resend.com/secret) or [Log in](https://resend.com/login) to your Resend account.
- Click on the **API Keys** link in the left sidebar, and then click the "Create API Key" button on the top right part of the page.
- On the [API Keys](https://resend.com/api-keys) page, click the **Create API Key** button.
- Give the API key a name and click on the **Add** button.
- Copy the generated API Key.

## [Authenticating your Sender Identity](https://docs.novu.co/#authenticating-your-sender-identity)

Before you can send emails on a large scale, you will need to authenticate your Sender Identity.

Resend allows you to authenticate your sender identity using [Domain Authentication](https://resend.com/docs/dashboard/domains/introduction).

## [Creating a Resend integration with Novu](https://docs.novu.co/#creating-a-resend-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-resend) page on Novu.
- Click on Add a Provider.
- Select Resend service.
- Enter your Resend API Key.
- Fill in the `From email address` field using the authenticated email from the previous step.
 - For testing, you can use `onboarding@resend.dev` if you have not authenticated your sender identity.
- Fill in the `Sender's name`.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using Resend in Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Postmark\\ \\ Learn how to use the Postmark provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/postmark) [Brevo\\ \\ Learn how to use the Sendinblue provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/brevo)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Generating an API Key](https://docs.novu.co/#generating-an-api-key) [Authenticating your Sender Identity](https://docs.novu.co/#authenticating-your-sender-identity) [Creating a Resend integration with Novu](https://docs.novu.co/#creating-a-resend-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/resend.mdx)Open in ChatGPTOpen in Claude