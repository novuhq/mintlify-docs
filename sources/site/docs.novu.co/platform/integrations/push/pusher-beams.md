# Source: https://docs.novu.co/platform/integrations/push/pusher-beams

[Push](https://docs.novu.co/platform/integrations/push)/Providers

# Pusher Beams

Learn how to use the Pusher Beams provider to send push notifications using Novu

[Pusher Beams](https://pusher.com/beams/) is a cross-platform push notification API service provided by Pusher.

This guide explains the process of configuring and using Pusher Beams with Novu, from getting your credentials to sending your first notification.

## [How to configure Pusher Beams with Novu](https://docs.novu.co/#how-to-configure-pusher-beams-with-novu)

Before you can send notifications, you must get your credentials from a Pusher Beams instance and add them to your Novu integration settings.

### [Step 1: Get your Pusher Beams credentials](https://docs.novu.co/#step-1-get-your-pusher-beams-credentials)

To enable Pusher Beams integration, you need to create a Pusher Beams Instance and use both `Instance ID` and `Secret Key` from the Instance [dashboard](https://dashboard.pusher.com/beams/).

1. Log in to the Pusher Beams dashboard.
2. Click **Create instance**.
3. Enter the instance name, and then click **Create**. ![Create instance](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-instance.bf0b6729.png&w=3840&q=75)
4. In the instance dashboard, click **Keys** from the sidebar, then copy and store your **Instance ID** and **Primary key** you will need them in [Step 2](https://docs.novu.co/platform/integrations/push/pusher-beams#step-2-connect-pusher-beams-to-novu). ![Instance credentials](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finstance-credentials.e5c3cde8.png&w=3840&q=75)

### [Step 2: Connect Pusher Beams to Novu](https://docs.novu.co/#step-2-connect-pusher-beams-to-novu)

Next, add these credentials to your Pusher Beams integration in the Novu dashboard.

1. Log in to the Novu dashboard.
2. On the Novu dashboard, navigate to the **Integration Store**.
3. Click **Connect Provider**.
4. Click the **Push** tab, then select **Pusher Beams**.
5. In the Pusher Beams integration form, paste your **Instance ID** and **Secret Key** into the corresponding fields. ![Pusher Beams Integration in Novu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpusher-beams-integration.ceb29a49.png&w=3840&q=75)
6. Click **Create Integration**.

## [Using Pusher Beams with Novu](https://docs.novu.co/#using-pusher-beams-with-novu)

Once your integration is configured, you can start sending push notifications by registering your subscribers' `userId` and triggering a workflow.

### [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token)

After [setting up the Pusher Beams SDK](https://pusher.com/docs/beams/reference/all-libraries/) in your application, you must associate users with their devices using Pusher Beams' [Authenticated Users](https://pusher.com/docs/beams/guides/publish-to-specific-user/web/) feature. This assigns them a `userId`.

To target a Pusher Beams user from Novu, you must register this `userId` as the `deviceToken` for their Novu subscriber profile. You can retrieve this value using the [`getUserId()`](https://pusher.com/docs/beams/reference/web/#getuserid) method from the Pusher Beams SDK.

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
    providerId: ChatOrPushProviderEnum.PusherBeams,
    // Use integrationIdentifier to store device tokens for a specific integration
    integrationIdentifier: "pusher-beams-MnGLxp8uy",
    credentials: {
      deviceTokens: ["token1", "token2", "token3"],
    },
  },
  "subscriberId"
);
```

### [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification)

Now you're ready to send a push notification. [Create a workflow with a Push step](https://docs.novu.co/platform/workflow/create-a-workflow) and trigger it. Novu sends the notification to the `userId`'s associated with the subscriber.

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
  payload: {
    custom_data: 'custom_data', // the payload will be sent as notification data object. Cannot contain the key "pusher"
  },
});
```

[Push Webhook\\ \\ Learn how to use the Push Webhook provider to send notifications using Novu](https://docs.novu.co/platform/integrations/push/push-webhook) [Pushpad\\ \\ Learn how to use the Pushpad provider to send web push notifications using Novu](https://docs.novu.co/platform/integrations/push/pushpad)

### On this page

[How to configure Pusher Beams with Novu](https://docs.novu.co/#how-to-configure-pusher-beams-with-novu) [Step 1: Get your Pusher Beams credentials](https://docs.novu.co/#step-1-get-your-pusher-beams-credentials) [Step 2: Connect Pusher Beams to Novu](https://docs.novu.co/#step-2-connect-pusher-beams-to-novu) [Using Pusher Beams with Novu](https://docs.novu.co/#using-pusher-beams-with-novu) [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token) [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/(providers)/pusher-beams.mdx)Open in ChatGPTOpen in Claude