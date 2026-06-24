# Source: https://docs.novu.co/platform/integrations/sms/gupshup

[SMS](https://docs.novu.co/platform/integrations/sms)/Providers

# Gupshup SMS Provider

Learn how to use the Gupshup SMS provider to send SMS notifications using Novu

You can use the [Gupshup](https://www.gupshup.io/) provider to send SMS messages to your customers using the Novu Platform with a single API to create multi-channel experiences.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Gupshup provider in the SMS channel, the first step is to create a Gupshup account and add the Account User Id and Password to the Gupshup integration on the Novu platform.

## [What is User id and Password?](https://docs.novu.co/#what-is-user-id-and-password)

- `User Id` : The account number provided by the Enterprise SMS GupShup.
- `Password` : Password is provided by Gupshup for authentication of user id. The password must be the same as used to log on to the Enterprise SMS GupShup website.

## [Creating a gupshup integration with Novu](https://docs.novu.co/#creating-a-gupshup-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-sms-gupshup) page on Novu.
- Click the **Connect** button on the top right corner of the page.
- Select SMS and locate **Gupshup** and click on the **Connect** button.
- Choose environment from top right corner in which you want to create the integration.
- Enter the `User id`.
- Enter the `Password`.
- Make sure **Active Integration** toggle is on to use this integration.
- If you want to use this integration, then mark this integration as `primary` using **Primary Integration** toggle.
- Click on the **Create Integration** button.

Now it is possible to send SMS notifications using Gupshup in Novu.

## [Using Gupshup templateId](https://docs.novu.co/#using-gupshup-templateid)

Novu has its own SMS editor for writing SMS template. To use premade Gupshup templates, providers overrides can be used.

Sending `customData` field in overrides to send Gupshup template will work only in following cases:

- if workflow is triggered to only one subscriber
- if workflow is triggered to multiple subscribers or topic but Gupshup template does not have any dynamic variables related to subscriber attributes like `firstName`, `lastName`, `phone`, etc as same overrides will be applied to all subscribers.

Node.JscURL

```
import { Novu } from '@novu/api';
 
const novu = new Novu({ secretKey: "NOVU_SECRET_KEY" });
 
await novu.trigger({
  workflowId: "WORKFLOW_ID",
  to: "SUBSCRIBER_ID",
  payload: {
    key: "value",
  },
  overrides: {
    providers: {
      gupshup: {
        principalEntityId: "principal-entity-id",
        dltTemplateId: "dlt-template-id",
      },
    },
  },
});
```

[Firetext\\ \\ Learn how to use the firetext provider to send sms notifications using Novu](https://docs.novu.co/platform/integrations/sms/firetext) [Kannel\\ \\ Learn how to use the Kannel sms provider to send sms notifications using Novu](https://docs.novu.co/platform/integrations/sms/kannel)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [What is User id and Password?](https://docs.novu.co/#what-is-user-id-and-password) [Creating a gupshup integration with Novu](https://docs.novu.co/#creating-a-gupshup-integration-with-novu) [Using Gupshup templateId](https://docs.novu.co/#using-gupshup-templateid)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/sms/(providers)/gupshup.mdx)Open in ChatGPTOpen in Claude