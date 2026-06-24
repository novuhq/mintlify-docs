# Source: https://docs.novu.co/platform/developer/webhooks/event-types

[Webhooks](https://docs.novu.co/platform/developer/webhooks)

# Webhooks event types

Learn more about the types of events that Novu sends webhook events for.

Novu supports the following webhook event types:

- **Message events**: Events about message delivery status changes.
- **Preference event**: Event about subscriber preference changes.
- **Workflow events**: Events about workflow creation, updates, and deletions.

Each event includes detailed information about the affected resource and the changes that occurred.

## [Message events](https://docs.novu.co/#message-events)

- `message.archived`: This webhook is triggered when a subscriber archives a message. The payload contains the details of the event.
- `message.delivered`: This webhook is triggered when a message delivery provider acknowledged the message delivery to the end receiving client. The payload contains the details of the event.
- `message.failed`: This webhook is triggered when Novu tries to send the message to the delivery provider and it got failed. The payload contains the details of the event.
- `message.read`: This webhook is triggered when a message has been read by the subscriber. The payload contains the details of the event.
- `message.seen`: This webhook is triggered when a subscriber opens a message. The payload contains the details of the event.
- `message.sent`: This webhook is triggered when Novu sends the message to the delivery provider. The payload contains the details of the event.
- `message.snoozed`: This webhook is triggered when a message is snoozed by the subscriber. The payload contains the details of the event.
- `message.unarchived`: This webhook is triggered when an archived message is unarchived. The payload contains the details of the event.
- `message.unread`: This webhook is triggered when a message is unread or marked as unread by the subscriber. The payload contains the details of the event.
- `message.unsnoozed`: This webhook is triggered when a message is unsnoozed by a subscriber. The payload contains the details of the event.

## [Preference event](https://docs.novu.co/#preference-event)

- `preference.updated`: This webhook is triggered when a subscriber preference is updated. The payload contains the details of the event.

## [Workflow events](https://docs.novu.co/#workflow-events)

- `workflow.created`: This webhook is triggered when a workflow is created. The payload contains the details of the event.
- `workflow.deleted`: This webhook is triggered when a workflow is deleted. The payload contains the details of the event.
- `workflow.published`: This webhook is triggered when a `workflow` event occurs, that is when a workflow is synced from dev to prod environment. The payload contains the details of the event.
- `workflow.updated`: This webhook is triggered when a workflow is updated. The payload contains the details of the event.

[Webhooks\\ \\ Configure webhook endpoints to receive real-time event notifications from Novu for workflow updates and message delivery.](https://docs.novu.co/platform/developer/webhooks) [Webhook connectors\\ \\ Send Novu webhook events directly to data warehouses, analytics databases, and AWS messaging services.](https://docs.novu.co/platform/developer/webhooks/connectors)

### On this page

[Message events](https://docs.novu.co/#message-events) [Preference event](https://docs.novu.co/#preference-event) [Workflow events](https://docs.novu.co/#workflow-events)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/developer/webhooks/event-types.mdx)Open in ChatGPTOpen in Claude