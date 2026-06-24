# Source: https://docs.novu.co/platform/integrations/push/apns

[Push](https://docs.novu.co/platform/integrations/push)/Providers

# Apple Push Notification Service (APNS)

Learn how to use the Apple Push Notification Service (APNS) provider to send push notifications using Novu

This guide explains how to configure and use the [Apple Push Notification Service (APNS)](https://developer.apple.com/notifications/) with Novu to deliver push notifications to iOS devices. It outlines:

- The required setup in your Apple Developer account.
- The connection process in Novu.
- How to manage device tokens and message payloads.

## [Configuring APNS with Novu](https://docs.novu.co/#configuring-apns-with-novu)

Before sending notifications, APNS must be configured with the correct credentials from your Apple Developer account. Novu uses these credentials to securely authenticate with Apple’s servers.

### [Obtain APNS credentials](https://docs.novu.co/#obtain-apns-credentials)

Apple provides two authentication options for connecting to APNS:

- A certificate-based `.p12` certificate
- A token-based `.p8` key

Novu supports both, but this guide focuses on the `.p8` token-based approach, which is recommended for most production setups.

To generate the required credentials, use an [Apple Developer account](https://developer.apple.com/) with an [Admin role](https://appstoreconnect.apple.com/access/users). Follow [Apple’s official steps](https://developer.apple.com/help/account/keys/create-a-private-key) to create and download a private `.p8` key.

The following identifiers are also needed for integration:

- [**Key ID**](https://developer.apple.com/help/account/keys/get-a-key-identifier/): A unique 10-character identifier for the authentication key.
- **Team ID**: This is found in your Apple Developer account.
- **Bundle ID**: The identifier for your app, which is available in the app info section.

### [Add APNS credentials to Novu](https://docs.novu.co/#add-apns-credentials-to-novu)

Once the Apple credentials are available, you can add them in Novu’s Integration Store.

1. Log in to your Novu account.
2. On your dashboard, click **Integration Store**.
3. Click **Connect provider**.
4. Click the **Push** tab.
5. Select **APNS**.
6. In the APNS integration form, fill in the **Name** and **Identifier** fields.
7. In the **Delivery Provider Credentials** section, fill in the following fields:
 - **Private Key**: The content of your `.p8` file.
 - **Key ID**: Your 10-character Key ID.
 - **Team ID**: Your 10-character Team ID.
 - **Bundle ID**: Your app's Bundle ID. ![APNS Integration in Novu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fapns-integration.64c1689c.png&w=3840&q=75)
8. Click **Create Integration**.

## [Sending notifications with APNS](https://docs.novu.co/#sending-notifications-with-apns)

After configuration, APNS can be used in any Novu workflow that includes a Push step. The process involves registering device tokens for subscribers and then triggering workflows to deliver messages.

### [Registering subscriber device tokens](https://docs.novu.co/#registering-subscriber-device-tokens)

Each subscriber (user) must have one or more device tokens registered to receive push notifications. Tokens can be added or updated through Novu’s API using the [Update Subscriber Credentials](https://docs.novu.co/api-reference/subscribers/update-provider-credentials) endpoint.

Node.jscURL

```
import { Novu } from '@novu/api';
import { ChatOrPushProviderEnum } from "@novu/api/models/components";
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>",
  // Required if using EU region
  // serverURL: "[https://eu.api.novu.co](https://eu.api.novu.co)",
});
 
await novu.subscribers.credentials.update(
  {
    providerId: ChatOrPushProviderEnum.Apns,
    // Use integrationIdentifier to store device tokens for a specific integration
    integrationIdentifier: "string",
    credentials: {
      deviceTokens: ["token1", "token2", "token3"],
    },
  },
  "subscriberId"
);
```

### [Triggering workflows](https://docs.novu.co/#triggering-workflows)

Once subscribers’ devices are registered, push notifications are delivered through [workflows that include a Push step](https://docs.novu.co/platform/workflow/create-a-workflow). A workflow can be triggered using the Novu [SDK](https://docs.novu.co/platform/sdks) or [API](https://docs.novu.co/api-reference/events/trigger-event).

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

## [Customizing notifications with overrides](https://docs.novu.co/#customizing-notifications-with-overrides)

Novu supports an `overrides` field that lets you attach APNS-specific payload parameters when triggering a workflow. This feature is useful for customizing the behavior or presentation of notifications, such as setting titles, bodies, or custom data fields.

The `overrides` field supports all [APNS Notification payload](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/generating_a_remote_notification?language=objc) values. Here is an example:

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
    abc: 'def', // If the notification is a data notification, then the payload is sent as the data
  },
  overrides: {
    apns: {
      payload: {
        aps: {
          notification: {
            title: 'Test',
            body: 'Test push',
          },
          data: {
            key: 'value',
          },
        },
      },
    },
  },
});
```

[Expo Push\\ \\ Learn how to use the Expo Push provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/expo-push) [OneSignal\\ \\ Learn how to use the OneSignal provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/onesignal)

### On this page

[Configuring APNS with Novu](https://docs.novu.co/#configuring-apns-with-novu) [Obtain APNS credentials](https://docs.novu.co/#obtain-apns-credentials) [Add APNS credentials to Novu](https://docs.novu.co/#add-apns-credentials-to-novu) [Sending notifications with APNS](https://docs.novu.co/#sending-notifications-with-apns) [Registering subscriber device tokens](https://docs.novu.co/#registering-subscriber-device-tokens) [Triggering workflows](https://docs.novu.co/#triggering-workflows) [Customizing notifications with overrides](https://docs.novu.co/#customizing-notifications-with-overrides)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/(providers)/apns.mdx)Open in ChatGPTOpen in Claude