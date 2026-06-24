# Source: https://docs.novu.co/platform/integrations/push/push-webhook

[Push](https://docs.novu.co/platform/integrations/push)/Providers

# Push Webhook

Learn how to use the Push Webhook provider to send notifications using Novu

This guide walks you through the entire process of configuring and using Push Webhook with Novu.

The Push Webhook provider is different from other push providers because it does not depend on a third-party service. Instead, Novu sends push notifications directly to a webhook URL that you control. This approach is ideal if you want full control over how notifications are processed, routed, or stored in your system.

## [Configure Push Webhook with Novu](https://docs.novu.co/#configure-push-webhook-with-novu)

To configure Push Webhook, you must provide an endpoint URL for Novu to call and a secret HMAC key to verify the request's authenticity.

### [Step 1: Get your webhook URL and secret key](https://docs.novu.co/#step-1-get-your-webhook-url-and-secret-key)

Before connecting to Novu, you need two things:

- **Webhook URL**: This is your own API endpoint that will receive the `POST` request from Novu. For quick testing, you can use a service like [webhook.site](https://webhook.site/).
- **Secret HMAC Key:** This is a self-generated secret string. Novu will use it to encrypt the payload using the `HMAC SHA256` algorithm and send the hash in the `x-novu-signature` header. This lets you verify that the request is genuinely from Novu. See [how to generate a HMAC key](https://docs.novu.co/platform/inbox/prepare-for-production#2-generate-hmac-hash-on-the-server-side).

Your webhook URL endpoint must be able to accept `POST` requests.

### [Step 2: Connect Push Webhook to Novu](https://docs.novu.co/#step-2-connect-push-webhook-to-novu)

Next, add these keys to your Push Webhook integration in the Novu dashboard:

1. Log in to the Novu dashboard.
2. On the Novu dashboard, navigate to the **Integration Store**.
3. Click **Connect Provider**.
4. In the **Push** tab, select **Push Webhook**.
5. In the integration form, fill in the following fields:

- **Webhook URL:** The endpoint URL that you prepared in Step 1.
- **Secret HMAC Key:** The secret key used to sign webhook calls. ![Push Webhook Integration in Novu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpush-webhook-integration.afcc076c.png&w=3840&q=75)

6. Click **Create Integration**.

## [Using Push Webhook with Novu](https://docs.novu.co/#using-push-webhook-with-novu)

Once configured, you must register a device token for your subscriber and trigger a workflow.

### [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token)

This step is mandatory. Unlike other push providers that generate a unique token, for the Push Webhook, you must provide your own identifier.

Any random string can be used as a device token. This token is included in the webhook payload sent to your endpoint, allowing you to identify which user or device the notification is for.

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
    providerId: ChatOrPushProviderEnum.PushWebhook,
    // Use integrationIdentifier to store device tokens for a specific integration
    integrationIdentifier: "push-webhook-MnGLxp8uy",
    credentials: {
      deviceTokens: ["token1", "token2", "token3"],
    },
  },
  "subscriberId"
);
```

```
curl -L -X PUT 'https://api.novu.co/v1/subscribers/<SUBSCRIBER_ID>/credentials' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Authorization: ApiKey <NOVU_SECRET_KEY>' \
-d '{
  "providerId": "push-webhook",
  "deviceTokens": ['ANY_RANDOM_STRING'],
  "integrationIdentifier": "push-webhook-MnGLxp8uy"
}'
```

### [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification)

Now you're ready to send a push notification. [Create a workflow with a Push step](https://docs.novu.co/platform/workflow/create-a-workflow) and trigger it. Novu sends the notification payload to the webhook URL that you configured.

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
    // This payload data will be included
    // in the webhook request
    custom_message: "This is custom message from payload.",
  },  
});
```

## [Payload sent by Novu to webhook URL](https://docs.novu.co/#payload-sent-by-novu-to-webhook-url)

When you trigger a workflow, Novu sends a `POST` request to your webhook URL with a JSON body similar to the one below.

The payload includes:

- The `title` and `content` from your workflow editor.
- The `target` (the device token you set).
- Your `overrides`.
- The full payload from your trigger.
- The subscriber's profile.

```
{
  "target": ["subscriber-token-for-push-webhook-provider"],
  "title": "Push Webhook message title",
  "content": "push Webhook content body",
  "overrides": {
    "data": {
      "custom_message": "this is custom message from payload push webhook demo"
    }
  },
  "payload": {
    "custom_message": "this is custom message from payload push webhook demo",
    "__source": "test-workflow",
    "subscriber": {
      // subscriber fields
      "_id": "65c0d71c0959a38e8857b131",
      "_organizationId": "organizationId",
      "_environmentId": "environmentId",
      "firstName": "Pawan",
      "lastName": "Jain",
      "phone": "+123456789",
      "subscriberId": "push-webhook-demo-subscriber-id",
      "email": "pawan+push+web+hook+demo@domain.com",
      "channels": [
        {
          "credentials": {
            "deviceTokens": ["subscriber-token-for-push-webhook-provider"]
          },
          "_integrationId": "integrationId",
          "providerId": "push-webhook"
        }
      ],
      "data": {
        // custom data field of subscriber
        "isDeveloper": "true"
      },
      "deleted": false,
      "createdAt": "2024-02-05T12:39:56.379Z",
      "updatedAt": "2024-02-05T12:54:08.684Z",
      "__v": 0,
      "id": "65c0d71c0959a38e8857b131"
    },
    "step": {
      // digest variables
      "digest": false,
      "events": [],
      "total_count": 0
    }
  }
}
```

## [Checking authenticity](https://docs.novu.co/#checking-authenticity)

If you provided a secret HMAC key during configuration, then Novu will include a `x-novu-signature` header in the request. You can use this header to verify that the request is from Novu and not a malicious third party.

Here is an example of how to validate the hash:

```
import crypto from 'crypto';
 
// secret key added in step 3
const secretKey = 'YOUR_HMAC_SECRET_KEY';
 
// function to handle webhook url route request
async function acceptNovuPushWebHookRequest(request, response) {
  const payloadSentByNovu = request.body;
  const hmacHashSentByNovu = request.headers['x-novu-signature'];
 
  const actualHashValue = crypto
    .createHmac('sha256', secretKey)
    .update(payloadSentByNovu, 'utf-8')
    .digest('hex');
 
  if (hmacHashSentByNovu === actualHashValue) {
    // handle the notification
    console.log('Request sent by Novu');
  } else {
    throw new Error('Not a valid request');
  }
}
```

[OneSignal\\ \\ Learn how to use the OneSignal provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/onesignal) [Pusher Beams\\ \\ Learn how to use the Pusher Beams provider to send push notifications using Novu](https://docs.novu.co/platform/integrations/push/pusher-beams)

### On this page

[Configure Push Webhook with Novu](https://docs.novu.co/#configure-push-webhook-with-novu) [Step 1: Get your webhook URL and secret key](https://docs.novu.co/#step-1-get-your-webhook-url-and-secret-key) [Step 2: Connect Push Webhook to Novu](https://docs.novu.co/#step-2-connect-push-webhook-to-novu) [Using Push Webhook with Novu](https://docs.novu.co/#using-push-webhook-with-novu) [Step 1: Add subscriber device token](https://docs.novu.co/#step-1-add-subscriber-device-token) [Step 2: Send a notification](https://docs.novu.co/#step-2-send-a-notification) [Payload sent by Novu to webhook URL](https://docs.novu.co/#payload-sent-by-novu-to-webhook-url) [Checking authenticity](https://docs.novu.co/#checking-authenticity)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/(providers)/push-webhook.mdx)Open in ChatGPTOpen in Claude