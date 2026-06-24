# Source: https://docs.novu.co/api-reference/topics/list-topic-subscriptions

# List topic subscriptions

List all subscriptions of subscribers for a topic. Checkout all available filters in the query section.

GET

/`v2`/`topics`/`{topicKey}`/`subscriptions`

Send

Server URL

Headers

Query

Path

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Path Parameters](https://docs.novu.co/#path-parameters)

`topicKey`Requiredstring

The key identifier of the topic

## [Query Parameters](https://docs.novu.co/#query-parameters)

`after`string

Cursor for pagination indicating the starting point after which to fetch results.

`before`string

Cursor for pagination indicating the ending point before which to fetch results.

`limit`number

Limit the number of items to return (max 100)

Maximum: `100`

`orderDirection`string

Direction of sorting

Value in: `"ASC" | "DESC"`

`orderBy`string

Field to order by

`includeCursor`boolean

Include cursor item in response

`subscriberId`string

Filter by subscriber ID

`contextKeys`array<string>

Filter by exact context keys, order insensitive (format: "type:id")

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200400401403404405409413414415422429500503

OK

`data`Requiredarray<object>

List of returned Topic Subscriptions

Show Attributes

`next`Requiredstring | null

The cursor for the next page of results, or null if there are no more pages.

`previous`Requiredstring | null

The cursor for the previous page of results, or null if this is the first page.

`totalCount`Requirednumber

The total count of items (up to 50,000)

`totalCountCapped`Requiredboolean

Whether there are more than 50,000 results available

```
export interface Response {
  /**
   * List of returned Topic Subscriptions
   */
  data: TopicSubscriptionResponseDto[];
  /**
   * The cursor for the next page of results, or null if there are no more pages.
   */
  next: string | null;
  /**
   * The cursor for the previous page of results, or null if this is the first page.
   */
  previous: string | null;
  /**
   * The total count of items (up to 50,000)
   */
  totalCount: number;
  /**
   * Whether there are more than 50,000 results available
   */
  totalCountCapped: boolean;
}
export interface TopicSubscriptionResponseDto {
  /**
   * The identifier of the subscription
   */
  _id: string;
  /**
   * The identifier of the subscription
   */
  identifier: string;
  /**
   * The date and time the subscription was created
   */
  createdAt: string;
  /**
   * Topic information
   */
  topic: TopicResponseDto;
  /**
   * Subscriber information
   */
  subscriber: SubscriberDto;
  /**
   * Context keys that scope this subscription (e.g., tenant:org-a, project:proj-123)
   */
  contextKeys?: string[];
}
export interface TopicResponseDto {
  /**
   * The identifier of the topic
   */
  _id: string;
  /**
   * The unique key of the topic
   */
  key: string;
  /**
   * The name of the topic
   */
  name?: string;
  /**
   * The date the topic was created
   */
  createdAt?: string;
  /**
   * The date the topic was last updated
   */
  updatedAt?: string;
}
export interface SubscriberDto {
  /**
   * The identifier of the subscriber
   */
  _id: string;
  /**
   * The external identifier of the subscriber
   */
  subscriberId: string;
  /**
   * The avatar URL of the subscriber
   */
  avatar?: string | null;
  /**
   * The first name of the subscriber
   */
  firstName?: string | null;
  /**
   * The last name of the subscriber
   */
  lastName?: string | null;
  /**
   * The email of the subscriber
   */
  email?: string | null;
}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X GET "https://api.novu.co/v2/topics/string/subscriptions?after=string&before=string&limit=10&orderDirection=ASC&orderBy=string&includeCursor=true&subscriberId=string&contextKeys=tenant%3Aorg-123&contextKeys=region%3Aus-east-1" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>"
```

200400401403404405409413414415422429500503

```
{
  "data": [
    {
      "_id": "64da692e9a94fb2e6449ad08",
      "identifier": "tk=product-updates:si=subscriber-123",
      "createdAt": "2021-01-01T00:00:00.000Z",
      "topic": {
        "_id": "64da692e9a94fb2e6449ad06",
        "key": "product-updates",
        "name": "Product Updates",
        "createdAt": "2023-08-15T00:00:00.000Z",
        "updatedAt": "2023-08-15T00:00:00.000Z"
      },
      "subscriber": {
        "_id": "64da692e9a94fb2e6449ad07",
        "subscriberId": "user-123",
        "avatar": "https://example.com/avatar.png",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "contextKeys": [
        "tenant:org-a",
        "project:proj-123"
      ]
    }
  ],
  "next": "string",
  "previous": "string",
  "totalCount": 0,
  "totalCountCapped": true
}
```

[Update a topic subscription PATCH\\ \\ Update a subscription by its unique identifier for a topic. You can update the preferences and name associated with the subscription.](https://docs.novu.co/api-reference/topics/update-a-topic-subscription) [Check topic subscriber GET\\ \\ Check if a subscriber belongs to a certain topic](https://docs.novu.co/api-reference/topics/check-topic-subscriber)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/topics/list-topic-subscriptions.mdx)Open in ChatGPTOpen in Claude