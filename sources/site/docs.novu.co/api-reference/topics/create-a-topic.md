# Source: https://docs.novu.co/api-reference/topics/create-a-topic

# Create a topic

Creates a new topic if it does not exist, or updates an existing topic if it already exists. Use ?failIfExists=true to prevent updates.

POST

/`v2`/`topics`

Send

Server URL

Headers

Query

Body

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Request Body](https://docs.novu.co/#request-body)

`application/json`Required

`key`Requiredstring

The unique key identifier for the topic. The key must contain only alphanumeric characters (a-z, A-Z, 0-9), hyphens (-), underscores (\_), colons (:), or be a valid email address.

Minimum length: `1`Maximum length: `100`

`name`string

The display name for the topic

Minimum length: `0`Maximum length: `100`

## [Query Parameters](https://docs.novu.co/#query-parameters)

`failIfExists`boolean

If true, the request will fail if a topic with the same key already exists

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200201400401403404405409413414415422429500503

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
curl -X POST "https://api.novu.co/v2/topics?failIfExists=true" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "task:12345",
    "name": "Task Title"
  }'
```

200201400401403404405409413414415422429500503

```
{
  "_id": "64da692e9a94fb2e6449ad06",
  "key": "product-updates",
  "name": "Product Updates",
  "createdAt": "2023-08-15T00:00:00.000Z",
  "updatedAt": "2023-08-15T00:00:00.000Z"
}
```

[Topic schema\\ \\ Reference the Novu topic schema used in API requests and responses. Review fields, data types, and object structure for this resource.](https://docs.novu.co/api-reference/topics/topic-schema) [Retrieve a topic GET\\ \\ Retrieve a topic by its unique key identifier \*\*topicKey\*\*](https://docs.novu.co/api-reference/topics/retrieve-a-topic)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/topics/create-a-topic.mdx)Open in ChatGPTOpen in Claude