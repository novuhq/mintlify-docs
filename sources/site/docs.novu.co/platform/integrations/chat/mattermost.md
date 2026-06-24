# Source: https://docs.novu.co/platform/integrations/chat/mattermost

[Chat](https://docs.novu.co/platform/integrations/chat)/Providers

# Mattermost

Learn about how to use Mattermost provider for chat notifications

When using Mattermost, you will have to store the integration credentials within the subscriber entity. Mattermost supports two ways to do this:

1. Using the **Mattermost Webhook** integration.
2. Using the **Mattermost Bot** integration.

### [Mattermost Webhook Integration](https://docs.novu.co/#mattermost-webhook-integration)

To integrate Mattermost with your application using the Mattermost Webhook integration, follow these steps:

1. Create an incoming webhook in Mattermost. This can be done by going to the **Integrations** page and clicking on the **Incoming Webhooks** tab.
2. Click on the **Add Incoming Webhook** button and configure the webhook settings. Be sure to select the channel where you want to receive notifications.
3. Click on the **Save** button to generate a webhook URL.

Once you have the webhook URL, you can store it in the subscriber entity in your application. This will allow you to send notifications to Mattermost using the following code:

```
import { Novu } from '@novu/api';
import { ChatOrPushProviderEnum } from "@novu/api/models/components";
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
  // Required if using EU region
  // serverURL: "https://eu.api.novu.co",
});
 
await novu.subscribers.credentials.update(
  {
    providerId: ChatOrPushProviderEnum.Mattermost,
    credentials: {
      webhookUrl: "<WEBHOOK_URL>",
    },
    integrationIdentifier: "mattermost-MnGLxp8uy",
  },
  "subscriberId"
);
```

## [SDK trigger example](https://docs.novu.co/#sdk-trigger-example)

Send a notification to mattermost using the subscriber ID and workflow ID via `@novu/api` sdk

```
await novu.trigger({
  workflowId: "workflowId",
  to: {
    subscriberId: 'subscriberId',
  },
  payload: {
    message: 'This is a notification from my application!',
  },
});
```

[Discord\\ \\ Learn about how to use Discord provider for chat notifications](https://docs.novu.co/platform/integrations/chat/discord) [MS Teams\\ \\ Learn about how to use MS Teams provider for chat notifications](https://docs.novu.co/platform/integrations/chat/ms-teams)

### On this page

[Mattermost Webhook Integration](https://docs.novu.co/#mattermost-webhook-integration) [SDK trigger example](https://docs.novu.co/#sdk-trigger-example)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/chat/(providers)/mattermost.mdx)Open in ChatGPTOpen in Claude