# Source: https://docs.novu.co/platform/integrations/email/mandrill

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Mandrill Email Provider

Learn how to use the Mandrill provider to send email notifications using Novu

You can use the [Mandrill by Mailchimp](https://mandrillapp.com/) provider to send transactional emails to your customers using the Novu Platform with a single API.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Mandrill provider in the email channel, you will need to create a Mandrill account and add your API key to the Mandrill integration on the Novu platform.

## [Generating an API Key](https://docs.novu.co/#generating-an-api-key)

To generate a new API key in Mandrill, you can follow these steps:

- [Sign up](https://login.mailchimp.com/signup/) or [Log in](https://login.mailchimp.com/) to your Mandrill account.
- Navigate to the [Settings](https://mandrillapp.com/settings) of your account and look for the API Keys section at the bottom of the settings page.
- Click on the **\+ Add API Key** button to create an API key. Copy the generated key immediately and store it in a secure location. You won’t be able to see or copy the key once you finish generating it.

## [Adding a sending domain](https://docs.novu.co/#adding-a-sending-domain)

To get started, you’ll need to add the domain that you want to send messages from.

- Navigate to the [Settings page](https://mandrillapp.com/settings/sending-domains) and choose Domains
- Type a new domain in the domain input and click Add
- Follow the instructions to [verify ownership](https://mailchimp.com/developer/transactional/docs/authentication-delivery/#authentication) of your sending domain and [update your DNS records](https://mailchimp.com/developer/transactional/docs/authentication-delivery/#configure-your-dns).

## [Creating the Mandrill integration with Novu](https://docs.novu.co/#creating-the-mandrill-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-mandrill) page on Novu.
- Click on Add a Provider.
- Select Mandrill service.
- Enter your Mandrill API key.
- Fill in the `From email address` field using the authenticated email from the previous step.
- Fill in the `Sender's name`.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using Mandrill in Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Mailtrap\\ \\ Learn how to use the Mailtrap provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/mailtrap) [Maqsam\\ \\ Learn how to use the Maqsam provider to send sms notifications using Novu](https://docs.novu.co/platform/integrations/email/maqsam)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Generating an API Key](https://docs.novu.co/#generating-an-api-key) [Adding a sending domain](https://docs.novu.co/#adding-a-sending-domain) [Creating the Mandrill integration with Novu](https://docs.novu.co/#creating-the-mandrill-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/mandrill.mdx)Open in ChatGPTOpen in Claude