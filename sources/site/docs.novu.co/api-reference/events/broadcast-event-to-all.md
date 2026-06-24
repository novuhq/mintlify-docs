# Source: https://docs.novu.co/api-reference/events/broadcast-event-to-all

# Broadcast event to all

Trigger a broadcast event to all existing subscribers, could be used to send announcements, etc. In the future could be used to trigger events to a subset of subscribers based on defined filters.

POST

/`v1`/`events`/`trigger`/`broadcast`

Send

Server URL

Headers

Body

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Request Body](https://docs.novu.co/#request-body)

`application/json`Required

`name`Requiredstring

The trigger identifier associated for the template you wish to send. This identifier can be found on the template page.

`payload`Requiredobject

The payload object is used to pass additional information that could be used to render the template, or perform routing rules based on it. For In-App channel, payload data are also available in

Show Attributes

`overrides`object

This could be used to override provider specific configurations

Show Attributes

`transactionId`string

A unique identifier for this transaction, we will generated a UUID if not provided.

`actor`string | object

It is used to display the Avatar of the provided actor's subscriber id or actor object. If a new actor object is provided, we will create a new subscriber in our system

Show Attributes

`tenant`string | object

It is used to specify a tenant context during trigger event. If a new tenant object is provided, we will create a new tenant.

Show Attributes

`context`object

Show Attributes

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200201400401403404405409413414415422429500503

OK

`acknowledged`Requiredboolean

Indicates whether the trigger was acknowledged or not

`status`Requiredstring

Status of the trigger

Value in: `"error" | "trigger_not_active" | "no_workflow_active_steps_defined" | "no_workflow_steps_defined" | "processed" | "no_tenant_found" | "invalid_recipients"`

`error`array<string>

In case of an error, this field will contain the error message(s)

@minItems 0

`transactionId`string

The returned transaction ID of the trigger

`activityFeedLink`string

Link to the activity feed for this trigger event

`jobData`object

Show Attributes

```
export interface Response {
  /**
   * Indicates whether the trigger was acknowledged or not
   */
  acknowledged: boolean;
  /**
   * Status of the trigger
   */
  status:
    | "error"
    | "trigger_not_active"
    | "no_workflow_active_steps_defined"
    | "no_workflow_steps_defined"
    | "processed"
    | "no_tenant_found"
    | "invalid_recipients";
  /**
   * In case of an error, this field will contain the error message(s)
   */
  error?: string[];
  /**
   * The returned transaction ID of the trigger
   */
  transactionId?: string;
  /**
   * Link to the activity feed for this trigger event
   */
  activityFeedLink?: string;
  jobData?: {};
}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X POST "https://api.novu.co/v1/events/trigger/broadcast" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "string",
    "payload": {
      "comment_id": "string",
      "post": {
        "text": "string"
      }
    },
    "overrides": {
      "fcm": {
        "data": {
          "key": "value"
        }
      }
    },
    "transactionId": "string",
    "actor": "string",
    "tenant": "string",
    "context": {
      "property1": "org-acme",
      "property2": "org-acme"
    }
  }'
```

200201400401403404405409413414415422429500503

```
{
  "acknowledged": true,
  "status": "error",
  "error": [
    "string"
  ],
  "transactionId": "string",
  "activityFeedLink": "string",
  "jobData": {}
}
```

[Bulk trigger event POST\\ \\ Using this endpoint you can trigger multiple events at once, to avoid multiple calls to the API. The bulk API is limited to 100 events per request.](https://docs.novu.co/api-reference/events/bulk-trigger-event) [Cancel triggered event DELETE\\ \\ Using a previously generated transactionId during the event trigger, will cancel any active or pending workflows. This is useful to cancel active digests, delays etc...](https://docs.novu.co/api-reference/events/cancel-triggered-event)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/events/broadcast-event-to-all.mdx)Open in ChatGPTOpen in Claude