# Source: https://docs.novu.co/api-reference/payload-limits

# API Payload Limits

Understand payload size limits for Novu API requests and workflow triggers. Structure event payloads to avoid validation failures and rejected requests.

Payload size limits are an essential functionality for ensuring optimal performance and reliability of the system. They safeguard system resources by preventing oversized payloads from impacting API performance and ensure efficient processing of event triggers.

## [Payload size limit](https://docs.novu.co/#payload-size-limit)

All event trigger operations have a **512KB (524,288 bytes)** payload size limit. This limit applies to the following endpoints:

- **Trigger event** - Single event triggers
- **Bulk trigger event** - Batch event triggers
- **Broadcast event** - Events sent to all subscribers

Attachments are excluded from the payload size calculation and have a separate size limit.

## [What counts towards the limit](https://docs.novu.co/#what-counts-towards-the-limit)

The payload size limit includes:

- Event payload data
- Custom data and properties
- All other request body content

## [Error messages](https://docs.novu.co/#error-messages)

When your payload exceeds the 512KB limit, you'll receive an error response indicating the exact size and the limit exceeded.

### [Single event trigger](https://docs.novu.co/#single-event-trigger)

For single event triggers (`/events/trigger`), the error response will be:

```
{
  "statusCode": 413,
  "message": "Payload size (524342 bytes) exceeds maximum allowed size of 524288 bytes (512KB). Note: Attachments are excluded from this limit."
}
```

### [Bulk trigger event](https://docs.novu.co/#bulk-trigger-event)

For bulk event triggers (`/events/trigger/bulk`), the error response includes the index of the event that exceeded the limit:

```
{
  "statusCode": 413,
  "message": "Event at index 1 (workflow: \"workflow-name\") has payload size (524342 bytes) exceeds maximum allowed size of 524288 bytes (512KB). Note: Attachments are excluded from this limit."
}
```

When using bulk trigger, each event in the array is validated individually against the 512KB limit. Ensure that every event payload stays within the limit.

### [Broadcast event](https://docs.novu.co/#broadcast-event)

For broadcast events (`/events/trigger/broadcast`), the error response will be:

```
{
  "statusCode": 413,
  "message": "Payload size (524342 bytes) exceeds maximum allowed size of 524288 bytes (512KB). Note: Attachments are excluded from this limit."
}
```

## [Attachment size limit](https://docs.novu.co/#attachment-size-limit)

Email attachments have a separate size limit:

- **Total attachment size**: 20MB for all attachments included in an email. Attachments do not count towards the 512KB payload limit

For more information about sending email attachments, refer to the [Sending Attachments](https://docs.novu.co/platform/integrations/email#sending-attachments) documentation.

## [Related documentation](https://docs.novu.co/#related-documentation)

- [Rate Limiting](https://docs.novu.co/api-reference/rate-limiting) - Learn about API rate limits
- [Trigger Event](https://docs.novu.co/api-reference/events/trigger-event) - Single event trigger API
- [Bulk Trigger Event](https://docs.novu.co/api-reference/events/bulk-trigger-event) - Batch event trigger API
- [Broadcast Event](https://docs.novu.co/api-reference/events/broadcast-event-to-all) - Broadcast to all subscribers

[Idempotency\\ \\ Learn how to use idempotency keys to safely retry API requests without causing duplicate operations](https://docs.novu.co/api-reference/idempotency) [Trigger event POST\\ \\ Trigger event is the main (and only) way to send notifications to subscribers. The trigger identifier is used to match the particular workflow associated with it. Maximum number of recipients can be 100. Additional information can be passed according the body interface below. To prevent duplicate triggers, you can optionally pass a \*\*transactionId\*\* in the request body. If the same \*\*transactionId\*\* is used again, the trigger will be ignored. The retention period depends on your billing tier.](https://docs.novu.co/api-reference/events/trigger-event)

### On this page

[Payload size limit](https://docs.novu.co/#payload-size-limit) [What counts towards the limit](https://docs.novu.co/#what-counts-towards-the-limit) [Error messages](https://docs.novu.co/#error-messages) [Single event trigger](https://docs.novu.co/#single-event-trigger) [Bulk trigger event](https://docs.novu.co/#bulk-trigger-event) [Broadcast event](https://docs.novu.co/#broadcast-event) [Attachment size limit](https://docs.novu.co/#attachment-size-limit) [Related documentation](https://docs.novu.co/#related-documentation)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/payload-limits.mdx)Open in ChatGPTOpen in Claude