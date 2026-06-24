# Source: https://docs.novu.co/platform/how-novu-works

# How Novu Works

A high-level overview of Novu’s architecture: workflows, triggers, subscribers, and environments, and how they connect to support in-app and external channels.

Novu is a notification infrastructure built around the concept of workflows, environments, and subscriber-based delivery. It centralizes multi-channel messaging and supports real-time in-app experiences through a customizable [<Inbox />](https://docs.novu.co/platform/inbox) component.

At its core, Novu uses workflows to orchestrate how notifications are sent, step by step, to different channels like email, SMS, in-app, push, and chat. Each workflow is triggered by your application and executed in the context of a specific environment.

## [The Inbox component in the notification lifecycle](https://docs.novu.co/#the-inbox-component-in-the-notification-lifecycle)

The [<Inbox />](https://docs.novu.co/platform/inbox) component is Novu’s in-app delivery endpoint. This component makes it possible for users to receive and manage notifications directly within your application interface.

Unlike external channels that rely on third-party providers, the Inbox is internal to your app. It uses the environment’s `application identifier` to establish a secure connection, scoped to your subscribers.

When a workflow includes an in-app step, messages are routed to the subscriber’s inbox in real time. The Inbox component handles rendering, notification management, users' preferences, and message actions without requiring additional backend logic.

## [Core concepts overview](https://docs.novu.co/#core-concepts-overview)

At a high level, Novu’s architecture is built around modular but connected concepts. Each concept serves a specific role in the delivery pipeline and is scoped to an environment.

![How Novu works](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhow-novu-works.17ae705a.png&w=3840&q=75)

### [Organization and environments](https://docs.novu.co/#organization-and-environments)

Everything starts with your organization, the top-level entity in Novu. Each organization can have multiple environments, such as:

- Development for testing
- Production for live apps
- Any custom environments you need (for example, Staging)

Each environment contains:

- Independent workflows
- Environment-specific subscribers
- Topics
- Separate integrations and credentials
- API keys for secure access (application identifier, secret keys)

This isolation allows teams to test workflows and notifications on one environment without affecting the other environments.

### [Workflows and Triggers](https://docs.novu.co/#workflows-and-triggers)

A workflow defines the steps Novu takes to deliver a notification. Steps are either channel steps (email, in-app, push, chat, and SMS) or action steps (Delay and Digest).

Workflows are environment-specific and versioned. You trigger them using the REST API by sending an event along with the relevant secret key from the current environment, `subscriberId`, `workflowId`, and `payload`.

Each trigger becomes an event that flows through the workflow. Steps in the workflow generate messages, which are delivered via their corresponding channels or routed to the inbox.

To learn more about workflows, refer to the [Workflows documentation](https://docs.novu.co/platform/concepts/workflows).

### [Subscribers and topics](https://docs.novu.co/#subscribers-and-topics)

A subscriber represents a user in a given environment. Each subscriber has:

- **Channel identifiers**: Such as email address or phone number.
- **A unique `subscriberId`**: Used when triggering workflows and resolving the recipient.
- **Personal details**: You can pass `firstName` and `lastName` when creating the subscriber.
- **Custom metadata**: Stored under a `data` field, which is a flexible JSON object where you can store any additional user-specific information (for example, plan level, preferences, timestamps).
- **Environment-specific preferences**: Like preferred channels and opt-in settings.

To send notifications to multiple users, you can group subscribers into a topic. A workflow can be triggered for an individual subscriber or for all subscribers within a topic.

Subscriber resolution is part of workflow execution. Novu uses the subscriber's metadata to determine how messages are personalized, delivered, and stored.

To learn more about subscribers, refer to the [Subscribers documentation](https://docs.novu.co/platform/concepts/subscribers).

### [Channels and the Inbox component](https://docs.novu.co/#channels-and-the-inbox-component)

Each channel represents a delivery medium (email, SMS, push, chat, or in-app). Channels are linked to provider configurations known as integrations, which are defined per environment.

In-app messages are delivered to the [<Inbox />](https://docs.novu.co/platform/inbox) component, which is located in your frontend and listens for messages scoped to the current environment and subscriber.

To learn more about channels and the Inbox component, refer to the [Channels documentation](https://docs.novu.co/platform/integrations)

### [Integrations](https://docs.novu.co/#integrations)

Integrations connect Novu to external delivery providers (for example, SendGrid, Twilio, Firebase Cloud Messaging, Slack). They are configured per environment and mapped to specific channels.

During workflow execution, Novu uses these integrations to send messages for steps that require external delivery. The presence of an integration for a given channel is required for a workflow step to succeed.

To learn more about Integrations, refer to the [Integrations documentation](https://docs.novu.co/platform/concepts/integrations).

## [How it all connects](https://docs.novu.co/#how-it-all-connects)

See how the concepts work together:

An event triggers the workflow

Your application calls Novu’s API and passes in:

- The secret API key for your environment.
- The `workflowIdentifier` of the workflow that you want to run.
- The `subscriberId` of the user that you want to notify (or a topic key for bulk notifications).
- An optional `payload` to customize message content for example, `{{firstName}}`, `{{orderId}}`

Novu resolves the subscriber

Novu looks up the subscriber using the ID you provided. This includes:

- Channel-specific identifiers (email and phone number).
- Subscriber preferences, which might affect delivery behavior.
- Any metadata tied to that subscriber in the current environment

The workflow steps execute sequentially

Each step is evaluated in order. These steps include:

- **Channel steps**: Deliver a message via email, SMS, push, in-app, or chat.
- **Action steps**: Introduce logic such as delays or digest aggregation.

If a step fails (for example, due to a provider error), then Novu retries it without re-executing previous steps. This ensures fault tolerance and message-level traceability.

Messages are delivered

Once a step completes, Novu uses the environment’s configured integrations to deliver the message. For example:

- An Email step uses a provider like SendGrid.
- An In-App step sends the message to the [<Inbox />](https://docs.novu.co/platform/inbox) component in your frontend.
- An SMS step uses a provider like Twilio.

Logs and metadata are recorded

Each triggered workflow becomes an event with a unique `transactionId`. Novu records:

- Which steps ran.
- Whether each step succeeded or failed.
- How long each step took.
- What messages were generated and sent.

The Novu pipeline is designed to be consistent, observable, and scalable across channels and environments.

[What is Novu?\\ \\ The open-source notification infrastructure that simplifies in-app, email, chat, and push notifications.](https://docs.novu.co/platform/what-is-novu) [Workflows\\ \\ Learn what workflows are and how they work in Novu.](https://docs.novu.co/platform/concepts/workflows)

### On this page

[The Inbox component in the notification lifecycle](https://docs.novu.co/#the-inbox-component-in-the-notification-lifecycle) [Core concepts overview](https://docs.novu.co/#core-concepts-overview) [Organization and environments](https://docs.novu.co/#organization-and-environments) [Workflows and Triggers](https://docs.novu.co/#workflows-and-triggers) [Subscribers and topics](https://docs.novu.co/#subscribers-and-topics) [Channels and the Inbox component](https://docs.novu.co/#channels-and-the-inbox-component) [Integrations](https://docs.novu.co/#integrations) [How it all connects](https://docs.novu.co/#how-it-all-connects)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/how-novu-works.mdx)Open in ChatGPTOpen in Claude