# Source: https://docs.novu.co/platform/inbox/configuration/preferences

Customize and Configure

# Inbox Preferences Configuration

Learn how to configure and customize subscriber preferences in your application using the Novu Inbox component.

The Preferences interface in the Inbox component lets subscribers customize how they receive notifications. By default, Novu renders a preferences icon inside the Inbox component, giving users access to global and workflow-specific settings directly from the UI.

A workflow marked as "critical" on the Novu dashboard cannot be disabled by the user and will not appear in their preferences UI. You can override this behavior by setting the `criticality` field in the `preferencesFilter` prop.

![Global preferences](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpreferences.3a4b9573.gif&w=3840&q=75)

You can also hide any workflow from appearing in the subscriber preferences UI using the appearance prop. To learn more, refer to the documentation on [styling the Inbox UI elements](https://docs.novu.co/platform/inbox/configuration/styling#style-the-inbox-ui-elements).

## [Global preferences](https://docs.novu.co/#global-preferences)

Global preferences apply across all workflows. For example, a subscriber can turn off an email or SMS channels globally, ensuring that they don’t receive notifications through that channel from any workflow.

![Global preferences](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fglobal-preferences.b0fb52a1.png&w=3840&q=75)

Global preferences override individual workflow preferences. If a channel is turned off (disabled) globally, notifications for that channel will not be sent even if it is enabled for a specific workflow.

### [Hide global preferences UI](https://docs.novu.co/#hide-global-preferences-ui)

Global preferences are always shown in the preferences list and cannot be removed, but you can hide it from the UI if necessary by using appearance prop.

```
import { Inbox } from '@novu/react';
 
function InboxWithGlobalPreferencesHidden() {
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      appearance={{
        elements: {
          workflowContainer: "[&:first-child]:!hidden",
        },
      }}
    />
  );
}
 
export default InboxWithGlobalPreferencesHidden;
```

## [Workflow-specific preferences](https://docs.novu.co/#workflow-specific-preferences)

Each workflow has its own set of channel preferences in the Inbox UI, where your subscribers can control how they receive notifications for that specific workflow. For example, a subscriber might prefer to receive email notifications for an account updates workflow but in-app notifications for security alerts.

The name given to a workflow in the Novu dashboard is the name your subscribers will see in their preferences UI.

![Workflow specific preferences](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fworkflow-specific-preferences.ab7a7190.png&w=3840&q=75)

For each workflow, the Inbox UI only displays the channels step used in a given workflow.

Learn how to configure channel steps in a workflow in the [Create a Workflow guide](https://docs.novu.co/platform/workflow/create-a-workflow).

### [Filter preferences](https://docs.novu.co/#filter-preferences)

Use the `preferencesFilter` prop on the Inbox component to control which workflows are shown in the subscriber preferences list. You can filter workflows based on their assigned tags or their criticality level (critical or non-critical).

#### [Filter by tags](https://docs.novu.co/#filter-by-tags)

This filtering works by matching the tags you provide in the prop with the tags assigned to the workflows. Only workflows with matching tags will be visible to the subscriber in their preferences UI.

```
import { Inbox } from '@novu/react';
 
function InboxPreferences() {
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferencesFilter={{ tags: ['general', 'admin', 'security'] }} />
  );
}
 
export default InboxPreferences;
```

#### [Filter by workflow criticality](https://docs.novu.co/#filter-by-workflow-criticality)

You can also filter which workflows are displayed based on whether they are marked as "critical". By default, only non-critical workflows are shown. You can change this behavior using the `criticality` key with `WorkflowCriticalityEnum`.

Possible values are:

- `WorkflowCriticalityEnum.NON_CRITICAL`: (Default) Only shows non-critical workflows.
- `WorkflowCriticalityEnum.CRITICAL`: Only shows critical workflows.
- `WorkflowCriticalityEnum.ALL`: Shows all workflows, including critical ones.

For instance, to display all workflows, you would do the following:

```
import { Inbox, WorkflowCriticalityEnum } from '@novu/react';
 
function InboxPreferences() {
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferencesFilter={{criticality: WorkflowCriticalityEnum.ALL}}
    />
  );
}
 
export default InboxPreferences;
```

#### [Combining tags and criticality](https://docs.novu.co/#combining-tags-and-criticality)

You can combine tags and criticality filters to create more specific views. For example, the code below will display all workflows (both critical and non-critical) that have the 'general', 'admin', or 'security' tags.

```
import { Inbox, WorkflowCriticalityEnum } from '@novu/react';
 
function InboxPreferences() {
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferencesFilter={{ tags: ['general', 'admin', 'security'], criticality: WorkflowCriticalityEnum.ALL }} />
  );
}
 
export default InboxPreferences;
```

### [Group preferences](https://docs.novu.co/#group-preferences)

Use the `preferenceGroups` prop on the Inbox component to organize workflows into meaningful sections in the subscriber preferences UI.

![Grouping preferences](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgroup-preferences.091c7618.png&w=3840&q=75)

Each group requires:

- **name**: The display name for the group
- **filter**: The filter logic (object or function) to determine which workflows belong in the group

There are different ways to group preferences, you can use either of them individually or combine different methods.

Grouping preference is supported in client-side SDKs starting from version 3.4.0.

#### [Group by tags](https://docs.novu.co/#group-by-tags)

Use an object with a `tags` key to group workflows that share specific tags.

```
import { Inbox } from '@novu/react';
 
function InboxPreferences() {
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferenceGroups={[
        {
          name: 'General',
          filter: { tags: ['account'] },
        },
      ]}
    />
  );
}
 
export default InboxPreferences;
```

#### [Group by tags and workflow IDs](https://docs.novu.co/#group-by-tags-and-workflow-ids)

Combine `tags` and `workflowIds` for more targeted grouping.

```
import { Inbox } from '@novu/react';
 
function InboxPreferences() {
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferenceGroups={[
        {
          name: 'Marketing',
          filter: { tags: ['marketing'], workflowIds: ['workflow-ids'] },
        },
      ]}
    />
  );
}
 
export default InboxPreferences;
```

#### [Group all workflows](https://docs.novu.co/#group-all-workflows)

You can group all workflows under a single, descriptive heading like "All Notifications" or "General" to improve organization.

```
import { Inbox } from '@novu/react';
 
function InboxPreferences() {
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferenceGroups={[
        {
          name: 'All Workflows',
          filter: ({ preferences }) => preferences
        },
      ]}
    />
  );
}
 
export default InboxPreferences;
```

#### [Group using custom logic](https://docs.novu.co/#group-using-custom-logic)

You can define your own logic to group preferences by passing a function to the `filter` key. This function receives an object containing a `preferences` array, where each item represents a workflow preference, including both subscriber settings and workflow metadata.

Each item in the `preferences` array includes a `workflow` object with properties like `name`, `slug`, and `identifier`. You can use these fields to implement your grouping logic.

```
import { Inbox } from '@novu/react';
 
function InboxPreferences() {
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferenceGroups={[
        {
          name: 'Alerts',
          filter: ({ preferences }) =>
            preferences.filter(({ workflow }) =>
              workflow?.name?.toLowerCase().includes('alerts')
            ),
        },
      ]}
    />
  );
}
 
export default InboxPreferences;
```

### [Sort preferences](https://docs.novu.co/#sort-preferences)

Use the `preferencesSort` prop on the Inbox component to customize the order in which workflows are displayed in the subscriber preferences list. This prop accepts a custom comparison function, similar to JavaScript's `Array.sort()` method.

The comparison function receives two preference objects (`a`, `b`) as arguments and should return:

- A negative number if `a` should come before `b`.
- A positive number if `b` should come before `a`.
- Zero if the order of `a` and `b` doesn't matter.

Each preference object contains a `workflow` property with metadata you can use for sorting, such as `name`, `tags`, `slug`, and `identifier`.

#### [Sort alphabetically](https://docs.novu.co/#sort-alphabetically)

You can sort workflows alphabetically by name in the preferences UI

```
import { Inbox } from '@novu/react';
 
function InboxWithAlphabeticalSort() {
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferencesSort={(a, b) => {
        const aName = a.workflow?.name?.toLowerCase() || '';
        const bName = b.workflow?.name?.toLowerCase() || '';
        return aName.localeCompare(bName);
      }}
    />
  );
}
 
export default InboxWithAlphabeticalSort;
```

#### [Sort by priority tag](https://docs.novu.co/#sort-by-priority-tag)

You can implement more complex logic to meet your specific needs. This example prioritizes workflows tagged with "priority", placing them at the top of the list. All other workflows are then sorted alphabetically by name.

```
import { Inbox } from '@novu/react';
 
function InboxWithSortedPreferences() {
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferencesSort={(a, b) => {
        const aName = a.workflow?.name?.toLowerCase() || '';
        const bName = b.workflow?.name?.toLowerCase() || '';
        const aHasPriorityTag = a.workflow?.tags?.includes('priority') || false;
        const bHasPriorityTag = b.workflow?.tags?.includes('priority') || false;
        
        // Priority workflows come first
        if (aHasPriorityTag && !bHasPriorityTag) return -1;
        if (!aHasPriorityTag && bHasPriorityTag) return 1;
        
        // Then sort alphabetically by name
        return aName.localeCompare(bName);
      }}
    />
  );
}
 
export default InboxWithSortedPreferences;
```

#### [Sorting within groups](https://docs.novu.co/#sorting-within-groups)

You can use `preferencesSort` together with `preferenceGroups`. In this case, sorting is applied within each group; this lets you both organize workflows into sections and control their order inside those sections.

For example, after grouping workflows by their functions, you can then sort the workflows alphabetically within each of those groups.

```
import { Inbox } from '@novu/react';
 
function InboxWithGroupedAndSortedPreferences() {
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      preferenceGroups={[
        {
          name: 'Account Notifications',
          filter: { tags: ['account'] },
        },
        {
          name: 'Marketing Updates',
          filter: { tags: ['marketing'] },
        },
      ]}
      preferencesSort={(a, b) => {
        const aName = a.workflow?.name?.toLowerCase() || '';
        const bName = b.workflow?.name?.toLowerCase() || '';
        return aName.localeCompare(bName);
      }}
    />
  );
}
 
export default InboxWithGroupedAndSortedPreferences;
```

## [Conditionally display preferences](https://docs.novu.co/#conditionally-display-preferences)

This approach can also be used to show or hide elements. The example below hides the global preferences settings by checking the `preference.level` property.

```
import { Inbox, PreferenceLevel } from '@novu/react';
 
export default function Novu() {
 
  const appearance = {
    elements: {
      workflowContainer: ({ preference }) => {
        if (preference.level === PreferenceLevel.GLOBAL) {
          return 'hidden';
        }
        return '';
      },
    },
  };
 
  return (
  <Inbox
    applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
    subscriber="YOUR_SUBSCRIBER_ID"
    appearance={appearance}
  />
);
}
```

## [Use Preferences outside the Inbox UI](https://docs.novu.co/#use-preferences-outside-the-inbox-ui)

You don’t have to display the Preferences UI inside the default Inbox component. Novu provides two main ways to build a custom preference experience for your subscribers.

### [Using the `<Preferences />` component](https://docs.novu.co/#using-the-preferences--component)

Use the Preferences component to display the preferences UI anywhere in your application, such as in a dedicated settings page without showing the full Inbox component. This gives you more control over the layout and placement of the preferences experience in your application.

![Preferences component](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpreferences-component.2f4f5e5b.png&w=3840&q=75)

```
import { Inbox, Preferences } from '@novu/react';
 
function InboxPreferences() {
  return (
    <Inbox 
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID">
      <Preferences />
    </Inbox>
  );
}
 
export default InboxPreferences
```

### [Using the `usePreferences` hook](https://docs.novu.co/#using-the-usepreferences-hook)

The `usePreferences` hook gives you access to all preferences data for the current subscriber. It returns the full preferences list, loading and error states, filtering options, and a refetch function. This provides the data you need to build a completely custom preferences UI.

Refer to the [React](https://docs.novu.co/platform/sdks/react/hooks/use-preferences) and [React Native SDKs](https://docs.novu.co/platform/sdks/react-native/hooks/use-preferences) documentation for full usage details and code examples.

[Tabs\\ \\ Learn what tabs are and how to filter multiple tabs in the Novu Inbox component.](https://docs.novu.co/platform/inbox/configuration/tabs) [Data Object\\ \\ Learn how to use the data object to extend in-app notifications with custom metadata.](https://docs.novu.co/platform/inbox/configuration/data-object)

### On this page

[Global preferences](https://docs.novu.co/#global-preferences) [Hide global preferences UI](https://docs.novu.co/#hide-global-preferences-ui) [Workflow-specific preferences](https://docs.novu.co/#workflow-specific-preferences) [Filter preferences](https://docs.novu.co/#filter-preferences) [Filter by tags](https://docs.novu.co/#filter-by-tags) [Filter by workflow criticality](https://docs.novu.co/#filter-by-workflow-criticality) [Combining tags and criticality](https://docs.novu.co/#combining-tags-and-criticality) [Group preferences](https://docs.novu.co/#group-preferences) [Group by tags](https://docs.novu.co/#group-by-tags) [Group by tags and workflow IDs](https://docs.novu.co/#group-by-tags-and-workflow-ids) [Group all workflows](https://docs.novu.co/#group-all-workflows) [Group using custom logic](https://docs.novu.co/#group-using-custom-logic) [Sort preferences](https://docs.novu.co/#sort-preferences) [Sort alphabetically](https://docs.novu.co/#sort-alphabetically) [Sort by priority tag](https://docs.novu.co/#sort-by-priority-tag) [Sorting within groups](https://docs.novu.co/#sorting-within-groups) [Conditionally display preferences](https://docs.novu.co/#conditionally-display-preferences) [Use Preferences outside the Inbox UI](https://docs.novu.co/#use-preferences-outside-the-inbox-ui) [Using the `<Preferences />` component](https://docs.novu.co/#using-the-preferences--component) [Using the `usePreferences` hook](https://docs.novu.co/#using-the-usepreferences-hook)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/configuration/preferences.mdx)Open in ChatGPTOpen in Claude