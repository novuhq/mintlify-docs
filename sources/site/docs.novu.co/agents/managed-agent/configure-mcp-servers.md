# Source: https://docs.novu.co/agents/managed-agent/configure-mcp-servers

# Configure MCP servers

Enable external tools like Linear, GitHub, and Notion on your managed agent using MCP servers.

MCP (Model Context Protocol) servers give your managed agent access to external tools and data sources. When enabled, the AI platform can call these tools during a conversation to look up information, create records, or perform actions on the user's behalf.

## [Enable an MCP server](https://docs.novu.co/#enable-an-mcp-server)

1. Open the [Novu dashboard](https://dashboard.novu.co) and go to your managed agent's detail page.
2. Open the **MCP Servers** section in the agent settings.
3. Browse the list of available servers.
4. Click **Enable** on the server you want to add.
5. Novu syncs the configuration to the AI platform.

The server appears on the agent's settings page with a status indicator showing whether the sync was successful.

## [Authentication modes](https://docs.novu.co/#authentication-modes)

MCP servers have different authentication requirements:

| Mode | How it works |
| --- | --- |
| **No auth** | The server is publicly accessible. No credentials needed. |
| **Novu-managed OAuth** | Novu handles the OAuth flow. End users authorize on first use and Novu stores the tokens. |
| **Provider-managed** | The AI platform manages credentials in its own vault. |

### [Subscriber authorization flow](https://docs.novu.co/#subscriber-authorization-flow)

For servers that require OAuth (like Linear, GitHub, or Slack):

1. The agent encounters a tool call that needs authorization.
2. The agent sends an authorization link to the user in the chat thread.
3. The user clicks the link and completes the OAuth flow on the external service.
4. Novu stores the tokens securely and uses them on every subsequent turn.

Authorization is scoped to a single subscriber and a single MCP server. Each user authorizes independently. Once authorized, the connection persists across conversations.

## [Disable an MCP server](https://docs.novu.co/#disable-an-mcp-server)

1. Go to the agent's **MCP Servers** settings.
2. Click **Disable** on the server you want to remove.
3. Novu removes the server from the AI platform and deletes any associated connections.

Disabling an MCP server also removes all subscriber OAuth connections for that server. Users will need to re-authorize if you enable it again.

## [Available MCP servers](https://docs.novu.co/#available-mcp-servers)

The exact list depends on your connector and Novu account tier. Common servers include:

| Server | What it does |
| --- | --- |
| Linear | Search issues, create tickets, browse projects |
| GitHub | Search repos, read files, list pull requests |
| Slack | Search workspace messages and channels |
| Notion | Look up pages and query databases |

The full list is shown on the agent settings page in the dashboard.

## [Troubleshooting](https://docs.novu.co/#troubleshooting)

**Sync error**: if a server shows a sync error after enabling, try disabling and re-enabling it. If the error persists, check that the connector credentials are valid.

**Authorization not completing**: make sure the user has access to the external service and that the OAuth redirect URL is not blocked by browser settings or an ad blocker.

## [Related](https://docs.novu.co/#related)

[**Add skills**\\ \\ Upload custom skills to teach the agent new workflows.](https://docs.novu.co/agents/managed-agent/add-skills) [**Concepts**\\ \\ Learn about connectors, MCP servers, skills, and how conversations work.](https://docs.novu.co/agents/managed-agent/concepts) [**Quickstart**\\ \\ Create a managed agent with Claude and connect it to Slack.](https://docs.novu.co/agents/managed-agent/quickstart)

[Concepts\\ \\ Connectors, MCP servers, skills, system prompts, and conversation flow for managed agents.](https://docs.novu.co/agents/managed-agent/concepts) [Add skills\\ \\ Upload custom SKILL.md files to give your managed agent domain-specific instructions.](https://docs.novu.co/agents/managed-agent/add-skills)

### On this page

[Enable an MCP server](https://docs.novu.co/#enable-an-mcp-server) [Authentication modes](https://docs.novu.co/#authentication-modes) [Subscriber authorization flow](https://docs.novu.co/#subscriber-authorization-flow) [Disable an MCP server](https://docs.novu.co/#disable-an-mcp-server) [Available MCP servers](https://docs.novu.co/#available-mcp-servers) [Troubleshooting](https://docs.novu.co/#troubleshooting) [Related](https://docs.novu.co/#related)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/managed-agent/configure-mcp-servers.mdx)Open in ChatGPTOpen in Claude