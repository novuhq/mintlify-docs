# Source: https://docs.novu.co/platform/integrations/push/onesignal

[Push](https://docs.novu.co/platform/integrations/push)/Providers

# OneSignal

Learn how to use the OneSignal provider to send push notifications using Novu

This guide walks you through the entire process of configuring and using [OneSignal](https://onesignal.com/) with Novu, from getting your credentials to sending your first notification.

OneSignal supports sending messages via both [Apple Push Notification Service](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server) (APNs) and [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) (FCM).

## [Configure Onesignal with Novu](https://docs.novu.co/#configure-onesignal-with-novu)

Before you can send push notifications via OneSignal from Novu, you need to connect your OneSignal credentials.

### [Step 1: Get your OneSignal credentials](https://docs.novu.co/#step-1-get-your-onesignal-credentials)

To configure the OneSignal integration, you need an active account that has credentials for APNS, FCM, or both, and have access to two values from OneSignal app's settings:

- App ID
- App API Key

Follow [this OneSignal guide](https://developer.apple.com/help/account/keys/create-a-private-key) to see how to access your OneSignal `App ID` and `App API key`.

### [Step 2: Connect Onesignal to Novu](https://docs.novu.co/#step-2-connect-onesignal-to-novu)

Next, add these keys to your OneSignal integration in the Novu dashboard.

1. Log in to the Novu dashboard.
2. On the Novu dashboard, navigate to the **Integration Store**.
3. Click **Connect provider**.
4. Click the **Push** tab.
5. Select **OneSignal**.
6. In the OneSignal integration form, paste your **App ID** and **App API Key** into the corresponding fields. ![Onesignal Integration in Novu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fonesignal-integration.813b4860.png&w=3840&q=75)
7. Click **Create Integration**.

## [Using Onesignal with Novu](https://docs.novu.co/#using-onesignal-with-novu)

Once your integration is configured, you can start sending push notifications by registering your subscribers' `player_id` tokens and triggering a workflow.

### [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token)

When you [set up the OneSignal SDK](https://documentation.onesignal.com/docs/onboarding-with-onesignal#step-1-setup-onesignal-sdk) in your application, your users are automatically assigned a unique OneSignal [`player_id`](https://documentation.onesignal.com/docs/users#player-id). This ID is used to target the user for push notifications.

To target a OneSignal user from Novu, you must register their `player_id` as the `deviceToken` for their Novu subscriber profile.

You can do this by making an API call to [update the subscriber's credentials](https://docs.novu.co/api-reference/subscribers/update-provider-credentials).

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
    providerId: ChatOrPushProviderEnum.OneSignal,
    // Use integrationIdentifier to store device tokens for a specific integration
    integrationIdentifier: "string",
    credentials: {
      deviceTokens: [
        "token1",
        "token2",
        "token3"
      ],
    },
  },
  "subscriberId"
);
```

### [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification)

Now you're ready to send a push notification. [Create a workflow with a Push step](https://docs.novu.co/platform/workflow/create-a-workflow) and trigger it. Novu sends the notification to all devices (player IDs) associated with the subscriber.

The example below demonstrates, how to [trigger a workflow](https://docs.novu.co/platform/sdks/server/typescript) using Novu’s SDK.

```
import { Novu } from '@novu/api';
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
});
 
await novu.trigger({
  workflowId: "workflowId",
  to: {
    subscriberId: 'SUBSCRIBER_ID',
  },
  payload: {
    // Your payload data
  },
});
```

## [Using overrides to customize notifications](https://docs.novu.co/#using-overrides-to-customize-notifications)

Novu provides an `overrides` field that lets you send additional OneSignal-specific message fields. You can use this to control how messages are displayed or to attach custom payloads.

The overrides field supports all OneSignal Create Notification parameters. Here is an example:

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
    abc: 'def', // If the notification is a data notification, the payload will be sent as the data
  },
  overrides: {
    subtitle: 'This is subtitle value',
    mutableContent: 'Mutable content value',
    // for android notification categories
    channelId: 'category_id',
    // for ios notification categories
    categoryId: 'Category id',
    // same value is used for all sizes and browsers
    icon: 'https://image.com/icon.png',
    // used for both android and ios
    sound: 'sound file url',
  },
});
```

## [Using external user ID](https://docs.novu.co/#using-external-user-id)

By default, Novu uses `player_id` to send notifications, but you can select the `External ID` option in the OneSignal integration settings in Novu. If `External ID` option is selected, then `deviceTokens` stored in subscriber credentials for the OneSignal provider, are used as external user IDs.

By default, Novu uses player IDs to send notifications. If your OneSignal integration uses external user IDs, then you can switch this behavior in the OneSignal integration settings in Novu.

![Select external id option](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fselect-external-id-option.40537e19.gif&w=3840&q=75)

Once enabled, the `deviceTokens` stored in subscriber credentials are treated as external user IDs instead of player IDs.

[Apple Push Notification Service (APNS)\\ \\ Learn how to use the Apple Push Notification Service (APNS) provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/apns) [Push Webhook\\ \\ Learn how to use the Push Webhook provider to send notifications using Novu](https://docs.novu.co/platform/integrations/push/push-webhook)

### On this page

[Configure Onesignal with Novu](https://docs.novu.co/#configure-onesignal-with-novu) [Step 1: Get your OneSignal credentials](https://docs.novu.co/#step-1-get-your-onesignal-credentials) [Step 2: Connect Onesignal to Novu](https://docs.novu.co/#step-2-connect-onesignal-to-novu) [Using Onesignal with Novu](https://docs.novu.co/#using-onesignal-with-novu) [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token) [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification) [Using overrides to customize notifications](https://docs.novu.co/#using-overrides-to-customize-notifications) [Using external user ID](https://docs.novu.co/#using-external-user-id)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/(providers)/onesignal.mdx)Open in ChatGPTOpen in Claude