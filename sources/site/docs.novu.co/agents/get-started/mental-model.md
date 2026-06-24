# Source: https://docs.novu.co/agents/get-started/mental-model

# Mental model

How inbound messages flow from a messaging platform through Novu to your agent code and back.

Agents are currently in private beta. Please contact us at [support@novu.co](mailto:support@novu.co) to get access.

Novu for Agents sits between chat providers and your code. Users can message your agent, and your agent can message them back on the same thread.

When a user sends a message or interacts with your agent from a connected platform, Novu receives it, resolves identity and conversation state, and forwards the full context to agent brain. Your agent brain processes the message and replies; Novu delivers the response back to the platform.

## [Types of agents](https://docs.novu.co/#types-of-agents)

Novu supports two types of agents:

- Custom code agent
- Managed agent

### [Custom code agent](https://docs.novu.co/#custom-code-agent)

A custom code agent is one where you build the agent brain with your own code. Use the Agent SDK, LangChain, and similar tools to implement it. Your agent brain receives the context object and processes it however you decide. Call an LLM, run business logic, route to a human, or combine all three.

![Custom code agent](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fflow.7e3a7df1.png&w=3840&q=75)

Read more on how to build a [custom code agent](https://docs.novu.co/agents/custom-code-agent/setup-your-agent/overview).

### [Managed agent](https://docs.novu.co/#managed-agent)

A managed agent is one where a platform (for example, Claude) manages the agent's intelligence and provides system tools such as grep, web search, and connections to external tools like Linear and Notion via MCP.

![Managed agent](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fflow.732d07c8.png&w=3840&q=75)

Read more on how to build a [managed agent](https://docs.novu.co/agents/managed-agent/overview).

## [Conversations](https://docs.novu.co/#conversations)

A conversation is the stateful thread where communication happens. When a user sends a message from a connected provider, Novu creates a new conversation or loads the existing one for that thread. The conversation includes message history, metadata, participants, status, and platform context needed to process the next interaction.

A conversation can include multiple participants. The agent is one participant in the conversation, but it is not the conversation itself. This distinction matters when you inspect conversations in the dashboard or build agent behavior around conversation state. A Slack thread, email thread, or other provider-specific thread maps to a conversation in Novu automatically.

## [Participants and subscriber identity](https://docs.novu.co/#participants-and-subscriber-identity)

Participants are the people, agents, or systems involved in a conversation. When a user messages your agent from a provider, Novu tries to resolve that platform user to a known subscriber.

- If a match exists, the handler receives subscriber information such as subscriber ID, name, or email. This subscriber is used to identify the user across conversations.
- If no match exists, the user is tracked as a platform user and your agent brain should account for cases where subscriber data is unavailable.

Once identity is resolved later, they are upgraded to a full subscriber and future messages include their subscriber data. Subscriber identity helps your agent personalize responses, look up account details, or decide whether a conversation should be escalated. Identity resolution is provider-aware: a Slack user and an email sender may each have different identifiers at the provider level that Novu resolves to a single subscriber.

## [Agent brain](https://docs.novu.co/#agent-brain)

Novu calls your agent brain with the complete context: the message, conversation history, subscriber, and platform details. Your agent brain processes it with your LLM, business logic, or any system you choose and calls `ctx.reply()` in case of custom code agent or sends a reply message to the platform in case of managed agent.

## [Next steps](https://docs.novu.co/#next-steps)

[**Custom code agent**\\ \\ Build a custom code agent.](https://docs.novu.co/agents/custom-code-agent/setup-your-agent/overview) [**Managed agent**\\ \\ Configure a managed agent.](https://docs.novu.co/agents/managed-agent/overview)

[What is ACI?\\ \\ Learn what ACI is, what it solves, and how it helps agents communicate across channels.](https://docs.novu.co/agents/get-started/what-is-aci) [Agents and providers\\ \\ How agents and providers work together to enable agent communication across channels.](https://docs.novu.co/agents/get-started/agents-and-providers)

### On this page

[Types of agents](https://docs.novu.co/#types-of-agents) [Custom code agent](https://docs.novu.co/#custom-code-agent) [Managed agent](https://docs.novu.co/#managed-agent) [Conversations](https://docs.novu.co/#conversations) [Participants and subscriber identity](https://docs.novu.co/#participants-and-subscriber-identity) [Agent brain](https://docs.novu.co/#agent-brain) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/get-started/mental-model.mdx)Open in ChatGPTOpen in Claude