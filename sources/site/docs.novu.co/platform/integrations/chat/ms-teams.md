# Source: https://docs.novu.co/platform/integrations/chat/ms-teams

[Chat](https://docs.novu.co/platform/integrations/chat)/Providers

# Microsoft Teams Integration

Learn about how to use MS Teams provider for chat notifications

This feature is currently in public beta, please contact us at [support@novu.co](mailto:support@novu.co) to enable it for your organization.

The Novu Microsoft Teams integration enables you to send notifications to Teams channels and direct messages (DMs) across different customer workspaces using a single multi-tenant bot.

You create and host a Microsoft Teams bot in your Azure environment, and your customers then approve the app (via Admin Consent) and install it in their Teams tenants.

Once a customer connects their workspace, Novu establishes a secure channel connection using your bot's credentials. You then map specific destinations, whether the destinations involve public channels or individual users to channel endpoints, allowing Novu to route notifications dynamically to the correct tenant and conversation context.

Check out the [agents](https://docs.novu.co/agents) documentation for more information on how to build agents using Microsoft Teams.

## [Prerequisites](https://docs.novu.co/#prerequisites)

- Access to [Azure Portal](https://portal.azure.com/) with App Registration permissions.
- Access to [Microsoft Teams Developer Portal](https://dev.teams.microsoft.com/home)
- Administrator privileges for granting API permissions
- Access to [Novu dashboard](https://dashboard.novu.co)

## [Azure and Teams configuration](https://docs.novu.co/#azure-and-teams-configuration)

Before you can configure Novu, you must create the infrastructure that hosts your bot. This involves two distinct portals:

- **Azure portal**: To create the identity (App Registration) and infrastructure (Bot Service).
- **Teams Developer Portal**: To create the app package that your customers can install.

### [Create the app identity (Azure AD)](https://docs.novu.co/#create-the-app-identity-azure-ad)

First, create a multi-tenant identity for your bot.

1. Log in to the [Azure Portal](https://portal.azure.com/).
2. In the menu, click **Microsoft Entra ID** (formerly Azure Active Directory).
3. In the Manage section, click **App registrations**.
4. To create an app, click **New registration**. ![New app](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fapp-registrations.91e1ba64.png&w=3840&q=75)
5. Fill in the form:
 - **Name**: Enter any name of your choice.
 - **Supported account types**: Select **Accounts in any organizational directory (Any Microsoft Entra ID directory - Multitenant)**. ![Register app](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fregister-application.8c9084ba.png&w=3840&q=75)
6. Click **Register**. ![Create app](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-app.9766477c.png&w=3840&q=75)
7. After creating the app, note the Application (client) ID and Directory (tenant) ID. You need these values to configure Microsoft Teams in Novu.

### [Configure client secret](https://docs.novu.co/#configure-client-secret)

1. On your new app's overview page, click **Certificates & secrets**.
2. Click **New client secret**. ![Client secret](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fclient-secret.8f483f0d.png&w=3840&q=75)
3. Add a description.
4. Set an expiry date.
5. Click **Add**. ![Client secret](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcertificates-and-secret.7e98b78b.png&w=3840&q=75)
6. Copy the value. This value becomes your `BOT_APP_SECRET`, and you’ll paste it into Novu. You can view the secret only once right after you create it, so save it before you leave the page.

### [Add Novu’s redirect URI](https://docs.novu.co/#add-novus-redirect-uri)

After your customers go through the administrator consent page, Microsoft needs to know where to send them back after they accept.

1. Click **Authentication (Preview)**.
2. Click **Add Redirect URI**.
3. In the menu that appears, click **Web**.
4. In the **Redirect URI** field, set the redirect URI to the Novu OAuth callback URL:
 
 - US region
 
 ```
    https://api.novu.co/v1/integrations/chat/oauth/callback
    ```
 
 - EU region
 
 ```
    https://eu.api.novu.co/v1/integrations/chat/oauth/callback
    ```
 
 ![Add redirect uri](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadd-redirect-uri.7a5f3fe2.png&w=3840&q=75)
5. Click **Configure**.

### [Add Microsoft Graph app permissions](https://docs.novu.co/#add-microsoft-graph-app-permissions)

These permissions let your app list teams and channels and decide where to send messages.

1. Click **API permissions**.
2. Click **Add a permission**.
3. Click **Microsoft Graph**. ![Add permissions](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadd-permissions.bbabb858.png&w=3840&q=75)
4. Click **Application permissions**.
5. Search for and select the following permissions:
 - `Team.ReadBasic.All`
 - `Channel.ReadBasic.All`
 - `AppCatalog.Read.All`
 - `TeamsAppInstallation.ReadWriteSelfForTeam.All` (optional, for automation)
 - `TeamsAppInstallation.ReadWriteSelfForUser.All` (optional, for automation)
6. Click **Add permissions**.

### [Create an Azure Bot resource](https://docs.novu.co/#create-an-azure-bot-resource)

Now you register your bot with the Azure AI Bot Service and link it to the app registration that you just created.

1. In the Azure portal menu, click **Create a resource**.
2. Search for “Azure Bot”, and then click the Azure Bot resource. ![Azure bot](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fazure-bot.53841c7b.png&w=3840&q=75)
3. Click **Create**.
4. Fill in the basics:
 - **Bot handle**: The unique display name in Azure.
 - **Subscription**: Select the Azure subscription.
 - **Resource group**: A collection of resources that share the same lifecycle, permissions, and policies, you can either select or create one.
 - **Data residency**: Specify an option for data residency, either global or regional.
5. Under **Microsoft App ID**:
 - **Type of app**: Select Single-tenant app registration.
 - **Creation type**: Choose “Use existing app registration” and use app IDs [you created earlier](https://docs.novu.co/platform/integrations/chat/ms-teams#create-the-app-identity-azure-ad):
 - **App ID**: Replace with the Application (client) ID.
 - **App tenant ID**: Replace with the Directory (tenant) ID. ![Create azure bot](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-azure-bot.e5856671.png&w=3840&q=75)
6. Click **Review + create**.
7. Click **Create**.

### [Enable the Microsoft Teams channel](https://docs.novu.co/#enable-the-microsoft-teams-channel)

This connects your bot resource to Teams and lets your Teams app install cleanly.

1. Once the deployment finishes, click **Go to resource**. ![Go to resource](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgo-to-resource.2a9f2558.png&w=3840&q=75)
2. Click **Settings**.
3. Click **Channels**.
4. In the available channels section, click **Microsoft Teams**.
5. In the menu that appears, accept the terms of services.
6. In the **Messaging** section, choose the appropriate environment, typically **Microsoft Teams Commercial**.
7. Click **Apply**.

### [Create a Teams app](https://docs.novu.co/#create-a-teams-app)

Now you create the Teams “wrapper” around your app registration and bot.

1. Open the [Teams client](https://teams.microsoft.com/v2/) (desktop or web).
 
2. In the left sidebar, click **Apps**.
 
3. Search for **Developer Portal** and click **Add**, then open it. ![Developer portal](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdeveloper-portal.126b68e9.png&w=3840&q=75)
 
4. In the Developer Portal dashboard, click **Create a new app**. ![Create new app](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-new-app.f77b12fa.png&w=3840&q=75)
 
5. Enter a name of your choice and click **Create**.
 
6. In the left sidebar, click **Basic information**.
 
7. Fill in the required fields (names, descriptions, developer info, URLs) and then click **Save**.
 
8. In the sidebar, click **App features**.
 
9. Select **Bot**. ![Bot](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbot.7a04dd6c.png&w=3840&q=75)
 
10. Under **Identify your bot**, select **Enter a bot ID** and then paste your Application (client) ID from Microsoft Azure.
 
11. In the **What can your bot do?** section, select "Only send notification" (at minimum).
 
12. Under **Select the scopes where people can use your bot**, enable the scopes based on your use case:
 
 - **Team**
 - **Personal**
 - **Group chat**
13. If you enabled the **Team** scope, add the `supportsChannelFeatures` property to your app manifest. Without it, uploading or installing the app fails with:
 
 > Applications with manifest version 1.25 or higher that support the 'team' scope must include the 'supportsChannelFeatures' property.
 
 In the Developer Portal, go to **Configure** → **App package editor** → **manifest.json**, and add `"supportsChannelFeatures": "tier1"` at the root level of the manifest. `tier1` is the only supported value.
 
 ```
     {
       "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.25/MicrosoftTeams.schema.json",
       "manifestVersion": "1.25",
       "bots": [
         {
           "botId": "YOUR_BOT_APP_ID",
           "scopes": ["team", "groupChat", "personal"],
           "isNotificationOnly": true,
           "supportsCalling": false,
           "supportsVideo": false,
           "supportsFiles": false
         }
       ],
       "supportsChannelFeatures": "tier1"
     }
     ```
 
14. Click **Save**.
 
15. In the top right, click **Distribute** and then click **Download the app package**. This will save a copy of the app package to your computer in ZIP format. ![Distribute your app](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdistribute-your-app.3888f995.png&w=3840&q=75)
 

### [Upload your app](https://docs.novu.co/#upload-your-app)

Next, you must install the app into a specific Team or for a specific User.

Follow the steps in the [Microsoft Teams documentation](https://learn.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/apps-upload#upload-your-app) to learn how to upload the just downloaded app package and also how to add the app to a specific location.

## [Configure the Teams (Bot) integration in Novu](https://docs.novu.co/#configure-the-teams-bot-integration-in-novu)

Now that you’ve configured your Azure Bot, provide Novu with the credentials to integrate it.

1. Log in to the Novu dashboard.
2. In the sidebar, click Integrations Store.
3. Click **Connect Provider**.
4. Select **Chat** and click **MSTeams**.
5. Enter the credentials you saved from the Azure Portal:
 - **Client ID**: Enter your `BOT_APP_ID`.
 - **Client Secret**: Enter your `BOT_APP_SECRET`.
 - **App Tenant ID**: Enter your `APP_TENANT_ID`. This value identifies the tenant where you registered the app.
 - **Redirect URL** (Optional): If you want to control where your users land after they grant administrator consent, then enter that URL here. If you leave it empty, then the consent window closes automatically. ![Novu integration](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnovu-msteams-integration.64473e43.png&w=3840&q=75)
6. Click **Create Integration**.

From now on, Novu can send messages as your bot, once a customer tenant is connected and the app is installed.

Try the Microsoft Teams integration with a demo app

If you’ve completed the previous steps, you can test your bot configuration end to end with this [demo app](https://github.com/novuhq/ms-teams-example).

## [Let your customers connect their tenant](https://docs.novu.co/#let-your-customers-connect-their-tenant)

Each of your customers has their own Microsoft 365 tenant. Before you can send them messages, they must grant your app a one time administrator consent. This authorizes your bot to act within their environment.

### [Generate a Connect Teams URL](https://docs.novu.co/#generate-a-connect-teams-url)

On your backend, use the Novu SDK to generate the authorization URL. This URL is specific to the customer's tenant context in your system.

```
import { Novu } from '@novu/api';
 
const novu = new Novu({ secretKey: "<YOUR_SECRET_KEY_HERE>", });
 
const url = await novu.integrations.generateChatOAuthUrl({
  integrationIdentifier: 'ms-teams-bot', // The identifier used for that integration on Novu
  subscriberId: 'customer-admin-id',     // (optional)
  context: { tenant: 'acme-corp' },      // (optional)
});
```

Novu returns a URL pointing to Microsoft's administrator consent endpoint. This URL already includes your Client ID, Redirect URI, and the necessary Graph scopes.

### [Show it in your UI](https://docs.novu.co/#show-it-in-your-ui)

In your frontend app, bind this URL to a button:

```
// On "Connect Microsoft Teams" button click:
window.open(url, '_blank');
```

### [What the customer administrator does](https://docs.novu.co/#what-the-customer-administrator-does)

Steps the customer administrator would take:

1. A Teams/Microsoft 365 Admin from your customer's organization logs into your product.
2. They click your **Connect Microsoft Teams** button.
3. They see a Microsoft consent page listing the permissions.
4. They click **Accept**.

Once the user completes this step, Microsoft redirects the user back to Novu. Novu captures the customer's tenant ID and automatically creates a Teams connection for that specific tenant context. You don't need to handle the callback yourself.

### [Customer installs your app in their Teams](https://docs.novu.co/#customer-installs-your-app-in-their-teams)

Granting Admin consent in the previous step only authorizes your bot to exist in the customer's tenant. It doesn't automatically add the bot to any specific teams or chats.

For the bot to send messages, install it in the specific context where notifications should appear:

- **For channel messages**: Install the app in the specific Team.
- **For direct messages**: Install the app for the specific user in their personal scope.

The customer’s administrator can install your app from the Teams app store or their org catalog, depending on how you published. If you requested the `TeamsAppInstallation.ReadWriteSelfForTeam.All` permission, your backend can programmatically install the app into a specific Team using the Microsoft Graph API.

## [Tell Novu where to send the messages](https://docs.novu.co/#tell-novu-where-to-send-the-messages)

Your customer decides where notifications should land and gives you the right IDs and then your backend registers them as Channel Endpoints in Novu.

You can choose between two destination types:

- **Channels**: Send a message to a specific channel within a Team.
- **Users**: Send a direct message to a specific user.

### [Sending message to channels](https://docs.novu.co/#sending-message-to-channels)

To send a notification to a specific channel, you must discover the Team ID and Channel ID from Microsoft, and then register them in Novu.

#### [Find the Team and Channel IDs (Microsoft Graph)](https://docs.novu.co/#find-the-team-and-channel-ids-microsoft-graph)

You can discover these IDs using the Microsoft Graph API. This requires an App-Only Token (Client credentials) scoped to the customer's tenant.

1. Get a Graph access token:

```
POST https://login.microsoftonline.com/{SUBSCRIBER_TENANT_ID}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded
 
client_id={BOT_APP_ID}
&client_secret={BOT_APP_SECRET}
&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default
&grant_type=client_credentials
```

The `SUBSCRIBER_TENANT_ID` represents the customer's tenant ID, which Novu stored on the `ChannelConnection` object after completing the Admin Consent flow.

```
GET /v1/channel-connections
{
  "identifier": "chconn-eeybt4",
  "integrationIdentifier": "msteams",
  "providerId": "msteams",
  "channel": "chat",
  "subscriberId": "689c4a87c5bdaa96aaef0cfd",
  "workspace": {
    "id": "e6633b86-ef94-4416-863f-f0f409700ca0" // the customer's tenant workspace ID
  },
  "auth": {
    "accessToken": "app-only"
  },
}
```

2. List Teams:

```
GET https://graph.microsoft.com/v1.0/teams
Authorization: Bearer {ACCESS_TOKEN}
```

3. List channels in a Team:

```
GET https://graph.microsoft.com/v1.0/teams/{TEAM_ID}/channels
Authorization: Bearer {ACCESS_TOKEN}
```

#### [Register the channel endpoint (Novu)](https://docs.novu.co/#register-the-channel-endpoint-novu)

Once you have the IDs, create an `ms_teams_channel` endpoint in Novu. This maps a subscriber to that specific channel.

```
POST /v1/channel-endpoints
Authorization: ApiKey {CUSTOMER_API_KEY}
Content-Type: application/json
 
{
  "identifier": "msteams-main-notifications",
  "integrationIdentifier": "ms-teams-bot-1",
  "providerId": "msteams",
  "channel": "chat",
 
  "subscriberId": "workspace_abc",
  "connectionIdentifier": "msteams-tenant-subscriberX",
 
  "type": "ms_teams_channel",
  "endpoint": {
    "teamId": "TEAM_ID",
    "channelId": "CHANNEL_ID"
  },
}
```

Novu stores this as `ChannelEndpoint<'ms_teams_channel'>`. You can later target it from workflows via `subscriberId` + `context`.

### [Send a direct message to a user](https://docs.novu.co/#send-a-direct-message-to-a-user)

To send a direct message (DM), you need the user's Teams User ID before registering the user endpoint in Novu.

#### [Find the user ID (Bot framework)](https://docs.novu.co/#find-the-user-id-bot-framework)

Use the [Bot framework API](https://learn.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-overview?view=azure-bot-service-4.0) to inspect the roster of the Team where you installed the bot.

1. Install the bot in at least one Team that includes the target user.
2. Get a Bot Framework token:
 
 ```
    POST https://login.microsoftonline.com/botframework.com/oauth2/v2.0/token
    Content-Type: application/x-www-form-urlencoded
     
    grant_type=client_credentials&
    client_id={BOT_APP_ID}&
    client_secret={BOT_APP_SECRET}&
    scope=https%3A%2F%2Fapi.botframework.com%2F.default
    ```
 
3. Call the roster API for that Team, using the Team’s `19:...@thread.tacv2` id as `{TEAM_CONVERSATION_ID}`:
 
 ```
    GET https://smba.trafficmanager.net/teams/v3/conversations/{TEAM_CONVERSATION_ID}/members
    Authorization: Bearer {BOT_ACCESS_TOKEN}
    ```
 

From the returned members, take the member’s `id`; this value represents the Teams user ID (`29:...`) you’ll use as `userId`.

#### [Register the user endpoint (Novu)](https://docs.novu.co/#register-the-user-endpoint-novu)

Once you have the IDs, create the endpoint in Novu using the `ms_teams_user` type.

```
POST /v1/channel-endpoints
Authorization: ApiKey {CUSTOMER_API_KEY}
Content-Type: application/json
 
{
  "identifier": "msteams-user-alice",
  "integrationIdentifier": "ms-teams-bot-1",
  "providerId": "msteams",
  "channel": "chat",
 
  "subscriberId": "user_123",
  "connectionIdentifier": "msteams-tenant-subscriberX",
 
  "type": "ms_teams_user",
  "endpoint": {
    "userId": "29:1GcS4EyB_oSI8A88XmWB..."
  },
 
  "contextKeys": []
}
```

Novu stores this as `ChannelEndpoint<'ms_teams_user'>`. From here, any workflow that resolves to this endpoint can send a DM from your bot to that user.

## [Workflows for Teams (Webhook-style)](https://docs.novu.co/#workflows-for-teams-webhook-style)

If you don't need a full Bot identity or Direct Message capabilities, then you can support a simplified, channel-only integration using Workflows for Microsoft Teams.

This approach relies on a unique Webhook URL generated by the Teams client. It requires no Azure app registration and no administrator consent.

### [User generates the webhook URL (Teams client)](https://docs.novu.co/#user-generates-the-webhook-url-teams-client)

The setup begins inside the Microsoft Teams app. Instruct your users to follow these steps:

1. In Microsoft Teams, go to **Apps** in the sidebar.
2. Search for and open **Workflows**.
3. Click **Create new flow**, either from blank or template.
4. Choose a trigger, such as “When a Teams webhook request is received”.
5. Add an action to post a message into a specific channel.
6. Save the workflow.
7. Once created, the workflow generates a unique URL. The user must copy this URL.

### [Register the webhook endpoint (Novu)](https://docs.novu.co/#register-the-webhook-endpoint-novu)

Unlike the Bot integration, you don't use `ms_teams_channel` here. Instead, you treat this as a generic webhook endpoint. Your app should provide a form where the user can paste the URL they generated in the previous step.

```
await novu.channelEndpoints.create({
  type: 'webhook',
  identifier: 'teams-workflow-alerts',
  integrationIdentifier: 'ms-teams-workflow',
  subscriberId: 'customer-account-id',
  context: { tenant: 'acme' },
  endpoint: {
    url: 'https://prod-00.westeurope.logic.azure.com:443/workflows/...' // workflow URL
  },
});
```

### [Sending the notification](https://docs.novu.co/#sending-the-notification)

When you trigger a workflow that targets this subscriber:

1. Novu sends a standard HTTP POST payload to the Teams Workflow URL.
2. Workflows for Teams receives the payload.
3. The Workflow runs and posts the message content into the configured channel.

[Mattermost\\ \\ Learn about how to use Mattermost provider for chat notifications](https://docs.novu.co/platform/integrations/chat/mattermost) [Slack\\ \\ Learn about how to use Slack provider for chat notifications](https://docs.novu.co/platform/integrations/chat/slack)

### On this page

[Prerequisites](https://docs.novu.co/#prerequisites) [Azure and Teams configuration](https://docs.novu.co/#azure-and-teams-configuration) [Create the app identity (Azure AD)](https://docs.novu.co/#create-the-app-identity-azure-ad) [Configure client secret](https://docs.novu.co/#configure-client-secret) [Add Novu’s redirect URI](https://docs.novu.co/#add-novus-redirect-uri) [Add Microsoft Graph app permissions](https://docs.novu.co/#add-microsoft-graph-app-permissions) [Create an Azure Bot resource](https://docs.novu.co/#create-an-azure-bot-resource) [Enable the Microsoft Teams channel](https://docs.novu.co/#enable-the-microsoft-teams-channel) [Create a Teams app](https://docs.novu.co/#create-a-teams-app) [Upload your app](https://docs.novu.co/#upload-your-app) [Configure the Teams (Bot) integration in Novu](https://docs.novu.co/#configure-the-teams-bot-integration-in-novu) [Let your customers connect their tenant](https://docs.novu.co/#let-your-customers-connect-their-tenant) [Generate a Connect Teams URL](https://docs.novu.co/#generate-a-connect-teams-url) [Show it in your UI](https://docs.novu.co/#show-it-in-your-ui) [What the customer administrator does](https://docs.novu.co/#what-the-customer-administrator-does) [Customer installs your app in their Teams](https://docs.novu.co/#customer-installs-your-app-in-their-teams) [Tell Novu where to send the messages](https://docs.novu.co/#tell-novu-where-to-send-the-messages) [Sending message to channels](https://docs.novu.co/#sending-message-to-channels) [Find the Team and Channel IDs (Microsoft Graph)](https://docs.novu.co/#find-the-team-and-channel-ids-microsoft-graph) [Register the channel endpoint (Novu)](https://docs.novu.co/#register-the-channel-endpoint-novu) [Send a direct message to a user](https://docs.novu.co/#send-a-direct-message-to-a-user) [Find the user ID (Bot framework)](https://docs.novu.co/#find-the-user-id-bot-framework) [Register the user endpoint (Novu)](https://docs.novu.co/#register-the-user-endpoint-novu) [Workflows for Teams (Webhook-style)](https://docs.novu.co/#workflows-for-teams-webhook-style) [User generates the webhook URL (Teams client)](https://docs.novu.co/#user-generates-the-webhook-url-teams-client) [Register the webhook endpoint (Novu)](https://docs.novu.co/#register-the-webhook-endpoint-novu) [Sending the notification](https://docs.novu.co/#sending-the-notification)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/chat/(providers)/ms-teams.mdx)Open in ChatGPTOpen in Claude