# Source: https://docs.novu.co/agents/get-started/agents-and-providers

# Agents and providers

How agents and providers work together to enable agent communication across channels.

## [Agents](https://docs.novu.co/#agents)

An agent is the entity you create in Novu when you want to expose agent logic through one or more communication providers.

Each agent has a name, an identifier, and a set of event handlers that define how your application responds to conversation events. An agent can be connected to one or more providers, such as Slack, Microsoft Teams, WhatsApp, or email.

## [Provider connections](https://docs.novu.co/#provider-connections)

A provider connection connects an agent to a messaging platform. Providers are the surfaces where users interact with your agent. A provider connection gives Novu the credentials and configuration needed to receive events from that provider and deliver responses back to it.

Each provider has its own setup flow and platform capabilities. Some providers support reactions, typing indicators, attachments, rich cards, or message editing. Others may support only a subset of those behaviors. Novu normalizes provider events before passing them to your agent handler, so your code works with a consistent interface instead of provider-specific webhook payloads.

Your handlers stay provider-agnostic. Novu translates replies into whatever Slack, WhatsApp, or email expects on the way out.

## [Supported providers](https://docs.novu.co/#supported-providers)

Novu supports the following providers:

- Slack
- Microsoft Teams
- WhatsApp
- Email
- Telegram

While adding a new provider to an agent, Novu will guide you through the setup process for the provider.

[Mental model\\ \\ How inbound messages flow from a messaging platform through Novu to your agent code and back.](https://docs.novu.co/agents/get-started/mental-model) [Overview\\ \\ What managed agents are, how they work, and when to use them.](https://docs.novu.co/agents/managed-agent/overview)

### On this page

[Agents](https://docs.novu.co/#agents) [Provider connections](https://docs.novu.co/#provider-connections) [Supported providers](https://docs.novu.co/#supported-providers)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/get-started/agents-and-providers.mdx)Open in ChatGPTOpen in Claude