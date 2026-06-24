# Source: https://docs.novu.co/agents/custom-code-agent/quickstart

# Get started with Novu for Agents

Create your first agent and connect it to Slack in under 10 minutes.

This guide covers creating a custom code agent in the dashboard, hooking up Slack, scaffolding the bridge app, and getting a reply in-thread.

By the end, you'll have a working agent that receives messages from Slack and replies based on your handler code.

**Prerequisites:**

- A [Novu account](https://dashboard.novu.co).
- A Slack workspace where you can install apps.
- Node.js on your machine.

## [Create your agent](https://docs.novu.co/#create-your-agent)

1. Go to the Novu dashboard.
2. In the sidebar, click **Agents**.
3. Click **Create agent**.
4. Fill in the required fields:
 - **Agent name**: Display name for your agent.
 - **Identifier**: Unique slug used in code. Cannot be changed after creation.
 - **Description**: Optional.
5. Click **Set up agent**.

![Add agent](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadd-agent.ac39c6d9.png&w=3840&q=75)

Novu opens the guided setup page after creation.

## [Select a provider](https://docs.novu.co/#select-a-provider)

1. On the setup page, open **Select provider**.
2. Select **Slack**.

![Select provider](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fselect-provider.65579c49.png&w=3840&q=75)

The dashboard unlocks the Slack setup steps.

## [Create a Slack app](https://docs.novu.co/#create-a-slack-app)

Novu can create the Slack app using a Slack App Configuration Token.

1. Click **Slack App Configuration Token** to open [Slack API apps](https://api.slack.com/apps).
2. Under **Your App Configuration Tokens**, click **Generate Token**. ![Generate Slack token](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgenerate-slack-token.564b6a99.png&w=3840&q=75)
3. Select your workspace and click **Generate**.
4. Copy the token.
5. In Novu, paste the token and click **Create app**.

The configuration token is used once to create your Slack app and is not stored by Novu.

## [Install the app in your workspace](https://docs.novu.co/#install-the-app-in-your-workspace)

1. Click **Install agent** (the label may include your agent name, for example **Install My Agent**).
2. Review permissions in Slack and click **Allow**.

![Install app](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finstall-app.036ccc95.png&w=3840&q=75)

You'll receive a welcome message from the agent when installation completes.

## [Scaffold your agent project](https://docs.novu.co/#scaffold-your-agent-project)

Copy the scaffold command from the dashboard:

```
npx novu@latest init -t agent \
 --secret-key=<NOVU_SECRET_KEY> \
 --api-url=<NOVU_API_URL>
```

Run it in the directory where you want the project. See [Scaffold your project](https://docs.novu.co/agents/custom-code-agent/setup-your-agent/scaffold-your-project) for details.

## [Start your agent locally](https://docs.novu.co/#start-your-agent-locally)

```
npm run dev:novu
```

This starts your app, opens a dev tunnel, and registers the bridge URL. When connected, you'll see another message from your agent in Slack.

## [Send a message](https://docs.novu.co/#send-a-message)

Message your bot in Slack. Your `onMessage` handler runs and the reply appears in the thread.

![Slack message](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fslack-message.724c7fb0.png&w=3840&q=75)

Edit files in `app/novu/agents/` to customize behavior. See [Handle events](https://docs.novu.co/agents/custom-code-agent/setup-your-agent/handle-events) for all event types.

## [Next steps](https://docs.novu.co/#next-steps)

[**Handle events**\\ \\ Respond to actions, reactions, and resolution events.](https://docs.novu.co/agents/custom-code-agent/setup-your-agent/handle-events) [**Reply**\\ \\ Markdown, attachments, and interactive cards.](https://docs.novu.co/agents/custom-code-agent/setup-your-agent/reply) [**Signals**\\ \\ Metadata, workflow triggers, and conversation resolution.](https://docs.novu.co/agents/custom-code-agent/setup-your-agent/signals) [**Connect your first agent**\\ \\ Full support-bot walkthrough with an LLM.](https://docs.novu.co/agents/custom-code-agent/connect-your-first-agent)

[Add skills\\ \\ Upload custom SKILL.md files to give your managed agent domain-specific instructions.](https://docs.novu.co/agents/managed-agent/add-skills) [Concepts\\ \\ Entities, lifecycle, and handler building blocks for a custom code agent with Novu.](https://docs.novu.co/agents/custom-code-agent/concepts)

### On this page

[Create your agent](https://docs.novu.co/#create-your-agent) [Select a provider](https://docs.novu.co/#select-a-provider) [Create a Slack app](https://docs.novu.co/#create-a-slack-app) [Install the app in your workspace](https://docs.novu.co/#install-the-app-in-your-workspace) [Scaffold your agent project](https://docs.novu.co/#scaffold-your-agent-project) [Start your agent locally](https://docs.novu.co/#start-your-agent-locally) [Send a message](https://docs.novu.co/#send-a-message) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/custom-code-agent/quickstart.mdx)Open in ChatGPTOpen in Claude