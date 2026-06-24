# Source: https://docs.novu.co/platform/integrations/email/custom-smtp

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Custom SMTP

Learn how to use the Custom SMTP provider to send email notifications using Novu

You can use a Custom SMTP provider like [Nodemailer](https://nodemailer.com/about/) to send transactional emails through your custom SMTP server to your customers using the Novu Platform with a single API.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Custom SMTP provider in the email channel, you will need to have your personal SMTP server configured and add `host`, `port`, `user`, and `password` to the Custom SMTP integration on the Novu platform.

You can also provide value **`true`** for the `secure` field if you want the connection to be secure, and if not, leave it empty.

### [DKIM (DomainKeys Identified Mail)](https://docs.novu.co/#dkim-domainkeys-identified-mail)

DKIM options can be used in order to sign messages sent using Custom SMTP with DKIM keys.

Those options are:

- `DKIM Domain`
- `DKIM Private Key`
- `DKIM Key Selector`

## [Creating a Custom SMTP integration with Novu](https://docs.novu.co/#creating-a-custom-smtp-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-customsmtp) page on Novu.
- Click on Add a Provider.
- Select Custom SMTP service.
- Enter your SMTP credentials
 - `host`
 - `port`
 - `username`
 - `password`
 - `secure` (on demand)
 - And `DKIM` options if you want to sign messages with _DKIM_
- Fill in the `From email address` field using the authenticated email from the previous step.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using Custom SMTP in Novu.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Email Webhook\\ \\ Learn how to use the Email Webhook provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/webhook) [Activity Tracking\\ \\ Learn how to enable activity tracking to get real-time delivery and engagement events like delivered, opened, and clicked from your email providers.](https://docs.novu.co/platform/integrations/email/activity-tracking)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [DKIM (DomainKeys Identified Mail)](https://docs.novu.co/#dkim-domainkeys-identified-mail) [Creating a Custom SMTP integration with Novu](https://docs.novu.co/#creating-a-custom-smtp-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/custom-smtp.mdx)Open in ChatGPTOpen in Claude