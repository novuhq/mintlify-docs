# Source: https://docs.novu.co/agents/managed-agent/add-skills

# Add skills

Upload custom SKILL.md files to give your managed agent domain-specific instructions.

Skills are instruction files that teach your managed agent how to handle specific tasks. When the system prompt is not detailed enough for a multi-step workflow or a domain-specific process, a skill fills the gap.

## [What a skill looks like](https://docs.novu.co/#what-a-skill-looks-like)

A skill is a SKILL.md file written in Markdown. It contains step-by-step instructions the AI platform follows when a relevant situation comes up in a conversation.

A skill might describe:

- How to triage a support ticket and assign it to the right team.
- How to walk a user through an onboarding checklist.
- How to pull data from an MCP server and format it as a summary.

The AI platform reads the skill and applies the instructions when it decides the skill is relevant to the current conversation turn.

## [Add a skill from GitHub](https://docs.novu.co/#add-a-skill-from-github)

1. Open the [Novu dashboard](https://dashboard.novu.co) and go to your managed agent's detail page.
2. Open the **Skills** section in the agent settings.
3. Select **GitHub URL** as the source.
4. Paste the public repository URL. You can point to:
 - The root of a repo (Novu looks for SKILL.md at the top level).
 - A specific branch or subfolder (e.g. `https://github.com/org/repo/tree/main/skills/triage`).
5. Click **Upload**.

Novu downloads the files, bundles them, and sends them to the AI platform. The platform assigns a stable skill ID.

## [Add a skill inline](https://docs.novu.co/#add-a-skill-inline)

1. Open the **Skills** section in the agent settings.
2. Select **Inline content** as the source.
3. Paste your SKILL.md content directly into the text field.
4. Click **Upload**.

This is useful for quick iterations or skills that do not need to live in a repository.

## [Versioning](https://docs.novu.co/#versioning)

If you upload a skill with the same display title as an existing one, the platform creates a new version automatically. The agent always uses the latest version.

## [Remove a skill](https://docs.novu.co/#remove-a-skill)

To remove a skill, go to the **Skills** section and delete it from the list. The agent stops using the skill on the next conversation turn.

## [Tips for writing good skills](https://docs.novu.co/#tips-for-writing-good-skills)

- **Be specific**: describe the exact steps the agent should follow, not just the goal.
- **Include examples**: show sample inputs and expected outputs when possible.
- **Keep it focused**: one skill per task. A skill that tries to cover too many scenarios becomes harder for the model to apply correctly.
- **Test with real conversations**: send messages that should trigger the skill and check whether the agent follows the instructions.

## [Related](https://docs.novu.co/#related)

[**Configure MCP servers**\\ \\ Enable external tools for your managed agent.](https://docs.novu.co/agents/managed-agent/configure-mcp-servers) [**Concepts**\\ \\ Learn about connectors, MCP servers, skills, and how conversations work.](https://docs.novu.co/agents/managed-agent/concepts) [**Quickstart**\\ \\ Create a managed agent with Claude and connect it to Slack.](https://docs.novu.co/agents/managed-agent/quickstart)

[Configure MCP servers\\ \\ Enable external tools like Linear, GitHub, and Notion on your managed agent using MCP servers.](https://docs.novu.co/agents/managed-agent/configure-mcp-servers) [Quickstart\\ \\ Create your first agent and connect it to Slack in under 10 minutes.](https://docs.novu.co/agents/custom-code-agent/quickstart)

### On this page

[What a skill looks like](https://docs.novu.co/#what-a-skill-looks-like) [Add a skill from GitHub](https://docs.novu.co/#add-a-skill-from-github) [Add a skill inline](https://docs.novu.co/#add-a-skill-inline) [Versioning](https://docs.novu.co/#versioning) [Remove a skill](https://docs.novu.co/#remove-a-skill) [Tips for writing good skills](https://docs.novu.co/#tips-for-writing-good-skills) [Related](https://docs.novu.co/#related)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/agents/managed-agent/add-skills.mdx)Open in ChatGPTOpen in Claude