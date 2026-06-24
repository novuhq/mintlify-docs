# Source: https://docs.novu.co/api-reference/topics/check-topic-subscriber

# Check topic subscriber

Check if a subscriber belongs to a certain topic

GET

/`v1`/`topics`/`{topicKey}`/`subscribers`/`{externalSubscriberId}`

Send

Server URL

Headers

Path

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Path Parameters](https://docs.novu.co/#path-parameters)

`externalSubscriberId`Requiredstring

The external subscriber id

`topicKey`Requiredstring

The topic key

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200400401403404405409413414415422429500503

`_organizationId`Requiredstring

Unique identifier for the organization

`_environmentId`Requiredstring

Unique identifier for the environment

`_subscriberId`Requiredstring

Unique identifier for the subscriber

`_topicId`Requiredstring

Unique identifier for the topic

`topicKey`Requiredstring

Key associated with the topic

`externalSubscriberId`Requiredstring

External identifier for the subscriber

```
export interface Response {
  /**
   * Unique identifier for the organization
   */
  _organizationId: string;
  /**
   * Unique identifier for the environment
   */
  _environmentId: string;
  /**
   * Unique identifier for the subscriber
   */
  _subscriberId: string;
  /**
   * Unique identifier for the topic
   */
  _topicId: string;
  /**
   * Key associated with the topic
   */
  topicKey: string;
  /**
   * External identifier for the subscriber
   */
  externalSubscriberId: string;
}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X GET "https://api.novu.co/v1/topics/string/subscribers/string" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>"
```

200400401403404405409413414415422429500503

```
{
  "_organizationId": "org_123456789",
  "_environmentId": "env_123456789",
  "_subscriberId": "sub_123456789",
  "_topicId": "topic_123456789",
  "topicKey": "my_topic_key",
  "externalSubscriberId": "external_subscriber_123"
}
```

[List topic subscriptions GET\\ \\ List all subscriptions of subscribers for a topic. Checkout all available filters in the query section.](https://docs.novu.co/api-reference/topics/list-topic-subscriptions) [Retrieve a topic subscription GET\\ \\ Retrieve a subscription by its unique identifier for a topic.](https://docs.novu.co/api-reference/topics/retrieve-a-topic-subscription)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/topics/check-topic-subscriber.mdx)Open in ChatGPTOpen in Claude