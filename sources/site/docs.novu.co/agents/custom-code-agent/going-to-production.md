# Source: https://docs.novu.co/agents/custom-code-agent/going-to-production

# Going to Production

Learn how to run a conversational agent on your local machine, test it in a development environment, and deploy it to production.

Agents built with Novu can run on your local machine. Deploy them to development and production environments when you are ready.

## [Agent on your local machine](https://docs.novu.co/#agent-on-your-local-machine)

By default, the agent runs on your local machine. To run the agent locally:

- Scaffold your agent with `npx novu init -t agent`.
- Add valid `NOVU_SECRET_KEY` and `NOVU_API_URL` values to your `.env` file.
- Run the scaffolded project on your local machine.
- Set the bridge option to `Local` in the agent overview section.

When you complete these steps, run the agent using the Novu CLI command below.

```
npx novu@latest dev --port <bridge_application_port> --no-studio
```

- **bridge\_application\_port** - Port where your scaffolded project runs. Defaults to 4000.
- **no-studio** - Disables Studio.

After you run the command, a tunnel starts on your machine. It forwards requests to your scaffolded project on `bridge_application_port`.

Novu sets the bridge URL automatically to `tunnel-url/api/novu`.

The agent listens for new messages and responds while running locally.

## [Agent in development](https://docs.novu.co/#agent-in-development)

After you test the agent locally, deploy it to a development environment. A scaffolded app from `npx novu init -t agent` uses Next.js and exposes a `/api/novu` endpoint for communicating with Novu. Deploy the app to your preferred hosting provider, then copy the deployed URL.

- Add valid `NOVU_SECRET_KEY` and `NOVU_API_URL` values in the environment variables section of your hosting provider.
- Toggle the bridge option to `Development` in the agent overview section.
- For a deployed app at `https://dev.my-agent-app.com`, use `https://dev.my-agent-app.com/api/novu` as the bridge URL in the agent overview section.

## [Agent in production](https://docs.novu.co/#agent-in-production)

Before you use an agent in production, publish the agent from the development environment to the production environment. Use the _Publish changes_ option on the dashboard.

After you publish:

- Publishing sends the agent to production with the same name, identifier, and description.
- The agent stays inactive until you activate it from the agent overview section.
- Configure and connect every provider again in the production environment.
- Deploy the agent bridge application to the production environment.
- Add valid `NOVU_SECRET_KEY` and `NOVU_API_URL` values in the environment variables section of your hosting provider.

### [Deploying to production](https://docs.novu.co/#deploying-to-production)

After you publish the agent and complete the above steps, deploy the agent bridge application to the production environment.

#### [Using Novu CLI](https://docs.novu.co/#using-novu-cli)

```
npx novu@latest sync --bridge-url <bridge_url> --secret-key <NOVU_SECRET_KEY> --api-url <NOVU_API_URL>
```

For example, with `https://prod.my-agent-app.com` as the bridge app URL, use `https://prod.my-agent-app.com/api/novu` as the bridge URL.

In the command above:

- `<bridge_url>`: URL of your deployed agent bridge application.
- `<NOVU_SECRET_KEY>`: secret key for your Novu account.
- `<NOVU_API_URL>`: API URL for your Novu account.

After you run the command, the agent overview section shows the updated production bridge URL.

#### [Using GitHub Actions](https://docs.novu.co/#using-github-actions)

You can use our built-in GitHub Action to deploy your agent to the production environment. See [Deploy with GitHub Actions](https://docs.novu.co/agents/operate/deploy-with-github-actions) for setup details.

```
name: Deploy agent to Novu Cloud
 
on:
  workflow_dispatch:
  push:
    branches:
      - main
 
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # https://github.com/novuhq/actions-novu-sync
      - name: Deploy agent to Novu Cloud
        uses: novuhq/actions-novu-sync@v2
        with:
          # The secret key used to authenticate with Novu Cloud
          # To get the secret key, go to https://web.novu.co/api-keys.
          # Required.
          secret-key: ${{ secrets.NOVU_SECRET_KEY }}
 
          # The publicly available endpoint hosting the bridge application
          # where notification entities (e.g. workflows, topics) are defined.
          # Required.
          bridge-url: ${{ secrets.NOVU_BRIDGE_URL }}
 
          # The Novu Cloud API URL to sync with.
          # Optional.
          # Defaults to https://api.novu.co
          api-url: https://api.novu.co
```

Local tunnel bridge URLs cannot be activated on production environments (returns 403 Forbidden) to prevent accidental routing of production traffic to a local machine.

## [Next steps](https://docs.novu.co/#next-steps)

[**Conversation observability**\\ \\ View agent conversations, lifecycle, and signal activity in the dashboard.](https://docs.novu.co/agents/conversations)

[Connect Components\\ \\ Use prebuilt React components so your users can install and connect Slack, Microsoft Teams, Telegram and other communication platforms to your agent.](https://docs.novu.co/agents/custom-code-agent/setup-your-agent/connect-components) [Agent Conversations\\ \\ View agent conversations, their history, lifecycle, and observability in the Novu dashboard.](https://docs.novu.co/agents/conversations)

### On this page

[Agent on your local machine](https://docs.novu.co/#agent-on-your-local-machine) [Agent in development](https://docs.novu.co/#agent-in-development) [Agent in production](https://docs.novu.co/#agent-in-production) [Deploying to production](https://docs.novu.co/#deploying-to-production) [Using Novu CLI](https://docs.novu.co/#using-novu-cli) [Using GitHub Actions](https://docs.novu.co/#using-github-actions) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/custom-code-agent/going-to-production.mdx)Open in ChatGPTOpen in Claude