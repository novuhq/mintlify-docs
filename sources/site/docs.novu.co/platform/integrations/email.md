# Source: https://docs.novu.co/platform/integrations/email

# E-mail Providers Integration

Learn how to configure the Email channel

Email providers are the services that deliver notifications to your subscribers’ email. You must set up each provider individually in the Novu dashboard to enable delivery through the Email channel.

Novu provides a unified integration layer that connects your workflows to these email providers. Once you’ve added your integrations, Novu handles routing and delivery automatically, sending each email through the correct provider without requiring additional setup. This allows you to manage multiple email integrations and switch providers when needed.

## [Key features](https://docs.novu.co/#key-features)

- **Multi-provider support**: Integrate any major provider like SendGrid, SES, or Mailgun.
- **Failover mechanisms**: Automatically retry with a backup provider to ensure reliability.
- **Activity tracking**: Track delivery status, open rates, and more in the Novu dashboard.

## [How email works in Novu](https://docs.novu.co/#how-email-works-in-novu)

Here’s the typical flow for sending an email notification through Novu:

### [Add an email provider](https://docs.novu.co/#add-an-email-provider)

Start by adding an email provider in the **Integration Store** on your Novu dashboard. You can connect one or more integrations for different or the same providers.

To learn how to add an email provider, refer to the guide for the [supported providers](https://docs.novu.co/platform/integrations/email#supported-providers).

### [Add the Email channel to your workflow](https://docs.novu.co/#add-the-email-channel-to-your-workflow)

Next, include an Email step in a workflow. This step defines when and how an email should be sent as part of your notification workflow.

### [Define the email content](https://docs.novu.co/#define-the-email-content)

Within the Email step, you can design your message using the built-in visual editor or code editor. Novu supports dynamic data from your payload, so each message can be personalized for the subscriber.

### [Store subscriber email addresses](https://docs.novu.co/#store-subscriber-email-addresses)

Novu automatically sends the notification to the email address stored on the subscriber's profile. This profile is update either using the Novu dashboard or API.

### [Trigger the workflow](https://docs.novu.co/#trigger-the-workflow)

[Trigger the workflow](https://docs.novu.co/api-reference/events/trigger-event) from your application code by sending an event to Novu. Novu automatically:

1. Resolves the subscriber.
2. Selects the correct provider.
3. Renders the email template.
4. Delivers the message through the configured email integration.

Learn how to [build email template](https://docs.novu.co/platform/workflow/add-notification-content/channels-template-editors#email-template-editor) using the block editor, custom HTML, and dynamic variables.

## [Configuring email providers](https://docs.novu.co/#configuring-email-providers)

When you add an email provider in the **Integration Store**, you configure settings that are common to all email providers, as well as credentials specific to that provider.

### [Default sender settings](https://docs.novu.co/#default-sender-settings)

Novu asks for two default settings for any email provider you connect:

- **Sender name**: The name that appears in the recipient's "From" field.
- **From email address**: The email address the notification is sent from. For some email providers, including SendGrid, you must authenticate the **From email address** to make sure you're sending an email from an authorized address.

These are the default values used for every email sent via this integration. You can override them when triggering a workflow if needed.

### [Provider authentication](https://docs.novu.co/#provider-authentication)

You must provide credentials specific to your email provider for a successful integration.

For detailed setup guides for each integration, refer to the [Supported Providers](https://docs.novu.co/platform/integrations/email#supported-providers) list at the bottom of this page.

## [Advanced email features](https://docs.novu.co/#advanced-email-features)

You can control advanced email features at runtime by passing data in your trigger call. This lets you send attachments, override default settings, or target a specific provider for a single notification.

### [Sending attachments](https://docs.novu.co/#sending-attachments)

You can send attachments by passing an `attachments` array in the `payload` of your trigger. The attachment file can be provided as a `buffer` or a `base64` encoded string.

There is a total limit of 20MB for all attachments included in an email.

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
  to: {
    subscriberId: "subscriberId",
  },
  payload: { 
    attachments: [
      {
        // buffer format
        file: fs.readFileSync(__dirname + '/data/novu.jpeg'),
        name: 'novu.jpeg',
        mime: 'image/jpeg',
      },
      {
        // base64 format
        file: 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNkYPhfz0AEYBxVSF+FAP5FDvcfRYWgAAAAAElFTkSuQmCC',
        name: 'blue.png',
        mime: 'image/png',
      }
    ],
  },
});
```

### [Sending email overrides](https://docs.novu.co/#sending-email-overrides)

You can override the email settings for a single trigger by passing an `overrides` object. This lets you override the following fields:

- `bcc`
- `cc`
- `from` address
- `replyTo`
- `replaceToRecipient`
- `senderName`
- `text`
- `to` address

Node.js

```
import { Novu } from '@novu/api';
 
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
  overrides: { 
    email: {
      to: ['to@novu.co'],
      from: 'from@novu.co',
      senderName: 'Novu Team',
      text: 'text version of email using overrides',
      replyTo: 'no-reply@novu.co',
      cc: ['1@novu.co'],
      bcc: ['2@novu.co'],
    },
  },
});
```

**`replaceToRecipient`**

- By default, Novu merges override `to` addresses with the subscriber email.
- Set `replaceToRecipient: true` to send only to override recipients. The subscriber email is omitted from `to`. `to` is replaced with the `from` address.
- When `replaceToRecipient` is `true`, include at least one of `to`, `cc`, or `bcc`.

**Empty `to` with cc/bcc (Custom SMTP only)**

- Setting `to: []` with `cc` or `bcc` is supported only on **Custom SMTP (Nodemailer)**.
- Novu normalizes an empty `to` to `undisclosed-recipients:;` so the message sends without exposing addresses in the To field.
- Other email providers do not support this pattern.

### [Targeting a specific provider](https://docs.novu.co/#targeting-a-specific-provider)

By default, Novu uses your primary email provider. However, if you want to bypass this and force a specific, active integration for a trigger, use the `integrationIdentifier`.

This is useful if you have multiple active integrations for different purposes. For example, you might have one integration for transactional emails and one for marketing emails. You can find the `integrationIdentifier` for each provider in provider page in the **Integration Store**.

Node.js

```
import { Novu } from '@novu/api';
 
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
  overrides: {
    email: {
      integrationIdentifier: "brevo-abcdef"
    },
  },
});
```

### [Overriding email layout](https://docs.novu.co/#overriding-email-layout)

Each Novu environment can have multiple layouts. Each email step in the workflow can have a layout assigned to it. Overriding the email layout allows you to dynamically override layout settings at trigger time, providing flexible layout management per workflow/channel or per step execution.

**`layoutId` values and its behavior:**

| Value | Behavior |
| --- | --- |
| "layout-identifier" | Uses layout with this identifier |
| "507f1f77bcf86cd799439011" | Uses layout with this MongoDB ObjectId |
| null | Explicitly no layout - renders email without any layout |
| undefined | Default behavior - uses step's configured layout or environment default |
| Not specified | Same as undefined |

**Precedence rules:**

1. **Step-level override** - **Highest priority**
2. **Workflow-level/channels-level override**
3. **Step configuration** (configured in workflow editor)
4. **Environment default layout** - **Lowest priority**

Node.js

```
import { Novu } from '@novu/api';
 
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
    // Channel-level layouts
    channels: {
	    email: {
		    layoutId: 'black-friday-layout',
	    },
	  },
    steps: {
      'welcome-email': {
        // This email step uses a specific welcome layout
        layoutId: 'welcome-v2'
      },
      'promotional-email': {
        // This email uses the channel-level layout (black-friday-layout)
        // No layoutId specified = inherits from channel level
      },
      'transactional-receipt': {
        // This email explicitly uses no layout (plain email)
        layoutId: null
      }
    }
  }
});
```

### [Sending provider specific extra fields](https://docs.novu.co/#sending-provider-specific-extra-fields)

You can send provider specific extra fields by passing a `_passthrough` object in the `overrides` object. This lets you send extra fields to the provider SDK. Novu internally uses provider's official SDK to send the email. Each provider has its own supported extra fields. Those extra fields are not validated by Novu and are passed directly to the provider SDK. There are three type of fields that you can send: `body`, `headers`, and `query`. Below is an example of sending `tags` supported by [Resend provider](https://docs.novu.co/platform/integrations/email/resend).

Node.js

```
import { Novu } from '@novu/api';
 
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
      resend: {
        _passthrough: {
          body: {
            tags: [
              {
                name: "category",
                value: "confirm_email"
              }
            ] 
          },
          headers: {
            "X-Custom-Header": "custom-header-value"
          },
          query: {
            "queryParam": "queryValue"
          }
        }
      }
    }
  }
});
```

## [Unsubscribe email](https://docs.novu.co/#unsubscribe-email)

By default, Novu does not add any unsubscribe links to the email. Few providers add unsubscribe links to the email by default. If you are looking to add custom unsubscribe links to the email, follow below steps:

- Add `{{payload.unsubscribeEmail}}` field in the email editor.
- Build custom unsubscribe link in your application using subscriberId workflowId. Make sure this link is secured with tokens to prevent abuse.
- Use Novu [preference api](https://docs.novu.co/api-reference/subscribers/update-subscriber-preferences) to update the email channel preferences for this workflow to `false`.
- Optionally, you can build a custom unsubscribe page and add the link of that page for unsubscribe email option.
- Send the value of `unsubscribeEmail` variable in the payload while triggering the workflow.
- Novu will add the unsubscribe link to the email and end user will be able to unsubscribe from the email by clicking on the link.

## [Supported providers](https://docs.novu.co/#supported-providers)

Here are the email providers that are currently supported by Novu. Select any provider to see its detailed setup guide.

[**SendGrid**\\ \\ Learn how to use the SendGrid provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/sendgrid) [**Amazon SES**\\ \\ Learn how to use the Amazon SES provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/amazon-ses) [**Postmark**\\ \\ Learn how to use the Postmark provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/postmark) [**Resend**\\ \\ Learn how to use the Resend provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/resend) [**Brevo**\\ \\ Learn how to use the Brevo provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/brevo) [**Mailgun**\\ \\ Learn how to use the Mailgun provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/mailgun) [**Mailjet**\\ \\ Learn how to use the Mailjet provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/mailjet) [**Braze**\\ \\ Learn how to use the Braze provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/braze) [**Infobip**\\ \\ Learn how to use the Infobip provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/infobip) [**MailerSend**\\ \\ Learn how to use the MailerSend provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/mailersend) [**Mailtrap**\\ \\ Learn how to use the Mailtrap provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/mailtrap) [**Mandrill**\\ \\ Learn how to use the Mandrill provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/mandrill) [**Maqsam**\\ \\ Learn how to use the Maqsam provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/maqsam) [**Netcore**\\ \\ Learn how to use the Netcore provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/netcore) [**Outlook 365**\\ \\ Learn how to use the Outlook 365 provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/outlook365) [**Plunk**\\ \\ Learn how to use the Plunk provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/plunk) [**Sparkpost**\\ \\ Learn how to use the Sparkpost provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/sparkpost) [**Email Webhook**\\ \\ Learn how to use the Email Webhook provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/webhook) [**Custom SMTP**\\ \\ Learn how to use a Custom SMTP provider to send emails using Novu.](https://docs.novu.co/platform/integrations/email/custom-smtp)

[Zulip\\ \\ Learn about how to use Zulip provider for chat notifications](https://docs.novu.co/platform/integrations/chat/zulip) [SendGrid\\ \\ Learn how to use the SendGrid provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/sendgrid)

### On this page

[Key features](https://docs.novu.co/#key-features) [How email works in Novu](https://docs.novu.co/#how-email-works-in-novu) [Add an email provider](https://docs.novu.co/#add-an-email-provider) [Add the Email channel to your workflow](https://docs.novu.co/#add-the-email-channel-to-your-workflow) [Define the email content](https://docs.novu.co/#define-the-email-content) [Store subscriber email addresses](https://docs.novu.co/#store-subscriber-email-addresses) [Trigger the workflow](https://docs.novu.co/#trigger-the-workflow) [Configuring email providers](https://docs.novu.co/#configuring-email-providers) [Default sender settings](https://docs.novu.co/#default-sender-settings) [Provider authentication](https://docs.novu.co/#provider-authentication) [Advanced email features](https://docs.novu.co/#advanced-email-features) [Sending attachments](https://docs.novu.co/#sending-attachments) [Sending email overrides](https://docs.novu.co/#sending-email-overrides) [Targeting a specific provider](https://docs.novu.co/#targeting-a-specific-provider) [Overriding email layout](https://docs.novu.co/#overriding-email-layout) [Sending provider specific extra fields](https://docs.novu.co/#sending-provider-specific-extra-fields) [Unsubscribe email](https://docs.novu.co/#unsubscribe-email) [Supported providers](https://docs.novu.co/#supported-providers)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/index.mdx)Open in ChatGPTOpen in Claude