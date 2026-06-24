# Source: https://docs.novu.co/platform/integrations/push/fcm

[Push](https://docs.novu.co/platform/integrations/push)/Providers

# Firebase Cloud Messaging (FCM)

Learn how to use the Firebase Cloud Messaging (FCM) provider to send push notifications using Novu

This guide explains the process of configuring and using FCM with Novu, from getting your credentials to sending your first notification.

Novu uses FCM version V1

## [Step 1: Generate your service account key from Firebase](https://docs.novu.co/#step-1-generate-your-service-account-key-from-firebase)

Get your project's service account credentials from the Firebase Console.

1. Log in to the [Firebase console](https://console.firebase.google.com/).
2. Create a new Firebase project or select an existing project. ![Select Firebase Project](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fselect-firebase-project.25928cae.png&w=3840&q=75)
3. Click the gear icon ⚙️ next to **Project Overview**.
4. Select **Project settings**. ![Firebase Project Settings](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffirebase-project-settings.49c45eb2.png&w=3840&q=75)
5. Click the **Service accounts** tab.
6. Click the **Generate new private key** button. A confirmation menu appears. ![Firebase Service Accounts](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffirebase-service-accounts.3d49e323.png&w=3840&q=75)
7. Click **Generate key** to download a JSON file containing your credentials. ![Firebase generate private key confirmation dialog](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconfirmation-menu.f99f99a3.png&w=3840&q=75)
8. Open the downloaded JSON file and ensure it contains these fields:
 
 ```
    {
      "type": "service_account",
      "project_id": "PROJECT_ID",
      "private_key_id": "PRIVATE_KEY_ID",
      "private_key": "PRIVATE_KEY",
      "client_email": "FIREBASE_ADMIN_SDK_EMAIL",
      "client_id": "CLIENT_ID",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "CLIENT_X509_CERT_URL"
    }
    ```
 

## [Step 2: Connect FCM to Novu](https://docs.novu.co/#step-2-connect-fcm-to-novu)

Add the credentials to your FCM integration in the Novu dashboard.

1. Log in to the Novu dashboard.
2. Navigate to the **Integration Store**.
3. Click **Connect provider**.
4. Click the **Push** tab, then select **Firebase Cloud Messaging (FCM)**.
5. Open the JSON file you downloaded from Firebase in [Step 1](https://docs.novu.co/platform/integrations/push/fcm#step-1-generate-your-service-account-key-from-firebase).
6. Copy the entire content of the JSON file and paste it into the **Service Account** field in the FCM integration modal. ![FCM integration](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffcm-integration.d3d1d662.png&w=3840&q=75)
7. Click **Create Integration** to save the integration.

## [Step 3: Register a subscriber's device token](https://docs.novu.co/#step-3-register-a-subscribers-device-token)

Before Novu can send a push notification to your subscriber, you must associate their device's unique push token with their Novu subscriber profile.

You can do this by making an API call to [update the subscriber's credentials](https://docs.novu.co/api-reference/subscribers/update-provider-credentials).

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

Novu automatically removes invalid device tokens from a subscribers' profile and then sends the failure details to the `MESSAGE_FAILED` webhook.

## [Step 4: Send a notification](https://docs.novu.co/#step-4-send-a-notification)

Now you're ready to send a push notification. You can trigger a notification to a subscriber who has a registered device token.

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

## [Using multiple FCM integrations](https://docs.novu.co/#using-multiple-fcm-integrations)

If you have multiple active FCM integrations, then you can specify which integration to associate the tokens with by providing the `integrationIdentifier`.

You can find this identifier in your Novu dashboard on the integration's settings page.

![Integration identifier](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrationidentifier.c6caa848.png&w=3840&q=75)

```
import { Novu } from '@novu/api';
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
});
 
await novu.subscribers.credentials.update(
  {
    providerId: "fcm",
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

## [Using overrides to customize notifications](https://docs.novu.co/#using-overrides-to-customize-notifications)

Novu lets you customize the behavior of push notifications by using the overrides field when triggering workflows. Overrides give you full control over message content and delivery parameters that aren’t configurable from the Novu workflow editor.

To learn more about how overrides work across all channels, see the [Trigger Overrides](https://docs.novu.co/platform/integrations/trigger-overrides) documentation.

### [Override FCM field](https://docs.novu.co/#override-fcm-field)

Overrides let you send platform-specific data that is not available in the workflow editor. The overrides field supports:

- `apns` overrides
- `android` overrides
- `webpush` overrides
- `fcmOptions` overrides

| Override field | Type / Interface | Link |
| --- | --- | --- |
| android | AndroidConfig | [https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.androidconfig](https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.androidconfig) |
| apns | ApnsConfig | [https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.apnsconfig](https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.apnsconfig) |
| webPush | WebpushConfig | [https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.webpushconfig](https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.webpushconfig) |
| fcmOptions | FcmOptions | [https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.fcmoptions](https://firebase.google.com/docs/reference/admin/node/firebase-admin.messaging.fcmoptions) |

You can use these fields to customize how notifications are sent to Android, iOS via APNS, or web clients.

```
await novu.trigger({
  workflowId: "workflowId",
  to: {
    subscriberId: "subscriberId",
  },
  payload: {
    key: "value",
  },
  overrides: {
    fcm: {
      // For a data-only notification (silent push)
      type: 'data',
      data: {
        custom_key: 'custom_value',
      },
      // Platform-specific overrides
      android: {
        // See FCM AndroidConfig options
      },
      apns: {
        // See FCM ApnsConfig options
      },
      webPush: {
        // See FCM WebpushConfig options
      },
      fcmOptions: {
        // See FCM FcmOptions
      }
    },
  },
});
```

### [Override FCM notification content](https://docs.novu.co/#override-fcm-notification-content)

By default, Novu sends the FCM notification content written in the step editor workflow. However, you can override the notification content by using the `overrides` field.

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
    key: "value",
  },
  overrides: {
    providers: {
      fcm: {
        type: "data",
 
        // URL of an image to be displayed in the notification.
        imageUrl: "https://domain.com/image.png",
 
        // If type is not set, you can use the "data" override to send notification messages with optional data payload
        data: {
          key: "value",
        },
 
        // Check FCM Overrides section above for these types
        android: {},
        apns: {},
        webPush: {},
        fcmOptions: {},
      },
    },
  },
});
```

Overrides can be applied at runtime to customize or enrich notifications based on user context, device type, or workflow logic.

## [Sending notifications to FCM topics](https://docs.novu.co/#sending-notifications-to-fcm-topics)

[FCM topics](https://firebase.google.com/docs/cloud-messaging/android/topic-messaging) are used to send notifications to multiple devices at once. In the `overrides`, you need to specify the [topic](https://docs.novu.co/platform/concepts/topics) you want to send the notification to.

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
    key: "value",
  },
  overrides: {
    providers: {
      fcm: {
        topic: "topic-123",
      },
    },
  },
});
```

## [Web push with relative links](https://docs.novu.co/#web-push-with-relative-links)

Suppose you're using the Firebase (FCM) provider to send push notifications to web browsers via Novu and want users to be returned to the website after clicking the notification.

In that case, you must use the `link` property with a relative URL.

Node.jsCurl

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
    key: "value",
  },
  overrides: {
    providers: {
      fcm: {
        webPush: {
          fcmOptions: {
            link: "/foo",
          },
        },
      },
    },
  },
});
```

## [Frequently asked questions](https://docs.novu.co/#frequently-asked-questions)

### FCM cost

### The registration token is not a valid FCM registration token

### FCM notifications sent successfully with no error but push notification is not received in device

### Sending message failed due to 'Requested entity was not found'

### Subscriber does not have a configured channel error

### How to send desktop notifications using FCM

[Push\\ \\ Connect push providers like FCM, APNS, and OneSignal to Novu. Manage device tokens and deliver mobile and web push notifications.](https://docs.novu.co/platform/integrations/push) [Expo Push\\ \\ Learn how to use the Expo Push provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/expo-push)

### On this page

[Step 1: Generate your service account key from Firebase](https://docs.novu.co/#step-1-generate-your-service-account-key-from-firebase) [Step 2: Connect FCM to Novu](https://docs.novu.co/#step-2-connect-fcm-to-novu) [Step 3: Register a subscriber's device token](https://docs.novu.co/#step-3-register-a-subscribers-device-token) [Step 4: Send a notification](https://docs.novu.co/#step-4-send-a-notification) [Using multiple FCM integrations](https://docs.novu.co/#using-multiple-fcm-integrations) [Using overrides to customize notifications](https://docs.novu.co/#using-overrides-to-customize-notifications) [Override FCM field](https://docs.novu.co/#override-fcm-field) [Override FCM notification content](https://docs.novu.co/#override-fcm-notification-content) [Sending notifications to FCM topics](https://docs.novu.co/#sending-notifications-to-fcm-topics) [Web push with relative links](https://docs.novu.co/#web-push-with-relative-links) [Frequently asked questions](https://docs.novu.co/#frequently-asked-questions)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/(providers)/fcm.mdx)Open in ChatGPTOpen in Claude