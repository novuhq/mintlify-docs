# Source: https://docs.novu.co/platform/concepts/subscribers

Core Concepts

# Subscribers

Learn what a subscriber is in Novu, how they’re identified, and how they fit into the notification system.

In Novu, a subscriber represents a user or system entity that is intended to receive notifications. Subscribers are central to Novu’s delivery model: workflows are triggered with one or more targeted subscribers, and all delivery logic, such as channel routing, preferences, and personalization is applied at the subscriber level.

## [How Novu identifies a subscriber](https://docs.novu.co/#how-novu-identifies-a-subscriber)

Each subscriber is uniquely identified in Novu by a `subscriberId`. This ID is defined by your application and serves as the reference point for all subscriber-related operations whether sending messages, retrieving preferences, or managing user data.

Unlike email addresses or phone numbers, which may change or be shared across users, the `subscriberId` must remain stable and unique within your system. It acts as the anchor that connects a subscriber’s profile, activity history, and delivery settings across all channels and workflows.

Use your application's internal user ID as the `subscriberId` to ensure consistency across your systems.

## [Subscriber metadata and profile structure](https://docs.novu.co/#subscriber-metadata-and-profile-structure)

A subscriber’s profile holds all relevant data Novu uses to personalize, deliver, and manage notifications. These fields can power dynamic content in your templates, define conditional logic in workflows, and control which channels a subscriber can receive notifications through.

All metadata tied to a subscriber is centralized and accessible via API or dashboard. This structure ensures that when notifications are triggered, Novu references the most up-to-date context for delivery and personalization.

These data includes:

### [User data](https://docs.novu.co/#user-data)

Data stored in the subscriber object that you can easily access in your notification templates. This contains basic info such as `email`, `phone`, `firstName`, `locale` and others. This data is fixed and structured.

### [Custom data](https://docs.novu.co/#custom-data)

Apart from the above fixed structured user data, any unstructured custom data such as user's `address`, `membershipLevel`, `preferredTopics`, or `companySize` can also be stored in the `data` field using key-value pairs.

### [Channel specific credentials](https://docs.novu.co/#channel-specific-credentials)

To deliver messages through push or chat-based channels, Novu also supports storing delivery credentials on the subscriber profile:

- `deviceTokens`: Used to target mobile devices via push notifications.
- `webhookUrl`: Used by chat providers such as, Slack, Discord to reach the subscriber.

These fields ensure Novu can deliver messages reliably to all supported destinations, even when the channel requires platform-specific configuration.

Each subscriber channel is limited to a maximum of **100 device tokens**. Requests that exceed this limit will be rejected. See [Platform Limits](https://docs.novu.co/platform/developer/limits) for details.

Learn more about subscriber attributes and schema in the [Subscribers API](https://docs.novu.co/api-reference/subscribers/subscriber-schema).

## [Subscriber creation in Novu](https://docs.novu.co/#subscriber-creation-in-novu)

Before you can send notifications, a subscriber must exist in Novu. Asides from manually creating a subscriber via the Novu dashboard, Novu supports multiple approaches to subscriber creation depending on your application’s architecture and user lifecycle.

### [Just in time](https://docs.novu.co/#just-in-time)

Novu allows you to create a subscriber automatically at the moment a notification is triggered. If the subscriber doesn't already exist, Novu uses the information provided in the workflow trigger to create the subscriber on the fly. If the subscriber exists, Novu updates the stored data with the latest values.

This approach is useful when:

- Your system does not store subscriber profiles ahead of time.
- Notifications are sent during real-time events like sign-ups or transactions.
- You want to keep the creation and delivery logic tightly coupled.

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ secretKey: "<YOUR_SECRET_KEY_HERE>", });
 
await novu.trigger({
  to: {
    subscriberId: "subscriber_unique_identifier",
    firstName: "Albert",
    lastName: "Einstein",
    email: "albert@einstein.com",
    phone: "+1234567890",
  },
  workflowId: "workflow_identifier",
});
```

### [Ahead of trigger](https://docs.novu.co/#ahead-of-trigger)

Alternatively, you can create and store subscriber profiles ahead of time — typically during onboarding, registration, or data sync events. This approach allows you to manage subscriber preferences, enrich profiles, and inspect delivery readiness before any notification is triggered.

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ secretKey: "<YOUR_SECRET_KEY_HERE>", });
 
await novu.subscribers.create({
  subscriberId: "subscriber_unique_identifier",
  firstName: "Albert",
  lastName: "Einstein",
  email: "albert@einstein.com",
  phone: "+1234567890",
  data: {
    address: "123 Main St, Anytown, USA",
    membershipLevel: "Gold",
    preferredTopics: ["News", "Sports"],
  },
});
```

This is recommended when:

- You want to decouple user creation from notification logic.
- You rely on persistent user data or prefer strict validation before delivery.
- You plan to use advanced segmentation or preference-based delivery.

### [Bulk Import](https://docs.novu.co/#bulk-import)

For scenarios like data migration, syncing large lists, or preloading subscribers, Novu supports bulk creation. This is especially useful when integrating with existing systems or importing subscriber data from external sources. Bulk create method supports creating up to 500 subscribers at once.

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ secretKey: "<YOUR_SECRET_KEY_HERE>", });
 
await novu.subscribers.createBulk({
  subscribers: [
    {
      subscriberId: "subscriber_unique_identifier_1",
      firstName: "Albert",
      lastName: "Einstein",
      email: "albert@einstein.com",
      phone: "+1234567890",
    },
    {
      subscriberId: "subscriber_unique_identifier_2",
      firstName: "Isaac",
      lastName: "Newton",
      email: "isaac@newton.com",
      phone: "+1234567891",
    },
  ],
});
```

## [Where to manage subscriber data](https://docs.novu.co/#where-to-manage-subscriber-data)

Subscriber data in Novu can be managed from the Novu dashboard or using the [Subscribers API](https://docs.novu.co/api-reference/subscribers/subscriber-schema). Both offer full access to view, update, and organize subscriber profiles, but they serve different use cases depending on your requirements.

### [Dashboard](https://docs.novu.co/#dashboard)

The Novu dashboard provides a visual interface for exploring and editing subscriber data. It’s useful for:

- Searching and filtering subscribers by ID, email, phone and name.
- Inspecting user profiles, including structured fields, custom data, topic subscriptions and channel preferences.
- Performing manual updates or troubleshooting delivery issues

This is ideal for non technical team members responsible for managing subscribers or teams that want to audit or manage subscriber data without relying on code.

### [API](https://docs.novu.co/#api)

For programmatic control, the Novu API offers endpoints to create, update, delete, and retrieve subscriber records at scale. It supports:

- Automated onboarding or sync processes
- Bulk operations such as imports or exports
- Integration with external systems like CRMs or identity platforms

Use the API when managing subscribers is part of your backend workflows or when changes need to happen dynamically based on user actions.

## [Subscriber preferences and personalization](https://docs.novu.co/#subscriber-preferences-and-personalization)

Novu allows each subscriber to define how they want to receive notifications. These preferences influence both the delivery channels and the types of messages a subscriber will receive.

### [Global preferences](https://docs.novu.co/#global-preferences)

Subscribers can configure preferences that apply across all workflows. These include:

- Opting in or out of specific channels, for example, email, SMS, push, or in-app
- Disabling notifications altogether

These global settings act as a default and are respected unless explicitly overridden in specific workflows.

### [Subscriber workflow specific preferences](https://docs.novu.co/#subscriber-workflow-specific-preferences)

In some cases, a subscriber may want to receive certain notifications but only through specific channels. Novu supports fine-grained overrides at the workflow level. This allows you to:

- Adjust channel preferences per notification type
- Honor granular user choices while maintaining global defaults

### [Template personalization](https://docs.novu.co/#template-personalization)

Subscriber data, both structured fields such as `firstName`, `email` and custom data can be used to personalize templates. This enables dynamic content such as:

- Greeting users by name
- Including location-based content
- Adjusting language or tone based on locale or membership level

Subscriber preferences and metadata personalization ensure that each subscriber receives relevant, well-targeted messages through the channels they care about.

### [Subscriber API reference](https://docs.novu.co/#subscriber-api-reference)

[**Create a subscriber API**\\ \\ Create a new subscriber in Novu](https://docs.novu.co/api-reference/subscribers/create-a-subscriber) [**Update a subscriber API**\\ \\ Update subscriber attributes for an existing subscriber](https://docs.novu.co/api-reference/subscribers/update-a-subscriber) [**Bulk create subscribers API**\\ \\ Create bulk subscribers in Novu to migrate large number of users](https://docs.novu.co/api-reference/subscribers/bulk-create-subscribers) [**Retrieve subscriber subscriptions API**\\ \\ Retrieve all topics a subscriber is subscribed to](https://docs.novu.co/api-reference/subscribers/retrieve-subscriber-subscriptions) [**Update subscriber credentials API**\\ \\ Update chat and push channel credentials for a single subscriber](https://docs.novu.co/api-reference/subscribers/update-provider-credentials) [**Update subscriber preferences API**\\ \\ Update channel preferences for a single subscriber](https://docs.novu.co/api-reference/subscribers/update-subscriber-preferences)

## [Frequently asked questions](https://docs.novu.co/#frequently-asked-questions)

These are some of the most frequently asked questions about subscribers in Novu.

### [Can two subscribers have the same email address?](https://docs.novu.co/#can-two-subscribers-have-the-same-email-address)

Yes, two subscribers can have the same email address, phone number, or any other attributes. However, each subscriber must have a unique subscriberId.

### [Do I have to use subscriberId as same as the system userId?](https://docs.novu.co/#do-i-have-to-use-subscriberid-as-same-as-the-system-userid)

No, you don't need to use the same subscriberId as the system userId. You can use any unique ID as subscriberId. Novu recommends using userId as subscriberId to avoid any confusion. Some of our customers use a pattern like `auth0|userId` as a value for `subscriberId`.

### [Can a notification be sent without adding a subscriber?](https://docs.novu.co/#can-a-notification-be-sent-without-adding-a-subscriber)

No, a notification cannot be sent without adding a subscriber. A subscriber is an entity to which notification messages are sent. You must add a subscriber to Novu before triggering the workflow.

### [How do I migrate millions of users to Novu?](https://docs.novu.co/#how-do-i-migrate-millions-of-users-to-novu)

To migrate millions of users to Novu, use the [Bulk Create Subscribers](https://docs.novu.co/api-reference/subscribers/bulk-create-subscribers) API endpoint. This endpoint allows you to create multiple subscribers in bulk.

### [Can subscriber credentials for chat and push channels be added when creating a new subscriber?](https://docs.novu.co/#can-subscriber-credentials-for-chat-and-push-channels-be-added-when-creating-a-new-subscriber)

Subscriber credentials for Push and Chat channel providers can be added while creating a new subscriber using the `channels` field in the [create subscriber](https://docs.novu.co/api-reference/subscribers/create-a-subscriber) request payload.

[Workflows\\ \\ Learn what workflows are and how they work in Novu.](https://docs.novu.co/platform/concepts/workflows) [Topics\\ \\ Learn how topics work in Novu and how they help you organize and target groups of subscribers efficiently.](https://docs.novu.co/platform/concepts/topics)

### On this page

[How Novu identifies a subscriber](https://docs.novu.co/#how-novu-identifies-a-subscriber) [Subscriber metadata and profile structure](https://docs.novu.co/#subscriber-metadata-and-profile-structure) [User data](https://docs.novu.co/#user-data) [Custom data](https://docs.novu.co/#custom-data) [Channel specific credentials](https://docs.novu.co/#channel-specific-credentials) [Subscriber creation in Novu](https://docs.novu.co/#subscriber-creation-in-novu) [Just in time](https://docs.novu.co/#just-in-time) [Ahead of trigger](https://docs.novu.co/#ahead-of-trigger) [Bulk Import](https://docs.novu.co/#bulk-import) [Where to manage subscriber data](https://docs.novu.co/#where-to-manage-subscriber-data) [Dashboard](https://docs.novu.co/#dashboard) [API](https://docs.novu.co/#api) [Subscriber preferences and personalization](https://docs.novu.co/#subscriber-preferences-and-personalization) [Global preferences](https://docs.novu.co/#global-preferences) [Subscriber workflow specific preferences](https://docs.novu.co/#subscriber-workflow-specific-preferences) [Template personalization](https://docs.novu.co/#template-personalization) [Subscriber API reference](https://docs.novu.co/#subscriber-api-reference) [Frequently asked questions](https://docs.novu.co/#frequently-asked-questions) [Can two subscribers have the same email address?](https://docs.novu.co/#can-two-subscribers-have-the-same-email-address) [Do I have to use subscriberId as same as the system userId?](https://docs.novu.co/#do-i-have-to-use-subscriberid-as-same-as-the-system-userid) [Can a notification be sent without adding a subscriber?](https://docs.novu.co/#can-a-notification-be-sent-without-adding-a-subscriber) [How do I migrate millions of users to Novu?](https://docs.novu.co/#how-do-i-migrate-millions-of-users-to-novu) [Can subscriber credentials for chat and push channels be added when creating a new subscriber?](https://docs.novu.co/#can-subscriber-credentials-for-chat-and-push-channels-be-added-when-creating-a-new-subscriber)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/concepts/subscribers.mdx)Open in ChatGPTOpen in Claude