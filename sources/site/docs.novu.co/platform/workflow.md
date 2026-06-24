# Source: https://docs.novu.co/platform/workflow

# Novu Workflows Overview

Learn how to create, configure, and work with notification workflows in Novu.

Novu Workflows orchestrate how notifications move from application events to messages delivered across one or more channels. A workflow combines delivery logic, message content, and execution rules into a single notification pipeline.

Use workflows to control when notifications are sent, who receives them, what content is delivered, and how delivery behaves across channels.

If you’re new to workflows, see the [Workflow core concept](https://docs.novu.co/platform/concepts/workflows) for an in-depth overview of what workflows are and how they fit into Novu’s notification system.

Novu Workflows help you:

- Ship notifications faster without hardcoding logic in your application.
- Centralize notification logic instead of scattering it across services and codebases.
- Control delivery behavior with conditions, delays, batching, and throttling.
- Personalize notifications at scale using event data, context, and templates.
- Observe and debug notification execution with built-in monitoring and logs.

## [Features](https://docs.novu.co/#features)

- **Multi-channel**: Email, in-app, SMS, push, and chat channels.
- **Action steps**: Delays, digests, throttle notifications, and HTTP requests.
- **Step conditions**: Define conditional logic for each workflow step.
- **Template editors**: Channel-specific editors with variables and LiquidJS logic.
- **Reusable layouts and components**: Email layouts and shared templates.
- **Context and shared data**: Attach metadata and reusable objects across workflows.
- **Translations**: Localize notification content across languages.
- **Observability**: Activity feed and request logs for debugging and auditing.

## [Workflow lifecycle](https://docs.novu.co/#workflow-lifecycle)

A workflow typically follows this lifecycle:

1. Create a workflow for an application event.
2. Add and configure steps to define channels and execution logic.
3. Author content for each channel.
4. Trigger the workflow from your application using events and payloads.
5. Monitor and iterate using activity logs and delivery metrics.

This section walks through each stage in detail.

## [Getting started](https://docs.novu.co/#getting-started)

Follow these guides to start building your first workflow:

[**Create a workflow**\\ \\ Create a workflow and define its identifier and metadata.](https://docs.novu.co/platform/workflow/create-a-workflow) [**Configure workflows**\\ \\ Manage workflow metadata, channel preferences, payload schema, and activation state.](https://docs.novu.co/platform/workflow/configure-workflow) [**Add and configure steps**\\ \\ Add channel and action steps and define execution logic.](https://docs.novu.co/platform/workflow/add-and-configure-steps) [**Trigger workflows**\\ \\ Trigger workflows from your application and send event data.](https://docs.novu.co/platform/workflow/trigger-workflow)

## [Use cases](https://docs.novu.co/#use-cases)

- **User lifecycle notifications**: Signup, onboarding, account changes, password resets.
- **Transactional alerts**: Payments, security events, system updates.
- **Product messaging**: Feature announcements, marketing notifications, in-app prompts.
- **Operational workflows**: Internal alerts, DevOps notifications, system monitoring.
- **Multi-tenant messaging**: Tenant-aware notifications using context and topics.

[Headless hooks\\ \\ Build a fully custom Subscription interface using hooks.](https://docs.novu.co/platform/subscription/headless-hooks) [Create a Workflow\\ \\ Create a workflow and define its identifier, metadata, and initial configuration.](https://docs.novu.co/platform/workflow/create-a-workflow)

### On this page

[Features](https://docs.novu.co/#features) [Workflow lifecycle](https://docs.novu.co/#workflow-lifecycle) [Getting started](https://docs.novu.co/#getting-started) [Use cases](https://docs.novu.co/#use-cases)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/workflow/index.mdx)Open in ChatGPTOpen in Claude