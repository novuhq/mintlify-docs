# Source: https://docs.novu.co/agents/managed-agent/quickstart

# Managed Agent Quickstart

Use the Novu CLI to create a managed agent, connect it to Slack, and get a reply in minutes.

This guide walks you through creating a managed agent using the Novu CLI, connecting it to Slack, and sending your first message.

![Novu connect demo](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnovu-connect-demo.1739f357.gif&w=3840&q=75)

## [Prerequisites](https://docs.novu.co/#prerequisites)

- Node.js installed on your machine.
- A [Novu account](https://connect.novu.co/) (you can create one during the setup flow).
- A Slack workspace where you can install apps.

## [Run the CLI](https://docs.novu.co/#run-the-cli)

In your terminal, run:

```
npx novu connect
```

## [Create an agent](https://docs.novu.co/#create-an-agent)

1. Choose where your agent runs. The CLI asks **Where do you want the agent to run?**, select an option, and then press **Enter**:
 
 - Demo credentials
 - Claude Managed Agents
 - AWS Claude Managed Agents
 
 For this quickstart, select **Demo credentials**.
 
2. Describe your agent. Type a description of what you want the agent to do and press **Enter**. For example:
 
 ```
    Create an engineering assistant agent that checks Linear and GitHub for open issues, pending PR reviews, and review requests. It summarizes what needs attention, flags blockers and stale tickets, and posts a short daily standup digest. It keeps responses concise and links back to the relevant Linear issue or GitHub pull request.
    ```
 
 Novu generates the agent for you, including its system prompt, tools, MCP servers, and skills based on your description.
 
3. Review and create the agent. The CLI shows the generated agent for you to review. You can adjust any of the following fields before confirming:
 
 - Name
 - Identifier
 - System prompt
 - Tools
 - MCP servers
 - Skills

If everything looks good, then select **Create this agent** and press **Enter**.

If you want to change the description and regenerate, then select **Regenerate from description** and repeat the previous step.

## [Connect Slack](https://docs.novu.co/#connect-slack)

The CLI prompts you: **pick a channel to connect this agent to.** Select **Slack** and press **Enter**.

Novu asks you to paste a Slack App Configuration Token. To get one:

1. Open [https://api.slack.com/apps](https://api.slack.com/apps).
2. Scroll to the bottom of the page.
3. Under **App Configuration Tokens**, click **Generate Token**.
4. Copy the access token, it starts with `xoxe.xoxp-`.
5. Paste the token into the terminal and press **Enter**.
 
 The CLI sends the token to your Novu account once to create the Slack app, then discards it; the token isn't stored.
 
6. Add the app to your workspace. After pasting the token, the CLI prompts you to add the app to your Slack workspace. Press **Enter** and follow the link to install the bot.

Once installed, your agent is live and listening for messages in Slack.

## [Send a message](https://docs.novu.co/#send-a-message)

Open Slack, where you see a message from your agent. Send it a direct message to get started. The agent then prompts you to connect your Linear and GitHub MCP servers; once you do, your agent is ready.

You can also add and interact with the agent in any channel in the workspace.

To manage your agent, add more channels, or view conversations from the Connect dashboard, create a Novu account at [connect.novu.co](https://connect.novu.co/).

## [Next steps](https://docs.novu.co/#next-steps)

[**Concepts**\\ \\ Learn about connectors, MCP servers, skills, and how conversations work.](https://docs.novu.co/agents/managed-agent/concepts) [**Configure MCP servers**\\ \\ Give your agent access to external tools like Linear, GitHub, or Notion.](https://docs.novu.co/agents/managed-agent/configure-mcp-servers) [**Conversation observability**\\ \\ View and manage agent conversations from the Novu Connect dashboard.](https://docs.novu.co/agents/conversations)

[Overview\\ \\ What managed agents are, how they work, and when to use them.](https://docs.novu.co/agents/managed-agent/overview) [Concepts\\ \\ Connectors, MCP servers, skills, system prompts, and conversation flow for managed agents.](https://docs.novu.co/agents/managed-agent/concepts)

### On this page

[Prerequisites](https://docs.novu.co/#prerequisites) [Run the CLI](https://docs.novu.co/#run-the-cli) [Create an agent](https://docs.novu.co/#create-an-agent) [Connect Slack](https://docs.novu.co/#connect-slack) [Send a message](https://docs.novu.co/#send-a-message) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/managed-agent/quickstart.mdx)Open in ChatGPTOpen in Claude