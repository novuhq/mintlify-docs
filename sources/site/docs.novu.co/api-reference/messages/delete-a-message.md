# Source: https://docs.novu.co/api-reference/messages/delete-a-message

# Delete a message

Delete a message entity from the Novu platform by **messageId**. This action is irreversible. **messageId** is required and of mongodbId type.

DELETE

/`v1`/`messages`/`{messageId}`

Send

Server URL

Headers

Path

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Path Parameters](https://docs.novu.co/#path-parameters)

`messageId`Requiredstring

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200400401403404405409413414415422429500503

OK

`acknowledged`Requiredboolean

A boolean stating the success of the action

`status`Requiredstring

The status enum for the performed action

Value in: `"deleted"`

```
export interface Response {
  /**
   * A boolean stating the success of the action
   */
  acknowledged: boolean;
  /**
   * The status enum for the performed action
   */
  status: "deleted";
}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X DELETE "https://api.novu.co/v1/messages/507f1f77bcf86cd799439011" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>"
```

200400401403404405409413414415422429500503

```
{
  "acknowledged": true,
  "status": "deleted"
}
```

[List all messages GET\\ \\ List all messages for the current environment. This API supports filtering by \*\*channel\*\*, \*\*subscriberId\*\*, and \*\*transactionId\*\*. This API returns a paginated list of messages.](https://docs.novu.co/api-reference/messages/list-all-messages) [Delete messages by transactionId DELETE\\ \\ Delete multiple messages from the Novu platform using \*\*transactionId\*\* of triggered event. This API supports filtering by \*\*channel\*\* and delete all messages associated with the \*\*transactionId\*\*.](https://docs.novu.co/api-reference/messages/delete-messages-by-transactionid)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/messages/delete-a-message.mdx)Open in ChatGPTOpen in Claude