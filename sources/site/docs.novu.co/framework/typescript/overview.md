# Source: https://docs.novu.co/framework/typescript/overview

# Novu Framework TypeScript Overview

Learn how to use Novu's TypeScript SDK to build type-safe notification workflows with advanced features like payload validation and step controls.

Although you can trigger Novu workflows from any programming language using our Rest API SDKs.

We believe that the best way to build your notification strategy is to treat your templates and workflows as your Notification Design System. Building reusable components to be consumed and embedded by your non-technical peers in any combination.

Typescript SDKs enable the creation of stunning channel content like E-mails using modern technologies like React/Vue/etc... Treating your emails as a front-end concern opens up a world of possibilities to reuse design tokens, components, and even entire templates across your applications for consistent branding and a cohesive user experience.

Novu Framework was built and optimized with extreme focus on Developer Experience. Our `@novu/framework` SDK is written in Typescript, and we recommend using Typescript for your own projects as well.

## [Type-safe workflow payloads](https://docs.novu.co/#type-safe-workflow-payloads)

When defining a [workflow payload](https://docs.novu.co/framework/payload) schema, our SDK will automatically infer it to a Typescript interface.

```
import { workflow } from '@novu/framework';
 
const myWorkflow = workflow(
  'new-signup',
  async ({ step, payload }) => {
    await step.email('send-email', () => {
      return {
        subject: 'Hello World',
        // The payload object here is type-safe
        body: `Hi ${payload.name}, welcome to our platform!`,
      };
    });
  },
  {
    payloadSchema: { properties: { name: { type: 'string' } } },
  }
);
```

## [Type safe steps](https://docs.novu.co/#type-safe-steps)

Similarly, when defining a [step](https://docs.novu.co/framework/typescript/steps) schema, our SDK will automatically infer it to a Typescript interface.

## [Step controls](https://docs.novu.co/#step-controls)

Build and define type safe controls to expose no-code editing capabilities to your teammates.

## [Explore the SDK](https://docs.novu.co/#explore-the-sdk)

- [Client](https://docs.novu.co/framework/typescript/client)
- [Workflow](https://docs.novu.co/framework/typescript/workflow)
- [Steps](https://docs.novu.co/framework/typescript/steps)

The `@novu/framework` SDK is compatible with Node.js version 20.0.0 and above.

[Skip Function\\ \\ Skip any step of the workflow based on a condition](https://docs.novu.co/framework/skip) [Client\\ \\ Learn how to configure and use the Novu Framework Client for managing global settings](https://docs.novu.co/framework/typescript/client)

### On this page

[Type-safe workflow payloads](https://docs.novu.co/#type-safe-workflow-payloads) [Type safe steps](https://docs.novu.co/#type-safe-steps) [Step controls](https://docs.novu.co/#step-controls) [Explore the SDK](https://docs.novu.co/#explore-the-sdk)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/typescript/overview.mdx)Open in ChatGPTOpen in Claude