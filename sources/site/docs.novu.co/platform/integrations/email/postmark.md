# Source: https://docs.novu.co/platform/integrations/email/postmark

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Postmark Email Provider

Learn how to use the Postmark provider to send email notifications using Novu

It is possible to use [Postmark](https://postmarkapp.com/) as a provider to send transactional emails to your customers using the Novu Platform with a single API.

## [Getting Started](https://docs.novu.co/#getting-started)

The first step to use the Postmark provider in the email channel is to create a Postmark account and add the personal API key to the Postmark integration on the Novu platform.

## [Getting the API Key](https://docs.novu.co/#getting-the-api-key)

- To find the Postmark API key, log into the personal Postmark account and navigate to the servers page.
- After selecting the server to use, the API key (referred to as "Server API tokens") will be in the "API Tokens" section of the server chosen.

## [Authenticating the sender's identity](https://docs.novu.co/#authenticating-the-senders-identity)

Due to the latest regulatory changes regarding SPAM rules and email fraud, it is needed to authenticate the sender's identity before sending emails on a large scale. Most of the providers, including Postmark, require authentication to unlock the possibility of sending emails.

Postmark allows the authentication of the sender's identity using one of the following methods:

- [Single Sender Verification](https://account.postmarkapp.com/signatures/new) - This is the easiest way to authenticate the sender's identity.
- [Entire Domain Authentication](https://postmarkapp.com/support/article/1046-how-do-i-verify-a-domain#:~:text=be%20verified%20automatically.-,Navigate%20to%20Sender%20Signatures.,to%20your%20DNS%2C%20choose%20Verify.) - This is recommended for sending emails from multiple accounts under the same domain.

## [Create a Postmark integration with Novu](https://docs.novu.co/#create-a-postmark-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-postmark) page on Novu.
- Click on Add a Provider.
- Select Postmark service.
- Enter the Postmark API key.
- Fill in the `From email address` field using the authenticated email from the previous step.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- Now is possible to send notifications using Postmark in Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Amazon SES\\ \\ Learn how to use the Amazon SES provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/amazon-ses) [Resend\\ \\ Learn how to use the Resend provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/resend)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Getting the API Key](https://docs.novu.co/#getting-the-api-key) [Authenticating the sender's identity](https://docs.novu.co/#authenticating-the-senders-identity) [Create a Postmark integration with Novu](https://docs.novu.co/#create-a-postmark-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/postmark.mdx)Open in ChatGPTOpen in Claude