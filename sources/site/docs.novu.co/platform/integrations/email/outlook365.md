# Source: https://docs.novu.co/platform/integrations/email/outlook365

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Outlook 365

Learn how to use the Outlook 365 provider to send email notifications using Novu

You can use the [Outlook 365](https://office.com/) provider to send transactional emails through your instance of Office 365 to your customers using the Novu Platform with a single API.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Outlook 365 provider in the email channel, you will need to have the sender's email (user) and the password for the account. This account cannot be a shared mailbox or distribution list. It will need to be properly licensed to send email via Office 365.

## [Creating the Outlook 365 integration with Novu](https://docs.novu.co/#creating-the-outlook-365-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-office365) page on Novu.
- Click on Add a Provider.
- Select Outlook service.
- Enter your SMTP credentials
 - `from`: The Complete email address of the sending user. (e.g. [jdoe@mycompany.com](mailto:jdoe@mycompany.com))
 - `senderName`: Sender Name should be the same email address of the sending user. (e.g. [jdoe@mycompany.com](mailto:jdoe@mycompany.com))
 - `password`: Password used to sign in with the email account.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using Outlook 365 in Novu.

In order to create outlook integration, turn off multi factor authentication from account security settings.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Netcore\\ \\ Learn how to use the Netcore provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/netcore) [Plunk\\ \\ Learn how to use the Plunk provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/plunk)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Creating the Outlook 365 integration with Novu](https://docs.novu.co/#creating-the-outlook-365-integration-with-novu) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/outlook365.mdx)Open in ChatGPTOpen in Claude