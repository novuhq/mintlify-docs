# Source: https://docs.novu.co/platform/integrations/push

# Push Notification Channel Integrations

Connect push providers like FCM, APNS, and OneSignal to Novu. Manage device tokens and deliver mobile and web push notifications.

Push providers are the services that deliver notifications your subscribers' devices, which can be delivered through mobile, desktop, or web. Each provider must be set up individually in the Novu dashboard.

Novu provides a unified integration layer that connects your workflows to push providers. Once your push provider is configured, Novu automatically handles message delivery, routing each notification through the correct provider without requiring extra setup.

You can also manage multiple integrations even for the same provider in one place, giving you full flexibility and centralized control over your push notifications.

## [Key features](https://docs.novu.co/#key-features)

- **Multi-provider support**: Integrate with providers like Firebase Cloud Messaging (FCM), OneSignal, or Apple Push Notification Service (APNS).
- **Unified delivery**: Streamline your push notifications with a single API for mobile and web platforms.
- **Device management**: Keep subscriber device tokens in sync using just-in-time or manual updates.

## [How push works in Novu](https://docs.novu.co/#how-push-works-in-novu)

Here is the step-by-step process for sending a push notification with Novu:

### [Add a push provider integration](https://docs.novu.co/#add-a-push-provider-integration)

Start by adding a push channel provider integration in the **Integration Store** on your Novu dashboard. You can connect one or more integrations for the same provider, each with its own credentials and environment configuration.

### [Add the Push channel to your workflow](https://docs.novu.co/#add-the-push-channel-to-your-workflow)

Next, add a Push step to a workflow. This step defines when and how a push message should be sent as part of your notification logic.

### [Store device tokens for your subscribers](https://docs.novu.co/#store-device-tokens-for-your-subscribers)

Each subscriber in Novu must have a valid device token specific to the push provider integration. These tokens are stored in the subscriber’s profile and can be added or updated using the SDK or API. Novu uses these tokens to route messages to the correct device when a workflow runs.

### [Trigger the workflow](https://docs.novu.co/#trigger-the-workflow)

Trigger the workflow by sending an event from your application code. Novu automatically resolves the subscriber, selects all active push provider integrations device tokens, and delivers the message through the configured integrations.

## [Managing push device tokens](https://docs.novu.co/#managing-push-device-tokens)

To send push notifications, each subscriber must have one or more device tokens for each push provider integration associated with their profile.

These tokens are unique identifiers that help push notification providers deliver messages to the correct devices. Each provider has its own method for obtaining device tokens, refer to your provider's guide to learn how to generate the device tokens.

Each subscriber channel supports a maximum of **100 device tokens**. Attempts to create or update credentials beyond this limit will be rejected. Remove unused or stale tokens to stay within the limit. See [Platform Limits](https://docs.novu.co/platform/developer/limits) for all system limits.

The code examples in this section use fcm. For other providers, replace `ChatOrPushProviderEnum.Fcm` with the correct enum for your provider, such as `ChatOrPushProviderEnum.Apns` or `ChatOrPushProviderEnum.Expo`.

### [Add push device tokens](https://docs.novu.co/#add-push-device-tokens)

Novu offers two ways of adding device tokens to a subscriber's profile:

- Just in time - inline with triggering the workflow
- Ahead of trigger - before triggering the workflow

#### [Just in time](https://docs.novu.co/#just-in-time)

You can pass the device tokens in the `channels` array of the subscriber field when triggering a workflow. Novu automatically updates the subscriber's profile with these tokens before sending the message. Here is an example with FCM:

```
import { Novu } from '@novu/api';
import { ChatOrPushProviderEnum } from "@novu/api/models/components";
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
  // Required if using EU region
  // serverURL: "https://eu.api.novu.co",
});
 
await novu.trigger({
  workflowId: "workflowId",
  to: {
    subscriberId: "subscriberId",
    channels: [
      {
        providerId: ChatOrPushProviderEnum.Fcm,
        credentials: {
          deviceTokens: ["token-1", "token-2"],
        }
      },
    ],
  },
  payload: {},
});
```

#### [Ahead of trigger](https://docs.novu.co/#ahead-of-trigger)

You can add device tokens for a subscriber using the [Update provider credentials API](https://docs.novu.co/api-reference/subscribers/update-provider-credentials) before triggering the workflow.

This method is useful when you manage device registration outside of your workflow triggers, for example, after a user logs in.

Node.jscURL

```
import { Novu } from "@novu/api";
import { ChatOrPushProviderEnum } from "@novu/api/models/components";
 
const novu = new Novu({ secretKey: "YOUR_SECRET_KEY_HERE",});
 
async function run() {
  const result = await novu.subscribers.credentials.update({
    providerId: ChatOrPushProviderEnum.Fcm,
    credentials: {
      deviceTokens: [
        "token1",
        "token2",
      ],
    },
  }, "subscriberId");
}
run();
```

### [Add device tokens for specific integrations](https://docs.novu.co/#add-device-tokens-for-specific-integrations)

Novu supports multiple active integrations per provider for the push channel. For example, you can have more than one active FCM integration at a time, one for android and one for web app.

By default, device tokens are stored for the most recently created integration. To store device tokens for a specific integration, you must use the `integrationIdentifier` field. This is the identifier for the integration, which you can find in the Novu dashboard.

![Integration identifier](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegration-identifier.d35dc6d1.png&w=3840&q=75)

Node.jscURL

```
import { Novu } from "@novu/api";
import { ChatOrPushProviderEnum } from "@novu/api/models/components";
 
const novu = new Novu({ secretKey: "YOUR_SECRET_KEY_HERE",});
 
async function run() {
  const result = await novu.subscribers.credentials.update({
    providerId: ChatOrPushProviderEnum.Fcm,
    // Use integrationIdentifier to store device tokens for a specific integration
    integrationIdentifier: "fcm-MnGLxp8uy",
    credentials: {
      deviceTokens: [
        "token1",
        "token2",
      ],
    },
  }, "subscriberId");
}
run();
```

### [Remove device tokens](https://docs.novu.co/#remove-device-tokens)

To remove device token(s) from subscriber credentials, follow this process:

When a subscriber logs out of a device, remove that device token from the subscriber's credentials. This prevents another subscriber who may log in to the same device from receiving notifications meant for the previous subscriber.

Handle token removal, such as during a user logout event on the server-side, to prevent stale or invalid tokens from causing failed deliveries.

#### [Automatic removal of stale device tokens](https://docs.novu.co/#automatic-removal-of-stale-device-tokens)

Novu automatically removes invalid, stale or expired device tokens from a subscribers' profile and then sends the failure details via `message.failed` [webhook event](https://docs.novu.co/platform/developer/webhooks/event-types#message-events). This ensures that notifications are only sent to valid and active devices. This feature is currently supported for FCM and Expo providers. If you are looking for other providers to support this feature, reach out to us at [support@novu.co](mailto:support@novu.co)

#### [Remove a specific token](https://docs.novu.co/#remove-a-specific-token)

To remove device tokens from subscriber credentials, follow this process:

1. Fetch the subscriber's current token list.
2. Filter out the token you want to remove.
3. Update the subscriber with the new, filtered list.

```
import { Novu } from '@novu/api';
import { ChatOrPushProviderEnum } from "@novu/api/models/components";
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
});
 
const subscriberId = "subscriberId";
const providerId = ChatOrPushProviderEnum.Fcm;
 
// 1. Fetch current credentials
const { data: subscriber } = await novu.subscribers.get(subscriberId);
const currentTokens = subscriber.credentials[providerId]?.deviceTokens || [];
 
// 2. Remove the specific token
const filteredTokens = currentTokens.filter(token => token !== "token_to_remove");
 
// 3. Update subscriber
await novu.subscribers.credentials.update(
  {
    providerId,
    credentials: {
      deviceTokens: filteredTokens,
    },
  },
  subscriberId
);
```

#### [Remove all tokens](https://docs.novu.co/#remove-all-tokens)

To remove all device tokens for a provider, or for a specific integration, update the credentials with an empty array.

```
import { Novu } from '@novu/api';
import { ChatOrPushProviderEnum } from "@novu/api/models/components";
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
});
 
await novu.subscribers.credentials.update(
  {
    providerId: ChatOrPushProviderEnum.Fcm,
    credentials: {
      deviceTokens: [],
    },
  },
  "subscriberId"
);
```

## [Supported providers](https://docs.novu.co/#supported-providers)

Novu supports the following providers:

[**Firebase Cloud Messaging (FCM)**\\ \\ Learn how to use the FCM provider to send push notifications using Novu.](https://docs.novu.co/platform/integrations/push/fcm) [**Expo Push**\\ \\ Learn how to use the Expo Push provider to send push notifications using Novu.](https://docs.novu.co/platform/integrations/push/expo-push) [**Apple Push Notification Service (APNS)**\\ \\ Learn how to use the APNS provider to send push notifications using Novu.](https://docs.novu.co/platform/integrations/push/apns) [**OneSignal**\\ \\ Learn how to use the OneSignal provider to send push notifications using Novu.](https://docs.novu.co/platform/integrations/push/onesignal) [**Push Webhook**\\ \\ Learn how to use the Push Webhook provider to send push notifications using Novu.](https://docs.novu.co/platform/integrations/push/push-webhook) [**Pusher Beams**\\ \\ Learn how to use the Pusher Beams provider to send push notifications using Novu.](https://docs.novu.co/platform/integrations/push/pusher-beams) [**Pushpad**\\ \\ Learn how to use the Pushpad provider to send push notifications using Novu.](https://docs.novu.co/platform/integrations/push/pushpad)

[SendGrid\\ \\ A step-by-step guide to manually configure SendGrid event webhooks for Novu activity tracking.](https://docs.novu.co/platform/integrations/email/activity-tracking/manual-configuration/sendgrid) [Firebase Cloud Messaging (FCM)\\ \\ Learn how to use the Firebase Cloud Messaging (FCM) provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/fcm)

### On this page

[Key features](https://docs.novu.co/#key-features) [How push works in Novu](https://docs.novu.co/#how-push-works-in-novu) [Add a push provider integration](https://docs.novu.co/#add-a-push-provider-integration) [Add the Push channel to your workflow](https://docs.novu.co/#add-the-push-channel-to-your-workflow) [Store device tokens for your subscribers](https://docs.novu.co/#store-device-tokens-for-your-subscribers) [Trigger the workflow](https://docs.novu.co/#trigger-the-workflow) [Managing push device tokens](https://docs.novu.co/#managing-push-device-tokens) [Add push device tokens](https://docs.novu.co/#add-push-device-tokens) [Just in time](https://docs.novu.co/#just-in-time) [Ahead of trigger](https://docs.novu.co/#ahead-of-trigger) [Add device tokens for specific integrations](https://docs.novu.co/#add-device-tokens-for-specific-integrations) [Remove device tokens](https://docs.novu.co/#remove-device-tokens) [Automatic removal of stale device tokens](https://docs.novu.co/#automatic-removal-of-stale-device-tokens) [Remove a specific token](https://docs.novu.co/#remove-a-specific-token) [Remove all tokens](https://docs.novu.co/#remove-all-tokens) [Supported providers](https://docs.novu.co/#supported-providers)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/index.mdx)Open in ChatGPTOpen in Claude