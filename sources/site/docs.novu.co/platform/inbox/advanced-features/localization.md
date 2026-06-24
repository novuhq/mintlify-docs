# Source: https://docs.novu.co/platform/inbox/advanced-features/localization

Advanced Features

# Localizing the Inbox component

Learn how to customize the Inbox UI for different languages using the localization prop.

Localize the UI text of the Inbox component to align with your product’s voice or support multiple languages. This helps create a more consistent, accessible experience for subscribers across different regions.

Localization only updates the UI text in the Inbox. It doesn’t translate the content of your notifications. To send messages in different languages, use the [Translations](https://docs.novu.co/platform/workflow/advanced-features/translations).

## [Using the localization prop](https://docs.novu.co/#using-the-localization-prop)

Override the default text in the Inbox component UI by passing a `localization` prop. This prop accepts an object of key-value pairs, where each key maps to a specific UI element and each value is your custom string.

If you omit any keys, then the component reverts to the default `en-US` values.

![Overriding the default text in the Inbox component UI using localization prop](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flocalization.56cb43eb.png&w=3840&q=75)

```
import { Inbox } from '@novu/react';
 
function NovuInbox() {
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriberId="YOUR_SUBSCRIBER_ID"
      localization={{
        'inbox.filters.dropdownOptions.unread': 'Unread only',
        'notification.actions.archive.tooltip': 'Move to archive',
        'preferences.title': 'My Preferences',
        locale: 'en-US',
      }}
    />
  );
}
 
export default NovuInbox;
```

Localization is also fully supported in @novu/react-native.

## [Available localization keys](https://docs.novu.co/#available-localization-keys)

Here is a list of [all the keys available for localization](https://github.com/novuhq/novu/blob/next/packages/js/src/ui/config/defaultLocalization.ts#L1), grouped by their respective sections in the Inbox UI.

### [Filters](https://docs.novu.co/#filters)

| Key | Default Value | Description |
| --- | --- | --- |
| `inbox.filters.dropdownOptions.unread` | `Unread only` | Text for the "unread" filter option. |
| `inbox.filters.dropdownOptions.default` | `Unread & read` | Text for the default filter option. |
| `inbox.filters.dropdownOptions.archived` | `Archived` | Text for the "archived" filter option. |
| `inbox.filters.dropdownOptions.snoozed` | `Snoozed` | Text for the "snoozed" filter option. |
| `inbox.filters.labels.unread` | `Unread` | Label for the unread tab. |
| `inbox.filters.labels.default` | `Inbox` | Label for the main inbox tab. |
| `inbox.filters.labels.archived` | `Archived` | Label for the archived tab. |
| `inbox.filters.labels.snoozed` | `Snoozed` | Label for the snoozed tab. |

### [Notifications](https://docs.novu.co/#notifications)

| Key | Default Value | Description |
| --- | --- | --- |
| `notifications.emptyNotice` | `Quiet for now. Check back later.` | Message displayed when the notification list is empty. |
| `notifications.actions.readAll` | `Mark all as read` | Text for the action to mark all notifications as read. |
| `notifications.actions.archiveAll` | `Archive all` | Text for the action to archive all notifications. |
| `notifications.actions.archiveRead` | `Archive read` | Text for the action to archive all read notifications. |
| `notifications.newNotifications` | `` ({ notificationCount }: { notificationCount: number }) => `${notificationCount} new notification(s)` `` | A function that returns the string for the new notifications indicator. |
| `notification.snoozedUntil` | `Snoozed until` | Text displayed before the unsnooze time on a snoozed notification. |

### [Notification actions (tooltips)](https://docs.novu.co/#notification-actions-tooltips)

| Key | Default Value | Description |
| --- | --- | --- |
| `notification.actions.read.tooltip` | `Mark as read` | Tooltip for the "mark as read" action. |
| `notification.actions.unread.tooltip` | `Mark as unread` | Tooltip for the "mark as unread" action. |
| `notification.actions.archive.tooltip` | `Archive` | Tooltip for the "archive" action. |
| `notification.actions.unarchive.tooltip` | `Unarchive` | Tooltip for the "unarchive" action. |
| `notification.actions.snooze.tooltip` | `Snooze` | Tooltip for the "snooze" action. |
| `notification.actions.unsnooze.tooltip` | `Unsnooze` | Tooltip for the "unsnooze" action. |

### [Snooze menu](https://docs.novu.co/#snooze-menu)

| Key | Default Value | Description |
| --- | --- | --- |
| `snooze.options.anHourFromNow` | `An hour from now` | Text for the "snooze for one hour" option. |
| `snooze.options.inOneDay` | `Tomorrow` | Text for the "snooze for one day" option. |
| `snooze.options.inOneWeek` | `Next week` | Text for the "snooze for one week" option. |
| `snooze.options.customTime` | `Custom time...` | Text for the option to open the custom date picker. |
| `snooze.datePicker.timePickerLabel` | `Time` | Label for the time input in the date picker. |
| `snooze.datePicker.apply` | `Apply` | Text for the "Apply" button in the date picker. |
| `snooze.datePicker.cancel` | `Cancel` | Text for the "Cancel" button in the date picker. |
| `snooze.datePicker.pastDateTooltip` | `Selected time must be at least 3 minutes in the future` | Tooltip shown when a past time is selected. |
| `snooze.datePicker.noDateSelectedTooltip` | `Please select a date` | Tooltip shown when applying without selecting a date. |
| `snooze.datePicker.exceedingLimitTooltip` | ``({days}) => `Selected time cannot exceed ${days === 1 ? '24 hours' : `${days} days`} from now`` | Tooltip shown when the selected date exceeds the allowed snooze duration. |

### [Preferences](https://docs.novu.co/#preferences)

| Key | Default Value | Description |
| --- | --- | --- |
| `preferences.title` | `Preferences` | The main title of the preferences screen. |
| `preferences.emptyNotice` | `No notification specific preferences yet.` | Message shown when no workflow preferences are available. |
| `preferences.global` | `Global Preferences` | Title for the global preferences section. |
| `preferences.group.info` | `Applies to all notifications under this group.` | Informational text for grouped preferences. |
| `preferences.workflow.disabled.notice` | `Contact admin to enable subscription management for this critical notification.` | Notice shown for workflows where subscription management is disabled. |
| `preferences.workflow.disabled.tooltip` | `Contact admin to edit` | Tooltip shown for a disabled workflow preference. |

To view the latest and most complete key list, check the defaultLocalization.ts file.

## [Localizing workflow names in preferences](https://docs.novu.co/#localizing-workflow-names-in-preferences)

To display localized names for specific workflows in the Preferences UI, use the dynamic object within the localization prop.

Each key in dynamic should match a workflow ID, and its value should be the localized workflow name.

![Localizing workflow names in preferences](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flocalizing-workflow-names.7dbe8d6a.png&w=3840&q=75)

```
import { Inbox } from '@novu/react';
 
function NovuInbox() {
  return (
      <Inbox
        applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
        subscriberId="YOUR_SUBSCRIBER_ID"
        localization={{
          dynamic: {
            // use the workflowId as a key to localize the workflow name
            'new-comment-on-post': 'Post comments',
            'new-follower-digest': 'New Follower Updates',
          }
        }}
      />
  )
}
export default NovuInbox;
```

[Notification Click Behavior\\ \\ Learn how to configure routing and interaction behavior for notifications using routerPush and click handlers.](https://docs.novu.co/platform/inbox/advanced-customization/notification-click-behavior) [Multi-tenancy\\ \\ Learn how to use context to implement multi-tenant notifications to support different organizations or workspaces within your application.](https://docs.novu.co/platform/inbox/advanced-features/multi-tenancy)

### On this page

[Using the localization prop](https://docs.novu.co/#using-the-localization-prop) [Available localization keys](https://docs.novu.co/#available-localization-keys) [Filters](https://docs.novu.co/#filters) [Notifications](https://docs.novu.co/#notifications) [Notification actions (tooltips)](https://docs.novu.co/#notification-actions-tooltips) [Snooze menu](https://docs.novu.co/#snooze-menu) [Preferences](https://docs.novu.co/#preferences) [Localizing workflow names in preferences](https://docs.novu.co/#localizing-workflow-names-in-preferences)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/advanced-features/localization.mdx)Open in ChatGPTOpen in Claude