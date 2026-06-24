# Source: https://docs.novu.co/platform/integrations/chat/slack

[Chat](https://docs.novu.co/platform/integrations/chat)/Providers

# Slack Chat Integration

Learn about how to use Slack provider for chat notifications

This feature is currently in public beta, please contact us at [support@novu.co](mailto:support@novu.co) to enable it for your organization.

The Slack chat integration lets your application send notifications directly to your subscribers' Slack workspaces using their own Slack accounts and workspace permissions. With this integration, Novu can deliver messages to Slack channels, direct messages (DMs) to Slack users, and incoming webhooks. For incoming webhooks, Novu can use Slack's native channel picker during OAuth.

Novu handles the full lifecycle of Slack connections and message delivery. You define where notifications should be delivered, and Novu automatically routes each message to the correct Slack workspace, channel, or user.

This guide walks you through setting up Slack chat, connect workspaces, and deliver notifications to the exact Slack destinations your users expect it.

Check out the [agents](https://docs.novu.co/agents) documentation for more information on how to build agents using Slack.

## [Configure a Slack app](https://docs.novu.co/#configure-a-slack-app)

Before integrating Slack chat with Novu, you must create and configure a Slack app. The Slack app manages the OAuth permissions, bot token scopes, and redirect URLs needed for Novu to connect to your users' workspaces securely.

### [Create a Slack app](https://docs.novu.co/#create-a-slack-app)

First, you need to create a Slack app. This provides you with the credential you need to create a Slack integration in Novu.

1. Go to the [Slack API dashboard](https://api.slack.com/apps).
2. Click **Create an App**.
3. Select **From scratch**.
4. Enter an app name of your choice in the **App Name** field.
5. Pick a Slack workspace to develop your app in. ![Create app](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-app.e9063f8f.png&w=3840&q=75)
6. Click **Create App**. You'll be directed to the **Basic Application** for the Slack app which contains the credentials you need for configuring Slack chat inside Novu:
 - App ID
 - Client ID
 - Client Secret ![Basic application](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbasic-information.e23bdfcb.png&w=3840&q=75)

### [Configure scopes (Permissions)](https://docs.novu.co/#configure-scopes-permissions)

Your app needs permission to perform actions like sending messages or reading channel lists.

1. In the sidebar, select **OAuth & Permissions**.
2. Scroll down to the **Scopes** section.
3. Under Bot Token Scopes, click **Add an OAuth Scope**. ![Add an OAuth Scope](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fscopes.958ed56e.png&w=3840&q=75)
4. Add the following recommended scopes:
 - `chat:write`
 - `chat:write.public`
 - `channels:read`
 - `groups:read`
 - `users:read`
 - `users:read.email`
 - (optional) `incoming-webhook` if you want Slack's built-in channel picker.

These scopes are required for Novu to send messages, read channels and read users (for DMs and pickers). If you remove some of them, then certain features like channel or user selection might not work.

### [Set the redirect URL](https://docs.novu.co/#set-the-redirect-url)

This tells Slack where to send the user after they successfully authorize your app.

1. In the sidebar, select **OAuth & Permissions**.
2. Scroll down to the **Redirect URLs** section.
3. Click **Add New Redirect URL**. ![Add New Redirect URL](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fredirect-urls.42a5b699.png&w=3840&q=75)
4. Paste the Novu OAuth callback URL. Add the redirect URL that matches your Novu region:
 - US region:
 
 ```
        https://api.novu.co/v1/integrations/chat/oauth/callback
        ```
 
 - EU region:
 
 ```
        https://api.eu.novu.co/v1/integrations/chat/oauth/callback
        ```
 
5. Click **Add** to save the URLs. If you use a self-hosted Novu instance, then add your instance's callback URL instead.

## [Configure Slack integration in Novu](https://docs.novu.co/#configure-slack-integration-in-novu)

Once your Slack app is set up, the next step is to configure the Slack Chat integration inside Novu.

1. Log in to the Novu dashboard.
2. In the sidebar, click **Integrations Store**.
3. Click **Connect Provider**
4. Select **Chat** and click **Slack**.
5. Fill in the required fields using the credentials from your Slack app:
 - **Application Id**: Paste your Slack app App ID.
 - **Client ID**: Paste your Slack App Client ID.
 - **Client Secret**: Paste your Slack App Client Secret.
 - **Redirect URL (Optional)**: Enter the URL where you want users to be redirected to after they successfully connect their workspace. If there is no redirect URL, then Novu closes the tab immediately after the OAuth flow completes. ![Connect slack integration in Novu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslack-integration.41317448.png&w=3840&q=75)
6. Click **Create Integration** to create the Slack integration. Once saved, Novu is able to:
 - Generate OAuth (Connect Slack) URLs for your users
 - Receive Slack's OAuth callback.
 - Store workspace tokens as connections.

You are now ready to implement the frontend flow to let users connect their workspaces.

## [Let users connect their Slack workspace](https://docs.novu.co/#let-users-connect-their-slack-workspace)

To send messages to Slack, your users must first authorize Novu to access one of their Slack workspaces. This authorization happens through Slack's OAuth flow, which Novu generates and manages for you.

### [Generate the OAuth URL](https://docs.novu.co/#generate-the-oauth-url)

When a user clicks **Connect Slack** in your application, your backend should request a unique authorization URL from Novu.

This URL is specific to the Subscriber or the Context (Tenant) it will be generated for.

The generated OAuth URL is valid for only **5 minutes**. Do not cache this URL; generate it dynamically when the user initiates the flow.

```
import { Novu } from '@novu/api'; 
 
const novu = new Novu({ secretKey: "<YOUR_SECRET_KEY_HERE>", });
 
// This function should be called by your API when the user requests to connect
async function getSlackUrl(user, orgId) {
  
  const oauthUrl = await novu.integrations.generateChatOAuthUrl({
    integrationIdentifier: 'slack',
    subscriberId: user.id,           // The ID of the user performing the action
    context: { tenant: orgId },      // The tenant/workspace context
  });
 
  return oauthUrl;
}
```

Your application can support multiple Slack workspace connections per user or per tenant by triggering separate OAuth flows.

Novu allows one connection per (integration + subscriber + context). To connect multiple workspaces, provide different combinations of subscriber or context.

### [Redirect the user](https://docs.novu.co/#redirect-the-user)

Once your backend returns the `oauthUrl`, open it in a new tab or window.

```
window.open(oauthUrl, '_blank');
```

Slack then guides the user through:

1. Reviewing your app's requested permissions
2. Approving the authorization
3. Redirecting back to Novu's callback URL

After the user approves access, Novu handles the rest of the OAuth flow automatically.

1. Novu exchanges the code for a Slack token.
2. Novu creates a Slack connection for that workspace, it is referenced by `connectionIdentifier` when creating endpoints.You can also provider a custom `connectionIdentifier` to the `generateChatOAuthUrl()` and then connection with such identifier will be created instead of randomly generated one.

## [Choose delivery destinations](https://docs.novu.co/#choose-delivery-destinations)

After a workspace is connected, you or users decide where in Slack to send the messages. This can either be a Slack channel, to a user or an incoming webhook URLs. After the delivery location has been selected, a Slack endpoint is then created for that location.

### [Send to a Slack channel](https://docs.novu.co/#send-to-a-slack-channel)

This is the typical flow for sending notifications to public or private channels.

1. **Get the channel ID**: First, the channel where the message will be sent to must be selected, one way to do this is by using your Slack app token to list channels in your own UI.
 
 ```
    curl -X GET "https://slack.com/api/conversations.list" \
      -H "Authorization: Bearer <YOUR_BOT_TOKEN>"
    ```
 
 To learn more about using [Slack conversations API](https://docs.slack.dev/apis/web-api/using-the-conversations-api) to either get public or private channels, refer Slack documentation.
 
2. **Create the endpoint**: Once the user selects a channel, save it as an endpoint in Novu.
 
 ```
    await novu.channelEndpoints.create({
      subscriberId: 'user-123',
      integrationIdentifier: 'slack',
      connectionIdentifier: 'conn_slack_acme', // The identifier of the connection created in Step 2
      context: { tenant: 'acme' },
      type: 'slack_channel',                   // TYPE: Channel
      endpoint: {
        channelId: 'C012345'                   // Slack channel ID of the channel selected by the user
      }
    });
    ```
 

### [Send to a Slack user (Direct messages)](https://docs.novu.co/#send-to-a-slack-user-direct-messages)

Use this to send personal messages and notifications directly to a specific user.

1. **Get the Slack user ID**: You can use Slack’s users API to get user IDs.
 
 ```
    curl -X GET "https://slack.com/api/users.list" \
      -H "Authorization: Bearer <YOUR_BOT_TOKEN>"
    ```
 
 For example, you can look up a Slack user ID by their email address, if you requested the `users:read.email` scope.
 

To learn more about using [Slack `users.list` method](https://docs.slack.dev/reference/methods/users.list), refer Slack documentation.

2. Create the endpoint: Save the returned User ID as the endpoint.
 
 ```
    await novu.channelEndpoints.create({
      type: 'slack_user',
      subscriberId: 'user-123',
      integrationIdentifier: 'slack',
      connectionIdentifier: 'conn_slack_acme',
      context: { tenant: 'acme' },
      endpoint: {
        userId: 'U01234567',                  // Slack user ID
      },
    });
    ```
 

### [Incoming webhook URLs](https://docs.novu.co/#incoming-webhook-urls)

If `incoming-webhook` scope was included when configuring the OAuth and permissions scopes in [Step 1.1](https://docs.novu.co/platform/integrations/chat/slack#configure-scopes-permissions). Slack would show its own channel picker during the OAuth flow:

1. The user selects a channel directly in Slack.
2. Slack returns an `incoming_webhook.url`.
3. Novu automatically creates a webhook endpoint for that subscriber using that URL.

You don’t need to collect `channelId` yourself in this mode, Slack’s native channel picker handles it.

## [Send notifications](https://docs.novu.co/#send-notifications)

Once you have at least one Slack connection, and one or more Slack endpoints. You can trigger the workflow:

```
import { Novu } from '@novu/api';
 
const novu = new Novu({ secretKey: "<YOUR_SECRET_KEY_HERE>", });
 
await novu.trigger({
  name: 'order-shipped',
  to: {
    subscriberId: 'user-123',
  },
  context: { tenant: 'acme' },       // optional routing context
  payload: {
    orderNumber: 'ORD-12345',
    trackingUrl: 'https://acme.com/track/123',
  },
});
```

When the workflow is triggered, Novu will:

1. Find Slack endpoints matching `subscriberId` and `context`.
2. Use the right Slack workspace connection.
3. Deliver messages to the configured destinations.

[MS Teams\\ \\ Learn about how to use MS Teams provider for chat notifications](https://docs.novu.co/platform/integrations/chat/ms-teams) [WhatsApp Business\\ \\ Learn about how to use WhatsApp for chat notifications](https://docs.novu.co/platform/integrations/chat/whats-app)

### On this page

[Configure a Slack app](https://docs.novu.co/#configure-a-slack-app) [Create a Slack app](https://docs.novu.co/#create-a-slack-app) [Configure scopes (Permissions)](https://docs.novu.co/#configure-scopes-permissions) [Set the redirect URL](https://docs.novu.co/#set-the-redirect-url) [Configure Slack integration in Novu](https://docs.novu.co/#configure-slack-integration-in-novu) [Let users connect their Slack workspace](https://docs.novu.co/#let-users-connect-their-slack-workspace) [Generate the OAuth URL](https://docs.novu.co/#generate-the-oauth-url) [Redirect the user](https://docs.novu.co/#redirect-the-user) [Choose delivery destinations](https://docs.novu.co/#choose-delivery-destinations) [Send to a Slack channel](https://docs.novu.co/#send-to-a-slack-channel) [Send to a Slack user (Direct messages)](https://docs.novu.co/#send-to-a-slack-user-direct-messages) [Incoming webhook URLs](https://docs.novu.co/#incoming-webhook-urls) [Send notifications](https://docs.novu.co/#send-notifications)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/chat/(providers)/slack.mdx)Open in ChatGPTOpen in Claude