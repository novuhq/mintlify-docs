# Source: https://docs.novu.co/framework/typescript/client

# Framework Client

Learn how to configure and use the Novu Framework Client for managing global settings

The `Client` is an optional Class you can pass to the `serve` function to override some global settings. By default, we will inject a new instance of the `Client` class in your `serve` method with the following defaults:

## [Client Interface](https://docs.novu.co/#client-interface)

### [secretKey](https://docs.novu.co/#secretkey)

- **Type**: `string`
- **Default**: `process.env.NOVU_SECRET_KEY`
- **Description**: Your Novu Secret Key, used to sign the HMAC header to guarantee the authenticity of our requests.

### [strictAuthentication](https://docs.novu.co/#strictauthentication)

- **Type**: `boolean`
- **Default**: `process.env.NODE_ENV !== 'development'`
- **Description**: This bypasses the HMAC signature verification, required for local development and testing against [Local Studio](https://docs.novu.co/framework/studio).

### [verbose](https://docs.novu.co/#verbose)

- **Type**: `boolean`
- **Default**: `true` in development, `false` in production
- **Description**: Enable verbose logging for workflow discovery and execution. When set to `false`, discovery and execution logs are suppressed.

### [logger](https://docs.novu.co/#logger)

- **Type**: `Logger`
- **Default**: The global `console`
- **Description**: A custom logger for all framework internal logging — workflow discovery, execution, and bridge error reporting. The interface uses `info`, `warn`, and `error` methods, so the global `console` and common structured loggers (pino, winston, and similar) work without an adapter. The `verbose` option controls whether discovery and execution logs are emitted; `logger` controls where all logs are written. Bridge errors (HTTP status >= 500) are always logged via this logger, regardless of `verbose`.

## [Environment Variables](https://docs.novu.co/#environment-variables)

Unless specified in the `Client` constructor the `Client` class will look for the following environment variables:

- `NOVU_SECRET_KEY` - Your Novu Secret Key
- `NOVU_API_URL` - Defaults to `https://api.novu.co`. For EU customers, this should be set to `https://eu.api.novu.co`.

## [Development Environment](https://docs.novu.co/#development-environment)

When your service is running in development mode `process.env.NODE_ENV=development`, the following rules will auto apply:

- `strictAuthentication` will be set to `false`.

## [Code Example](https://docs.novu.co/#code-example)

```
import { Client as NovuFrameworkClient } from '@novu/framework';
import { serve } from '@novu/framework/next';
import { passwordResetWorkflow } from './workflows';
 
export const { GET, POST, OPTIONS } = serve({
  client: new NovuFrameworkClient({
    secretKey: process.env.NOVU_SECRET_KEY,
    strictAuthentication: false,
    verbose: process.env.NODE_ENV === 'development',
    logger: console,
  }),
  workflows: [
    /* all workflows */
    passwordResetWorkflow,
  ],
});
```

[Overview\\ \\ Learn how to use Novu's TypeScript SDK to build type-safe notification workflows with advanced features like payload validation and step controls.](https://docs.novu.co/framework/typescript/overview) [Workflow\\ \\ Learn about the Novu Framework workflow interface and its configuration options](https://docs.novu.co/framework/typescript/workflow)

### On this page

[Client Interface](https://docs.novu.co/#client-interface) [secretKey](https://docs.novu.co/#secretkey) [strictAuthentication](https://docs.novu.co/#strictauthentication) [verbose](https://docs.novu.co/#verbose) [logger](https://docs.novu.co/#logger) [Environment Variables](https://docs.novu.co/#environment-variables) [Development Environment](https://docs.novu.co/#development-environment) [Code Example](https://docs.novu.co/#code-example)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/typescript/client.mdx)Open in ChatGPTOpen in Claude