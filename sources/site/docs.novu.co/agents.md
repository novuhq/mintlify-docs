# Source: https://docs.novu.co/agents

# Agents

Connect your AI agents to chat platforms and communication channels with Novu's Agent Communication Infrastructure (ACI).

Novu Connect is built on the [Agent Communication Infrastructure (ACI)](https://docs.novu.co/agents/get-started/what-is-aci), the infrastructure layer that handles how agents communicate, so your agents can hold real conversations across messaging platforms with users, on the channels they already use.

ACI draws a hard boundary between two concerns:

- **Communication infrastructure**: Webhook ingestion, message normalization, conversation state, identity resolution, and delivery across channels. ACI owns this layer.
 
- **Agent intelligence**: Your LLM, prompts, tools, managed agent configuration, business logic, or custom runtime. You own this layer.
 

The result is that you can create an agent once and make it available across connected channels. ACI routes messages in, sends replies out, preserves conversation context, and removes the need to rebuild communication plumbing for every platform.

[**What is ACI?**\\ \\ Learn how ACI works, what it solves, and where it draws the line between infrastructure and intelligence.](https://docs.novu.co/agents/get-started/what-is-aci)

## [Connect the agent](https://docs.novu.co/#connect-the-agent)

Novu Connect accepts two kinds of [agent brains](https://docs.novu.co/platform/additional-resources/glossary#agent-brain). You choose how you want to bring it.

### [External connectors](https://docs.novu.co/#external-connectors)

Delegate the agent logic entirely to a managed platform such as Claude Managed Agents. You configure the agent's behavior, system prompt, tools, skills, and MCP servers and the platform runs the intelligence.

[**Managed agent**\\ \\ Set up a fully managed agent powered by Claude. No custom server code required.](https://docs.novu.co/agents/managed-agent/overview)

### [Custom code](https://docs.novu.co/#custom-code)

Write your own agent logic. Handle events, call any LLM or API, and reply using the Novu agent SDK. Compatible with AI SDK, LangChain, OpenAI SDK, and any custom code of your choosing.

[**Custom code agent**\\ \\ Build an agent with full control over logic, tools, and event handling.](https://docs.novu.co/agents/custom-code-agent/quickstart)

## [How a conversation flows](https://docs.novu.co/#how-a-conversation-flows)

ACI turns channel-specific messages into a standard communication flow between the user and your agent brain.

1. A user sends a message on Slack, Teams, WhatsApp, or another supported channel.
2. Novu ingests the webhook, normalizes the event, and resolves the user's identity.
3. Novu sends the event to your agent brain with full conversation context.
4. Your agent processes the message and responds.
5. Novu delivers the reply back to the correct platform thread.
6. Novu persists the conversation and makes it visible in the Connect dashboard.

## [Start building](https://docs.novu.co/#start-building)

[**Quickstart**\\ \\ Follow the quickstart to create your first agent, connect a Slack provider, and send your first message in under 5 minutes.](https://docs.novu.co/agents/managed-agent/quickstart)

## [Learn more](https://docs.novu.co/#learn-more)

Explore the full documentation to go deeper on any part of Novu Connect.

[**What is ACI?**\\ \\ Understand the infrastructure layer and the problem it solves.](https://docs.novu.co/agents/get-started/what-is-aci) [**Mental model**\\ \\ How inbound messages flow from a channel through to your agent and back.](https://docs.novu.co/agents/get-started/mental-model) [**Agents and providers**\\ \\ How agents and provider connections work, and which channels are supported.](https://docs.novu.co/agents/get-started/agents-and-providers) [**Managed agent**\\ \\ Configure a fully-managed agent powered by Claude.](https://docs.novu.co/agents/managed-agent/overview) [**Custom code quickstart**\\ \\ Connect a Slack provider and send your first message in under five minutes.](https://docs.novu.co/agents/custom-code-agent/quickstart) [**Conversation observability**\\ \\ Monitor, inspect, and manage live agent conversations.](https://docs.novu.co/agents/conversations)

[What is ACI?\\ \\ Learn what ACI is, what it solves, and how it helps agents communicate across channels.](https://docs.novu.co/agents/get-started/what-is-aci)

### On this page

[Connect the agent](https://docs.novu.co/#connect-the-agent) [External connectors](https://docs.novu.co/#external-connectors) [Custom code](https://docs.novu.co/#custom-code) [How a conversation flows](https://docs.novu.co/#how-a-conversation-flows) [Start building](https://docs.novu.co/#start-building) [Learn more](https://docs.novu.co/#learn-more)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/index.mdx)Open in ChatGPTOpen in Claude