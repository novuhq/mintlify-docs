# Source: https://docs.novu.co/platform/integrations/trigger-overrides

# Trigger Overrides

Learn how to customize the behavior of your workflows at trigger time

Trigger overrides let you to modify the default behavior of specific aspects of a workflow trigger (event), giving you fine-tuned control over how messages are delivered across different channels and providers.

## [Channel overrides](https://docs.novu.co/#channel-overrides)

Channel overrides let you customize specific channel settings and content during workflow trigger. Each channel has its own supported override options, documented in their respective channel guides.

Channel overrides is only available for Email and SMS channels.

[**Email overrides**](https://docs.novu.co/platform/integrations/email) [**SMS overrides**](https://docs.novu.co/platform/integrations/sms)

## [Provider overrides](https://docs.novu.co/#provider-overrides)

Provider overrides give you fine-tuned control over how messages are delivered by allowing direct configuration of the underlying provider SDKs during the workflow's trigger phase.

This feature is designed for advanced use cases where Novu's default message editor or UI does not expose specific provider capabilities.

Use provider overrides to:

- Access native provider features not surfaced by Novu’s abstraction layer. For example, custom headers in SendGrid, topic messaging in FCM, or Slack blocks.
- Adapt to provider-specific options by injecting parameters that Novu doesn’t yet officially support.
- Configure shared or unique settings across steps without altering templates or workflow logic.

This mechanism offers a flexible customization layer that lets you pass deeply nested payloads that align directly with your provider’s native API. It helps decouple workflow behavior from provider-specific implementation details, which is essential when working across multiple channels like email, push, or chat.

Because overrides interact directly with provider SDKs, they won’t work if they're misconfigured. Make sure you understand the supported options for each provider before using this feature.

### [Provider override scopes](https://docs.novu.co/#provider-override-scopes)

Overrides are defined in the `overrides` property of a trigger payload. You can specify configuration values at two levels:

- Workflow-level: Applies to all steps using a specific provider and takes precedence over the default workflow provider settings.
- Step-level: Targets a specific step in the workflow and it takes precedence over both workflow-level overrides and the default workflow provider settings.

### [Workflow-level provider overrides](https://docs.novu.co/#workflow-level-provider-overrides)

Workflow-level provider overrides apply configuration to all steps that use a given provider in the workflow. They’re useful for applying shared logic across multiple steps, without repeating the same settings in each one.

Use workflow-level overrides when:

- You need to define common metadata like headers, personalization, or layout settings.
- You want consistent behavior across all steps for a given provider.

```
import { Novu } from "@novu/api";
 
const novu = new Novu("<YOUR_SECRET_KEY_HERE>");
 
async function run() {
  const result = await novu.trigger({
    to: {
      subscriberId: "subscriber_unique_identifier",
      firstName: "Albert",
      lastName: "Einstein",
      email: "albert@einstein.com",
      phone: "+1234567890",
    },
    workflowId: "workflow_identifier",
    payload: {
      comment_id: "string",
      post: {
        text: "string",
      },
    },
    overrides: {
      providers: {
        sendgrid: {
          template_id: "xxxxxxxx", // Make sure this is a string
          trackingSettings: {
            clickTracking: {
              enable: true,
              enableText: false,
            },
          },
        },
      },
    },
  });
}
 
run();
```

This configuration affects every step in the workflow that uses SendGrid, unless a step-level override provides a more specific value.

#### [Sending extra fields supported by provider SDK](https://docs.novu.co/#sending-extra-fields-supported-by-provider-sdk)

You can also send extra fields supported by the provider SDK. For example, if you want to send a headers to the provider SDK, then you could use the `_passthrough` field.

```
"overrides": {
  "providers" : {
    "sendgrid": {
      "_passthrough": {
        "headers": {
          "Authorization": "Bearer my-api-key"
        }
      }
    },
  },
},
```

### [Step-level overrides](https://docs.novu.co/#step-level-overrides)

Step-level overrides let you apply provider-specific settings directly to an individual step in your workflow.

Use step-level overrides when:

- You want to send push notifications through the same provider, but with different settings for each step. For example, two steps use FCM, but each sends a different sound or title.
- You need to customize the payload for a specific push step, such as platform-specific settings for Android and iOS, without affecting other steps.

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ secretKey: "<YOUR_SECRET_KEY_HERE>" });
 
async function run() {
  const result = await novu.trigger({
    to: {
      subscriberId: "subscriber_unique_identifier",
      firstName: "Albert",
      lastName: "Einstein",
      email: "albert@einstein.com",
      phone: "+1234567890",
    },
    workflowId: "workflow_identifier",
    payload: {
      comment_id: "string",
      post: {
        text: "string",
      },
    },
    overrides: {
      steps: {
        'push-step': {
          providers: {
            fcm: {
              notification: {
                title: 'New Comment',
                body: 'Someone replied to your post!',
                sound: 'default', // Play default system sound
              },
              android: {
                notification: {
                  sound: 'sound_bell' // matches res/raw/sound_bell.mp3
                }
              },
              apns: {
                payload: {
                  aps: {
                    sound: 'notification_bell.caf' // For iOS
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}
 
run();
```

The `push-step` refers to the step identifier, which you can copy directly from your workflow in the Novu dashboard. Use this identifier to target the specific step you want to override.

In this example, only the `push-step` is affected, and multiple FCM-specific settings are overridden for that step, which are the notification title, body, and sound configurations for both Android and iOS platforms.

[Termii\\ \\ Learn how to use the Termii provider to send sms notifications using Novu](https://docs.novu.co/platform/integrations/sms/termii) [Overview\\ \\ Explore Novu's server-side and client-side SDKs for integrating notifications across multiple languages and frameworks.](https://docs.novu.co/platform/sdks)

### On this page

[Channel overrides](https://docs.novu.co/#channel-overrides) [Provider overrides](https://docs.novu.co/#provider-overrides) [Provider override scopes](https://docs.novu.co/#provider-override-scopes) [Workflow-level provider overrides](https://docs.novu.co/#workflow-level-provider-overrides) [Sending extra fields supported by provider SDK](https://docs.novu.co/#sending-extra-fields-supported-by-provider-sdk) [Step-level overrides](https://docs.novu.co/#step-level-overrides)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/trigger-overrides.mdx)Open in ChatGPTOpen in Claude