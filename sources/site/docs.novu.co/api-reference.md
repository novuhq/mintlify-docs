# Source: https://docs.novu.co/api-reference

# Novu API Reference Overview

Complete Novu API reference covering authentication, endpoints, rate limits, and server-side integration for notifications.

It's important to note that our API and backend SDK are intended for use exclusively in server-side applications. **Attempting to use them in a client-side application will result in Cross-Origin Resource Sharing (CORS) errors.** This restriction ensures the security and integrity of our services.

## [Authentication](https://docs.novu.co/#authentication)

Authentication for the Novu API involves the use of an API Key, which is a secure credential that is tied to your Novu account. This key should be included in the header of the request in the Authorization field as a string prefixed with 'ApiKey '.

```
--header 'Authorization: ApiKey <NOVU_SECRET_KEY>'
```

For example, when using Novu in a Node.js application, the Novu package should be imported and initialized with the API key, as shown in this snippet:

```
import { Novu } from '@novu/api';
const novu = new Novu({
  secretKey: "NOVU_SECRET_KEY",
});
```

Replace `<NOVU_SECRET_KEY>` with your actual API Key, available in the API Key section of the Novu Dashboard.

It is advised not to hardcode your credentials in a file in production environments. Use environment variables instead.

## [API Endpoints](https://docs.novu.co/#api-endpoints)

Novu provides a multitude of API endpoints that enable a variety of functionalities. the base URL for the Novu API is `https://api.novu.co/v1`.

We offer two API options: the US API and the EU API. By default, our API documentation refers to the US API, which can be accessed at: [https://api.novu.co/v1](https://api.novu.co/v1).

If you require the EU version, you can access it here: [https://eu.api.novu.co/v1](https://eu.api.novu.co/v1).

For instance, to get tenant information, the endpoint to use would include the tenant's identifier and look like this `https://api.novu.co/v1/tenants/{identifier}`.

[Rate Limiting\\ \\ In this page you can learn about how rate limiting works with Novu's API](https://docs.novu.co/api-reference/rate-limiting)

### On this page

[Authentication](https://docs.novu.co/#authentication) [API Endpoints](https://docs.novu.co/#api-endpoints)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/index.mdx)Open in ChatGPTOpen in Claude