# Source: https://docs.novu.co/platform/build-with-ai/skills

# Agent Skills

Learn how to use Novu Agent Skills to help AI agents build multi-channel notification systems.

## [What are Agent Skills?](https://docs.novu.co/#what-are-agent-skills)

Agent Skills are an open standard that gives AI agents (Claude Code, Cursor, Copilot, etc.) the context they need to work with specific tools and platforms. Novu's skills provide AI agents with everything required to build multi-channel notification systems — triggering workflows, managing subscribers, integrating the in-app inbox, and configuring preferences.

## [Prerequisites](https://docs.novu.co/#prerequisites)

- A Novu account
- Secret key from [dashboard.novu.co/settings/api-keys](https://dashboard.novu.co/settings/api-keys)

## [Setup](https://docs.novu.co/#setup)

Install the Novu skills into your project using the `skills` CLI:

```
npx skills add novuhq/skills
```

This pulls the skills from the [novuhq/skills](https://github.com/novuhq/skills) GitHub repository and makes them available to your AI agent (Claude Code, Cursor, Copilot, etc.).

---

## [Available Skills](https://docs.novu.co/#available-skills)

| Skill | Description |
| --- | --- |
| [trigger-notification](https://github.com/novuhq/skills/tree/main/trigger-notification) | Send single, bulk, broadcast, and topic-based notifications |
| [manage-subscribers](https://github.com/novuhq/skills/tree/main/manage-subscribers) | CRUD operations on subscribers and topics |
| [inbox-integration](https://github.com/novuhq/skills/tree/main/inbox-integration) | Integrate the in-app notification inbox into React, Next.js, or vanilla JS |
| [manage-preferences](https://github.com/novuhq/skills/tree/main/manage-preferences) | Configure workflow and subscriber notification preferences |

## [Quick Routing](https://docs.novu.co/#quick-routing)

Use this guide to pick the right skill for your task:

- **"Send a welcome notification"** → `trigger-notification`
- **"Create subscriber"** → `manage-subscribers`
- **"Add a bell icon to my app"** → `inbox-integration`
- **"Let users opt out of emails"** → `manage-preferences`

## [Common Combinations](https://docs.novu.co/#common-combinations)

- **Full notification system**: `trigger-notification` + `manage-subscribers`
- **In-app notifications**: `trigger-notification` + `inbox-integration`
- **Complete stack**: all four skills together

## [SDK Overview](https://docs.novu.co/#sdk-overview)

| Package | Side | Purpose |
| --- | --- | --- |
| `@novu/api` | Server | Trigger notifications, manage subscribers/topics/workflows via REST |
| `@novu/react` | Client | React Inbox component, Notifications, Preferences, Bell |
| `@novu/nextjs` | Client | Next.js-optimized Inbox integration |
| `@novu/react-native` | Client | React Native hooks-based Inbox integration |
| `@novu/js` | Client | Vanilla JavaScript client for non-React apps |

## [Skill Reference](https://docs.novu.co/#skill-reference)

### [Trigger Notification](https://docs.novu.co/#trigger-notification)

Send notifications by triggering Novu workflows. Supports single, bulk, broadcast, and topic-based delivery.

SingleBulkBroadcastTopic

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ secretKey: process.env.NOVU_SECRET_KEY });
 
await novu.trigger({
  workflowId: "welcome-email",
  to: "subscriber-123",
  payload: {
    userName: "Jane",
    activationLink: "https://app.example.com/activate",
  },
});
```

**Key trigger parameters:**

| Parameter | Required | Description |
| --- | --- | --- |
| `workflowId` | Yes | The workflow identifier (not the display name) |
| `to` | Yes | Subscriber ID string, subscriber object, or topic target |
| `payload` | No | Data passed to the workflow, validated against `payloadSchema` |
| `overrides` | No | Provider-specific overrides per channel |
| `transactionId` | No | Unique ID for idempotency and cancellation |
| `actor` | No | Subscriber representing who triggered the action |
| `context` | No | Key-value pairs for multi-tenancy / organizational context |

---

### [Manage Subscribers](https://docs.novu.co/#manage-subscribers)

Subscribers are the recipients of your notifications. Each subscriber has a unique `subscriberId` — typically your application's user ID.

CreateRetrieveUpdateDeleteBulk Create

```
await novu.subscribers.create({
  subscriberId: "user-123",         // required
  email: "jane@example.com",
  firstName: "Jane",
  lastName: "Doe",
  phone: "+15551234567",
  data: { plan: "pro" },            // custom key-value data
});
```

**Topics** are named groups of subscribers for group-based notification targeting:

```
// Create a topic
await novu.topics.create({ key: "engineering-team", name: "Engineering Team" });
 
// Add subscribers
await novu.topics.subscriptions.create(
  { subscriptions: ["user-1", "user-2", "user-3"] },
  "engineering-team"
);
```

---

### [Inbox Integration](https://docs.novu.co/#inbox-integration)

Add an in-app notification center to your web application. The Inbox provides a bell icon, notification feed, read/archive management, and real-time WebSocket updates.

ReactNext.jsVanilla JS

```
npm install @novu/react
```

```
import { Inbox } from "@novu/react";
 
function App() {
  return (
    <Inbox
      applicationIdentifier="YOUR_NOVU_APP_ID"
      subscriberId="subscriber-123"
      subscriberHash="HMAC_HASH"  // Required if HMAC encryption is enabled
    />
  );
}
```

**HMAC Authentication** is required in production to prevent subscriber impersonation. Generate the hash server-side:

```
import { createHmac } from "crypto";
 
const subscriberHash = createHmac("sha256", process.env.NOVU_SECRET_KEY!)
  .update(subscriberId)
  .digest("hex");
```

---

### [Manage Preferences](https://docs.novu.co/#manage-preferences)

Novu uses a two-level preference system: **workflow defaults** and **subscriber overrides** (set by end users).

**Workflow-level defaults**: Workflow level defaults can be configured in the Novu Dashboard. To do so, click on the workflow you want to configure and then click on the `Manage Preferences` option.

**Subscriber-level overrides**:

Workflow levelGlobal level

```
await novu.subscribers.preferences.update(
  {
    workflowId: "weekly-newsletter",
    channels: { email: false, inApp: true },
  },
  "subscriber-123"
);
```

**Preference resolution order** (most specific wins):

1. Subscriber workflow preference
2. Subscriber global preference
3. Workflow default
4. System default (all channels enabled)

The `Inbox` component includes a built-in Preferences panel accessible via the settings icon, or use `<Preferences />` as a standalone component.

For additional help, check the [Novu documentation](https://docs.novu.co) or contact us at [support@novu.co](mailto:support@novu.co).

[MCP Server\\ \\ Connect your AI tools to Novu using MCP and manage notifications using natural language.](https://docs.novu.co/platform/build-with-ai/mcp) [Agent Toolkit\\ \\ Expose Novu notification workflows as tools for LLM agents with the @novu/agent-toolkit package. Works with OpenAI, LangChain, and Vercel AI SDK.](https://docs.novu.co/platform/build-with-ai/agent-toolkit)

### On this page

[What are Agent Skills?](https://docs.novu.co/#what-are-agent-skills) [Prerequisites](https://docs.novu.co/#prerequisites) [Setup](https://docs.novu.co/#setup) [Available Skills](https://docs.novu.co/#available-skills) [Quick Routing](https://docs.novu.co/#quick-routing) [Common Combinations](https://docs.novu.co/#common-combinations) [SDK Overview](https://docs.novu.co/#sdk-overview) [Skill Reference](https://docs.novu.co/#skill-reference) [Trigger Notification](https://docs.novu.co/#trigger-notification) [Manage Subscribers](https://docs.novu.co/#manage-subscribers) [Inbox Integration](https://docs.novu.co/#inbox-integration) [Manage Preferences](https://docs.novu.co/#manage-preferences)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/build-with-ai/skills.mdx)Open in ChatGPTOpen in Claude