# Source: https://docs.novu.co/platform/integrations/email/brevo

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Brevo (Sendinblue) integration guide

Learn how to use the Sendinblue provider to send email notifications using Novu

You can use the [Brevo](https://www.brevo.com/) provider to send transactional emails to your customers using the Novu Platform with a single API.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Brevo provider in the email channel, you will need to create a Brevo account and add your API key to the Brevo integration on the Novu platform.

## [Finding the API Key](https://docs.novu.co/#finding-the-api-key)

- To find your Brevo API key, log into your Brevo account and navigate to the [API Keys](https://account.brevo.com/advanced/api) page.

## [Authenticating your sender identity](https://docs.novu.co/#authenticating-your-sender-identity)

Before you can send emails on a large scale, you will need to authenticate your sender's identity. This is due to the latest regulatory changes regarding SPAM rules and email fraud. Most of the providers including Brevo require you to authenticate your sender identity before you can send emails.

Brevo allows you to authenticate your sender identity using one of the following methods:

- [Single Sender Verification](https://account.brevo.com/senders) - This is the easiest way to authenticate your sender identity.
- [Entire Domain Authentication](https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-record-DMARC-record) - This is recommended if you are sending emails from multiple accounts under your domain.

## [Creating a Brevo integration with Novu](https://docs.novu.co/#creating-a-brevo-integration-with-novu)

- Visit the [Integrations store](https://dashboard.novu.co/integrations?utm_campaign=docs-brevo) on the Novu web dashboard.
- Click on Add a Provider.
- Select Brevo service.
- Enter your Brevo API key.
- Fill in the `From email address` field using the authenticated email from the previous step.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using Brevo in Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Resend\\ \\ Learn how to use the Resend provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/resend) [Mailgun\\ \\ Learn how to use the Mailgun provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/mailgun)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Finding the API Key](https://docs.novu.co/#finding-the-api-key) [Authenticating your sender identity](https://docs.novu.co/#authenticating-your-sender-identity) [Creating a Brevo integration with Novu](https://docs.novu.co/#creating-a-brevo-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/brevo.mdx)Open in ChatGPTOpen in Claude