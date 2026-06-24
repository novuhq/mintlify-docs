# Source: https://docs.novu.co/framework/typescript/workflow

# Novu Framework Workflow Interface

Learn about the Novu Framework workflow interface and its configuration options

## [Example Usage](https://docs.novu.co/#example-usage)

```
import { workflow } from '@novu/framework';
 
workflow(
  'my-workflow',
  async ({ step, payload, subscriber }) => {
    await step.inApp('send-in-app', async () => {
      return {
        body: 'Hello there',
      };
    });
  },
  {
    payloadSchema: z.object({
      body: z.string(),
    }),
    name: 'My Workflow',
    description: 'This is a workflow',
    tags: ['business', 'critical'],
    preferences: {
      channels: {
        inApp: { enabled: true },
      },
    },
  }
);
```

## [Interface](https://docs.novu.co/#interface)

```
import { workflow } from '@novu/framework';
 
workflow(workflowId, handler, options);
```

### [Parameters](https://docs.novu.co/#parameters)

#### [workflowId](https://docs.novu.co/#workflowid)

- **Type**: `string`
- **Required**: Yes
- **Description**: This id should be unique within your organization.

#### [handler](https://docs.novu.co/#handler)

- **Type**: `(context: WorkflowContext) => Promise<void>`
- **Required**: Yes
- **Description**: The definition function of the workflow.

#### [options](https://docs.novu.co/#options)

- **Type**: `WorkflowOptions`
- **Required**: No
- **Description**: An optional options object for workflow level configurations

##### [options.payloadSchema](https://docs.novu.co/#optionspayloadschema)

- **Type**: `JsonSchema | ZodSchema`
- **Description**: The schema to validate the event payload against, can be used to provide default values.

##### [options.name](https://docs.novu.co/#optionsname)

- **Type**: `string`
- **Description**: The name of the workflow. This is used to display a human-friendly name for the workflow in the Dashboard and `<Inbox />` component. If no value is specified, the `workflowId` will be used as the name.

##### [options.description](https://docs.novu.co/#optionsdescription)

- **Type**: `string`
- **Description**: The description of the workflow. This is used to provide a brief overview of the workflow in the Dashboard.

##### [options.tags](https://docs.novu.co/#optionstags)

- **Type**: `string[]`
- **Description**: The tags assigned to the workflow. Tags can be used to filter workflows in the dashboard, and can be used by channels such as Inbox to sort Notifications into different categories for a better user experience.

##### [options.preferences](https://docs.novu.co/#optionspreferences)

- **Type**: `WorkflowPreferences`
- **Description**: The preferences for the workflow. Read more about [Workflow Channel Preferences](https://docs.novu.co/platform/concepts/preferences#workflow-channel-preferences).

###### [preferences.all](https://docs.novu.co/#preferencesall)

- **Type**: `WorkflowPreference`
- **Properties**:
 - `enabled`: `boolean` (default: `true`) - A flag specifying if notification delivery is enabled for the workflow.
 - `readOnly`: `boolean` (default: `false`) - A flag specifying if the preferences are read-only.

###### [preferences.channels](https://docs.novu.co/#preferenceschannels)

- **Type**: `ChannelPreferences`
- **Description**: The preferences for each channel. Read more about [Workflow Channel Preferences](https://docs.novu.co/platform/concepts/preferences).
- **Properties**:
 - `inApp`: `{ enabled: boolean }` - In-app channel preferences
 - `email`: `{ enabled: boolean }` - Email channel preferences
 - `sms`: `{ enabled: boolean }` - SMS channel preferences
 - `chat`: `{ enabled: boolean }` - Chat channel preferences
 - `push`: `{ enabled: boolean }` - Push channel preferences

## [Workflow Context](https://docs.novu.co/#workflow-context)

This context is passed by the workflow engine to provide contextual information about current workflow execution.

### [subscriber](https://docs.novu.co/#subscriber)

- **Type**: `Subscriber`
- **Properties**:
 - `subscriberId`: `string` (required) - The id of the subscriber, as passed during `/events/trigger` request.
 - `firstName`: `string` (nullable) - The first name of the subscriber.
 - `lastName`: `string` (nullable) - The last name of the subscriber.

### [payload](https://docs.novu.co/#payload)

- **Type**: `InferProperties<payloadSchema>`
- **Description**: The payload of the event that triggered the workflow, will be validated against the `payloadSchema` if provided.

### [step](https://docs.novu.co/#step)

- **Type**: `object`
- **Description**: The object that contains all the step functions, read more at [Step Functions](https://docs.novu.co/framework/typescript/steps).

## [Workflow Channel Preferences](https://docs.novu.co/#workflow-channel-preferences)

With Workflow channel preferences, you can control the default delivery preference for a channel and whether a subscriber can change it. Novu will show the subscriber preferences in `<Inbox/>` component. Subscribers can enable and disable any active channel in the workflow.

In the `all` object, you can specify default preferences for all channels. The `enabled` field on the `all` object is used as fallback value if a channel is not specified explicitly in `channels`.

The `readOnly` field controls whether subscribers can change the delivery preference for a channel. Critical workflows are defined with `{ readOnly: true }`.

In the `channels` object, you can specify In-App, SMS, Email, Chat, and Push channel preferences. Each channel takes an object with an optional `enabled` flag that controls whether a notification delivery channel is enabled or disabled by default for subscribers.

### [Default values](https://docs.novu.co/#default-values)

By default, `enabled` is `true` for all channels. The `readOnly` flag is `false`.

These preferences can also be controlled from the Novu Dashboard per workflow. To do so, click on the cog icon at the top right of your screen, and then select the "Preferences" tab.

DefaultIn-App Only - EditableAll Enabled - Editable

```
const newWorkflow = workflow(
  'default-preferences',
  async ({ step }) => {
    await step.inApp('send-in-app', () => ({
      body: 'Hello there',
    }));
  },
  {
    preferences: {
      all: { enabled: true, readOnly: false },
      channels: {
        inApp: { enabled: true },
        email: { enabled: true },
        sms: { enabled: true },
        chat: { enabled: true },
        push: { enabled: true },
      },
    },
  }
);
```

[Client\\ \\ Learn how to configure and use the Novu Framework Client for managing global settings](https://docs.novu.co/framework/typescript/client) [Steps\\ \\ Learn about the Novu Framework step interface and its configuration options](https://docs.novu.co/framework/typescript/steps)

### On this page

[Example Usage](https://docs.novu.co/#example-usage) [Interface](https://docs.novu.co/#interface) [Parameters](https://docs.novu.co/#parameters) [workflowId](https://docs.novu.co/#workflowid) [handler](https://docs.novu.co/#handler) [options](https://docs.novu.co/#options) [options.payloadSchema](https://docs.novu.co/#optionspayloadschema) [options.name](https://docs.novu.co/#optionsname) [options.description](https://docs.novu.co/#optionsdescription) [options.tags](https://docs.novu.co/#optionstags) [options.preferences](https://docs.novu.co/#optionspreferences) [preferences.all](https://docs.novu.co/#preferencesall) [preferences.channels](https://docs.novu.co/#preferenceschannels) [Workflow Context](https://docs.novu.co/#workflow-context) [subscriber](https://docs.novu.co/#subscriber) [payload](https://docs.novu.co/#payload) [step](https://docs.novu.co/#step) [Workflow Channel Preferences](https://docs.novu.co/#workflow-channel-preferences) [Default values](https://docs.novu.co/#default-values)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/typescript/workflow.mdx)Open in ChatGPTOpen in Claude