# Source: https://docs.novu.co/platform/workflow/add-and-configure-steps

# How to add and configure Workflow Steps

Learn how workflow steps work in Novu, the different step types available, and how to add and execute steps in a notification workflow.

Steps are the building blocks of a workflow. Each step represents a distinct action or delivery mechanism that determines what happens, when it happens, and how a notification is delivered.

A workflow is built as a sequence of steps, executed linearly from top to bottom. You define and arrange steps using the workflow editor in the Novu dashboard, where each node on the canvas represents a single step in the execution flow.

Each step operates independently. If one step fails, other steps in the workflow can still succeed. Workflows support two types of steps from the Novu dashboard.

![Types of steps](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsteps.e9353ece.png&w=3840&q=75)

You can create a custom step using Novu Framework. For more information, refer to the [Custom steps](https://docs.novu.co/framework/custom).

## [Channel steps](https://docs.novu.co/#channel-steps)

Channel steps deliver notifications to users through supported communication channels. Each channel step includes its own template editor for defining notification content and channel-specific behavior.

Supported channel types include:

[**Email**\\ \\ Send notifications to your subscribers’ email. Supports layouts, visual block editing, custom HTML, and dynamic data.](https://docs.novu.co/platform/integrations/email) [**In-App**\\ \\ Deliver notifications directly inside your application through the Novu <Inbox/>.](https://docs.novu.co/platform/inbox) [**Push**\\ \\ Send notifications to user devices, either mobile, desktop, or web.](https://docs.novu.co/platform/integrations/push) [**SMS**\\ \\ Send notification to your subscribers’ devices.](https://docs.novu.co/platform/integrations/sms) [**Chat**\\ \\ Send notifications to chat platforms such as Slack or Microsoft Teams.](https://docs.novu.co/platform/integrations/chat)

To send notifications through Email, Push, Chat, or SMS channels, you must configure the appropriate [channel provider integration](https://docs.novu.co/platform/integrations) for your environment. Without an active integration, messages sent through that channel won’t be delivered.

Novu provides built-in [demo integrations](https://docs.novu.co/platform/integrations/demo-integration) for the Email and SMS channels. These sandboxed providers let you test workflows before configuring a provider.

## [Action steps](https://docs.novu.co/#action-steps)

Action steps introduce logic and flow control into a workflow. They do not send notifications directly, but instead affect when and how downstream steps execute. Action steps are typically placed before or between channel steps to shape delivery behavior.

### [Delay](https://docs.novu.co/#delay)

The Delay step pauses workflow execution for a specified duration before continuing to the next step.

Delay is used when timing matters, whether you need to wait a fixed amount of time, resume execution at a scheduled moment, or defer execution based on data from the trigger payload. This is useful for use cases such as:

- Waiting for X amount of time before sending the message.
- Waiting for a short period before sending a push message in case the user has seen the notification in the Inbox component.
- Sending a reminder email 24 hours after a user abandons their shopping cart to encourage checkout completion.
- Sending a follow-up message 3 days after user registration to check if they need onboarding assistance.

**How does Delay work?**

When a workflow reaches a Delay step:

1. Execution pauses for the configured duration or until the scheduled time.
2. Once the delay condition is satisfied, the workflow continues to the next step.
3. All downstream steps execute normally unless blocked by conditions or other controls.

Steps placed before the Delay step run immediately. Steps placed after the Delay step run only after the delay completes.

Delay can be added anywhere in a workflow and can be conditionally skipped using step conditions.

To learn how to configure delay types and scheduling behavior, refer to the [Configure Delay Step](https://docs.novu.co/platform/workflow/add-and-configure-steps/configure-action-steps/delay) documentation.

### [Digest](https://docs.novu.co/#digest)

The Digest step controls how often downstream steps execute by batching multiple workflow trigger events into a single execution.

Instead of running the workflow once per event, Digest collects events over time, groups them per subscriber, and then allows the workflow to continue once per digest window. Use Digest to

- Prevent over-notifying users during bursts of activity
- Replace many similar notifications with a single summary
- Batch repeated events that occur within a short period
- Deliver notifications on a fixed cadence (for example, daily or weekly summaries)

**How does Digest work?**

When a Digest step is added:

1. Workflow trigger events are collected instead of immediately flowing downstream.
2. Events are grouped per subscriber (and optional grouping key).
3. Once the digest window completes, the workflow continues once, with the aggregated events available as context.

![Digest Engine](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdigest-engine.4e47f2aa.png&w=3840&q=75)

Steps placed before the Digest step execute in real time. Steps placed after the Digest step execute only when the digest duration is completed.

[**Configure Digest step**\\ \\ Learn how to configure Digest windows, group rules, and schedule behavior.](https://docs.novu.co/platform/workflow/add-and-configure-steps/configure-action-steps/digest) [**Use digest data**\\ \\ Learn how to use the result from a Digest step to personalize content in the channel step editor.](https://docs.novu.co/platform/workflow/add-notification-content/personalize-content#digest-variables)

### [Throttle](https://docs.novu.co/#throttle)

The Throttle step lets you limit the number of workflow executions within a specified time window. You can configure throttling directly in Novu workflow editor. By setting limits, you can prevent subscribers from receiving duplicate or excessive notifications when a trigger fires repeatedly.

![Throttle](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthrottle.24f13f11.png&w=3840&q=75)

Some use cases for this include:

- Limiting high-frequency alerts (such as CPU or billing usage checks) to one notification per hour, day, or week.
- Preventing duplicate messages from automated cron jobs or recurring triggers.
- Controlling notification frequency for subscribers who belong to multiple projects or contexts.

**How does Throttle work?**

At a high level, the throttle step counts the number of times a workflow is triggered for a specific subscriber.

- If the count is within the defined execution threshold for the time window, then the workflow proceeds as normal.
- If the count exceeds the threshold, then the workflow execution is halted at the throttle step. Any steps placed after the throttle step in your workflow will not be run. For example, if you have an email step following a throttle step, then that email will not be sent once the limit is reached. ![Throttle feed activity feed](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fthrottle-step-activity-feed.f54d0aff.png&w=3840&q=75)

Throttling applies consistently across channels, whether the workflow sends email, in-app, SMS, chat, or push notifications.

The throttle step applies to all workflows, including those marked as critical. If a critical workflow is triggered more frequently than the throttle limit allows, then it will be skipped just like any other workflow. This ensures that even high-priority alerts do not overwhelm a subscriber.

To the subscriber, the experience is transparent. They are not aware that any throttling has occurred; they either receive a notification or they don’t. The subscriber is never exposed to information about the throttle itself.

To learn how to configure throttle windows, thresholds, and grouping behavior, refer to the [Configure Throttle Step](https://docs.novu.co/platform/workflow/add-and-configure-steps/configure-action-steps/throttle) documentation.

### [HTTP](https://docs.novu.co/#http)

The HTTP step allows workflows to call external APIs during execution. It provides a native way to interact with systems outside of Novu directly from your workflows without relying on external webhooks or custom infrastructure.

This is useful for use cases such as:

- Fetching additional user or event data from your internal databases to enrich notifications.
- Determining if a user has an active premium subscription before sending a specific promotional email.
- Pinging an internal delivery system or observability tool with workflow context.

**How does HTTP work?**

When a workflow reaches an HTTP step:

1. The workflow pauses momentarily to execute the configured HTTP request (e.g., `GET`, `POST`, `PUT`).
2. Contextual data like subscriber information or previous step results can be injected into the request URL, headers, or body using LiquidJS.
3. Once the API responds, the response data is stored as a step result.
4. Downstream steps and conditions can consume the stored response data to personalize content or branch workflow execution.

If the HTTP request fails (e.g., due to a network timeout or a non-2xx status code), the workflow can either halt or continue execution based on how you configure the failure behavior.

To learn how to configure the request, test endpoints, and consume API responses, refer to the [Configure HTTP Step](https://docs.novu.co/platform/workflow/add-and-configure-steps/configure-action-steps/http-step) documentation.

## [Add a step to a workflow](https://docs.novu.co/#add-a-step-to-a-workflow)

You add steps from the Workflow Editor when building or editing a workflow.

The first step in every workflow is the Workflow Trigger, which represents the event that starts the workflow.

To add steps:

1. Open a workflow in the Workflow Editor.
2. Click the **+** (Add step) icon at the desired position.
3. Select a step type from the available options.
4. Configure the step if required.

![Add steps](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadd-step.e2142871.gif&w=3840&q=75)

You can add multiple steps and reorder them at any time to change the execution flow.

## [How steps execute](https://docs.novu.co/#how-steps-execute)

When a workflow is triggered:

- Steps execute sequentially, from top to bottom.
- Each step receives the same workflow payload.
- A step must complete before the next step begins.

This execution model allows you to build complex notification sequences that adapt to timing, user behavior, and delivery requirements such as:

1. Send an in-App message.
2. Wait 24 hours (Delay).
3. If the in-app message is unread, send an email.
4. If the subscriber is a premium user, then follow up with an SMS message.

This allows Novu workflows to adapt to user behavior and preferences while keeping the configuration visual and testable.

[Configure Workflow\\ \\ Configure workflow metadata, delivery preferences, and payload schema in the workflow editor.](https://docs.novu.co/platform/workflow/configure-workflow) [Delay Step\\ \\ Learn how to use delay step to pause workflow execution.](https://docs.novu.co/platform/workflow/add-and-configure-steps/configure-action-steps/delay)

### On this page

[Channel steps](https://docs.novu.co/#channel-steps) [Action steps](https://docs.novu.co/#action-steps) [Delay](https://docs.novu.co/#delay) [Digest](https://docs.novu.co/#digest) [Throttle](https://docs.novu.co/#throttle) [HTTP](https://docs.novu.co/#http) [Add a step to a workflow](https://docs.novu.co/#add-a-step-to-a-workflow) [How steps execute](https://docs.novu.co/#how-steps-execute)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/workflow/add-and-configure-steps/index.mdx)Open in ChatGPTOpen in Claude