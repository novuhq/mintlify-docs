# Source: https://docs.novu.co/api-reference/topics/create-topic-subscriptions

# Create topic subscriptions

This api will create subscription for subscriberIds for a topic. Its like subscribing to a common interest group. if topic does not exist, it will be created.

POST

/`v2`/`topics`/`{topicKey}`/`subscriptions`

Send

Server URL

Headers

Path

Body

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Request Body](https://docs.novu.co/#request-body)

`application/json`Required

`subscriberIds`Deprecatedarray<string>

List of subscriber IDs to subscribe to the topic (max: 100). @deprecated Use the "subscriptions" property instead.

`subscriptions`array<string | object>

List of subscriptions to subscribe to the topic (max: 100). Can be either a string array of subscriber IDs or an array of objects with identifier and subscriberId

Show Attributes

`name`string

The name of the topic

`context`object

Show Attributes

`preferences`array<string | object | object>

The preferences of the topic. Can be a simple workflow ID string, workflow preference object, or group filter object

Show Attributes

## [Path Parameters](https://docs.novu.co/#path-parameters)

`topicKey`Requiredstring

The key identifier of the topic

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

201400401403404405409413414415422429500503

Subscriptions created successfully

`data`Requiredarray<object>

The list of successfully created subscriptions

@minItems 0

Show Attributes

`meta`Requiredobject

Metadata about the operation

`errors`array<object>

The list of errors for failed subscription attempts

@minItems 0

Show Attributes

```
export interface Response {
  /**
   * The list of successfully created subscriptions
   *
   * @minItems 0
   */
  data: SubscriptionResponseDto[];
  /**
   * Metadata about the operation
   */
  meta: MetaDto;
  /**
   * The list of errors for failed subscription attempts
   *
   * @minItems 0
   */
  errors?: SubscriptionErrorDto[];
}
export interface SubscriptionResponseDto {
  /**
   * The unique identifier of the subscription
   */
  _id: string;
  /**
   * The identifier of the subscription
   */
  identifier?: string;
  /**
   * The name of the subscription
   */
  name?: string;
  /**
   * The topic information
   */
  topic: TopicDto;
  /**
   * The subscriber information
   */
  subscriber: SubscriberDto;
  /**
   * The preferences for workflows in this subscription
   *
   * @minItems 0
   */
  preferences?: SubscriptionPreferenceDto[];
  /**
   * Context keys that scope this subscription (e.g., tenant:org-a, project:proj-123)
   *
   * @minItems 0
   */
  contextKeys?: string[];
  /**
   * The creation date of the subscription
   */
  createdAt: string;
  /**
   * The last update date of the subscription
   */
  updatedAt: string;
}
export interface TopicDto {
  /**
   * The internal unique identifier of the topic
   */
  _id: string;
  /**
   * The key identifier of the topic used in your application. Should be unique on the environment level.
   */
  key: string;
  /**
   * The name of the topic
   */
  name?: string;
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
export interface SubscriptionPreferenceDto {
  /**
   * The unique identifier of the subscription
   */
  subscriptionId: string;
  /**
   * Workflow information if this is a template-level preference
   */
  workflow?: WorkflowDto;
  /**
   * Whether the preference is enabled
   */
  enabled: boolean;
  /**
   * Optional condition using JSON Logic rules
   */
  condition?: {
    [k: string]: unknown;
  };
}
export interface WorkflowDto {
  /**
   * Unique identifier of the workflow
   */
  id: string;
  /**
   * Workflow identifier used for triggering
   */
  identifier: string;
  /**
   * Human-readable name of the workflow
   */
  name: string;
  /**
   * Whether this workflow is marked as critical
   */
  critical: boolean;
  /**
   * Tags associated with the workflow
   *
   * @minItems 0
   */
  tags?: string[];
  /**
   * Custom data associated with the workflow
   */
  data?: {};
  /**
   * Severity of the workflow
   */
  severity: "high" | "medium" | "low" | "none";
}
export interface MetaDto {
  /**
   * The total count of subscriber IDs provided
   */
  totalCount: number;
  /**
   * The count of successfully created subscriptions
   */
  successful: number;
  /**
   * The count of failed subscription attempts
   */
  failed: number;
}
export interface SubscriptionErrorDto {
  /**
   * The subscriber ID that failed
   */
  subscriberId: string;
  /**
   * The error code
   */
  code: string;
  /**
   * The error message
   */
  message: string;
}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X POST "https://api.novu.co/v2/topics/string/subscriptions" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "subscriberIds": [
      "subscriberId1",
      "subscriberId2"
    ],
    "subscriptions": [
      {
        "identifier": "subscriber-123-subscription-a",
        "subscriberId": "subscriber-123"
      },
      {
        "identifier": "subscriber-456-subscription-b",
        "subscriberId": "subscriber-456"
      }
    ],
    "name": "My Topic",
    "context": {
      "property1": "org-acme",
      "property2": "org-acme"
    },
    "preferences": [
      {
        "workflowId": "workflow-123",
        "condition": {
          "===": [
            {
              "var": "tier"
            },
            "premium"
          ]
        }
      }
    ]
  }'
```

201400401403404405409413414415422429500503

```
{
  "data": [
    {
      "_id": "64f5e95d3d7946d80d0cb679",
      "identifier": "tk=product-updates:si=subscriber-123",
      "name": "My Subscription",
      "topic": {
        "_id": "64f5e95d3d7946d80d0cb677",
        "key": "product-updates",
        "name": "Product Updates"
      },
      "subscriber": {
        "_id": "64da692e9a94fb2e6449ad07",
        "subscriberId": "user-123",
        "avatar": "https://example.com/avatar.png",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "preferences": [
        {
          "subscriptionId": "64f5e95d3d7946d80d0cb679",
          "workflow": {
            "id": "64a1b2c3d4e5f6g7h8i9j0k1",
            "identifier": "welcome-email",
            "name": "Welcome Email Workflow",
            "critical": false,
            "tags": [
              "user-onboarding",
              "email"
            ],
            "data": {
              "category": "onboarding",
              "priority": "high"
            },
            "severity": "high"
          },
          "enabled": true,
          "condition": {
            "and": [
              {
                "===": [
                  {
                    "var": "tier"
                  },
                  "premium"
                ]
              }
            ]
          }
        }
      ],
      "contextKeys": [
        "tenant:org-a",
        "project:proj-123"
      ],
      "createdAt": "2025-04-24T05:40:21Z",
      "updatedAt": "2025-04-24T05:40:21Z"
    }
  ],
  "meta": {
    "totalCount": 3,
    "successful": 2,
    "failed": 1
  },
  "errors": [
    {
      "subscriberId": "invalid-subscriber-id",
      "code": "SUBSCRIBER_NOT_FOUND",
      "message": "Subscriber with ID invalid-subscriber-id could not be found"
    }
  ]
}
```

[List all topics GET\\ \\ This api returns a paginated list of topics. Topics can be filtered by \*\*key\*\*, \*\*name\*\*, or \*\*includeCursor\*\* to paginate through the list. Checkout all available filters in the query section.](https://docs.novu.co/api-reference/topics/list-all-topics) [Delete topic subscriptions DELETE\\ \\ Delete subscriptions for subscriberIds for a topic.](https://docs.novu.co/api-reference/topics/delete-topic-subscriptions)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/topics/create-topic-subscriptions.mdx)Open in ChatGPTOpen in Claude