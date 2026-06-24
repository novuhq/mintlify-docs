# Source: https://docs.novu.co/platform/integrations/push/pushpad

[Push](https://docs.novu.co/platform/integrations/push)/Providers

# Pushpad Push Provider

Learn how to use the Pushpad provider to send web push notifications using Novu

This guide walks you through the entire process of configuring and using [Pushpad](https://pushpad.xyz) with Novu, from getting your credentials to sending your first notification.

[Pushpad](https://pushpad.xyz) is a web push service that supports sending notifications to all major browsers via FCM, Mozilla autopush, Windows Push Notification Services, and APNS, with just one simple API.

## [Configure Pushpad with Novu](https://docs.novu.co/#configure-pushpad-with-novu)

Before you can send notifications, you need to connect your Pushpad project to Novu by getting your credentials and adding them to your integration settings.

### [Step 1: Get your Pushpad credentials](https://docs.novu.co/#step-1-get-your-pushpad-credentials)

To configure the Pushpad integration, you need:

- An active Pushpad account
- A Pushpad auth token (found in the [account settings](https://pushpad.xyz/access_tokens))
- Your Pushpad project ID (found in the project settings)

1. Log in to your Pushpad dashboard.
2. Click **New project** to create a project. ![New project](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnew-project.10b9b97f.png&w=3840&q=75)
3. Click **Settings** on the project page and record the **Project ID**. You need it to connect to Novu. ![Project ID](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fproject-id.d8baf97b.png&w=3840&q=75)
4. Navigate to the [access token](https://pushpad.xyz/access_tokens) page.
5. Click **Add access token**.
6. Fill in the required fields to create a new access token, or use your existing token if you already have one. ![Add access token](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadd-token.dfd2def3.png&w=3840&q=75)
7. Copy the generated token. You need it to connect to Novu. ![Generate access token](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faccess-token.ad7c6290.png&w=3840&q=75)

### [Step 2: Connect Pushpad to Novu](https://docs.novu.co/#step-2-connect-pushpad-to-novu)

Add these credentials to your Pushpad integration in the Novu dashboard.

1. Log in to the Novu dashboard.
2. On the Novu dashboard, navigate to the **Integration Store**.
3. Click **Connect provider**.
4. Click the **Push** tab.
5. Select **Pushpad**.
6. In the Pushpad integration form, paste your access token and project ID from [Step 1](https://docs.novu.co/platform/integrations/push/pushpad#step-1-get-your-pushpad-credentials) into the corresponding fields. ![Pushpad Integration in Novu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpushpad-integration.dc3a812a.png&w=3840&q=75)
7. Click **Create Integration**.

## [Using Pushpad with Novu](https://docs.novu.co/#using-pushpad-with-novu)

Once your integration is configured, in other to send push notification using the PushPad provider, you must do the following:

### [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token)

After [setting up the Pushpad SDK](https://pushpad.xyz/docs/pushpad_pro_getting_started) on your website, you must [assign a user ID (uid)](https://pushpad.xyz/docs/identifying_users) to your users' push subscriptions.

This `uid` is the identifier Novu uses to target a specific browser. For example, if you use `pushpad('uid', 'user123')`, then `user123` is the ID you must register in Novu.

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
    providerId: ChatOrPushProviderEnum.PushPad,
    // Use integrationIdentifier to store device tokens for a specific integration
    integrationIdentifier: "pushpad-MnGLxp8uy",
    credentials: {
      deviceTokens: ["token1", "token2", "token3"],
    },
  },
  "subscriberId"
);
```

### [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification)

Now you're ready to send a push notification. [Create a workflow with a Push step](https://docs.novu.co/platform/workflow/create-a-workflow) and then trigger it. Novu sends the notification to the `uid`s associated with the subscriber.

The example below demonstrates a simple trigger using Novu’s SDK.

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
});
```

[Pusher Beams\\ \\ Learn how to use the Pusher Beams provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/pusher-beams) [Activity Tracking\\ \\ Learn how to manually forward push notification events from your application to Novu for unified activity tracking.](https://docs.novu.co/platform/integrations/push/push-activity-tracking)

### On this page

[Configure Pushpad with Novu](https://docs.novu.co/#configure-pushpad-with-novu) [Step 1: Get your Pushpad credentials](https://docs.novu.co/#step-1-get-your-pushpad-credentials) [Step 2: Connect Pushpad to Novu](https://docs.novu.co/#step-2-connect-pushpad-to-novu) [Using Pushpad with Novu](https://docs.novu.co/#using-pushpad-with-novu) [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token) [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/(providers)/pushpad.mdx)Open in ChatGPTOpen in Claude