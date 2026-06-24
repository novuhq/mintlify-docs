# Source: https://docs.novu.co/platform/integrations/chat

# Chat Integrations

Configure and manage chat providers like Slack, Microsoft Teams, WhatsApp, and Discord with Novu's notification infrastructure.

The Chat channel delivers messages to your subscribers via their preferred chat platforms and application.

## [Messaging platforms vs. Messaging applications](https://docs.novu.co/#messaging-platforms-vs-messaging-applications)

- **Messaging platforms**: Ideal for structured, workplace communication. Use these to notify teams or users in collaborative environments. Examples: Slack, Teams
- **Messaging apps**: Best for consumer-facing messaging. Engage users directly through personal or group chats. Examples: WhatsApp, Telegram, Discord

Looking to build agents using chat provider integrations? Check out the [agents](https://docs.novu.co/agents) documentation for more information.

## [How chat delivery works in Novu](https://docs.novu.co/#how-chat-delivery-works-in-novu)

Here’s the typical flow for sending a chat notification through Novu:

### [Add a chat provider](https://docs.novu.co/#add-a-chat-provider)

Start by adding a chat provider in the integration store on your Novu dashboard. 
You can connect one or more integrations for different or even the same providers, for example, multiple Slack workspaces.

To learn how to add a chat provider, refer to [the setup guide](https://docs.novu.co/platform/integrations/chat#supported-providers) for that provider.

### [Add the chat channel to your workflow](https://docs.novu.co/#add-the-chat-channel-to-your-workflow)

Next, include a Chat step in your workflow. 
This step defines when and how a chat message should be sent as part of your notification workflow.

### [Define the chat content](https://docs.novu.co/#define-the-chat-content)

Within the Chat step editor, write the message body. 
The editor supports dynamic data for personalized and contextual messages.

### [Store subscriber credentials](https://docs.novu.co/#store-subscriber-credentials)

Each subscriber must have valid chat credentials, such as a `webhookUrl` or unique identifier, to receive chat notifications. 
You can store or update these credentials using the Novu dashboard, API, or SDKs.

### [Trigger the workflow](https://docs.novu.co/#trigger-the-workflow)

Trigger the workflow using your application code. Novu automatically:

- Resolves the subscriber.
- Retrieves the correct credentials, for example, the `webhookUrl`.
- Selects the appropriate provider.
- Renders the message.
- Delivers it to the chat platform.

## [Configuring chat providers](https://docs.novu.co/#configuring-chat-providers)

When you add a chat provider in the Integration Store, you'll configure credentials specific to that provider.

### [Provider authentication](https://docs.novu.co/#provider-authentication)

You may need to provide credentials specific to your chat provider, such as an API key, Client ID, or Client Secret. However, some providers, like Discord, may not require any global credentials to be set in the Integration Store.

Each provider has different requirements.

For detailed setup guides for each provider integration, refer to the supported chat providers list at the end of this page .

## [How to manages Chat credentials](https://docs.novu.co/#how-to-manages-chat-credentials)

The chat channel works by storing specific credentials for each subscriber. This credential is typically a `webhookUrl` that tells Novu where to send a message for that specific subscriber.

Before triggering a chat notification, you must update the subscriber with this `webhookUrl`.

### [Storing subscriber credentials](https://docs.novu.co/#storing-subscriber-credentials)

Use the `subscribers.credentials.update` method to store the `webhookUrl` for a specific subscriber and provider.

Checkout the [API reference](https://docs.novu.co/api-reference/subscribers/update-provider-credentials) for more details.

Node.jscURL

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
    providerId: ChatOrPushProviderEnum.Discord,
    credentials: {
      webhookUrl: "<WEBHOOK_URL>",
    },
    integrationIdentifier: "discord-MnGLxp8uy",
  },
  "subscriberId"
);
```

## [Supported providers](https://docs.novu.co/#supported-providers)

Here are the chat providers that are currently supported by Novu. Select any provider to see its detailed setup guide.

[**Discord**\\ \\ Learn how to use the Discord provider to send chat notifications using Novu.](https://docs.novu.co/platform/integrations/chat/discord) [**Mattermost**\\ \\ Learn how to use the Mattermost provider to send chat notifications using Novu.](https://docs.novu.co/platform/integrations/chat/mattermost) [**Microsoft Teams**\\ \\ Learn how to use the Microsoft Teams provider to send chat notifications using Novu.](https://docs.novu.co/platform/integrations/chat/ms-teams) [**Slack**\\ \\ Learn how to use the Slack provider to send chat notifications using Novu.](https://docs.novu.co/platform/integrations/chat/slack) [**WhatsApp Business**\\ \\ Learn how to use the WhatsApp Business provider to send chat notifications using Novu.](https://docs.novu.co/platform/integrations/chat/whats-app) [**Zulip**\\ \\ Learn how to use the Zulip provider to send chat notifications using Novu.](https://docs.novu.co/platform/integrations/chat/zulip)

[Demo Integrations\\ \\ Learn about the default Novu Email and SMS provider.](https://docs.novu.co/platform/integrations/demo-integration) [Discord\\ \\ Learn about how to use Discord provider for chat notifications](https://docs.novu.co/platform/integrations/chat/discord)

### On this page

[Messaging platforms vs. Messaging applications](https://docs.novu.co/#messaging-platforms-vs-messaging-applications) [How chat delivery works in Novu](https://docs.novu.co/#how-chat-delivery-works-in-novu) [Add a chat provider](https://docs.novu.co/#add-a-chat-provider) [Add the chat channel to your workflow](https://docs.novu.co/#add-the-chat-channel-to-your-workflow) [Define the chat content](https://docs.novu.co/#define-the-chat-content) [Store subscriber credentials](https://docs.novu.co/#store-subscriber-credentials) [Trigger the workflow](https://docs.novu.co/#trigger-the-workflow) [Configuring chat providers](https://docs.novu.co/#configuring-chat-providers) [Provider authentication](https://docs.novu.co/#provider-authentication) [How to manages Chat credentials](https://docs.novu.co/#how-to-manages-chat-credentials) [Storing subscriber credentials](https://docs.novu.co/#storing-subscriber-credentials) [Supported providers](https://docs.novu.co/#supported-providers)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/chat/index.mdx)Open in ChatGPTOpen in Claude