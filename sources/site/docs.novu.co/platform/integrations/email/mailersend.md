# Source: https://docs.novu.co/platform/integrations/email/mailersend

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# MailerSend

Learn how to use the MailerSend provider to send email notifications using Novu

[MailerSend](https://www.mailersend.com/) is an email delivery service that allows you to send emails from your application.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the MailerSend provider in the email channel, you will need to create a MailerSend account and add your API key to the MailerSend integration on the Novu platform. To generate the API token go visit the [MailerSend API Tokens](https://www.mailersend.com/help/managing-api-tokens) page.

## [Creating the MailerSend integration with Novu](https://docs.novu.co/#creating-the-mailersend-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-mailersend) page on Novu.
- Click on Add a Provider.
- Select MailerSend service.
- Enter the API key.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using MailerSend in Novu.

## [Using MailerSend template](https://docs.novu.co/#using-mailersend-template)

Novu has its own email editor for writing email template. If you want to use pre made template from MailerSend, you can use `customData` filed of email overrides to send template details. Make sure your `Api Key` has enough permission to read and process the template.

sending `customData` field in overrides to send mailersend template will work only in following cases:

- if workflow is triggered to only one subscriber
- if workflow is triggered to multiple subscribers or topic but mailersend template does not have any dynamic variables related to subscriber attributes like `firstName`, `lastName`, `email`, etc as same overrides will be applied to all subscribers or topic

Node.jscURL

```
import { Novu } from '@novu/api';
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
  // Required if using EU region
  // serverURL: "https://eu.api.novu.co",
});
 
await novu.trigger({
  workflowId: "workflowId",
  to: "subscriberId",
  payload: {},
  overrides: {
    email: {
      customData: {
        // mailersend template templateId 
        templateId: "mailersend-template-id",
        // mailersend template variables 
        personalization: [{
          email: 'recipient@email.com',
          data: {
            items: {
              price: '',
              product: '',
              quantity: '',
            },
            order: {
              date: '',
              order_number: '',
              billing_address: '',
              customer_message: '',
            },
            store: {
              name: '',
            },
            invoice: {
              total: '',
              subtotal: '',
              pay_method: '',
            },
            customer: {
              name: '',
              email: '',
              phone: '',
            },
          },
        }, ],
      },
    }
  },
});
```

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[Infobip\\ \\ Learn how to use the Infobip provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/infobip) [Mailtrap\\ \\ Learn how to use the Mailtrap provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/mailtrap)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Creating the MailerSend integration with Novu](https://docs.novu.co/#creating-the-mailersend-integration-with-novu) [Using MailerSend template](https://docs.novu.co/#using-mailersend-template) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/mailersend.mdx)Open in ChatGPTOpen in Claude