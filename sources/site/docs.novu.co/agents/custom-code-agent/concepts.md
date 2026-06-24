# Source: https://docs.novu.co/agents/custom-code-agent/concepts

# Core concepts

Entities, lifecycle, and handler building blocks for a custom code agent with Novu.

These are the ideas behind Novu for Agents (Agent Communication Infrastructure, or ACI). You write handler code; Novu handles providers, delivery, and conversation state.

## [Inbound flow](https://docs.novu.co/#inbound-flow)

Users can message your agent, and your agent can message back. When someone interacts on a connected platform, Novu resolves identity and conversation state, forwards a context object to your server, then delivers your reply to the right thread.

![Inbound message flow](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fconcept-inbound-flow.05ad3da6.png&w=3840&q=75)

| Step | What Novu does |
| --- | --- |
| **Receive and identify** | Normalizes the platform webhook. Maps the platform user (for example a Slack user ID) to a Novu subscriber when possible. Known users get full profiles; unknown users stay anonymous until resolved. |
| **Load conversation** | Creates or loads the conversation for that thread. Assembles message history, metadata, and subscriber data into one context object. |
| **Your handler** | Calls your code with message, history, subscriber, and platform details. You run your LLM or business logic and call `ctx.reply()`. |
| **Deliver and persist** | Sends the reply to the provider thread, stores it in history, and logs activity in the dashboard. |

Your server never calls Slack, Teams, or email APIs directly. It gets a context object and returns a reply; Novu handles the rest.

## [Key entities](https://docs.novu.co/#key-entities)

### [Agent](https://docs.novu.co/#agent)

The dashboard object that connects your code to one or more chat providers. Each agent has a name, identifier, and event handlers.

It does not define your model, prompts, tools, or business rules. It is the bridge to the app where that logic lives. The provider is where the user chats; the agent is how your app responds.

### [Provider connection](https://docs.novu.co/#provider-connection)

Credentials and config that link an agent to a platform (Slack, Teams, WhatsApp, email, and others).

Setup and capabilities differ per provider (reactions, typing indicators, attachments, cards, message edits, and so on). Novu normalizes inbound events before your handler runs, so you work with one interface instead of provider-specific webhooks. Your handler code stays provider-agnostic; Novu translates outbound replies per platform.

### [Conversation](https://docs.novu.co/#conversation)

The stateful thread for a chat. Novu creates or loads it when a message arrives. It holds history, metadata, participants, status, and platform context.

The agent is a participant, not the conversation itself (relevant when you read threads in the dashboard). A Slack thread, email thread, or similar maps to one Novu conversation.

**Lifecycle:** **Active** from the first message until resolved. **Resolved** when the agent emits the resolve signal (`onResolve` runs; optional summary stored). **Reopened** automatically if the user messages again after resolution.

### [Participants and identity](https://docs.novu.co/#participants-and-identity)

Novu maps platform users to subscribers when it can:

- **Match found:** handler gets subscriber ID, name, email, and related fields.
- **No match:** user is tracked as a platform user; write handlers that tolerate missing subscriber data.

Later resolution upgrades them to a full subscriber. Identity is provider-aware (Slack user ID vs email sender, and so on) but can resolve to one subscriber record. Use it for personalization, account lookup, and escalation rules.

## [Bridge surface](https://docs.novu.co/#bridge-surface)

The same handler API applies no matter which provider sent the event or which model you use.

### [Event handlers](https://docs.novu.co/#event-handlers)

| Handler | When it runs | Typical use |
| --- | --- | --- |
| `onMessage` | User sends a message | Process text and reply |
| `onAction` | User clicks a button or selects from a card | Forms, buttons, dropdowns |
| `onReaction` | User adds or removes a reaction | Feedback, follow-ups |
| `onResolve` | Conversation marked resolved | Cleanup, analytics, summary |

Handlers connect Novu's delivery layer to your app. An `onMessage` handler might pass context to an LLM and return a reply through Novu.

### [Context object](https://docs.novu.co/#context-object)

Each handler receives a context with some or all of:

- Incoming message
- Conversation state and metadata
- Resolved subscriber (when available)
- Recent history
- Provider and platform details (thread, channel IDs)
- Methods to reply, set metadata, trigger workflows, or resolve

That object is the only interface your code needs. You do not integrate Slack, Teams, WhatsApp, or email separately in the handler.

### [Replies vs signals](https://docs.novu.co/#replies-vs-signals)

**Replies** are user-visible messages: plain text, markdown with files, or interactive cards (buttons, dropdowns, links, inputs). Card interactions fire `onAction` with `actionId` and value.

**Signals** update state without necessarily sending another chat message:

| Signal | What it does |
| --- | --- |
| Metadata | Key-value data on the conversation, persists across turns |
| Trigger | Starts a Novu workflow from the thread |
| Resolve | Marks the conversation resolved, optional summary |

Replies talk to the user; signals update the system around the conversation. One handler turn can reply, set metadata, trigger a workflow, and resolve.

Signals queue in memory and batch with your next `ctx.reply()` in one request. If the handler exits without calling `ctx.reply()`, pending signals still send.

## [Conversations and workflows](https://docs.novu.co/#conversations-and-workflows)

Conversations and Novu workflows share the same account:

- **Conversation to workflow:** User asks in Slack for a report by email; handler calls `ctx.trigger()` and an existing workflow sends the email.
- **Workflow to conversation:** User replies to a digest email; that reply opens a new agent conversation.

ACI extends Novu's workflow system; it does not replace it. Transactional workflows and open-ended chat work together on one platform.

## [Full flow (example: Slack)](https://docs.novu.co/#full-flow-example-slack)

1. User messages the agent in Slack.
2. Novu receives the event via the provider connection.
3. Novu maps the thread to a conversation and resolves the subscriber when possible.
4. Novu calls `onMessage` with the context object.
5. Your handler passes message and history to your agent logic.
6. Your logic decides the next action.
7. Handler sends a reply, signals, or both.
8. Novu posts the reply to the Slack thread.
9. Novu records messages, participants, metadata, signals, and status.

The same handler code works on every connected provider; adding a provider does not require changing agent logic.

## [Next steps](https://docs.novu.co/#next-steps)

[**Quickstart**\\ \\ Create an agent, connect Slack, and get a reply in-thread.](https://docs.novu.co/agents/custom-code-agent/quickstart) [**Connect your first agent**\\ \\ Walk through a full support-bot handler file.](https://docs.novu.co/agents/custom-code-agent/connect-your-first-agent)

[Quickstart\\ \\ Create your first agent and connect it to Slack in under 10 minutes.](https://docs.novu.co/agents/custom-code-agent/quickstart) [Connect your first agent\\ \\ Build a Pipeliner support agent with handlers, cards, metadata, an LLM, and conversation resolution.](https://docs.novu.co/agents/custom-code-agent/connect-your-first-agent)

### On this page

[Inbound flow](https://docs.novu.co/#inbound-flow) [Key entities](https://docs.novu.co/#key-entities) [Agent](https://docs.novu.co/#agent) [Provider connection](https://docs.novu.co/#provider-connection) [Conversation](https://docs.novu.co/#conversation) [Participants and identity](https://docs.novu.co/#participants-and-identity) [Bridge surface](https://docs.novu.co/#bridge-surface) [Event handlers](https://docs.novu.co/#event-handlers) [Context object](https://docs.novu.co/#context-object) [Replies vs signals](https://docs.novu.co/#replies-vs-signals) [Conversations and workflows](https://docs.novu.co/#conversations-and-workflows) [Full flow (example: Slack)](https://docs.novu.co/#full-flow-example-slack) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/custom-code-agent/concepts.mdx)Open in ChatGPTOpen in Claude