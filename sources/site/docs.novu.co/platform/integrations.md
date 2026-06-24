# Source: https://docs.novu.co/platform/integrations

# Integrations Overview

Learn about the providers that Novu supports for Email, Push, SMS and Chant channels, and how to integrate them to send notifications and receive events.

Providers are the third-party services that deliver your notifications through the various channels. These are services such as SendGrid for email, Twilio for SMS, or Slack for chat.

Novu provides a unified integration layer that connects your application to all these different providers. You connect your provider accounts to Novu from the Integration Store on the Novu dashboard, and Novu's API handles the rest.

This approach means you can add, remove, or switch providers at any time without having to change your application's code. It also allows Novu to manage complex logic like provider fallbacks, for example, "If SendGrid fails, try sending with Amazon SES".

## [Provider vs. Integration](https://docs.novu.co/#provider-vs-integration)

Understanding the difference between a provider and an integration is key to managing your channels.

- **Provider**: A provider is the third-party service responsible for sending the actual notification such as, Twilio, SendGrid, or Slack. Every provider supported by Novu is identified by a providerId. Refer to this resource to see the full list of provider IDs used in Novu.
 
- **Integration**: An integration is your specific, configured instance of that provider. It's the provider plus your unique credentials and settings. When creating an integration, you are required to assign it a name and identifier.
 
 While the name can be changged, the identifier cannot be changed after creation. This identifier is called the `integrationIdentifier`.
 

![integrationIdentifier](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrationidentifier.25e7fc16.png&w=3840&q=75)

This means that you can have provider but two separate integrations for that particular provider. Each of these is a unique integration that you can manage and trigger independently.

Novu providers demo integrations. To learn more about how to use them for testing, see the [Demo Integration](https://docs.novu.co/platform/integrations/demo-integration) guide.

### [Primary vs. Active integrations](https://docs.novu.co/#primary-vs-active-integrations)

Each environment can have multiple active integrations for a single channel.

![Primary and active integration](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprimary-active-integrations.5398e9a0.png&w=3840&q=75)

- **Active integration**: Any integration that is "on" and ready to send notifications. You can disable an active integration at any time to stop sending messages through it.
- **Primary integration**: This is the default integration used when you trigger a notification.

How the primary integration behaves depends on the channel:

- **Email and SMS channels**: You can have many active integrations, but only one can be marked as the primary at a time. This primary integration is used by default for all email or SMS notifications unless you specifically override it.
 
- **Push and chat channels**: These channels do not use a single primary integration. Instead, Novu uses all active integrations in parallel to deliver the message.
 

If you disable an integration that is currently marked as "primary" for Email or SMS channels, then Novu automatically promotes another active integration to be the new primary. You can also manually set which active integration you want to be the primary one from the Integration Store.

## [Managing integrations across environments](https://docs.novu.co/#managing-integrations-across-environments)

Each integration is scoped to a specific [environment](https://docs.novu.co/platform/developer/environments). This means you must configure separate integrations for each environment, even if they point to the same provider.

This separation ensures that test messages don’t accidentally go to production users, and different credentials or delivery settings can be safely isolated across environments.

## [Override default settings](https://docs.novu.co/#override-default-settings)

Novu provides an `overrides` object that can be used to access features that Novu doesn't currently support but are supported by certain providers. This feature includes:

- Setting custom SendGrid headers.
- Using Slack blocks.
- Defining platform-specific sounds for FCM push notifications.

For a complete guide on Overrides, refer to the [Trigger Overrides](https://docs.novu.co/platform/integrations/trigger-overrides) documentation.

## [Integration guides](https://docs.novu.co/#integration-guides)

Select a channel below to find the list of all supported providers integrations and their detailed setup guides:

[**Email**\\ \\ Configure email providers and settings](https://docs.novu.co/platform/integrations/email) [**SMS**\\ \\ Set up SMS messaging capabilities](https://docs.novu.co/platform/integrations/sms) [**Push**\\ \\ Enable push notification delivery](https://docs.novu.co/platform/integrations/push) [**Chat**\\ \\ Integrate with chat platforms](https://docs.novu.co/platform/integrations/chat) [**In-App**\\ \\ Manage in-app notification center](https://docs.novu.co/platform/inbox)

[Applying context\\ \\ Use contexts in Novu to personalize notification templates, control workflow logic, and customize the Inbox component.](https://docs.novu.co/platform/workflow/advanced-features/contexts/contexts-in-workflows) [Demo Integrations\\ \\ Learn about the default Novu Email and SMS provider.](https://docs.novu.co/platform/integrations/demo-integration)

### On this page

[Provider vs. Integration](https://docs.novu.co/#provider-vs-integration) [Primary vs. Active integrations](https://docs.novu.co/#primary-vs-active-integrations) [Managing integrations across environments](https://docs.novu.co/#managing-integrations-across-environments) [Override default settings](https://docs.novu.co/#override-default-settings) [Integration guides](https://docs.novu.co/#integration-guides)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/index.mdx)Open in ChatGPTOpen in Claude