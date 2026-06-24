# Source: https://docs.novu.co/api-reference/idempotency

# API Idempotency

Learn how to use idempotency keys to safely retry API requests without causing duplicate operations

Idempotency is a crucial feature for building reliable integrations with Novu's API. It allows you to safely retry requests without worrying about duplicate operations, which is especially important for critical actions like triggering workflows.

An idempotent request is one that can be made multiple times with the same effect as making it once. This is achieved by including a unique idempotency key with your request.

Idempotency feature is currently not enabled for all organizations. Please contact us at [support@novu.co](mailto:support@novu.co) to enable it for your organization.

## [How It Works](https://docs.novu.co/#how-it-works)

When you send a request with an idempotency key:

1. Novu checks if a request with the same key has been processed before
2. If it's a new key, the request is processed normally and the response is cached
3. If the key was seen before, Novu returns the cached response without reprocessing the request

This mechanism protects against network issues, timeouts, and other scenarios where a request might be retried.

## [Using Idempotency Keys](https://docs.novu.co/#using-idempotency-keys)

To make an idempotent request, include the `Idempotency-Key` header with a unique identifier:

```
curl -X POST https://api.novu.co/v1/events/trigger \
  --header 'Authorization: ApiKey <NOVU_SECRET_KEY>' \
  --header 'Idempotency-Key: unique-request-id-12345' \
  --header 'Content-Type: application/json' \
  --data '{"name": "workflow-id", "to": {"subscriberId": "subscriber-123"}}'
```

### [Key Requirements](https://docs.novu.co/#key-requirements)

- **Maximum length**: 255 characters
- **Uniqueness**: Keys should be unique per organization
- **Format**: Any string value (UUIDs are recommended)

We recommend using UUIDs or other unique identifiers that include context about the operation, such as `order-confirmation-{orderId}-{timestamp}`.

## [Supported Methods](https://docs.novu.co/#supported-methods)

Idempotency is supported for the following HTTP methods:

| Method | Supported |
| --- | --- |
| POST | ✅ Yes |
| PATCH | ✅ Yes |
| GET | ❌ No |
| PUT | ❌ No |
| DELETE | ❌ No |

GET, PUT, and DELETE methods are inherently idempotent by design and don't require idempotency keys.

## [Authentication Requirements](https://docs.novu.co/#authentication-requirements)

Idempotency is only available when authenticating with an API Key:

```
--header 'Authorization: ApiKey <NOVU_SECRET_KEY>'
```

Requests using other authentication methods will be processed normally without idempotency support.

## [Cache Duration](https://docs.novu.co/#cache-duration)

| Scenario | Cache TTL |
| --- | --- |
| Successful response | 24 hours |
| Error response | 24 hours |
| In-progress request | 5 minutes |

After the cache expires, the same idempotency key can be reused.

## [HTTP Response Headers](https://docs.novu.co/#http-response-headers)

When making idempotent requests, Novu includes helpful headers in the response:

### [Idempotency-Key](https://docs.novu.co/#idempotency-key)

Confirms the idempotency key that was used for the request:

```
Idempotency-Key: unique-request-id-12345
```

### [Idempotency-Replay](https://docs.novu.co/#idempotency-replay)

Indicates that the response was served from the cache rather than processing a new request:

```
Idempotency-Replay: true
```

This header is only present when returning a cached response.

## [Error Handling](https://docs.novu.co/#error-handling)

### [Request In Progress (409 Conflict)](https://docs.novu.co/#request-in-progress-409-conflict)

If you send a request with an idempotency key while a previous request with the same key is still being processed:

```
{
  "statusCode": 409,
  "message": "Request with key \"unique-request-id-12345\" is currently being processed. Please retry after 1 second"
}
```

The response includes a `Retry-After` header indicating when to retry:

```
Retry-After: 1
```

### [Key Reused with Different Body (422 Unprocessable Entity)](https://docs.novu.co/#key-reused-with-different-body-422-unprocessable-entity)

If you send a request with an idempotency key that was previously used with a different request body:

```
{
  "statusCode": 422,
  "message": "Request with key \"unique-request-id-12345\" is being reused for a different body"
}
```

Each idempotency key must be associated with a specific request body. Using the same key with different payloads will result in an error.

### [Key Too Long (400 Bad Request)](https://docs.novu.co/#key-too-long-400-bad-request)

If the idempotency key exceeds 255 characters:

```
{
  "statusCode": 400,
  "message": "idempotencyKey \"...\" has exceeded the maximum allowed length of 255 characters"
}
```

## [Best Practices](https://docs.novu.co/#best-practices)

1. **Generate unique keys**: Use UUIDs or combine entity IDs with timestamps to ensure uniqueness
2. **Store keys**: Keep track of idempotency keys you've used in case you need to retry requests
3. **Handle 409 responses**: Implement retry logic with exponential backoff when you receive a conflict response
4. **Don't reuse keys for different operations**: Each unique operation should have its own idempotency key
5. **Include meaningful context**: Consider including the operation type and relevant IDs in your key for easier debugging

## [Example: Safe Retry Logic](https://docs.novu.co/#example-safe-retry-logic)

Here's an example of implementing safe retry logic with idempotency:

```
import { Novu } from '@novu/api';
import { v4 as uuidv4 } from 'uuid';
 
const novu = new Novu({
  secretKey: "<NOVU_SECRET_KEY>"
});
 
async function triggerNotificationWithRetry(workflowId, subscriberId, payload, maxRetries = 3) {
 
  const uniqueId = uuidv4();
  const idempotencyKey = `trigger-${workflowId}-${subscriberId}-${uniqueId}`;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await novu.trigger({
        workflowId: workflowId,
        to: { subscriberId: subscriberId },
        payload,
      }, idempotencyKey);
        
      return response;
    } catch (error) {
      if (error.statusCode === 409 && attempt < maxRetries) {
        // Request in progress, wait and retry
        const retryAfter = error.headers?.['retry-after'] || 1;
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      throw error;
    }
  }
}
```

[Rate Limiting\\ \\ In this page you can learn about how rate limiting works with Novu's API](https://docs.novu.co/api-reference/rate-limiting) [Payload Limits\\ \\ Understand payload size limits for Novu API requests and workflow triggers. Structure event payloads to avoid validation failures and rejected requests.](https://docs.novu.co/api-reference/payload-limits)

### On this page

[How It Works](https://docs.novu.co/#how-it-works) [Using Idempotency Keys](https://docs.novu.co/#using-idempotency-keys) [Key Requirements](https://docs.novu.co/#key-requirements) [Supported Methods](https://docs.novu.co/#supported-methods) [Authentication Requirements](https://docs.novu.co/#authentication-requirements) [Cache Duration](https://docs.novu.co/#cache-duration) [HTTP Response Headers](https://docs.novu.co/#http-response-headers) [Idempotency-Key](https://docs.novu.co/#idempotency-key) [Idempotency-Replay](https://docs.novu.co/#idempotency-replay) [Error Handling](https://docs.novu.co/#error-handling) [Request In Progress (409 Conflict)](https://docs.novu.co/#request-in-progress-409-conflict) [Key Reused with Different Body (422 Unprocessable Entity)](https://docs.novu.co/#key-reused-with-different-body-422-unprocessable-entity) [Key Too Long (400 Bad Request)](https://docs.novu.co/#key-too-long-400-bad-request) [Best Practices](https://docs.novu.co/#best-practices) [Example: Safe Retry Logic](https://docs.novu.co/#example-safe-retry-logic)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/idempotency.mdx)Open in ChatGPTOpen in Claude