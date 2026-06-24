# Source: https://docs.novu.co/api-reference/subscribers/bulk-create-subscribers

# Bulk create subscribers

Using this endpoint multiple subscribers can be created at once. The bulk API is limited to 500 subscribers per request.

POST

/`v1`/`subscribers`/`bulk`

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

`subscribers`Requiredarray<object>

An array of subscribers to be created in bulk.

Show Attributes

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

201400401403404405409413414415422429500503

Created

`updated`Requiredarray<object>

An array of subscribers that were successfully updated.

Show Attributes

`created`Requiredarray<object>

An array of subscribers that were successfully created.

Show Attributes

`failed`Requiredarray<object>

An array of failed operations with error messages and optional subscriber IDs.

Show Attributes

```
export interface Response {
  /**
   * An array of subscribers that were successfully updated.
   */
  updated: UpdatedSubscriberDto[];
  /**
   * An array of subscribers that were successfully created.
   */
  created: CreatedSubscriberDto[];
  /**
   * An array of failed operations with error messages and optional subscriber IDs.
   */
  failed: FailedOperationDto[];
}
export interface UpdatedSubscriberDto {
  /**
   * The ID of the subscriber that was updated.
   */
  subscriberId: string;
}
export interface CreatedSubscriberDto {
  /**
   * The ID of the subscriber that was created.
   */
  subscriberId: string;
}
export interface FailedOperationDto {
  /**
   * The error message associated with the failed operation.
   */
  message?: string;
  /**
   * The subscriber ID associated with the failed operation. This field is optional.
   */
  subscriberId?: string;
}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X POST "https://api.novu.co/v1/subscribers/bulk" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "subscribers": [
      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890",
        "avatar": "https://example.com/avatar.jpg",
        "locale": "en-US",
        "timezone": "America/New_York",
        "data": {},
        "subscriberId": "string"
      }
    ]
  }'
```

201400401403404405409413414415422429500503

```
{
  "updated": [
    {
      "subscriberId": "string"
    }
  ],
  "created": [
    {
      "subscriberId": "string"
    }
  ],
  "failed": [
    {
      "message": "string",
      "subscriberId": "string"
    }
  ]
}
```

[Retrieve subscriber subscriptions GET\\ \\ Retrieve subscriber's topic subscriptions by its unique key identifier \*\*subscriberId\*\*. Checkout all available filters in the query section.](https://docs.novu.co/api-reference/subscribers/retrieve-subscriber-subscriptions) [Retrieve subscriber preferences GET\\ \\ Retrieve subscriber channel preferences by its unique key identifier \*\*subscriberId\*\*. This API returns all five channels preferences for all workflows and global preferences.](https://docs.novu.co/api-reference/subscribers/retrieve-subscriber-preferences)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/subscribers/bulk-create-subscribers.mdx)Open in ChatGPTOpen in Claude