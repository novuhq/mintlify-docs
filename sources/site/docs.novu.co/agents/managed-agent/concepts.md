# Source: https://docs.novu.co/agents/managed-agent/concepts

# Managed Agent Concepts

Connectors, MCP servers, skills, system prompts, and conversation flow for managed agents.

This page covers the building blocks of a managed agent and how they fit together.

## [Connector](https://docs.novu.co/#connector)

A connector links your Novu agent to an AI platform. The platform receives each user message, reasons about it, uses built-in tools and any enabled MCP servers if needed, and returns a response that Novu delivers to the chat provider.

### [Supported connectors](https://docs.novu.co/#supported-connectors)

| Connector | Status |
| --- | --- |
| Claude (Anthropic) | Available |
| OpenAI | Coming soon |
| AWS Bedrock | Coming soon |

### [Credentials](https://docs.novu.co/#credentials)

Each connector needs platform credentials. For Claude, you provide:

- **API Key**: from the [Anthropic console](https://console.anthropic.com/settings/keys).
- **Workspace ID**: from the [Anthropic console](https://console.anthropic.com/settings/workspaces).

If you want to try things out first, you can use the Novu demo credentials. They give you a limited number of free conversations without an Anthropic account.

## [System prompt](https://docs.novu.co/#system-prompt)

The system prompt is a set of instructions that define the agent's behavior. It runs at the start of every conversation turn and shapes how the model responds.

A useful system prompt typically includes:

- **Role**: who the agent is ("You are a support agent for Acme Corp").
- **Tone**: how it should sound ("Keep responses short and friendly").
- **Scope**: what topics it handles and what it should avoid.
- **Fallback behavior**: what to do when the agent does not know the answer ("Offer to connect the user with a human").

You set the system prompt in the dashboard when creating the agent, and you can update it at any time from the agent settings page.

### [Creating an agent](https://docs.novu.co/#creating-an-agent)

You can create a managed agent in two ways:

- **Create from prompt**: describe what you want the agent to do in plain text, and Novu generates a system prompt for you. You can also pick from preset templates (Customer Support, Marketing, Sales, etc.) as a starting point.
- **Create manually**: write the system prompt yourself from scratch.

### [Prompt templates](https://docs.novu.co/#prompt-templates)

Novu provides starter templates for common use cases like customer support, internal ops, and onboarding. Templates give you a working prompt you can customize.

## [Built-in tools](https://docs.novu.co/#built-in-tools)

Every managed agent has access to system tools provided by the AI platform. These are always available without any setup:

| Tool | What it does |
| --- | --- |
| **Bash** | Execute shell commands in a sandboxed environment |
| **Read** | Read files from the filesystem, including text, images, PDFs, and notebooks |
| **Write** | Create or overwrite files on the filesystem |
| **Edit** | Perform find-and-replace edits inside a file |
| **Glob** | Find files by name using pattern matching |
| **Grep** | Search file contents using regex patterns |
| **Web search** | Search the internet for current information |
| **Web fetch** | Fetch and read content from a URL |

The platform decides when to call these tools based on the user's message and the system prompt. For example, if a user asks "What is the latest pricing for AWS Lambda?", the agent will use web search to find the answer. If the user asks "Find all config files in the project", the agent will use glob and grep.

All built-in tools are enabled by default when you create a managed agent. MCP servers and custom skills are not enabled by default and need to be added separately.

## [MCP servers](https://docs.novu.co/#mcp-servers)

On top of the built-in tools, MCP (Model Context Protocol) servers give the agent access to external services and data sources you choose. When you enable an MCP server, the AI platform gains access to its capabilities.

### [How it works](https://docs.novu.co/#how-it-works)

1. You enable an MCP server from the agent settings page in the dashboard.
2. Novu syncs the configuration to the connector (Claude, AWS Bedrock, etc.).
3. During a conversation, the connector platform decides when to call a tool based on the user's message and the system prompt.
4. The tool result is included in the agent's reasoning before it responds.

The connector platform decides when and whether to use a tool. You do not need to write code to trigger tool calls.

### [Available MCP servers](https://docs.novu.co/#available-mcp-servers)

Common MCP servers include:

- **Linear**: look up issues, create tickets, search projects.
- **GitHub**: search repositories, read files, list pull requests.
- **Slack**: search workspace messages and channels.
- **Notion**: look up pages and database entries.

The list of available servers is shown on the agent settings page in the dashboard.

### [Authentication](https://docs.novu.co/#authentication)

Some MCP servers require OAuth authorization from the end user. When a subscriber first interacts with the agent through a tool that needs authorization, they receive a prompt to connect their account.

Novu manages the OAuth flow:

1. The agent sends an authorization link to the user in the chat thread.
2. The user clicks the link and authorizes access on the external service.
3. Novu stores the tokens securely and passes them to the platform on each subsequent turn.

Authorization is per subscriber, per MCP server. Once a user authorizes, the connection persists across conversations until they revoke it.

### [Limits](https://docs.novu.co/#limits)

You can enable up to **64 MCP servers** per agent.

## [Custom skills](https://docs.novu.co/#custom-skills)

Skills are instruction files that teach the agent how to handle specific tasks. They are useful when the system prompt alone is not detailed enough for a multi-step workflow.

A skill is a SKILL.md file with structured instructions. It might describe how to triage a support ticket, how to generate a report from a data source, or how to walk a user through an onboarding flow.

### [Adding skills](https://docs.novu.co/#adding-skills)

You can add skills from the agent settings page in two ways:

- **GitHub URL**: paste a public repository URL. Novu downloads the files and uploads them to the AI platform.
- **Inline content**: paste the SKILL.md text directly in the dashboard.

The platform assigns each skill a stable ID. If you upload a skill with the same title again, it creates a new version automatically.

## [Conversation flow](https://docs.novu.co/#conversation-flow)

Managed agents follow this conversation lifecycle:

| State | What it means |
| --- | --- |
| **Active** | The conversation is open. New messages are processed by the agent. |
| **Resolved** | The conversation has been closed. The underlying platform session is archived. |
| **Reopened** | A new user message after resolution starts a fresh platform session and reopens the conversation automatically. |

### [What happens on each turn](https://docs.novu.co/#what-happens-on-each-turn)

1. The user sends a message on a connected provider.
2. Novu normalizes the event, resolves the subscriber, and loads conversation history.
3. The message and history are forwarded to the AI platform.
4. The platform runs the model, uses built-in tools (bash, grep, web search, etc.) or MCP servers as needed, and returns a response.
5. Novu delivers the response to the provider thread and records everything in the activity feed.

### [Plan cards and tool use](https://docs.novu.co/#plan-cards-and-tool-use)

When the agent calls a tool during a conversation, Novu shows a **plan card** in the chat thread. The plan card displays which tool the agent is about to use and its current status (thinking, running, complete). This gives users visibility into what the agent is doing before the final response appears.

For MCP tools that need user authorization, the plan card pauses and shows an authorization prompt. After the user authorizes, the agent continues from where it left off.

### [Streaming](https://docs.novu.co/#streaming)

Responses stream progressively rather than arriving all at once. The platform handles streaming automatically.

## [Providers](https://docs.novu.co/#providers)

Managed agents support these chat providers:

| Provider | Status |
| --- | --- |
| Slack | Available |
| Microsoft Teams | Available |
| WhatsApp | Available |
| Email | Available |
| Telegram | Available |

Provider setup is done from the agent settings page in the dashboard. Each provider has its own connection flow (app creation, OAuth, etc.).

## [Next steps](https://docs.novu.co/#next-steps)

[**Quickstart**\\ \\ Create a managed agent with Claude and connect it to Slack.](https://docs.novu.co/agents/managed-agent/quickstart) [**Configure MCP servers**\\ \\ Enable external tools for your managed agent.](https://docs.novu.co/agents/managed-agent/configure-mcp-servers) [**Add skills**\\ \\ Upload custom skills to teach the agent new workflows.](https://docs.novu.co/agents/managed-agent/add-skills)

[Quickstart\\ \\ Use the Novu CLI to create a managed agent, connect it to Slack, and get a reply in minutes.](https://docs.novu.co/agents/managed-agent/quickstart) [Configure MCP servers\\ \\ Enable external tools like Linear, GitHub, and Notion on your managed agent using MCP servers.](https://docs.novu.co/agents/managed-agent/configure-mcp-servers)

### On this page

[Connector](https://docs.novu.co/#connector) [Supported connectors](https://docs.novu.co/#supported-connectors) [Credentials](https://docs.novu.co/#credentials) [System prompt](https://docs.novu.co/#system-prompt) [Creating an agent](https://docs.novu.co/#creating-an-agent) [Prompt templates](https://docs.novu.co/#prompt-templates) [Built-in tools](https://docs.novu.co/#built-in-tools) [MCP servers](https://docs.novu.co/#mcp-servers) [How it works](https://docs.novu.co/#how-it-works) [Available MCP servers](https://docs.novu.co/#available-mcp-servers) [Authentication](https://docs.novu.co/#authentication) [Limits](https://docs.novu.co/#limits) [Custom skills](https://docs.novu.co/#custom-skills) [Adding skills](https://docs.novu.co/#adding-skills) [Conversation flow](https://docs.novu.co/#conversation-flow) [What happens on each turn](https://docs.novu.co/#what-happens-on-each-turn) [Plan cards and tool use](https://docs.novu.co/#plan-cards-and-tool-use) [Streaming](https://docs.novu.co/#streaming) [Providers](https://docs.novu.co/#providers) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/managed-agent/concepts.mdx)Open in ChatGPTOpen in Claude