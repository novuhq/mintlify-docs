# Source: https://docs.novu.co/api-reference/events/bulk-trigger-event

# Bulk trigger event

Using this endpoint you can trigger multiple events at once, to avoid multiple calls to the API. The bulk API is limited to 100 events per request.

POST

/`v1`/`events`/`trigger`/`bulk`

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

`events`Requiredarray<object>

Show Attributes

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

201400401403404405409413414415422429500503

Created

`response`Requiredarray<object>

Show Attributes

```
export type Response = TriggerEventResponseDto[];
 
export interface TriggerEventResponseDto {
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
   *
   * @minItems 0
   *
   * @minItems 0
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
curl -X POST "https://api.novu.co/v1/events/trigger/bulk" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "events": [
      {
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
      }
    ]
  }'
```

201400401403404405409413414415422429500503

```
[
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
]
```

[Trigger event POST\\ \\ Trigger event is the main (and only) way to send notifications to subscribers. The trigger identifier is used to match the particular workflow associated with it. Maximum number of recipients can be 100. Additional information can be passed according the body interface below. To prevent duplicate triggers, you can optionally pass a \*\*transactionId\*\* in the request body. If the same \*\*transactionId\*\* is used again, the trigger will be ignored. The retention period depends on your billing tier.](https://docs.novu.co/api-reference/events/trigger-event) [Broadcast event to all POST\\ \\ Trigger a broadcast event to all existing subscribers, could be used to send announcements, etc. In the future could be used to trigger events to a subset of subscribers based on defined filters.](https://docs.novu.co/api-reference/events/broadcast-event-to-all)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/events/bulk-trigger-event.mdx)Open in ChatGPTOpen in Claude