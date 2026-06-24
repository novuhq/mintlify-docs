# Source: https://docs.novu.co/platform/integrations/chat/zulip

[Chat](https://docs.novu.co/platform/integrations/chat)/Providers

# Zulip Chat Integration

Learn about how to use Zulip provider for chat notifications

Zulip does not need any API Key or client ID to push messages in it. All it needs is the webhook URL of the channel you want to send messages to. That itself acts as the credential.

Similar to Discord, the credential for this provider needs to be stored in the subscriber entity.

## [Getting a Zulip webhook URL](https://docs.novu.co/#getting-a-zulip-webhook-url)

- Sign up or Login to your Zulip account.
 
- Click on the Settings icon in the top right corner of the screen, and then click "Personal settings" from the drop-down menu.
 

![Zulip settings menu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep_01.0429b388.png&w=3840&q=75)

- Click "Add a new bot" button in "Bots" tab.

![Add new bot button](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep_02.39c01926.png&w=3840&q=75)

- Set bot type as "Incoming webhook".

![Set bot type](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep_03.ac26cf51.png&w=3840&q=75)

- Click the small link icon to generate webhook URL for provider. Set Integration as `Slack compatible webhook`, choose your channel and copy webhook URL.

![Generate webhook URL](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep_04.0ee99a83.png&w=3840&q=75)

## [Connecting our subscribers to Zulip](https://docs.novu.co/#connecting-our-subscribers-to-zulip)

The URL generated above will be the target channel of a subscriber that you want to integrate with. To make this connection, you have to:

1. Copy the URL that you generated above
 
2. Update the subscriber credentials with this URL using the Zulip provider id. You can do this step by using the `@novu/api` library, as shown below:
 

## [Update credential webhookUrl](https://docs.novu.co/#update-credential-webhookurl)

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
    providerId: ChatOrPushProviderEnum.Zulip,
    credentials: {
      webhookUrl: "<WEBHOOK_URL>",
    },
    integrationIdentifier: "zulip-MnGLxp8uy",
  },
  "subscriberId"
);
```

- `subscriberId` is a custom identifier used when identifying your users within the Novu platform.
- `providerId` is a unique provider identifier. We recommend using our ChatOrPushProviderEnum to specify the provider.
- The third parameter is the credentials object, in this case, we use the `webhookUrl` property to specify the Zulip channel webhook URL or by calling the `Update Subscriber Credentials` endpoint on Novu API. Check endpoint details [here](https://docs.novu.co/api-reference/subscribers/update-provider-credentials).

3. You are all set up and ready to send your first chat message via our \`@novu/api package or directly using the REST API.

[WhatsApp Business\\ \\ Learn about how to use WhatsApp for chat notifications](https://docs.novu.co/platform/integrations/chat/whats-app) [E-mail\\ \\ Learn how to configure the Email channel](https://docs.novu.co/platform/integrations/email)

### On this page

[Getting a Zulip webhook URL](https://docs.novu.co/#getting-a-zulip-webhook-url) [Connecting our subscribers to Zulip](https://docs.novu.co/#connecting-our-subscribers-to-zulip) [Update credential webhookUrl](https://docs.novu.co/#update-credential-webhookurl)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/chat/(providers)/zulip.mdx)Open in ChatGPTOpen in Claude