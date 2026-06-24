# Source: https://docs.novu.co/framework

# Novu Framework Overview

Learn how to extend Novu's capabilities by building custom notification workflows with code using the Novu Framework.

Novu Framework enables you to run a part of the core Novu workflow engine from within your network boundary. This also opens up a powerful new capability: **you can create Novu workflows entirely in code**. This is important because:

- You can inject custom code that does nearly anything you can imagine as part of a Novu workflow
- Your code-based workflow lives alongside your application code in source control
- You can hydrate notification content using local data-sources, reducing what you need to sync outside of your IT boundary

### [What it is and how it works](https://docs.novu.co/#what-it-is-and-how-it-works)

Novu Framework is an application and SDK that you run locally, and communicates natively with the Novu Cloud Worker Engine via the Novu API.

Novu Framework requires a single HTTP webhook-like endpoint (/api/novu or similar) to be exposed by your application. This endpoint is called a **Bridge Endpoint** and is used to receive events from our Worker Engine through an encrypted client-initiated tunnel.

When enabled, Novu Cloud will call the Bridge Endpoint when it needs to retrieve contextual information for a given subscriber and notification.

Use the `npx novu init` command to create a sample Bridge application with a built-in Bridge Endpoint.

Novu Framework is used as a code layer to power both workflows and [agents](https://docs.novu.co/agents).

## [Quickstart](https://docs.novu.co/#quickstart)

To get started with Novu Framework, pick your preferred technology from the list below:

[**Next.js**](https://docs.novu.co/framework/quickstart/nextjs) [**Express.js**](https://docs.novu.co/framework/quickstart/express) [**Remix**](https://docs.novu.co/framework/quickstart/remix) [**NestJS**](https://docs.novu.co/framework/quickstart/nestjs) [**Svelte**](https://docs.novu.co/framework/quickstart/svelte) [**Nuxt**](https://docs.novu.co/framework/quickstart/nuxt) [**H3**](https://docs.novu.co/framework/quickstart/h3) [**Lambda**](https://docs.novu.co/framework/quickstart/lambda)

[Introduction\\ \\ Discover how the Novu Framework empowers you to build, customize, and manage advanced notification workflows with a mix of code and no-code capabilities.](https://docs.novu.co/framework/introduction)

### On this page

[What it is and how it works](https://docs.novu.co/#what-it-is-and-how-it-works) [Quickstart](https://docs.novu.co/#quickstart)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/index.mdx)Open in ChatGPTOpen in Claude