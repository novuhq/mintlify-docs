# Source: https://docs.novu.co/platform/developer/api-keys

# API Keys Management

Manage authentication credentials and connection endpoints for your Novu integration.

Novu provides a set of keys and hostnames that your application uses to authenticate requests, send events to the Novu API, and to interact with the [<Inbox />](https://docs.novu.co/platform/inbox).

Your API keys are environment specific and allow Novu to tie all request to a particular Novu environment.

## [Finding your API keys](https://docs.novu.co/#finding-your-api-keys)

Follow these steps to find your environment-specific API keys:

1. Login to the Novu dashboard.
2. On the developer section, click **API Keys** to find all your environment keys, whiich are:
 - Application Identifier
 - Secret Keys
 - API URLs ![API Keys](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fapi-keys.d21d9df0.png&w=3840&q=75)

## [Application identifier](https://docs.novu.co/#application-identifier)

The Application Identifier is a unique identifier for your application within Novu. It is considered a public key and is safe to expose in client-side code.

The application identifier is used to initialize the [<Inbox />](https://docs.novu.co/platform/inbox) component.

## [Secret key](https://docs.novu.co/#secret-key)

The Secret Key is a private token used to authenticate and authorize requests sent to the API service. It proves that your application is allowed to access resources.

This key grants full administrative access to your account. It should never be used in publicly accessible code, such as frontend applications or public repositories (GitHub, GitLab).

Keep your secret key private.

You can regenerate the secret key from the API Keys dashboard. This will invalidate the old key and require you to update your environment variables.

## [API URLs](https://docs.novu.co/#api-urls)

The following hostnames are used to connect to the Novu cloud platform.

| **Endpoint** | **URL** | **Description** |
| --- | --- | --- |
| **API Hostname** | `https://api.novu.co` | The domain that your application sends API requests to. It identifies the Novu API server. |
| **WebSocket Hostname** | `https://ws.novu.co` | The domain used to establish a WebSocket connection. Similar to the API Hostname, but specifically for real-time, two-way communication. |

[Ruby\\ \\ Connect a Ruby application to Novu](https://docs.novu.co/platform/sdks/server/ruby) [Environments\\ \\ Understanding and managing environments in Novu](https://docs.novu.co/platform/developer/environments)

### On this page

[Finding your API keys](https://docs.novu.co/#finding-your-api-keys) [Application identifier](https://docs.novu.co/#application-identifier) [Secret key](https://docs.novu.co/#secret-key) [API URLs](https://docs.novu.co/#api-urls)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/developer/api-keys.mdx)Open in ChatGPTOpen in Claude