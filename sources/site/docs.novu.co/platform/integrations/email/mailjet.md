# Source: https://docs.novu.co/platform/integrations/email/mailjet

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Mailjet email integration guide

Learn how to use the Mailjet provider to send email notifications using Novu

You can use the [Mailjet](https://mailjet.com/) provider to send transactional emails to your customers using the Novu Platform with a single API.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Mailjet provider in the email channel, you will need to create a Mailjet account and add your API key to the Mailjet integration on the Novu platform.

## [Generating an API Key](https://docs.novu.co/#generating-an-api-key)

To generate a new API key in Mailjet, you can follow these steps:

- Log in to your Mailjet account.
- Click on **Settings** in the top-right corner of the screen, and then click **API KEYS & TRACKING** from the drop-down menu.
- On the API Keys page, click the **Create an API Key** button.
- Give the API key a name and choose the access level **Write and Read**
- Click the **Generate Key** button to create the new key. Once generated you can see the key but it will be hidden after the refresh

## [Authenticating your sender identity](https://docs.novu.co/#authenticating-your-sender-identity)

Before you can send emails on a large scale, you will need to authenticate your Sender identity. This is due to the latest regulatory changes regarding SPAM rules and email fraud. Most of the providers including Mailjet require you to authenticate your Sender identity before you can send emails.

Mailjet allows you to authenticate your sender identity using one of the following methods:

- [Single Sender Verification](https://dev.mailjet.com/email/guides/senders-and-domains/#sender-validation) - This is the easiest way to authenticate your sender identity.
- [Entire Domain Authentication](https://dev.mailjet.com/email/guides/senders-and-domains/#spf-and-dkim-validation) - This is recommended if you are sending emails from multiple accounts under your domain.

## [Creating a Mailjet integration with Novu](https://docs.novu.co/#creating-a-mailjet-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-mailjet) page on Novu.
- Click on Add a Provider.
- Select Mailjet service.
- Enter your Mailjet API key.
- Fill in the `From email address` field using the authenticated email from the previous step.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using Mailjet in Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Mailgun\\ \\ Learn how to use the Mailgun provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/mailgun) [Braze\\ \\ Learn how to use the Braze provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/braze)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Generating an API Key](https://docs.novu.co/#generating-an-api-key) [Authenticating your sender identity](https://docs.novu.co/#authenticating-your-sender-identity) [Creating a Mailjet integration with Novu](https://docs.novu.co/#creating-a-mailjet-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/mailjet.mdx)Open in ChatGPTOpen in Claude