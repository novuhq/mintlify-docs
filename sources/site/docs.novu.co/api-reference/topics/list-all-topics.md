# Source: https://docs.novu.co/api-reference/topics/list-all-topics

# List all topics

This api returns a paginated list of topics. Topics can be filtered by **key**, **name**, or **includeCursor** to paginate through the list. Checkout all available filters in the query section.

GET

/`v2`/`topics`

Send

Server URL

Headers

Query

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

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

`key`string

Key of the topic to filter results.

`name`string

Name of the topic to filter results.

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200400401403404405409413414415422429500503

OK

`data`Requiredarray<object>

List of returned Topics

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
   * List of returned Topics
   */
  data: TopicResponseDto[];
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
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X GET "https://api.novu.co/v2/topics?after=string&before=string&limit=10&orderDirection=ASC&orderBy=string&includeCursor=true&key=string&name=string" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>"
```

200400401403404405409413414415422429500503

```
{
  "data": [
    {
      "_id": "64da692e9a94fb2e6449ad06",
      "key": "product-updates",
      "name": "Product Updates",
      "createdAt": "2023-08-15T00:00:00.000Z",
      "updatedAt": "2023-08-15T00:00:00.000Z"
    }
  ],
  "next": "string",
  "previous": "string",
  "totalCount": 0,
  "totalCountCapped": true
}
```

[Delete a topic DELETE\\ \\ Delete a topic by its unique key identifier \*\*topicKey\*\*. This action is irreversible and will remove all subscriptions to the topic.](https://docs.novu.co/api-reference/topics/delete-a-topic) [Create topic subscriptions POST\\ \\ This api will create subscription for subscriberIds for a topic. Its like subscribing to a common interest group. if topic does not exist, it will be created.](https://docs.novu.co/api-reference/topics/create-topic-subscriptions)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/topics/list-all-topics.mdx)Open in ChatGPTOpen in Claude