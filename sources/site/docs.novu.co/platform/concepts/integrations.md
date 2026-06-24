# Source: https://docs.novu.co/platform/concepts/integrations

Core Concepts

# Integrations

Learn how Novu integrations connect you to third-party providers

In Novu, integrations are configured connections to third-party services that deliver notifications across supported channels, which are email, SMS, push, and chat.

The In-App channel is handled internally by Novu and does not require a third-party integration.

Each integration connects Novu to a specific provider, which workflows use to deliver notifications over the related channel.

## [How integrations fit into the notification flow](https://docs.novu.co/#how-integrations-fit-into-the-notification-flow)

Workflows in Novu handle the logic of what message to send and when. Integrations handle how that message is delivered by routing the message through a specific provider.

When a workflow step executes a channel-based action (such as sending an email), Novu:

- Resolves the correct integration for the channel.
- Applies any configuration, such as sender name or title overrides.
- Hands off the message to the provider through the integration.

If no active integration exists for the required channel, the workflow step fails, and no message will be delivered.

## [Providers vs integrations](https://docs.novu.co/#providers-vs-integrations)

It’s helpful to distinguish between providers and integrations:

- A provider is the third-party service responsible for sending messages (for example, Twilio, SendGrid, Slack).
- An integration is your instance of that provider, configured with the necessary credentials and settings.

You can have multiple integrations for the same provider, for example, using two different SendGrid accounts for staging and production environments. Novu allows you to manage these as separate, named integrations.

Refer to this resource to see the full list of [providerIds used in Novu](https://github.com/novuhq/novu/blob/next/packages/framework/src/shared.ts#L103).

Novu also lets you use [Trigger Overrides](https://docs.novu.co/platform/integrations/trigger-overrides) to modify the default behavior of a message during workflow trigger, such as overriding the notification title or content, or using a different integration than the primary integration. This works alongside integrations to fine-tune delivery behavior.

## [Environment-scoped behavior](https://docs.novu.co/#environment-scoped-behavior)

Each integration is scoped to a specific environment—such as development, staging, or production. This means you must configure separate integrations for each environment, even if they point to the same provider.

This separation ensures that test messages don’t accidentally go to production users, and different credentials or delivery settings can be safely isolated across environments.

## [Primary and active integrations](https://docs.novu.co/#primary-and-active-integrations)

Each environment can support multiple active integrations per channel, but only one can be marked as the primary integration for email and SMS channels. However, for push and chat channels, all active integrations are used in parallel to deliver messages.

The primary integration serves as the default route when a message is sent over that channel unless explicitly overridden. You can update which integration is marked as primary or deactivate an integration entirely.

## [Integration credentials](https://docs.novu.co/#integration-credentials)

Integrations require credentials to authenticate with third-party providers. These credentials are encrypted at rest and managed securely within Novu.

Alongside credentials, integrations may also define metadata, such as sender addresses or credentials, including API keys or tokens, as well as optional configuration settings depending on the provider.

## [Available integrations](https://docs.novu.co/#available-integrations)

Novu supports a wide range of providers across different channels:

[**Email**\\ \\ Configure email providers and settings](https://docs.novu.co/platform/integrations/email) [**SMS**\\ \\ Set up SMS messaging capabilities](https://docs.novu.co/platform/integrations/sms) [**Push**\\ \\ Enable push notification delivery](https://docs.novu.co/platform/integrations/push) [**Chat**\\ \\ Integrate with chat platforms](https://docs.novu.co/platform/integrations/chat)

[Topics\\ \\ Learn how topics work in Novu and how they help you organize and target groups of subscribers efficiently.](https://docs.novu.co/platform/concepts/topics) [Trigger\\ \\ Managing Trigger Events from Request to Processing](https://docs.novu.co/platform/concepts/trigger)

### On this page

[How integrations fit into the notification flow](https://docs.novu.co/#how-integrations-fit-into-the-notification-flow) [Providers vs integrations](https://docs.novu.co/#providers-vs-integrations) [Environment-scoped behavior](https://docs.novu.co/#environment-scoped-behavior) [Primary and active integrations](https://docs.novu.co/#primary-and-active-integrations) [Integration credentials](https://docs.novu.co/#integration-credentials) [Available integrations](https://docs.novu.co/#available-integrations)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/concepts/integrations.mdx)Open in ChatGPTOpen in Claude