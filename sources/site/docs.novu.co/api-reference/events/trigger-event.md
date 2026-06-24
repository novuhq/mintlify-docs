# Source: https://docs.novu.co/api-reference/events/trigger-event

# Trigger event

Trigger event is the main (and only) way to send notifications to subscribers. The trigger identifier is used to match the particular workflow associated with it. Maximum number of recipients can be 100. Additional information can be passed according the body interface below. To prevent duplicate triggers, you can optionally pass a **transactionId** in the request body. If the same **transactionId** is used again, the trigger will be ignored. The retention period depends on your billing tier.

POST

/`v1`/`events`/`trigger`

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

The trigger identifier of the workflow you wish to send. This identifier can be found on the workflow page.

`payload`object

The payload object is used to pass additional custom information that could be used to render the workflow, or perform routing rules based on it. This data will also be available when fetching the notifications feed from the API to display certain parts of the UI.

Show Attributes

`overrides`object

This could be used to override provider specific configurations

`to`Requiredarray<object | object | string> | string | object | object

The recipients list of people who will receive the notification. Maximum number of recipients can be 100.

Object 1

Object 2

Object 3

`transactionId`string

A unique identifier for deduplication. If the same **transactionId** is sent again, the trigger is ignored. Useful to prevent duplicate notifications. The retention period depends on your billing tier.

`actor`string | object

It is used to display the Avatar of the provided actor's subscriber id or actor object. If a new actor object is provided, we will create a new subscriber in our system

Show Attributes

`tenant`string | object

It is used to specify a tenant context during trigger event. Existing tenants will be updated with the provided details.

Show Attributes

`context`object

Show Attributes

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

201400401403404405409413414415422429500503

Created

`acknowledged`Requiredboolean

Indicates whether the trigger was acknowledged or not

`status`Requiredstring

Status of the trigger

Value in: `"error" | "trigger_not_active" | "no_workflow_active_steps_defined" | "no_workflow_steps_defined" | "processed" | "no_tenant_found" | "invalid_recipients"`

`error`array<string>

In case of an error, this field will contain the error message(s)

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
curl -X POST "https://api.novu.co/v1/events/trigger" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "workflow_identifier",
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
    "to": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "avatar": "https://example.com/avatar.jpg",
        "locale": "en-US",
        "timezone": "America/New_York",
        "data": {},
        "subscriberId": "string",
        "channels": [
          {
            "providerId": "slack",
            "integrationIdentifier": "string",
            "credentials": {
              "webhookUrl": "string",
              "deviceTokens": [
                "string"
              ]
            }
          }
        ]
      }
    ],
    "transactionId": "string",
    "actor": "string",
    "tenant": "string",
    "context": {
      "property1": "org-acme",
      "property2": "org-acme"
    }
  }'
```

201400401403404405409413414415422429500503

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

[Payload Limits\\ \\ Understand payload size limits for Novu API requests and workflow triggers. Structure event payloads to avoid validation failures and rejected requests.](https://docs.novu.co/api-reference/payload-limits) [Bulk trigger event POST\\ \\ Using this endpoint you can trigger multiple events at once, to avoid multiple calls to the API. The bulk API is limited to 100 events per request.](https://docs.novu.co/api-reference/events/bulk-trigger-event)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/events/trigger-event.mdx)Open in ChatGPTOpen in Claude