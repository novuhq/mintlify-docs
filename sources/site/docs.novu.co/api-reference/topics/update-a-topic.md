# Source: https://docs.novu.co/api-reference/topics/update-a-topic

# Update a topic

Update a topic name by its unique key identifier **topicKey**

PATCH

/`v2`/`topics`/`{topicKey}`

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

`name`Requiredstring

The display name for the topic

## [Path Parameters](https://docs.novu.co/#path-parameters)

`topicKey`Requiredstring

The key identifier of the topic

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200400401403404405409413414415422429500503

OK

`_id`Requiredstring

The identifier of the topic

`key`Requiredstring

The unique key of the topic

`name`string

The name of the topic

`createdAt`string

The date the topic was created

`updatedAt`string

The date the topic was last updated

```
export interface Response {
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
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X PATCH "https://api.novu.co/v2/topics/string" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Topic Name"
  }'
```

200400401403404405409413414415422429500503

```
{
  "_id": "64da692e9a94fb2e6449ad06",
  "key": "product-updates",
  "name": "Product Updates",
  "createdAt": "2023-08-15T00:00:00.000Z",
  "updatedAt": "2023-08-15T00:00:00.000Z"
}
```

[Retrieve a topic GET\\ \\ Retrieve a topic by its unique key identifier \*\*topicKey\*\*](https://docs.novu.co/api-reference/topics/retrieve-a-topic) [Delete a topic DELETE\\ \\ Delete a topic by its unique key identifier \*\*topicKey\*\*. This action is irreversible and will remove all subscriptions to the topic.](https://docs.novu.co/api-reference/topics/delete-a-topic)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/topics/update-a-topic.mdx)Open in ChatGPTOpen in Claude