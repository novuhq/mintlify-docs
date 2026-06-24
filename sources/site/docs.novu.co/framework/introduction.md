# Source: https://docs.novu.co/framework/introduction

# Framework Introduction

Discover how the Novu Framework empowers you to build, customize, and manage advanced notification workflows with a mix of code and no-code capabilities.

The Novu framework allows you to build and manage advanced notification workflows with code, and expose no-code controls for non-technical users to modify.

Workflows are the building blocks of your customer notification experience, they will define the what, when, how and where of your notifications.

## [Building blocks](https://docs.novu.co/#building-blocks)

Each Novu workflow is composed of 3 main components:

- **Trigger** - The event that will start the workflow.
- **Channel steps** - The delivery method of the notification with the content.
- **Action steps** - Actions that will happen before and after a given channel step is executed.

Let's take a look at a simple example of a workflow that sends an email after one day:

```
import { workflow } from '@novu/framework';
 
workflow('sample-workflow', async (step) => {
  await step.delay('delay', async () => {
    return {
      unit: 'days',
      amount: 1,
    };
  });
 
  await step.email('email-step', async () => {
    return {
      subject: 'Welcome to Novu',
      body: 'Hello, welcome to Novu!',
    };
  });
});
```

### [Trigger](https://docs.novu.co/#trigger)

The trigger is the event that will start the workflow. In our current example the `sample-workflow` identifier will be used as our trigger id. Workflow identifiers should be unique to your application and should be descriptive of the workflow's purpose.

### [Channel steps](https://docs.novu.co/#channel-steps)

Channel Steps are the delivery methods of the notification. In our example, we have an email Channel Step that will send an email with the subject `Welcome to Novu` and the body `Hello, welcome to Novu!`. Novu's durable workflow execution engine will select the relevant delivery provider configured for this channel and send the notification with the specified content.

Novu supports a variety of common notification channels out-of-the-box, including **email**, **SMS**, **push**, **inbox**, and **chat**.

To read more about the full list of parameters, check out the [full SDK reference](https://docs.novu.co/framework/typescript/overview).

### [Action steps](https://docs.novu.co/#action-steps)

Action Steps are purpose built functions that help you manage the flow of your workflow. In our example, we have a delay Action Step that will pause the workflow for one day before sending the email.

You can also use Action Steps to perform other tasks such as fetching data from an external API, updating a database, or sending a notification to another channel.

Novu supported the following Action Steps: **delay**, **custom** and **digest**.

## [Create a workflow](https://docs.novu.co/#create-a-workflow)

Here's a bare-bones example of a workflow to send a notification in response to a trigger:

```
import { workflow } from '@novu/framework';
 
const myWorkflow = workflow(
  'new-signup',
  async ({ step, payload }) => {
    await step.email('send-email', async () => {
      return {
        subject: `Welcome to Acme, ${payload.name}`,
        body: 'We look forward to helping you achieve mission.',
      };
    });
  },
  { payloadSchema: z.object({ name: z.string() }) }
);
```

We'll build on top of this basic code block in the following examples below.

## [Just-in-time data fetching](https://docs.novu.co/#just-in-time-data-fetching)

You can add any custom logic needed into your steps. For example, you might want to fetch more information about your new user from a database during the workflow execution. You can achieve this with the following changes:

```
import { workflow } from '@novu/framework';
 
const myWorkflow = workflow(
  'new-signup',
  async ({ step, payload }) => {
    await step.email('send-email', async () => {
      const user = await db.getUser(payload.userId);
      return {
        subject: `Welcome to Acme ${user.productTier} tier, ${user.name}`,
        body: 'We look forward to helping you achieve mission.',
      };
    });
  },
  { payloadSchema: z.object({ userId: z.string() }) }
);
```

We call this **just-in-time** notification data fetching. It allows you pull in data from the relevant sources during the workflow execution, removing the need to store all of your subscriber data in Novu.

## [Multi-step workflow](https://docs.novu.co/#multi-step-workflow)

What if you want to send another update to the same user in one week? But you don't want to send the follow-up if the user opted out. We can add more steps to the workflow to achieve this.

```
import { workflow } from '@novu/framework';
 
const myWorkflow = workflow(
  'new-signup',
  async ({ step, payload }) => {
    await step.email('send-email', async () => {
      const user = await db.getUser(payload.userId);
      return {
        subject: `Welcome to Acme ${user.productTier} tier, ${user.name}`,
        body: 'We look forward to helping you achieve mission.',
      };
    });
 
    await step.delay('onboarding-follow-up', async () => ({
      amount: 1,
      unit: 'weeks',
    }));
 
    await step.inApp(
      'onboarding-follow-up',
      async (controls) => {
        const user = await db.getUser(payload.userId);
        return {
          body: `Hey ${user.name}! How do you like the product? Let us know <a href="${controls.feedbackUrl}">here</a> if you have any questions.`,
        };
      },
      {
        skip: () => !payload.shouldFollowUp,
        controlSchema: {
          type: 'object',
          properties: {
            feedbackUrl: {
              type: 'string',
              format: 'uri',
              default: 'https://acme.com/feedback',
            },
          },
          required: ['feedbackUrl'],
          additionalProperties: false,
        } as const,
      }
    );
  },
  {
    payloadSchema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        shouldFollowUp: { type: 'boolean', default: true },
      },
      required: ['userId', 'shouldFollowUp'],
      additionalProperties: false,
    } as const,
  }
);
```

With this simple workflow, we:

- Sent a new signup email
- Waited 1 week
- Sent a follow-up notification in-app

That's the flexibility that Novu Framework offers.

Read the section on [Controls](https://docs.novu.co/framework/controls) next to learn how to expose Novu's no-code editing capabilities to your peers.

## [Payload schema](https://docs.novu.co/#payload-schema)

Payload schema defines the payload passed during the `novu.trigger` method. This is useful for ensuring that the payload is correctly formatted and that the data is valid.

```
import { workflow } from '@novu/framework';
import { render } from 'react-email';
import { ReactEmailContent } from './ReactEmailContent';
 
workflow(
  'comment-on-post',
  async ({ step, payload }) => {
    await step.email('send-email', async () => {
      return {
        subject: `You have a new comment from: ${payload.author_name}`,
        body: render(<ReactEmailContent comment={payload.comment} />),
      };
    });
  },
  {
    payloadSchema: {
      type: 'object',
      properties: {
        post_id: { type: 'number' },
        author_name: { type: 'string' },
        comment: { type: 'string', maxLength: 200 },
      },
      required: ['post_id', 'comment'],
      additionalProperties: false,
    } as const,
  }
);
```

## [Tags](https://docs.novu.co/#tags)

Tags are used to categorize the workflows. They also allow you to filter and group notifications for your [Inbox](https://docs.novu.co/platform/inbox/configuration/tabs) tabs.

```
import { workflow } from '@novu/framework';
 
workflow(
  'acme-login-alert',
  async ({ step, payload }) => {
    await step.inApp('inbox', async () => {
      return {
        subject: 'New Login Detected',
        body: "We noticed a login from a new device or location. If this wasn't you, change your password immediately.",
      };
    });
  },
  {
    tags: ['security'],
  }
);
```

[Overview\\ \\ Learn how to extend Novu's capabilities by building custom notification workflows with code using the Novu Framework.](https://docs.novu.co/framework) [Next.js\\ \\ Get started with Novu Framework in a Next.js application](https://docs.novu.co/framework/quickstart/nextjs)

### On this page

[Building blocks](https://docs.novu.co/#building-blocks) [Trigger](https://docs.novu.co/#trigger) [Channel steps](https://docs.novu.co/#channel-steps) [Action steps](https://docs.novu.co/#action-steps) [Create a workflow](https://docs.novu.co/#create-a-workflow) [Just-in-time data fetching](https://docs.novu.co/#just-in-time-data-fetching) [Multi-step workflow](https://docs.novu.co/#multi-step-workflow) [Payload schema](https://docs.novu.co/#payload-schema) [Tags](https://docs.novu.co/#tags)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/introduction.mdx)Open in ChatGPTOpen in Claude