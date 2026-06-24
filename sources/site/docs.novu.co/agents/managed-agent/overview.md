# Source: https://docs.novu.co/agents/managed-agent/overview

# Overview of Managed Agents

What managed agents are, how they work, and when to use them.

Agents are currently in private beta. Please contact us at [support@novu.co](mailto:support@novu.co) to get access.

A managed agent lets you connect an AI platform like Claude directly to your Novu agent. The platform handles the reasoning, planning, and tool use. You configure credentials and a system prompt in the Novu dashboard, connect a chat provider like Slack, and the agent is ready to talk to your users. No bridge application or handler code is required.

![Managed agent flow](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fflow.732d07c8.png&w=3840&q=75)

## [How it works](https://docs.novu.co/#how-it-works)

1. A user sends a message on a connected provider (Slack, Microsoft Teams, email, etc.).
2. Novu receives the message, resolves identity and conversation state, and forwards the full context to the AI platform.
3. The platform processes the message using its built-in tools (bash, file operations, web search, grep, etc.), any MCP servers you enabled, and any custom skills you uploaded.
4. Novu delivers the response back to the same thread on the provider.

You do not write event handlers or deploy a bridge server. The AI platform is your agent logic.

## [What you configure](https://docs.novu.co/#what-you-configure)

Setting up a managed agent involves five pieces, all configured from the Novu dashboard:

- **Connector**: the AI platform that powers the agent (Claude today, with OpenAI and AWS Bedrock coming soon). You provide API credentials or use Novu demo credentials to start.
- **System prompt**: instructions that tell the agent who it is, how to respond, and what to avoid.
- **Built-in tools**: bash, file read/write/edit, glob, grep, web search, and web fetch are provided by the platform and available out of the box.
- **MCP servers**: external integrations like Linear, GitHub, Slack, and Notion that you enable from the dashboard. Some require end-user OAuth authorization.
- **Custom skills**: SKILL.md instruction files you upload from a GitHub URL or paste inline to teach the agent domain-specific workflows.

For a full breakdown of each component, see [Concepts](https://docs.novu.co/agents/managed-agent/concepts).

## [When to use a managed agent](https://docs.novu.co/#when-to-use-a-managed-agent)

Managed agents are a good fit when you want to get an agent running quickly without writing backend code. The platform handles tool calls, streaming, and chain-of-thought reasoning for you.

If you need full control over the agent logic, want to call your own APIs directly in handlers, or need complex multi-step business flows, use a [custom code agent](https://docs.novu.co/agents/custom-code-agent/quickstart) instead.

## [Next steps](https://docs.novu.co/#next-steps)

[**Quickstart**\\ \\ Create a managed agent with Claude and connect it to Slack in under 10 minutes.](https://docs.novu.co/agents/managed-agent/quickstart) [**Concepts**\\ \\ Connectors, built-in tools, MCP servers, skills, and conversation flow in detail.](https://docs.novu.co/agents/managed-agent/concepts) [**Configure MCP servers**\\ \\ Enable external tools for your managed agent.](https://docs.novu.co/agents/managed-agent/configure-mcp-servers) [**Add skills**\\ \\ Upload custom skills to teach the agent new workflows.](https://docs.novu.co/agents/managed-agent/add-skills)

[Agents and providers\\ \\ How agents and providers work together to enable agent communication across channels.](https://docs.novu.co/agents/get-started/agents-and-providers) [Quickstart\\ \\ Use the Novu CLI to create a managed agent, connect it to Slack, and get a reply in minutes.](https://docs.novu.co/agents/managed-agent/quickstart)

### On this page

[How it works](https://docs.novu.co/#how-it-works) [What you configure](https://docs.novu.co/#what-you-configure) [When to use a managed agent](https://docs.novu.co/#when-to-use-a-managed-agent) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/managed-agent/overview.mdx)Open in ChatGPTOpen in Claude