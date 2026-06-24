# Source: https://docs.novu.co/platform/concepts/preferences

Core Concepts

# Notification Preferences Concepts

Learn how to manage subscriber preferences in Novu.

Novu provides a way to store subscriber preferences. This allows subscribers, your users, to specify and manage their preferences and customize their notifications experience.

**Levels of preferences:**

- Workflow channel preferences
- Subscriber channel preferences per workflow
- Subscriber global preferences

## [Workflow channel preferences](https://docs.novu.co/#workflow-channel-preferences)

Each workflow has its own channel preferences. By default, all channel preferences are enabled. If disabled, the subscriber will not receive notifications for that channel step.

Steps to manage workflow channel preferences:

1. Go to the [Workflows page](https://dashboard.novu.co/workflows) in Novu dashboard
2. Click the workflow you want to manage channel preferences for
3. A node-based editor will appear. On the right side of the editor, click the `Configure channel preferences` option
4. Click on the All Channels checkbox to enable or disable all channels for the workflow
5. You will be able to change the preferences for only those steps which are present in the workflow. Non existing channel steps will be disabled.
6. The `Mark as critical` toggle will make this workflow critical. Read more about [critical workflows](https://docs.novu.co/#critical-workflows)

If a workflow has only `in-app` and `email` steps, then it will have only `in-app` and `email` preferences.

![Workflow channel preferences](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fworkflow-channel-preferences.2990ff40.png&w=3840&q=75)

### [Critical workflows](https://docs.novu.co/#critical-workflows)

In some cases, you don't want the subscriber to be able to unsubscribe from mandatory notifications such as Account Verification, Password Reset, etc...

In those cases, you can mark a workflow as `critical` in the workflow channel preferences. Critical workflows are not displayed in subscriber preferences, so subscribers cannot change preferences for that workflow.

## [Subscriber global preferences](https://docs.novu.co/#subscriber-global-preferences)

Subscribers can set global channel preferences, which override individual settings. For instance, if there are 10 workflows, and a subscriber wants to disable SMS notifications for all of them, they can do so with via global preferences.

![Preferences](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpreferences%402x.9e85815c.png&w=3840&q=75)

## [Subscriber channel preferences per workflow](https://docs.novu.co/#subscriber-channel-preferences-per-workflow)

For each workflow, each subscriber has their own channel preferences. Subscribers can manage these preferences from the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/preferences) Preferences view.

![Subscriber channel preferences](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsubscriber-workflow-preferences.61ba0d8e.png&w=3840&q=75)

Inbox displays only channels present in the current workflow.

## [Priority of preferences](https://docs.novu.co/#priority-of-preferences)

Since there are three types of preferences, the priority order is as follows:

Workflow channel preferences > Subscriber global preferences > Subscriber channel preferences per workflow

Examples:

1. If the `email` channel is disabled in workflow channel preferences, global and subscriber preferences are ignored, and subscribers will not receive email notifications for this workflow.
2. If the `in-app` channel is enabled in workflow channel preferences but the workflow is marked as critical, subscribers cannot change their preferences and will always receive in-app notifications.
3. If both `chat` and `email` channels are enabled in the workflow but `email` is disabled in subscriber global preferences, the subscriber will receive only chat notifications for this workflow.

## [Subscriber preferences APIs](https://docs.novu.co/#subscriber-preferences-apis)

Subscriber preferences can be retrieved and updated using following APIs:

[**Retrieve subscriber preferences**\\ \\ Retrieve subscriber preferences for a subscriber](https://docs.novu.co/api-reference/subscribers/retrieve-subscriber-preferences) [**Update subscriber preferences**\\ \\ Update subscriber preferences for a subscriber](https://docs.novu.co/api-reference/subscribers/update-subscriber-preferences)

[Trigger\\ \\ Managing Trigger Events from Request to Processing](https://docs.novu.co/platform/concepts/trigger) [Multi-tenancy\\ \\ Learn about how to implement multi-tenant notifications in Novu](https://docs.novu.co/platform/concepts/tenants)

### On this page

[Workflow channel preferences](https://docs.novu.co/#workflow-channel-preferences) [Critical workflows](https://docs.novu.co/#critical-workflows) [Subscriber global preferences](https://docs.novu.co/#subscriber-global-preferences) [Subscriber channel preferences per workflow](https://docs.novu.co/#subscriber-channel-preferences-per-workflow) [Priority of preferences](https://docs.novu.co/#priority-of-preferences) [Subscriber preferences APIs](https://docs.novu.co/#subscriber-preferences-apis)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/concepts/preferences.mdx)Open in ChatGPTOpen in Claude