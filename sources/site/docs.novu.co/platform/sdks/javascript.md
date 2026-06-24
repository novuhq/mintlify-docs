# Source: https://docs.novu.co/platform/sdks/javascript

# API reference for the @novu/js package

Complete API reference for the Novu JavaScript package

## [Novu](https://docs.novu.co/#novu)

The Novu client provides methods to interact with notifications, preferences, and real-time events.

### [Constructor Options](https://docs.novu.co/#constructor-options)

| Prop | Type | Default |
| --- | --- | --- |
| 
`subscriber?`

 | 

`string | Subscriber`

 | \- |
| 

`subscriberId?`

 | 

`string`

 | \- |
| 

`context?`

 | 

`Partial<Record<string, ContextValue>>`

 | \- |
| 

`defaultSchedule?`

 | 

`DefaultSchedule`

 | \- |
| 

`useCache?`

 | 

`boolean`

 | \- |
| 

`socketOptions?`

 | 

`NovuSocketOptions`

 | \- |
| 

`socketUrl?`

 | 

`string`

 | \- |
| 

`apiUrl?`

 | 

`string`

 | \- |
| 

`contextHash?`

 | 

`string`

 | \- |
| 

`subscriberHash?`

 | 

`string`

 | \- |
| 

`applicationIdentifier?`

 | 

`string | undefined`

 | \- |
| 

`backendUrl?`

 | 

`string`

 | \- |

### [Usage](https://docs.novu.co/#usage)

USEUUsing ContextHMAC Encryption

```
import { Novu } from "@novu/js";
 
const novu = new Novu({
  subscriberId: "SUBSCRIBER_ID",
  applicationIdentifier: "APPLICATION_IDENTIFIER",
});
```

## [Notifications](https://docs.novu.co/#notifications)

### [Methods](https://docs.novu.co/#methods)

#### [list](https://docs.novu.co/#list)

Fetches a list of notifications based on provided filters.

| Prop | Type | Default |
| --- | --- | --- |
| 
`createdLte?`

 | 

`number`

 | \- |
| 

`createdGte?`

 | 

`number`

 | \- |
| 

`severity?`

 | 

`SeverityLevelEnum | SeverityLevelEnum[]`

 | \- |
| 

`data?`

 | 

`Record<string, unknown>`

 | \- |
| 

`seen?`

 | 

`boolean`

 | \- |
| 

`snoozed?`

 | 

`boolean`

 | \- |
| 

`archived?`

 | 

`boolean`

 | \- |
| 

`read?`

 | 

`boolean`

 | \- |
| 

`tags?`

 | 

`TagsFilter`

 | \- |

```
import { SeverityLevelEnum } from '@novu/js';
import dayjs from "dayjs";
 
const now = dayjs();
// convert to milliseconds
const startDate = now.subtract(60, "days").valueOf();
const endDate = now.valueOf();  
 
const notifications = await novu.notifications.list({
  limit: 30,
  read: false,
  seen: false,
  archived: false,
  tags: ['tag1', 'tag2'],
  severity: SeverityLevelEnum.HIGH,
  // data attributes
  data: {
    type: 'login',
  },
  offset: 0,
  // fetch last 60 days notifications
  createdGte: startDate,
  createdLte: endDate,
});
```

The response will be of type:

| Prop | Type | Default |
| --- | --- | --- |
| 
`filter?`

 | 

`NotificationFilter`

 | \- |
| 

`hasMore?`

 | 

`boolean`

 | \- |
| 

`notifications?`

 | 

`Notification[]`

 | \- |

#### [count](https://docs.novu.co/#count)

Fetches the count of notifications based on filters.

| Prop | Type | Default |
| --- | --- | --- |
| 
`createdLte?`

 | 

`number`

 | \- |
| 

`createdGte?`

 | 

`number`

 | \- |
| 

`severity?`

 | 

`SeverityLevelEnum | SeverityLevelEnum[]`

 | \- |
| 

`data?`

 | 

`Record<string, unknown>`

 | \- |
| 

`seen?`

 | 

`boolean`

 | \- |
| 

`snoozed?`

 | 

`boolean`

 | \- |
| 

`archived?`

 | 

`boolean`

 | \- |
| 

`read?`

 | 

`boolean`

 | \- |
| 

`tags?`

 | 

`TagsFilter`

 | \- |

Single FilterMultiple Filters

```
// Single filter
const count = await novu.notifications.count({
  read: false,
  seen: false,
  archived: false,
  severity: SeverityLevelEnum.HIGH,
   // data attributes
  data: {
    type: 'login',
  },
});
```

#### [read](https://docs.novu.co/#read)

Marks a notification as read.

```
await novu.notifications.read({ notificationId: 'NOTIFICATION_ID' });
```

#### [unread](https://docs.novu.co/#unread)

Marks a notification as unread.

```
await novu.notifications.unread({ notificationId: 'NOTIFICATION_ID' });
```

#### [seen](https://docs.novu.co/#seen)

Marks a notification as seen.

```
await novu.notifications.seen({ notificationId: 'NOTIFICATION_ID' });
```

**Seen vs Read**: Notifications can be "seen" (automatically tracked when visible) or "read" (explicitly marked by user interaction). The Inbox component automatically marks notifications as seen when they're visible for 1+ seconds using the browser's IntersectionObserver API. This automatic tracking batches requests for performance and works seamlessly with infinite scroll and pagination, while read status requires explicit user action.

**Why no `unseen` method?** Unlike `read`/`unread` which can be toggled, `seen` is designed as a one-way operation. Once a notification has been seen by a user, it remains seen. This reflects the natural user experience where visibility cannot be "undone". Use filtering with `seen: false` to get unseen notifications instead.

#### [seenAll](https://docs.novu.co/#seenall)

Marks notifications as seen. You can filter them by notification IDs, tags, or data attributes.

```
// Mark specific notifications as seen
await novu.notifications.seenAll({
  notificationIds: ['NOTIFICATION_ID_1', 'NOTIFICATION_ID_2']
});
 
// Mark notifications by tags as seen
await novu.notifications.seenAll({
  tags: ['tag1', 'tag2']
});
 
// Mark notifications by data as seen
await novu.notifications.seenAll({
  data: { type: 'login' }
});
 
// Mark all notifications as seen (no filters)
await novu.notifications.seenAll();
```

#### [archive](https://docs.novu.co/#archive)

Archives a notification.

```
await novu.notifications.archive({ notificationId: 'NOTIFICATION_ID' });
```

#### [unarchive](https://docs.novu.co/#unarchive)

Unarchives a notification.

```
await novu.notifications.unarchive({ notificationId: 'NOTIFICATION_ID' });
```

#### [readAll](https://docs.novu.co/#readall)

Marks all notifications as read. You can filter them by tags.

```
await novu.notifications.readAll({
  tags: ['tag1', 'tag2'],
  // data attributes
  data: {
    type: 'login',
  },
});
```

#### [archiveAll](https://docs.novu.co/#archiveall)

Archives all notifications. You can filter them by tags.

```
await novu.notifications.archiveAll({
  tags: ['tag1', 'tag2'],
  // data attributes
  data: {
    type: 'login',
  },
});
```

#### [archiveAllRead](https://docs.novu.co/#archiveallread)

Archives all read notifications. You can filter them by tags.

```
await novu.notifications.archiveAllRead({
  tags: ['tag1', 'tag2'],
  // data attributes
  data: {
    type: 'login',
  },
});
```

#### [delete](https://docs.novu.co/#delete)

Deletes a single notification permanently.

```
await novu.notifications.delete({ notificationId: 'NOTIFICATION_ID' });
```

#### [deleteAll](https://docs.novu.co/#deleteall)

Deletes multiple notifications permanently. You can filter them by tags or data attributes.

```
// Delete specific notifications by tags
await novu.notifications.deleteAll({
  tags: ['tag1', 'tag2'],
});
 
// Delete notifications by data attributes
await novu.notifications.deleteAll({
  data: { type: 'login' },
});
 
// Delete all notifications (no filters)
await novu.notifications.deleteAll();
```

#### [snooze](https://docs.novu.co/#snooze)

Snoozes a notification for a specified duration. Here `snoozeUntil` is **ISO 8601** formatted string timestamp, representing the date and time the notification is un-snoozed, it should be a future date and time.

```
await novu.notifications.snooze({ notificationId: 'NOTIFICATION_ID', snoozeUntil: '2025-01-01T00:00:00.000Z' });
```

#### [unsnooze](https://docs.novu.co/#unsnooze)

Unsnoozes a notification.

```
await novu.notifications.unsnooze({ notificationId: 'NOTIFICATION_ID' });
```

#### [completePrimary](https://docs.novu.co/#completeprimary)

Marks primary action of a notification as completed.

```
await novu.notifications.completePrimary({ notificationId: 'NOTIFICATION_ID' });
```

#### [completeSecondary](https://docs.novu.co/#completesecondary)

Marks secondary action of a notification as completed.

```
await novu.notifications.completeSecondary({ notificationId: 'NOTIFICATION_ID' });
```

#### [revertPrimary](https://docs.novu.co/#revertprimary)

Reverts primary action of a notification to pending.

```
await novu.notifications.revertPrimary({ notificationId: 'NOTIFICATION_ID' });
```

#### [revertSecondary](https://docs.novu.co/#revertsecondary)

Reverts secondary action of a notification to pending.

```
await novu.notifications.revertSecondary({ notificationId: 'NOTIFICATION_ID' });
```

## [Notification](https://docs.novu.co/#notification)

Individual notification instances have their own methods for marking as seen, read, archived, etc. These methods are available directly on each notification object.

### [Methods](https://docs.novu.co/#methods-1)

- `seen()` - Marks the notification as seen
- `read()` - Marks the notification as read
- `unread()` - Marks the notification as unread
- `archive()` - Archives the notification
- `unarchive()` - Unarchives the notification
- `delete()` - Deletes the notification
- `snooze()` - Snoozes the notification
- `unsnooze()` - Unsnoozes the notification
- `completePrimary()` - Marks primary action as completed
- `completeSecondary()` - Marks secondary action as completed
- `revertPrimary()` - Reverts primary action to pending
- `revertSecondary()` - Reverts secondary action to pending

The `seen()` method is only available on individual notification instances, not on the `novu.notifications` object. Use `novu.notifications.seenAll()` for bulk operations.

### [Usage](https://docs.novu.co/#usage-1)

```
// Get notifications
const { data: notifications } = await novu.notifications.list();
 
// Mark a specific notification as seen using the instance method
await notifications[0].seen();
 
// Mark as read using the instance method
await notifications[0].read();
 
// Archive using the instance method
await notifications[0].archive();
 
// Snooze using the instance method
await notifications[0].snooze('2025-01-01T00:00:00.000Z');
 
// Unsnooze using the instance method
await notifications[0].unsnooze();
 
// Delete using the instance method
await notifications[0].delete();
```

## [Preferences](https://docs.novu.co/#preferences)

### [Methods](https://docs.novu.co/#methods-2)

#### [list](https://docs.novu.co/#list-1)

Fetches the subscriber's notification preferences.

```
const { data: preferences } = await novu.preferences.list();
```

#### [update](https://docs.novu.co/#update)

`update` method is available with each preference object.

```
const { data: preferences } = await novu.preferences.list();
 
// Update a single preference
 
await preferences[0].update({ channels: { email: false, sms: true } });
```

The response will be of type:

| Prop | Type | Default |
| --- | --- | --- |
| 
`schedule?`

 | 

`{ isEnabled: boolean; weeklySchedule?: WeeklySchedule | undefined; }`

 | \- |
| 

`workflow?`

 | 

`Workflow`

 | \- |
| 

`overrides?`

 | 

`IPreferenceOverride[]`

 | \- |
| 

`channels?`

 | 

`ChannelPreference`

 | \- |
| 

`subscriptionId?`

 | 

`string`

 | \- |
| 

`condition?`

 | 

`RulesLogic`

 | \- |
| 

`enabled?`

 | 

`boolean`

 | \- |
| 

`level?`

 | 

`PreferenceLevel`

 | \- |

#### [bulkUpdate](https://docs.novu.co/#bulkupdate)

Updates multiple workflow's channel preferences at once.

```
await novu.preferences.bulkUpdate([
  { workflowId: 'workflow_id', channels: { email: false, sms: true } },
  { workflowId: 'workflow_id_2', channels: { email: true, sms: false, in_app: true } },
]);
```

### [Schedule](https://docs.novu.co/#schedule)

The `preferences.schedule` submodule lets you fetch and update a subscriber’s delivery schedule.

#### [get](https://docs.novu.co/#get)

Fetches the subscriber’s schedule.

```
const novu = new Novu(...);
 
const { data: { schedule } } = await novu.preferences.schedule.get();
```

#### [update](https://docs.novu.co/#update-1)

Updates the subscriber’s schedule. You can update the entire weekly schedule or only specific days.

```
const novu = new Novu(...);
 
// Update schedule via preferences
const { data: { schedule } } = await novu.preferences.schedule.update({
  weeklySchedule: {
    monday: {
      isEnabled: true,
      hours: [{ start: '09:00 AM', end: '05:00 PM' }],
    },
  },
});
 
// Or update directly from a Schedule instance
const { data: { schedule: updatedSchedule } } =
  await schedule.update({ isEnabled: false });
```

### [Schedule Class](https://docs.novu.co/#schedule-class)

A `Schedule` instance is returned when fetching or updating a schedule.

| Prop | Type | Default |
| --- | --- | --- |
| 
`update?`

 | 

`(args: UpdateScheduleArgs) => Result<Schedule, NovuError>`

 | \- |
| 

`weeklySchedule?`

 | 

`WeeklySchedule | undefined`

 | \- |
| 

`isEnabled?`

 | 

`boolean | undefined`

 | \- |

## [Events](https://docs.novu.co/#events)

The Novu client provides real-time event handling through WebSocket connections.

### [Available Events](https://docs.novu.co/#available-events)

- `notifications.notification_received`: Triggered when a new notification is received.
- `notifications.unread_count_changed`: Triggered when the unread count changes.
- `notifications.unseen_count_changed`: Triggered when the unseen count changes.
- `preferences.schedule.get.pending`: Triggered when fetching a schedule starts.
- `preferences.schedule.get.resolved`: Triggered when fetching a schedule succeeds.
- `preferences.schedule.update.pending`: Triggered when updating a schedule starts.
- `preferences.schedule.update.resolved`: Triggered when updating a schedule succeeds.
- `subscriptions.list.pending`: Triggered when loading subscriptions starts.
- `subscriptions.list.resolved`: Triggered when subscriptions are loaded.
- `subscriptions.get.pending`: Triggered when fetching a subscription starts.
- `subscriptions.get.resolved`: Triggered when a specific subscription is fetched.
- `subscriptions.create.pending`: Triggered when creating a subscription starts.
- `subscriptions.create.resolved`: Triggered when a subscription is created.
- `subscriptions.update.pending`: Triggered when updating a subscription starts.
- `subscriptions.update.resolved`: Triggered when a subscription is updated.
- `subscriptions.delete.pending`: Triggered when deleting a subscription start.
- `subscriptions.delete.resolved`: Triggered when a subscription is deleted.

### [Usage](https://docs.novu.co/#usage-2)

```
 
novu.on('session.initialize.resolved', ({ data }: { data: Session }) => {
  console.log(data.unreadCount.total);
  console.log(data.unreadCount.severity[SeverityLevelEnum.HIGH]);
});
 
novu.on('notifications.notification_received', (data) => {
  console.log('New notification:', data);
});
 
novu.on('notifications.unread_count_changed', (data) => {
  console.log('Unread count:', data);
});
 
novu.on('notifications.unseen_count_changed', (data) => {
  console.log('Unseen count:', data);
});
 
novu.on('preferences.schedule.update.resolved', ({ data }) => {
  console.log('Schedule updated:', data.schedule);
});
 
novu.on('subscriptions.create.resolved', ({ data: subscription }) => {
  console.log('New subscription created:', subscription.identifier);
});
 
novu.on('subscriptions.list.resolved', ({ data: subscriptions }) => {
  console.log('Loaded subscriptions:', subscriptions.length);
});
```

## [Subscriptions](https://docs.novu.co/#subscriptions)

The Subscriptions module lets you manage a subscriber’s subscriptions to topics. A subscription represents a subscriber’s opt-in to a topic and defines which workflows within that topic they receive notifications from.

It supports creating conditional subscriptions where users only receive notifications if specific criteria (payload filters) are met.

Manage subscriptions at two levels:

- Module-level methods on `novu.subscriptions`
- Instance-level methods on a `TopicSubscription` object

### [Methods](https://docs.novu.co/#methods-3)

#### [List](https://docs.novu.co/#list-2)

Fetches all subscriptions for a specific topic.

| Prop | Type | Default |
| --- | --- | --- |
| 
`topicKey?`

 | 

`string`

 | \- |

```
const { data: subscriptions } = await novu.subscriptions.list({
  topicKey: 'product-updates'
});
```

The response items are `TopicSubscription` instances.

#### [get](https://docs.novu.co/#get-1)

Fetch a single subscription by topic and identifier.

| Prop | Type | Default |
| --- | --- | --- |
| 
`tags?`

 | 

`string[]`

 | \- |
| 

`workflowIds?`

 | 

`string[]`

 | \- |
| 

`identifier?`

 | 

`string`

 | \- |
| 

`topicKey?`

 | 

`string`

 | \- |

```
const { data: subscription } = await novu.subscriptions.get({
  topicKey: 'product-updates',
  identifier: 'user-product-alert'
});
```

#### [create](https://docs.novu.co/#create)

Create a new subscription to a topic. You can pass a list of preferences to filter specific workflows or tags.

| Prop | Type | Default |
| --- | --- | --- |
| 
`preferences?`

 | 

`PreferenceFilter[]`

 | \- |
| 

`name?`

 | 

`string`

 | \- |
| 

`identifier?`

 | 

`string`

 | \- |
| 

`topicName?`

 | 

`string`

 | \- |
| 

`topicKey?`

 | 

`string`

 | \- |

```
const { data: subscription } = await novu.subscriptions.create({
  topicKey: 'product-updates',
  identifier: 'user-product-alert',
  preferences: [
    {
      // Simple workflow toggle
      workflowId: 'issue-created',
      enabled: true
    },
    {
      // Conditional filter
      workflowId: 'price-alert',
      condition: {
        field: 'price',
        operation: 'below',
        value: 100
      }
    }
  ]
});
```

#### [update](https://docs.novu.co/#update-2)

Updates an existing subscription.

| Prop | Type | Default |
| --- | --- | --- |
| 
`preferences?`

 | 

`PreferenceFilter[]`

 | \- |
| 

`name?`

 | 

`string`

 | \- |

```
const { data: subscription } = await novu.subscriptions.update({
  topicKey: 'product-updates',
  subscriptionId: 'subscription-id-123',
  preferences: [...]
});
```

#### [delete](https://docs.novu.co/#delete-1)

Delete a subscription by topic and subscription ID.

```
await novu.subscriptions.delete({
  topicKey: 'product-updates',
  subscriptionId: 'product-updates-subscription',
});
```

### [TopicSubscription](https://docs.novu.co/#topicsubscription)

A `TopicSubscription` instance represents a single subscription and provides methods for updating or deleting it, as well as managing its preferences.

| Prop | Type | Default |
| --- | --- | --- |
| 
`delete?`

 | 

`() => Result<void, NovuError>`

 | \- |
| 

`bulkUpdatePreferences?`

 | 

`{ (args: BaseSubscriptionPreferenceArgs[]): Result<SubscriptionPreference[], NovuError>; (args: InstanceSubscriptionPreferenceArgs[]): Result<...>; }`

 | \- |
| 

`updatePreference?`

 | 

`{ (args: BaseSubscriptionPreferenceArgs): Result<SubscriptionPreference, NovuError>; (args: InstanceSubscriptionPreferenceArgs): Result<...>; }`

 | \- |
| 

`update?`

 | 

`{ (args: BaseUpdateSubscriptionArgs): Result<TopicSubscription, NovuError>; (args: InstanceUpdateSubscriptionArgs): Result<...>; }`

 | \- |
| 

`preferences?`

 | 

`SubscriptionPreference[]`

 | \- |
| 

`topicKey?`

 | 

`string`

 | \- |
| 

`identifier?`

 | 

`string`

 | \- |
| 

`id?`

 | 

`string`

 | \- |

#### [Update a subscription](https://docs.novu.co/#update-a-subscription)

Update subscription metadata or replace its preferences list. Use this method when updating the subscription as a whole. For granular preference updates, use preference-level methods instead.

```
const { data: subscription } =
  await novu.subscriptions.get({
    topicKey: 'product-updates',
    identifier: 'product-updates-subscription',
  });
 
await subscription.update({
  preferences: [
    {
      workflowId: 'workflow-identifier',
      enabled: true,
    },
  ],
});
```

#### [Update SubscriptionPreference](https://docs.novu.co/#update-subscriptionpreference)

Each subscription contains a list of `SubscriptionPreference` objects that you can update individually.

| Prop | Type | Default |
| --- | --- | --- |
| 
`update?`

 | 

`(args: { value: RulesLogic; }) => Result<SubscriptionPreference, NovuError>`

 | \- |
| 

`condition?`

 | 

`RulesLogic`

 | \- |
| 

`enabled?`

 | 

`boolean`

 | \- |
| 

`workflow?`

 | 

`Workflow`

 | \- |
| 

`subscriptionId?`

 | 

`string`

 | \- |

```
subscription.preferences.map((preference) => {
  const onChange = (value: boolean) => {
    preference.update({ value });
  };
 
  return <Checkbox onChange={onChange} />;
});
```

#### [Delete a subscription (instance method)](https://docs.novu.co/#delete-a-subscription-instance-method)

```
await subscription.delete();
```

## [Types](https://docs.novu.co/#types)

### [Notification](https://docs.novu.co/#notification-1)

| Prop | Type | Default |
| --- | --- | --- |
| 
`off?`

 | 

`<Key extends EventNames>(eventName: Key, listener: EventHandler<Events[Key]>) => void`

 | \- |
| 

`on?`

 | 

`<Key extends EventNames>(eventName: Key, listener: EventHandler<Events[Key]>) => () => void`

 | \- |
| 

`revertSecondary?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`revertPrimary?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`completeSecondary?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`completePrimary?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`unsnooze?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`snooze?`

 | 

`(snoozeUntil: string) => Result<Notification, NovuError>`

 | \- |
| 

`delete?`

 | 

`() => Result<void, NovuError>`

 | \- |
| 

`unarchive?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`archive?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`seen?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`unread?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`read?`

 | 

`() => Result<Notification, NovuError>`

 | \- |
| 

`severity?`

 | 

`SeverityLevelEnum`

 | \- |
| 

`workflow?`

 | 

`Workflow`

 | \- |
| 

`data?`

 | 

`NotificationData`

 | \- |
| 

`redirect?`

 | 

`Redirect | undefined`

 | \- |
| 

`tags?`

 | 

`string[] | undefined`

 | \- |
| 

`channelType?`

 | 

`ChannelType`

 | \- |
| 

`secondaryAction?`

 | 

`Action`

 | \- |
| 

`primaryAction?`

 | 

`Action`

 | \- |
| 

`avatar?`

 | 

`string`

 | \- |
| 

`archivedAt?`

 | 

`string | null`

 | \- |
| 

`firstSeenAt?`

 | 

`string | null`

 | \- |
| 

`readAt?`

 | 

`string | null`

 | \- |
| 

`createdAt?`

 | 

`string`

 | \- |
| 

`deliveredAt?`

 | 

`string[]`

 | \- |
| 

`snoozedUntil?`

 | 

`string | null`

 | \- |
| 

`isSnoozed?`

 | 

`boolean`

 | \- |
| 

`isArchived?`

 | 

`boolean`

 | \- |
| 

`isSeen?`

 | 

`boolean`

 | \- |
| 

`isRead?`

 | 

`boolean`

 | \- |
| 

`to?`

 | 

`Subscriber`

 | \- |
| 

`body?`

 | 

`string`

 | \- |
| 

`subject?`

 | 

`string`

 | \- |
| 

`transactionId?`

 | 

`string`

 | \- |
| 

`id?`

 | 

`string`

 | \- |

### [Subscriber](https://docs.novu.co/#subscriber)

| Prop | Type | Default |
| --- | --- | --- |
| 
`timezone?`

 | 

`string`

 | \- |
| 

`data?`

 | 

`Record<string, unknown>`

 | \- |
| 

`locale?`

 | 

`string`

 | \- |
| 

`avatar?`

 | 

`string`

 | \- |
| 

`phone?`

 | 

`string`

 | \- |
| 

`email?`

 | 

`string`

 | \- |
| 

`lastName?`

 | 

`string`

 | \- |
| 

`firstName?`

 | 

`string`

 | \- |
| 

`subscriberId?`

 | 

`string`

 | \- |
| 

`id?`

 | 

`string`

 | \- |

[Changelog\\ \\ Changelog for the @novu/react package](https://docs.novu.co/platform/sdks/react/changelog) [Quickstart\\ \\ Learn how to add Novu powered Inbox to your React Native app](https://docs.novu.co/platform/sdks/react-native)

### On this page

[Novu](https://docs.novu.co/#novu) [Constructor Options](https://docs.novu.co/#constructor-options) [Usage](https://docs.novu.co/#usage) [Notifications](https://docs.novu.co/#notifications) [Methods](https://docs.novu.co/#methods) [list](https://docs.novu.co/#list) [count](https://docs.novu.co/#count) [read](https://docs.novu.co/#read) [unread](https://docs.novu.co/#unread) [seen](https://docs.novu.co/#seen) [seenAll](https://docs.novu.co/#seenall) [archive](https://docs.novu.co/#archive) [unarchive](https://docs.novu.co/#unarchive) [readAll](https://docs.novu.co/#readall) [archiveAll](https://docs.novu.co/#archiveall) [archiveAllRead](https://docs.novu.co/#archiveallread) [delete](https://docs.novu.co/#delete) [deleteAll](https://docs.novu.co/#deleteall) [snooze](https://docs.novu.co/#snooze) [unsnooze](https://docs.novu.co/#unsnooze) [completePrimary](https://docs.novu.co/#completeprimary) [completeSecondary](https://docs.novu.co/#completesecondary) [revertPrimary](https://docs.novu.co/#revertprimary) [revertSecondary](https://docs.novu.co/#revertsecondary) [Notification](https://docs.novu.co/#notification) [Methods](https://docs.novu.co/#methods-1) [Usage](https://docs.novu.co/#usage-1) [Preferences](https://docs.novu.co/#preferences) [Methods](https://docs.novu.co/#methods-2) [list](https://docs.novu.co/#list-1) [update](https://docs.novu.co/#update) [bulkUpdate](https://docs.novu.co/#bulkupdate) [Schedule](https://docs.novu.co/#schedule) [get](https://docs.novu.co/#get) [update](https://docs.novu.co/#update-1) [Schedule Class](https://docs.novu.co/#schedule-class) [Events](https://docs.novu.co/#events) [Available Events](https://docs.novu.co/#available-events) [Usage](https://docs.novu.co/#usage-2) [Subscriptions](https://docs.novu.co/#subscriptions) [Methods](https://docs.novu.co/#methods-3) [List](https://docs.novu.co/#list-2) [get](https://docs.novu.co/#get-1) [create](https://docs.novu.co/#create) [update](https://docs.novu.co/#update-2) [delete](https://docs.novu.co/#delete-1) [TopicSubscription](https://docs.novu.co/#topicsubscription) [Update a subscription](https://docs.novu.co/#update-a-subscription) [Update SubscriptionPreference](https://docs.novu.co/#update-subscriptionpreference) [Delete a subscription (instance method)](https://docs.novu.co/#delete-a-subscription-instance-method) [Types](https://docs.novu.co/#types) [Notification](https://docs.novu.co/#notification-1) [Subscriber](https://docs.novu.co/#subscriber)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/javascript/index.mdx)Open in ChatGPTOpen in Claude