# Source: https://docs.novu.co/guides/migrate-from-courier-to-novu

# Migrate from Courier to Novu

Learn how to migrate your notification infrastructure from Courier to Novu

This guide helps you plan and execute a migration from Courier to Novu. It covers how the two platforms compare, what changes when moving to Novu, and a step-by-step approach for migrating your notification workflows, templates, providers, and user data.

## [Why Novu?](https://docs.novu.co/#why-novu)

- **Unified Workflows:** Courier separates "Templates" (content) and "Automations" (logic). Novu unifies routing, timing (delays/digests), and content into a single **Workflow**, making it much easier to manage the entire lifecycle of a message.
- **Choose How You Build:**
 - **Visual Builder:** A powerful drag-and-drop dashboard for teams that want a no-code UI to design content and orchestration.
 - **Novu Framework:** An optional code-first approach that lets developers write workflows in TypeScript, version-control them, and test them locally.
- **Unrivaled React Ecosystem:** Novu's in-app Inbox comes with pre-built React components for a drop-in experience, plus powerful headless hooks if you want to build a completely bespoke UI.
- **Data Sovereignty:** Because Novu is open-source, you can use our fully managed Cloud platform or self-host it on your own infrastructure to meet strict compliance requirements.
- **Translations:** Novu supports translations for your notifications, making it easier to localize your notifications for your users. Use translation keys in channel step editor to localize your notifications and Novu will send the notifications in the subscriber's locale. Read more on how to [use translations](https://docs.novu.co/platform/workflow/advanced-features/translations) in the Novu Dashboard.
- **Multi-tenancy:** Send notifications to different tenants or organizations within the same Novu project and let users manage their notification preferences for each tenant. Read more on how to [use multitenancy](https://docs.novu.co/platform/workflow/advanced-features/contexts) in the Novu Dashboard.

## [Mapping Courier concepts to Novu concepts](https://docs.novu.co/#mapping-courier-concepts-to-novu-concepts)

Before you dive into the migration steps, here is a quick cheat sheet for translating your Courier setup into Novu's terminology.

| Courier Concept | Novu Equivalent | How they compare |
| --- | --- | --- |
| **Automations + Templates** | **Workflows** | Novu combines your message content and delivery logic (like delays or digests) into a single, easy-to-manage Workflow. |
| **Profiles / Users** | **Subscribers** | The core entity receiving the notification. Just like Courier, Novu allows you to pass user data inline, meaning you don't have to sync users beforehand. |
| **Lists / Audiences** | **Topics** | Used for broadcasting. In Novu, you trigger a workflow to a Topic, and Novu automatically fans it out to all subscribed users. |
| **Preferences** | **Preferences** | Novu categorizes user opt-in/opt-out states natively by Workflow or via global channel settings. End user can manage their preference for each workflow or globally. |
| **Integrations** | **Integrations** | Both platforms connect to external providers (Twilio, SendGrid, etc.). Novu lets you define multiple active integrations for each channel provider and set a primary integration per environment. |
| **Inbox** | **Inbox** | Novu's in-app Inbox comes with pre-built React components for a drop-in experience, plus powerful headless hooks, javascript and react native support if you want to build custom Inbox UI. |
| **Tenants** | **Context** | Novu supports multitenancy out of the box, the most simple way to implement tenant separation sending context information while triggering a workflow. Novu will automatically filter the notifications for the tenant and the end user will see only the notifications relevant to their tenant. |

## [Migration steps](https://docs.novu.co/#migration-steps)

We recommend a phased approach to migrate safely without dropping any messages.

Phase 1: Set up your workspace and providers

1. **Create your workspace:** Sign up for [Novu Cloud](https://dashboard.novu.co/auth/signup). You'll automatically get isolated **Development** and **Production** environments.
2. **Connect your providers:** In the Novu Dashboard, navigate to the **Integrations Store**. Reconnect the ESPs (SendGrid, Postmark), SMS gateways (Twilio), and Push providers (FCM, APNS) you were using in Courier.

Phase 2: Migrate audience data

You need to sync your Courier `Profiles` to Novu `Subscribers`. The easiest way to handle this is a **Lazy Migration**:

Instead of exporting and importing thousands of users manually, simply update your backend to pass the user's details (email, phone, name) inline when you trigger a notification. Novu will automatically create or update the Subscriber on the fly.

_If you prefer to sync ahead of time, you can easily script it:_

```
import { Novu } from '@novu/api';
const novu = new Novu({ secretKey: 'YOUR_NOVU_API_KEY' });
 
// Translating a Courier profile to a Novu subscriber
await novu.subscribers.create({
  subscriberId: 'usr_123', // Your internal user ID
  email: 'alex@example.com',
  phone: '+15551234567',
  data: {
    subscriptionTier: 'premium' // Custom data
  }
});
```

You can also use the [Bulk Import API](https://docs.novu.co/api-reference/subscribers/bulk-create-subscribers) to import your subscribers in bulk.

Phase 3: Translate automations to workflows

In Courier, you link Automations to Templates. In Novu, you recreate these as **Workflows**. You have two great options for building them:

**Option A: The Dashboard Visual Builder** If your product or marketing team loves managing notifications visually, they will feel right at home in the Novu Dashboard. You can drag and drop Email, SMS, and In-App steps, add Delays and Digests, and edit message content directly in the browser. Read more on how to [manage workflows](https://docs.novu.co/platform/workflow/overview) in the Novu Dashboard.

**Option B: Code-First with Novu Framework** If your engineering team wants more control, you can use `@novu/framework` to define the same workflows directly in your codebase using TypeScript.

_A simple code-first example:_

```
import { workflow } from "@novu/framework";
 
export const weeklyDigestWorkflow = workflow('weekly-digest', async ({ step }) => {
  // Replaces Courier's digest node
  const digestResult = await step.digest('batch-events', () => ({ amount: 7, unit: 'days' }));
 
  // Replaces Courier's send node + template
  await step.email('send-summary', async (controls) => {
    return {
      subject: `Your Weekly Activity Summary`,
      body: `You have ${digestResult.events.length} new updates this week.`,
    };
  });
});
```

Phase 4: Swap out the in-app Inbox

If your app uses Courier's Inbox component, swapping it for Novu's is incredibly simple. Novu's Inbox provides out-of-the-box real-time updates and unread counts.

```
npm install @novu/react
```

```
import { Inbox } from "@novu/react";
 
export default function NotificationCenter() {
  return (
    <Inbox
      applicationIdentifier="YOUR_NOVU_APP_ID"
      subscriberId="usr_123"
      // We recommend using HMAC encryption in production for security
      subscriberHash="HMAC_HASH_GENERATED_ON_BACKEND" 
    />
  );
}
```

Phase 5: Update API calls

With your workflows ready and integrations connected, it's time to replace your `courier.send()` API calls with Novu `trigger` calls.

Node.jsPythoncURL

```
import { Novu } from '@novu/api';
const novu = new Novu({ secretKey: 'YOUR_SECRET_KEY' });
 
// Replaces courier.send()
await novu.trigger({
  workflowId: 'weekly-digest',
  to: { 
    subscriberId: 'usr_123',
    // Pass details inline for easy lazy migration
    email: 'alex@example.com' 
  },
  payload: {
    activityType: 'login'
  }
});
```

**Final Validation:** Send test events using your Novu Development API key. Monitor the **Execution Logs** in the Dashboard to verify everything works flawlessly. Once you're confident, switch to your Production API key and you're fully migrated!

## [API endpoint quick reference](https://docs.novu.co/#api-endpoint-quick-reference)

Need to update your backend API requests? Use this mapping to find the Novu equivalent of your Courier endpoints.

| Action | Courier Endpoint | Novu Equivalent |
| --- | --- | --- |
| **Trigger a Message** | `POST /send` | [`POST /v1/events/trigger`](https://docs.novu.co/api-reference/events/trigger-event) |
| **Send to Many** | `POST /bulk` | [`POST /v1/events/trigger/bulk`](https://docs.novu.co/api-reference/events/bulk-trigger-event) |
| **Update User** | `PUT /profiles/:id` | [`PUT /v2/subscribers/:subscriberId`](https://docs.novu.co/api-reference/subscribers/update-a-subscriber) |
| **Fetch User Data** | `GET /profiles/:id` | [`GET /v2/subscribers/:subscriberId`](https://docs.novu.co/api-reference/subscribers/retrieve-a-subscriber) |
| **Modify Opt-Ins** | `PUT /users/:id/preferences/:topic` | [`PATCH /v2/subscribers/:subscriberId/preferences`](https://docs.novu.co/api-reference/subscribers/update-subscriber-preferences) |
| **Manage Lists/Groups** | `PUT /lists/:id` | [`POST /v2/topics`](https://docs.novu.co/api-reference/topics/create-a-topic) |
| **View Logs** | `GET /messages` | [`GET /v1/notifications`](https://docs.novu.co/api-reference/notifications/list-all-notifications) |

## [Next steps](https://docs.novu.co/#next-steps)

[**Quickstart Guide**\\ \\ Get up and running with Novu in under 5 minutes.](https://docs.novu.co/platform/quickstart/react) [**Inbox Integration**\\ \\ Add a real-time notification center to your application.](https://docs.novu.co/platform/inbox) [**Explore Novu Framework**\\ \\ Learn more about the code-first approach to building workflows.](https://docs.novu.co/framework) [**API Reference**\\ \\ Explore Novu's REST endpoints and SDKs.](https://docs.novu.co/api-reference)

[Using Translations\\ \\ Learn how to use translations with @novu/framework based workflows](https://docs.novu.co/guides/framework/using-translations)

### On this page

[Why Novu?](https://docs.novu.co/#why-novu) [Mapping Courier concepts to Novu concepts](https://docs.novu.co/#mapping-courier-concepts-to-novu-concepts) [Migration steps](https://docs.novu.co/#migration-steps) [API endpoint quick reference](https://docs.novu.co/#api-endpoint-quick-reference) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/guides/migrate-from-courier-to-novu.mdx)Open in ChatGPTOpen in Claude