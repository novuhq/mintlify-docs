# Source: https://docs.novu.co/platform/integrations/email/mailgun

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Mailgun email integration guide

Learn how to use the Mailgun provider to send email notifications using Novu

You can use the [Mailgun](https://mailgun.com/) provider to send transactional emails to your customers using the Novu Platform with a single API to create multi-channel experiences.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Mailgun provider in the email channel, you will need to create a Mailgun account and add your API key and domain name to the Mailgun integration on the Novu platform.

## [Generating an API Key](https://docs.novu.co/#generating-an-api-key)

To generate a new API key in Mailgun, you can follow these steps:

- [Sign up](https://signup.mailgun.com/new/signup) or [Log in](https://login.mailgun.com/login/) to your Mailgun account.
- Click on the **Profile** section in the top right corner of the screen, and then click "API Keys" from the drop-down menu.
- On the [API Keys](https://app.mailgun.com/app/account/security/api_keys) page, copy the generated **Private API Key**

## [Adding a new domain name](https://docs.novu.co/#adding-a-new-domain-name)

Mailgun recommends that you add a subdomain as a domain name. To do so:

- Visit the page to add a [domain name](https://app.mailgun.com/app/sending/domains/new).
 - During this process, you will need to choose a region for the domain name which is between `US` and `EU`. The default is `US`.
- Follow the [instructions](https://documentation.mailgun.com/en/latest/user_manual.html#verifying-your-domain-1) to verify the domain name.

## [Creating a Mailgun integration with Novu](https://docs.novu.co/#creating-a-mailgun-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-mailgun) page on Novu.
- Click on Add a Provider.
- Select Mailgun service.
- Enter your Mailgun API Key.
- Enter your Base URL.
 - For domains created in the EU region, the base URL is: `https://api.eu.mailgun.net/`
 - Otherwise, leave the base URL blank.
- Fill in the `Username`.
- Fill in the `Domain name` registered on Mailgun.
- Fill in the `From email address` field using the authenticated email from the previous step.
- Fill in the `Sender's name`.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using Mailgun in Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Brevo\\ \\ Learn how to use the Sendinblue provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/brevo) [Mailjet\\ \\ Learn how to use the Mailjet provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/mailjet)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Generating an API Key](https://docs.novu.co/#generating-an-api-key) [Adding a new domain name](https://docs.novu.co/#adding-a-new-domain-name) [Creating a Mailgun integration with Novu](https://docs.novu.co/#creating-a-mailgun-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/mailgun.mdx)Open in ChatGPTOpen in Claude