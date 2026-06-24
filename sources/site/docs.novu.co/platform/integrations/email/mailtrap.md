# Source: https://docs.novu.co/platform/integrations/email/mailtrap

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Mailtrap Email Provider

Learn how to use the Mailtrap provider to send email notifications using Novu

You can use the [Mailtrap](https://mailtrap.io/email-sending/) provider to send transactional emails to your customers using the Novu Platform with a single API to create multi-channel experiences.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Mailtrap provider in the email channel, you will need to create a Mailtrap account and add your API key to the Mailtrap integration on the Novu platform.

## [Generating an API Key](https://docs.novu.co/#generating-an-api-key)

To generate a new API key in Mailtrap, you can follow these steps:

- [Sign Up](https://mailtrap.io/register/signup) or [Log in](https://mailtrap.io/signin) to your Mailtrap account.
- Click on the **Email Sending** link on the sidebar, and then click the "Sending Domains" link that pops up from the available options.
- On the [Sending Domains](https://mailtrap.io/sending/domains) page, type your domain name and confirm with the `Add Your Domain` button. Then, proceed to copy DNS records Mailtrap provides to your domain’s DNS.
- Go to [API Keys](https://mailtrap.io/api-tokens) page and copy token with `Domain Admin` access level for your registered domain.

## [Authenticating your Sender Identity](https://docs.novu.co/#authenticating-your-sender-identity)

Before you can send emails, you will need to [verify your sending domain ownership](https://help.mailtrap.io/article/69-sending-domain-setup). Mailtrap rejects sending emails from unverified domains to prevent spam and email fraud.

## [Creating a Mailtrap integration with Novu](https://docs.novu.co/#creating-a-mailtrap-integration-with-novu)

- Visit the [Integrations store](https://dashboard.novu.co/integrations?utm_campaign=docs-mailtrap) on the Novu web dashboard.
- Click on Add a Provider.
- Select Mailtrap service.
- Enter your Mailtrap API Key.
- Fill in the `From email address` field using the authenticated email from the previous step.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications through Mailtrap using Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[MailerSend\\ \\ Learn how to use the MailerSend provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/mailersend) [Mandrill\\ \\ Learn how to use the Mandrill provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/mandrill)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Generating an API Key](https://docs.novu.co/#generating-an-api-key) [Authenticating your Sender Identity](https://docs.novu.co/#authenticating-your-sender-identity) [Creating a Mailtrap integration with Novu](https://docs.novu.co/#creating-a-mailtrap-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/mailtrap.mdx)Open in ChatGPTOpen in Claude