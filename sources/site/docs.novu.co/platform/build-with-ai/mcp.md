# Source: https://docs.novu.co/platform/build-with-ai/mcp

# MCP Server

Connect your AI tools to Novu using MCP and manage notifications using natural language.

The Novu MCP Server exposes Novu's notification infrastructure as tools that AI assistants can discover and use in real time.

Once connected, you can use natural language to manage notifications in Novu directly from your AI tool. For example, you can prompt your AI assistant to:

- Trigger workflows for specific subscribers
- Search and inspect subscriber data
- Update subscriber notification preferences
- Debug failed notifications and delivery issues
- Analyze notification activity and logs
- Create and manage workflows

## [How Novu MCP works](https://docs.novu.co/#how-novu-mcp-works)

The Novu MCP Server exposes your notification system as a set of tools.

When your AI assistant connects:

1. It authenticates using your API key.
2. It discovers available tools.
3. It executes actions based on your prompts.

Instead of calling APIs directly, the AI translates your request into tool calls and executes them against your Novu environment.

## [Prerequisite](https://docs.novu.co/#prerequisite)

To use the Novu MCP Server, you'll need:

- A [Novu API key](https://dashboard.novu.co/settings/api-keys)
- An MCP-compatible AI tool (Cursor, Codex, Claude Code, Claude Desktop)

Some tools like Claude Desktop require Node.js to run MCP servers locally.

## [Setup](https://docs.novu.co/#setup)

Follow these steps to setup the Novu MCP server:

### [1\. Get your secret key](https://docs.novu.co/#1-get-your-secret-key)

Your secret key authenticates your AI tool with Novu. To retrieve it:

1. Go to the [Novu Dashboard](https://dashboard.novu.co)
2. Navigate to **API Keys**
3. Under **Secret Keys**, copy your secret key

### [2\. Identify your region](https://docs.novu.co/#2-identify-your-region)

Your region determines which URL your AI tool connects to. To identify it, check your dashboard URL:

| Dashboard URL | Region | MCP URL |
| --- | --- | --- |
| `dashboard.novu.co` | US | `https://mcp.novu.co/` |
| `eu.dashboard.novu.co` | EU | `https://mcp.novu.co/?region=eu` |

The MCP URL above is what you'll use in the next step when configuring your tool.

### [3\. Configure your tool](https://docs.novu.co/#3-configure-your-tool)

The following sections cover setup for the most common MCP-compatible AI tools. Before you start, keep two things in mind as you work through the examples:

- **Replace the API key.** Each example uses `your-novu-api-key` as a placeholder. Replace it with the API key you copied earlier.
- **Use the correct URL for your region.** The examples use the US endpoint (`https://mcp.novu.co/`). If you're on the EU region, replace it with `https://mcp.novu.co/?region=eu`.

#### [Cursor](https://docs.novu.co/#cursor)

Cursor supports remote MCP servers through its built-in settings UI, which writes to an `mcp.json` file. To add the Novu MCP Server:

1. Open **Cursor Settings**, and select **Tools & Integrations**.
 
2. Under **MCP Tools**, select **New MCP Server**. This opens your `mcp.json` file.
 
3. Add the following to the `mcpServers` object:
 
 ```
    {
      "mcpServers": {
        "novu": {
          "url": "https://mcp.novu.co/",
          "headers": {
            "Authorization": "Bearer your-novu-api-key"
          }
        }
      }
    }
    ```
 
4. Save the file. Cursor detects the new server automatically.
 

#### [Codex](https://docs.novu.co/#codex)

Codex reads MCP configuration from `~/.codex/config.toml`. The CLI and IDE extension share this file, so you only need to configure the server once. To add the Novu MCP Server:

1. Export your API key as an environment variable in your shell:
 
 ```
    export NOVU_API_KEY="your-novu-api-key"
    ```
 
2. Open `~/.codex/config.toml` in your preferred text editor and add the following:
 
 ```
    [mcp_servers.novu]
    url = "https://mcp.novu.co/"
    bearer_token_env_var = "NOVU_API_KEY"
    ```
 
3. Save the file and restart Codex. To verify the connection, run `/mcp` inside the Codex TUI. You should see `novu` listed as a connected server.
 

#### [Claude Code](https://docs.novu.co/#claude-code)

Claude Code manages MCP servers through its `claude mcp` command. To add the Novu MCP Server:

1. In your terminal, run:
 
 ```
    claude mcp add --transport http novu https://mcp.novu.co/ \
      --header "Authorization: Bearer your-novu-api-key"
    ```
 
2. To make Novu available across all your projects instead of just the current one, add the `--scope user` flag:
 
 ```
    claude mcp add --scope user --transport http novu https://mcp.novu.co/ \
      --header "Authorization: Bearer your-novu-api-key"
    ```
 
3. Verify the connection by running `claude mcp list`. You can also run `/mcp` inside Claude Code to check server status.
 

#### [Claude Desktop](https://docs.novu.co/#claude-desktop)

Claude Desktop connects to remote MCP servers through a local proxy (`mcp-remote`), which requires Node.js 18 or higher. To add the Novu MCP Server:

1. Open Claude Desktop, go to **Settings**, and find the **Developer** section.
 
2. Select **Edit Config**. This opens your `claude_desktop_config.json` file.
 
3. Add the following to the `mcpServers` object (or create the object if it doesn't exist):
 
 ```
    {
      "mcpServers": {
        "novu": {
          "command": "npx",
          "args": [
            "mcp-remote",
            "https://mcp.novu.co/",
            "--header",
            "Authorization: Bearer ${NOVU_API_KEY}"
          ],
          "env": {
            "NOVU_API_KEY": "your-novu-api-key"
          }
        }
      }
    }
    ```
 
4. Save the file and restart Claude Desktop.
 

#### [Other tools](https://docs.novu.co/#other-tools)

Any MCP-compatible tool can connect to the Novu MCP Server. Use the following connection details:

- **URL**:
 - US: `https://mcp.novu.co/`
 - EU: `https://mcp.novu.co/?region=eu`
- **Transport**: Streamable HTTP (recommended).
- **Authentication**: Send your API key in the `Authorization` header as `Bearer your-novu-api-key`.

## [Test your setup](https://docs.novu.co/#test-your-setup)

To verify that the connection works, try any of the prompts below in your AI assistant:

```
"Check my Novu API key status"
"Show me all my notification workflows"
"Find subscriber with email user@example.com"
```

If you get results back, the Novu MCP Server is connected and working.

## [Available tools](https://docs.novu.co/#available-tools)

The Novu MCP server currently provides 23 tools for interacting with your Novu environment:

### [Core operations](https://docs.novu.co/#core-operations)

These tools let you inspect your account configuration:

| Tool | Description |
| --- | --- |
| `get_api_key_status` | Check API key status and region configuration |
| `get_environments` | List development and production environments |

### [Subscriber management](https://docs.novu.co/#subscriber-management)

These tools let you create, inspect, and manage your subscribers:

| Tool | Description |
| --- | --- |
| `create_subscriber` | Create a new subscriber with attributes like name, email, phone, and custom data |
| `get_subscriber` | Retrieve a single subscriber by their `subscriberId` |
| `update_subscriber` | Update an existing subscriber's attributes |
| `delete_subscriber` | Delete a subscriber by their `subscriberId` |
| `find_subscribers` | Search for subscribers using various query parameters |

### [Preferences](https://docs.novu.co/#preferences)

These tools let you view and update how subscribers receive notifications:

| Tool | Description |
| --- | --- |
| `get_subscriber_preferences` | Get subscriber notification preferences for all channels |
| `update_subscriber_preferences` | Update subscriber notification preferences for specific channels |

### [Workflow management](https://docs.novu.co/#workflow-management)

These tools let you create, inspect, and manage notification workflows:

| Tool | Description |
| --- | --- |
| `create_workflow` | Create a new workflow with comprehensive configuration including steps |
| `get_workflow` | Get detailed information about a specific workflow |
| `get_workflows` | Get all available workflows |
| `update_workflow` | Update an existing workflow |
| `delete_workflow` | Delete an existing workflow by its unique identifier |

### [Triggering and events](https://docs.novu.co/#triggering-and-events)

These tools let you execute workflows and manage pending notifications:

| Tool | Description |
| --- | --- |
| `trigger_workflow` | Trigger a workflow to send notifications to a subscriber |
| `bulk_trigger_workflow` | Trigger multiple workflows in a single API call |
| `cancel_triggered_event` | Cancel a pending triggered event |

### [Notifications](https://docs.novu.co/#notifications)

These tools let you inspect delivery and execution data:

| Tool | Description |
| --- | --- |
| `get_notification` | Get a specific notification by ID with detailed execution logs |
| `get_notifications` | Get notifications and events with advanced filtering options |

### [Integrations](https://docs.novu.co/#integrations)

These tools let you manage the channel providers connected to your Novu account:

| Tool | Description |
| --- | --- |
| `get_integrations` | List all channel integrations (email, SMS, push, chat, in-app) |
| `get_active_integrations` | List only the active integrations |
| `delete_integration` | Delete an integration by its `integrationId` |
| `set_primary_integration` | Mark an integration as the primary for its channel |

## [Troubleshooting](https://docs.novu.co/#troubleshooting)

If your setup isn't working, the following sections cover the most common issues.

### Authentication errors

### Empty results

### Connection issues

[SAML SSO & SCIM\\ \\ Enable SAML SSO and SCIM directory sync for your organization](https://docs.novu.co/platform/account/sso) [Agent Skills\\ \\ Learn how to use Novu Agent Skills to help AI agents build multi-channel notification systems.](https://docs.novu.co/platform/build-with-ai/skills)

### On this page

[How Novu MCP works](https://docs.novu.co/#how-novu-mcp-works) [Prerequisite](https://docs.novu.co/#prerequisite) [Setup](https://docs.novu.co/#setup) [1\. Get your secret key](https://docs.novu.co/#1-get-your-secret-key) [2\. Identify your region](https://docs.novu.co/#2-identify-your-region) [3\. Configure your tool](https://docs.novu.co/#3-configure-your-tool) [Cursor](https://docs.novu.co/#cursor) [Codex](https://docs.novu.co/#codex) [Claude Code](https://docs.novu.co/#claude-code) [Claude Desktop](https://docs.novu.co/#claude-desktop) [Other tools](https://docs.novu.co/#other-tools) [Test your setup](https://docs.novu.co/#test-your-setup) [Available tools](https://docs.novu.co/#available-tools) [Core operations](https://docs.novu.co/#core-operations) [Subscriber management](https://docs.novu.co/#subscriber-management) [Preferences](https://docs.novu.co/#preferences) [Workflow management](https://docs.novu.co/#workflow-management) [Triggering and events](https://docs.novu.co/#triggering-and-events) [Notifications](https://docs.novu.co/#notifications) [Integrations](https://docs.novu.co/#integrations) [Troubleshooting](https://docs.novu.co/#troubleshooting)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/build-with-ai/mcp.mdx)Open in ChatGPTOpen in Claude