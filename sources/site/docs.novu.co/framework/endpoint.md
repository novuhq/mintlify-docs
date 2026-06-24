# Source: https://docs.novu.co/framework/endpoint

# Bridge Endpoint

Learn how to configure the Novu Bridge Endpoint, the single HTTP endpoint your application exposes to communicate with the Novu Worker Engine.

Novu Framework requires a **single** `HTTP` endpoint (`/api/novu` or similar) to be exposed by your application. This endpoint is used to receive events from our **Worker Engine**.

You can view the Bridge Endpoint as a webhook endpoint that Novu will call when it needs to retrieve contextual information for a given subscriber and notification.

Using the `npx novu init` command creates a Bridge application for you with a Bridge Endpoint ready to go.

## [The `serve` function](https://docs.novu.co/#the-serve-function)

We offer framework specific wrappers in form of an exported `serve` function that abstracts away:

- Parsing the incoming request for `GET`, `POST`, `PUT` and `OPTIONS` requests
- HMAC header authentication
- Framework specific response and error handling

Currently, we offer `serve` functions for the following frameworks:

- [Next.js](https://docs.novu.co/framework/quickstart/nextjs)
- [Express.js](https://docs.novu.co/framework/quickstart/express)
- [Nuxt](https://docs.novu.co/framework/quickstart/nuxt)
- [h3](https://docs.novu.co/framework/quickstart/h3)
- [Remix](https://docs.novu.co/framework/quickstart/remix)
- [Sveltekit](https://docs.novu.co/framework/quickstart/svelte)

## [Writing a custom `serve` function](https://docs.novu.co/#writing-a-custom-serve-function)

If we currently don't support your framework, you can write a custom `serve` function like the following example:

```
import { type Request, type Response } from 'express';
import { NovuRequestHandler, ServeHandlerOptions } from '@novu/framework';
 
export const serve = (options: ServeHandlerOptions) => {
  const requestHandler = new NovuRequestHandler({
    frameworkName: 'express',
    ...options,
    handler: (incomingRequest: Request, response: Response) => ({
      method: () => incomingRequest.method,
      headers: (key) => {
        const header = incomingRequest.headers[key];
        return Array.isArray(header) ? header[0] : header;
      },
      queryString: (key) => {
        const qs = incomingRequest.query[key];
        return Array.isArray(qs) ? qs[0] : qs;
      },
      body: () => incomingRequest.body,
      url: () =>
        new URL(incomingRequest.url, `https://${incomingRequest.headers.get('host') || ''}`),
      transformResponse: ({ body, headers, status }) => {
        Object.entries(headers).forEach(([headerName, headerValue]) => {
          response.setHeader(headerName, headerValue);
        });
 
        return response.status(status).send(body);
      },
    }),
  });
 
  return requestHandler.createHandler();
};
```

### What is the difference between tunnel url and bridge url?

### Is it necessary to have bridge url publicly accessible?

### Can endpoint other than /api/novu be used?

[Studio\\ \\ Learn how to use the Local Studio companion app for Novu Framework SDK](https://docs.novu.co/framework/studio) [Tags\\ \\ Learn how to implement and manage notification tags programmatically using the Novu Framework SDK.](https://docs.novu.co/framework/tags)

### On this page

[The `serve` function](https://docs.novu.co/#the-serve-function) [Writing a custom `serve` function](https://docs.novu.co/#writing-a-custom-serve-function)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/endpoint.mdx)Open in ChatGPTOpen in Claude