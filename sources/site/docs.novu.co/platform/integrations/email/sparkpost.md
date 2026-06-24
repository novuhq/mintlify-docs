# Source: https://docs.novu.co/platform/integrations/email/sparkpost

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Sparkpost

Learn how to use the Sparkpost provider to send email notifications using Novu

You can use the [SparkPost](https://messagebird.com/email/cloud-sending) provider to send transactional emails to your customers using the Novu Platform with a single API.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the SparkPost provider in the email channel, you will need to create a SparkPost account and add your API key to the SparkPost integration on the Novu platform.

## [Generating an API Key](https://docs.novu.co/#generating-an-api-key)

To generate a new API key in SparkPost, you can follow these steps:

- [Sign up](https://app.sparkpost.com/join) or [Log in](https://app.sparkpost.com/auth) to your SparkPost account.
 
 > During sign up, note that SparkPost is available in multiple regions. "SparkPost" refers to the SparkPost service hosted in North America. "SparkPost EU" refers to the SparkPost service hosted in Western Europe. An account created with SparkPost cannot be used with SparkPost EU, and vice-versa. You may use accounts in both regions.
 > 
 > ~ _[SparkPost Documentation](https://support.sparkpost.com/docs/getting-started/getting-started-sparkpost/)_
 
- Click on the **Configuration** link on the navbar, and then click the "API Keys" link that pops up from the available options.
- On the [API Keys](https://app.sparkpost.com/account/api-keys) page, click the **Create API Key** button.
- Give the API key a name and click on the **Create API key** button.
- Copy the generated API Key.

## [Authenticating your Sender Identity](https://docs.novu.co/#authenticating-your-sender-identity)

Before you can send emails on a large scale, you will need to authenticate your Sender Identity.

SparkPost allows you to authenticate your sender identity using [Sending Domains](https://app.sparkpost.com/domains/list/sending).

## [Creating a SparkPost integration with Novu](https://docs.novu.co/#creating-a-sparkpost-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-sparkpost) page on Novu.
- Click on Add a Provider.
- Select SparkPost service.
- Enter your SparkPost API Key.
- Fill in the `From email address` field using the authenticated email from the previous step.
- Fill in the `Sender's name`.
- Toggle the `eu` switch to true if you're in Western Europe
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using SparkPost in Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Plunk\\ \\ Learn how to use the Plunk provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/plunk) [Email Webhook\\ \\ Learn how to use the Email Webhook provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/webhook)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Generating an API Key](https://docs.novu.co/#generating-an-api-key) [Authenticating your Sender Identity](https://docs.novu.co/#authenticating-your-sender-identity) [Creating a SparkPost integration with Novu](https://docs.novu.co/#creating-a-sparkpost-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/sparkpost.mdx)Open in ChatGPTOpen in Claude