# Source: https://docs.novu.co/platform/integrations/push/expo-push

[Push](https://docs.novu.co/platform/integrations/push)/Providers

# Expo Push

Learn how to use the Expo Push provider to send push notifications using Novu

This guide explains the process of configuring and using Expo Push with Novu, from getting your credentials to sending your first notification.

## [How to configure Expo with Novu](https://docs.novu.co/#how-to-configure-expo-with-novu)

Before you can send notifications, you must connect your Expo project to Novu by generating an access token and adding it to your integration settings.

### [Step 1: Generate your access token from Expo Push](https://docs.novu.co/#step-1-generate-your-access-token-from-expo-push)

Generate an access token from your dashboard. This token authorizes Novu to send notifications on behalf of your project.

1. Log in to the [Expo console](https://expo.dev/).
2. Navigate to the **Credentials** section in the project settings sidebar.
3. Click [**Access Token**](https://expo.dev/settings/access-tokens). ![Create Expo token](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-token.189d174e.png&w=3840&q=75)
4. Click **Create Token**. A menu appears.
5. Give it a descriptive name, and then click **Generate New Token**. ![Generate Expo token](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgenerate-token.e0a4bb41.png&w=3840&q=75)
6. Copy and save the generated access token. You need it in the next step. ![Copy Expo token](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcopy-token.69dc6e75.png&w=3840&q=75)

### [Step 2: Connect Expo Push to Novu](https://docs.novu.co/#step-2-connect-expo-push-to-novu)

Next, add the access token to your Expo integration in the Novu dashboard.

1. Log in to the Novu dashboard.
2. On the Novu dashboard, navigate to the **Integration Store**.
3. Click **Connect provider**.
4. In the **Push** tab, select **Expo Push**.
5. In the Expo integration form, paste the access token that you copied from Expo into the **Access Token** field. ![Expo Integration in Novu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexpo-integration.828684a8.png&w=3840&q=75)
6. Click **Create Integration**.

## [Using Expo Push with Novu](https://docs.novu.co/#using-expo-push-with-novu)

Once your integration is configured, you can start sending push notifications by registering your subscribers' device tokens and triggering a workflow.

### [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token)

Before Novu can send a push notification to a subscriber (user), you must associate their device's unique push token with their Novu subscriber profile.

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
    providerId: ChatOrPushProviderEnum.Expo,
    // Use integrationIdentifier to store device tokens for a specific integration
    integrationIdentifier: "string",
    credentials: {
      deviceTokens: [
        "token1",
        "token2"
      ]
    },
  },
  "subscriberId"
);
```

Novu automatically removes invalid device tokens from a subscribers' profile and then sends the failure details to the `MESSAGE_FAILED` webhook.

### [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification)

Now you're ready to send a push notification. [Create a workflow with a Push step](https://docs.novu.co/platform/workflow/create-a-workflow) and trigger it. Novu sends the notification to all devices associated with the subscriber.

The example below demonstrates a simple trigger using Novu’s SDK.

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

Novu provides an overrides field that let you send additional Expo-specific message fields. You can use this to control how messages are displayed or to attach custom payloads.

The overrides field supports all [Expo Message Request](https://docs.expo.dev/push-notifications/sending-notifications/#message-request-format) values. Here is an example:

```
import { Novu } from '@novu/api';
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
  // Required if using EU region
  // serverURL: "https://eu.api.novu.co",
});
 
await novu.trigger({
  workflowId: "workflowId",
  to: { subscriberId: "subscriber-id-123" },
  payload: {
    orderId: "12345",
  },
  overrides: {
    providers: {
      expo: {
        title: "Order Update",
        body: "Your order #12345 has been shipped!",
        data: {
          deepLink: "myapp://orders/12345",
          orderId: "12345",
        },
        sound: "default",
        priority: "high",
        ttl: 3600,
      },
    },
  },
});
```

[Firebase Cloud Messaging (FCM)\\ \\ Learn how to use the Firebase Cloud Messaging (FCM) provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/fcm) [Apple Push Notification Service (APNS)\\ \\ Learn how to use the Apple Push Notification Service (APNS) provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/apns)

### On this page

[How to configure Expo with Novu](https://docs.novu.co/#how-to-configure-expo-with-novu) [Step 1: Generate your access token from Expo Push](https://docs.novu.co/#step-1-generate-your-access-token-from-expo-push) [Step 2: Connect Expo Push to Novu](https://docs.novu.co/#step-2-connect-expo-push-to-novu) [Using Expo Push with Novu](https://docs.novu.co/#using-expo-push-with-novu) [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token) [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification) [Using overrides to customize notifications](https://docs.novu.co/#using-overrides-to-customize-notifications)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/(providers)/expo-push.mdx)Open in ChatGPTOpen in Claude