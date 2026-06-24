# Source: https://docs.novu.co/platform/integrations/email/sendgrid

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# SendGrid Email Integration

Learn how to use the SendGrid provider to send email notifications using Novu

You can use the [SendGrid](https://sendgrid.com/) provider to send transactional emails to your customers using the Novu Platform with a single API to create multi-channel experiences.

### [Getting Started](https://docs.novu.co/#getting-started)

To use the Sendgrid provider in the email channel, you will need to create a Sendgrid account and add your API key to the SendGrid integration on the Novu platform.

### [Generating an API Key](https://docs.novu.co/#generating-an-api-key)

To generate a new API key in SendGrid, follow these steps:

- Log in to your SendGrid account.
- Click on the **Settings** gear icon in the top right corner of the screen, and then click "API Keys" from the drop-down menu.
- On the API Keys page, click the **Create API Key** button.
- Give the API key a name and select the following permissions
- **Mail Send** - Full Access
- (Optional) Template Engine - Read Only
- Click the **Create & View** button to generate the API key. The key will be displayed on the screen, but you will only be able to view it once, so make sure to save it in a safe place.

NOTE

The access level of the key will determine what actions the API Key can take, so please choose the correct one.

- **Mail Send** - Full Access
- (Optional) Template Engine - Read Only

### [Authenticating your](https://docs.novu.co/#authenticating-your-sender-identity) [Sender Identity](https://docs.sendgrid.com/for-developers/sending-email/sender-identity)

Before you can send emails on a large scale, you will need to authenticate your Sender Identity. This is due to the latest regulatory changes regarding SPAM rules and email fraud. Most of the providers including Sendgrid require you to authenticate your Sender Identity before you can send emails.

SendGrid allows you to authenticate your sender identity using one of the following methods:

- [Single Sender Verification](https://docs.sendgrid.com/ui/sending-email/sender-verification) - This is the easiest way to authenticate your sender identity.
- [Entire Domain Authentication](https://docs.sendgrid.com/ui/account-and-settings/how-to-set-up-domain-authentication) - This is recommended if you are sending emails from multiple accounts under your domain.

### [SendGrid integration with Novu](https://docs.novu.co/#sendgrid-integration-with-novu)

- Visit the [Integrations store](https://dashboard.novu.co/integrations?utm_campaign=docs-sendgrid) on the Novu web dashboard.
- Click on Add a Provider.
- Select SendGrid service.
- Enter your SendGrid API Key.
- Fill in the `From email address` field using the authenticated email from the previous step.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications through SendGrid using Novu.

### [Using SendGrid template](https://docs.novu.co/#using-sendgrid-template)

Novu has its own email editor for writing email template. To send pre-made template in SendGrid, providers overrides can be used to send template details. Make sure sendgrid `Api Key` has enough permission to read and process the template.

Sending `customData` field in overrides to send sendgrid template will work only in following cases:

- if workflow is triggered to only one subscriber
- if workflow is triggered to multiple subscribers or topic but sendgrid template does not have any dynamic variables related to subscriber attributes like `firstName`, `lastName`, `email`, etc as same overrides will be applied to all subscribers.

Node.jscURLNovu Framework

```
import {
  Novu
} from "@novu/api";
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
  // Required if using EU region
  // serverURL: "https://eu.api.novu.co",
});
 
await novu.trigger({
  workflowId: "workflowId",
  to: {
    subscriberId: "subscriberId",
  },
  payload: {},
  overrides: {
    providers: {
      sendgrid: {
        templateId: "d-d965b02b1b5d4856bf332a5e98c7470c",
        dynamicTemplateData: {
          total: "$ 239.85",
          items: [{
            text: "New Line Sneakers",
            image: "https://marketing-image-production.s3.amazonaws.com/uploads/8dda1131320a6d978b515cc04ed479df259a458d5d45d58b6b381cae0bf9588113e80ef912f69e8c4cc1ef1a0297e8eefdb7b270064cc046b79a44e21b811802.png",
            price: "$ 79.95",
          }, {
            text: "Old Line Sneakers rlfjrjrh4hr4rh4",
            image: "https://marketing-image-production.s3.amazonaws.com/uploads/3629f54390ead663d4eb7c53702e492de63299d7c5f7239efdc693b09b9b28c82c924225dcd8dcb65732d5ca7b7b753c5f17e056405bbd4596e4e63a96ae5018.png",
            price: "$ 79.95",
          }, ],
          receipt: true,
          name: "Sample Name",
          address01: "1234 Fake St.",
          address02: "Apt. 123",
          city: "Place",
          state: "CO",
          zip: "80202",
        },
      },
    },
  },
});
```

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[E-mail\\ \\ Learn how to configure the Email channel](https://docs.novu.co/platform/integrations/email) [Amazon SES\\ \\ Learn how to use the Amazon SES provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/amazon-ses)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Generating an API Key](https://docs.novu.co/#generating-an-api-key) [Authenticating your](https://docs.novu.co/#authenticating-your-sender-identity) [Sender Identity](https://docs.sendgrid.com/for-developers/sending-email/sender-identity) [SendGrid integration with Novu](https://docs.novu.co/#sendgrid-integration-with-novu) [Using SendGrid template](https://docs.novu.co/#using-sendgrid-template) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/sendgrid.mdx)Open in ChatGPTOpen in Claude