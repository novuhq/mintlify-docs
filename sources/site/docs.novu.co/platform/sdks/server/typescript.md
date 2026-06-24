# Source: https://docs.novu.co/platform/sdks/server/typescript

[Server-Side](https://docs.novu.co/platform/sdks/server)

# Novu Typescript SDK

Connect a TS/JS application to Novu

Novu's Typescript SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code. It integrates seamlessly with your Node.js, Bun, Deno, and Cloudflare Workers applications.

[Explore the source code on GitHub](https://github.com/novuhq/novu-ts)

## [Installation](https://docs.novu.co/#installation)

NPMPNPMYarnBun

```
npm add @novu/api
```

## [Usage](https://docs.novu.co/#usage)

US RegionEU Region

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ secretKey: "<YOUR_SECRET_KEY_HERE>", });
 
async function run() {
  const result = await novu.trigger({
    to: {
      subscriberId: "subscriber_unique_identifier",
      firstName: "Albert",
      lastName: "Einstein",
      email: "albert@einstein.com",
      phone: "+1234567890",
    },
    workflowId: "workflow_identifier",
    payload: {
      comment_id: "string",
      post: {
        text: "string",
      },
    },
    overrides: {
      email: {
        bcc: "no-reply@novu.co",
      },
    },
  });
}
 
run();
```

## [Sending custom header](https://docs.novu.co/#sending-custom-header)

To send custom headers, you can use the `HTTPClient` class. Read more on how to configure custom [http client](https://github.com/novuhq/novu-ts?tab=readme-ov-file#custom-http-client).

```
import { Novu } from "@novu/api";
import { HTTPClient } from "@novu/api/lib/http";
 
const httpClient = new HTTPClient();
 
httpClient.addHook("beforeRequest", (request) => {
  const nextRequest = new Request(request);
  nextRequest.headers.set("x-custom-header", "custom-header-value");
 
  return nextRequest;
});
 
const novu = new Novu({
  httpClient,
  secretKey: "SECRET_KEY_VALUE",
  serverURL: "https://eu.api.novu.co",
});
 
novu.trigger({
  workflowId: "WORKFLOW_ID_VALUE",
  to: {
    subscriberId: "subscriberId",
  },
  payload: {
    message: "Hello, world!",
  },
});
```

[Server Side\\ \\ Explore Novu's comprehensive collection of server-side SDKs for seamless notification integration across multiple programming languages](https://docs.novu.co/platform/sdks/server) [Python\\ \\ Connect a Python application to Novu](https://docs.novu.co/platform/sdks/server/python)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage) [Sending custom header](https://docs.novu.co/#sending-custom-header)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/typescript.mdx)Open in ChatGPTOpen in Claude