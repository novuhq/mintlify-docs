# Source: https://docs.novu.co/platform/integrations/sms

# SMS Integrations

Integrate SMS providers with Novu to deliver text message notifications. Configure providers, set up workflows, and manage delivery.

The SMS channel delivers messages to your subscribers’ mobile devices through your configured SMS provider integrations.

## [How SMS delivery works in Novu](https://docs.novu.co/#how-sms-delivery-works-in-novu)

Here’s the typical flow for sending an email notification through Novu:

### [Add an email provider](https://docs.novu.co/#add-an-email-provider)

Start by adding an SMS provider in the **Integration Store** on your Novu dashboard. You can connect one or more integrations for the different or the same providers.

To learn [how to add an SMS provider](https://docs.novu.co/platform/integrations/sms#supported-providers), refer to the guide for that provider.

### [Add the email channel to your workflow](https://docs.novu.co/#add-the-email-channel-to-your-workflow)

Next, include an [SMS step in your workflow](https://docs.novu.co/platform/workflow/create-a-workflow). This step defines when and how an SMS should be sent as part of your notification workflow.

### [Define the SMS content](https://docs.novu.co/#define-the-sms-content)

Within the Email step editor, write the message body. The editor supports dynamic data for personalized content.

### [Store subscriber phone number](https://docs.novu.co/#store-subscriber-phone-number)

Novu automatically sends the notification to the phone number stored on the subscriber's profile . You must ensure that this field is set for any subscriber who needs to receive emails. You can store subscribers phone number using the Novu API, or SDK.

### [Trigger the workflow](https://docs.novu.co/#trigger-the-workflow)

[Trigger the workflow](https://docs.novu.co/api-reference/events/trigger-event) from your application code by sending an event to Novu. Novu automatically:

- Resolves the subscriber.
- Selects the correct provider.
- Renders the email template.
- Delivers the message through the configured email integration.

Some countries restrict using verified `from` sender IDs (name). Kindly check the country- and provider-specific requirements first.

## [Configuring SMS providers](https://docs.novu.co/#configuring-sms-providers)

To add an SMS provider from the **Integration Store**, you must configure settings and credentials that are specific to that email providers.

### [Default sender settings](https://docs.novu.co/#default-sender-settings)

The **From** field, which is displayed as the sender of the SMS, is a required default setting for any email provider that you connect. You can override this field during trigger if necessary.

### [Provider authentication](https://docs.novu.co/#provider-authentication)

You must provide credentials specific to your email provider, such as:

- API key
- Auth token
- Account SID
- Username
- Password.

Each provider has different requirements.

Refer to the [supported SMS providers](https://docs.novu.co/platform/integrations/sms#supported-providers) list for detailed setup guides for each provider integration.

## [Override SMS settings](https://docs.novu.co/#override-sms-settings)

You can override the SMS settings when triggerring a notification by passing the `overrides` object. The overrides object field supports an `sms` property and `from`, `to`, and `content` field overrides. This lets you send a message to a different recipient, from a different sender, or with a different content.

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
    sms: {
      to: '+123012345678',
      from: 'Novu Team',
      content: 'This SMS message is from overrides',
    },
  },
});
```

## [Target a specific provider](https://docs.novu.co/#target-a-specific-provider)

By default, Novu uses your primary SMS provider. If you want to bypass this and force a specific, active integration for a trigger, then use the `integrationIdentifier`.

This is useful if you have multiple active integrations for different purposes. For example, you might have one integration for transactional SMS and one for security SMS. You can find the `integrationIdentifier` in the **Integration Store** of the Novu dashboard.

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
    sms: { integrationIdentifier: 'infobip-abcdef', },
  },
});
```

## [Supported providers](https://docs.novu.co/#supported-providers)

Here are the SMS providers that are currently supported by Novu. Select any provider to see its detailed setup guide.

[**46elks**\\ \\ Learn how to use the 46elks provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/46elks) [**Africa's Talking**\\ \\ Learn how to use the Africa's Talking provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/africas-talking) [**AWS SNS**\\ \\ Learn how to use the AWS SNS provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/aws-sns) [**Azure SMS**\\ \\ Learn how to use the Azure SMS provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/azure) [**BulkSMS**\\ \\ Learn how to use the BulkSMS provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/bulk-sms) [**Clickatell**\\ \\ Learn how to use the Clickatell provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/clickatell) [**Clicksend**\\ \\ Learn how to use the Clicksend provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/clicksend) [**Firetext**\\ \\ Learn how to use the Firetext provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/firetext) [**Gupshup**\\ \\ Learn how to use the Gupshup provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/gupshup) [**Infobip - SMS**\\ \\ Learn how to use the Infobip - SMS provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/infobip) [**Kannel**\\ \\ Learn how to use the Kannel provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/kannel) [**Kudosity**\\ \\ Learn how to use the Kudosity provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/kudosity) [**MessageBird**\\ \\ Learn how to use the MessageBird provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/messagebird) [**Nexmo**\\ \\ Learn how to use the Nexmo provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/nexmo) [**Plivo**\\ \\ Learn how to use the Plivo provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/plivo) [**Sendchamp**\\ \\ Learn how to use the Sendchamp provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/sendchamp) [**SimpleTexting**\\ \\ Learn how to use the SimpleTexting provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/simpletexting) [**SMS Central**\\ \\ Learn how to use the SMS Central provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/sms-central) [**SMS77**\\ \\ Learn how to use the SMS77 provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/sms77) [**SNS**\\ \\ Learn how to use the SNS provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/sns) [**Telnyx**\\ \\ Learn how to use the Telnyx provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/telnyx) [**Termii**\\ \\ Learn how to use the Termii provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/termii) [**Twilio**\\ \\ Learn how to use the Twilio provider to send SMS notifications using Novu.](https://docs.novu.co/platform/integrations/sms/twilio)

[Activity Tracking\\ \\ Learn how to manually forward push notification events from your application to Novu for unified activity tracking.](https://docs.novu.co/platform/integrations/push/push-activity-tracking) [Twilio\\ \\ Learn how to use the Twilio provider to send sms notifications using Novu](https://docs.novu.co/platform/integrations/sms/twilio)

### On this page

[How SMS delivery works in Novu](https://docs.novu.co/#how-sms-delivery-works-in-novu) [Add an email provider](https://docs.novu.co/#add-an-email-provider) [Add the email channel to your workflow](https://docs.novu.co/#add-the-email-channel-to-your-workflow) [Define the SMS content](https://docs.novu.co/#define-the-sms-content) [Store subscriber phone number](https://docs.novu.co/#store-subscriber-phone-number) [Trigger the workflow](https://docs.novu.co/#trigger-the-workflow) [Configuring SMS providers](https://docs.novu.co/#configuring-sms-providers) [Default sender settings](https://docs.novu.co/#default-sender-settings) [Provider authentication](https://docs.novu.co/#provider-authentication) [Override SMS settings](https://docs.novu.co/#override-sms-settings) [Target a specific provider](https://docs.novu.co/#target-a-specific-provider) [Supported providers](https://docs.novu.co/#supported-providers)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/sms/index.mdx)Open in ChatGPTOpen in Claude