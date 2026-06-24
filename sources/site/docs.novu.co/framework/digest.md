# Source: https://docs.novu.co/framework/digest

# Digest Action Step

Learn how to use the Digest Engine to collect multiple events into a single message

You can use the Digest Engine to collect multiple events to a single message. Learn more about the [Digest Engine](https://docs.novu.co/platform/workflow/add-and-configure-steps#digest).

## [Defining a digest step](https://docs.novu.co/#defining-a-digest-step)

```
const digestResult = await step.digest('digest', async () => {
  return {
    unit: 'days', // 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months'
    amount: 3, // the number of units to digest events for
  };
});
```

## [Writing digest content](https://docs.novu.co/#writing-digest-content)

In many cases, you will need to access all the digested events payload in order to show the user all or parts of the events included in this digest.

**For example:** "John and 5 others liked your photo."

The digest function returns an array of triggers that have been digested. You can use this array to perform any necessary actions on the digested triggers. Like Sending and email, or updating a database.

```
const { events } = await step.digest('digest-3-days', async () => {
  return {
    unit: 'days', // 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months'
    amount: 3, // the number of units to digest events for
  };
});
 
await step.email('send-email', async () => {
  const eventCount = events.length;
 
  return {
    subject: 'Digest Email',
    body: `You have ${eventCount} new events`,
  };
});
```

## [Cron based digest](https://docs.novu.co/#cron-based-digest)

You can use cron based digest to digest events based on a cron expression.

```
const digestedEvents = await step.digest('cron-digest', async () => {
  return {
    cron: '0 0 * * *', // every day at midnight
  };
});
```

## [Custom Digest Key](https://docs.novu.co/#custom-digest-key)

You can use a custom digest key to digest events based on a custom key. By default, events are digested based on the `subscriberId`. With a custom digest key, events are digested based on the combination of the `subscriberId` and the `digestKey` value.

```
export const customDigestKey = workflow(
  "custom-digest-key",
  async ({ step, payload }) => {
    const { events } = await step.digest("digest-step", async () => {
      return {
        unit: "hours",
        amount: 1,
        digestKey: payload.ticket_id,
      };
    });
 
    console.log("events ==>", events);
 
    // use above events to send email / in-app notification
  },
  {
    payloadSchema: z.object({
      ticket_id: z.string(),
    }),
  }
);
```

Step controls: At the moment, it is not possible to use digest information in step controls. You can only use it from the code, by creating a custom component for handling digested data.

The digest step returns an object with events array. Each event in the array has the following properties:

- **id** - The job id of the digested event
- **time** - The time when the event was triggered
- **payload** - The original payload passed to the event

## [Two digest steps in a workflow](https://docs.novu.co/#two-digest-steps-in-a-workflow)

Currently, Novu does not support two digest steps in a workflow. However, two digest behaviours can be achieved by creating second workflow with digest step, add all other steps after the digest step and trigger the second workflow from the first workflow in [custom step](https://docs.novu.co/framework/custom).

**Use Case: LLM-Powered Feedback Digest**

In this example, customer requests are collected and digested every 15 minutes. An in-app notification alerts the user about the number of new requests. Every 6 hours, those requests are grouped and passed to a second workflow where an LLM (like OpenAI) categorizes the feedback into bugs, feature requests, and praise. A summary email is then sent with the categorized counts. This setup helps reduce noise while still keeping teams informed with meaningful, AI-powered insights.

```
const secondDigestWorkflow = workflow(
  "llm-request-summary-workflow",
  async ({ step, payload }) => {
    const { events } = await step.digest("digest-llm-summary", async () => {
      return {
        unit: "hours",
        amount: 6,
      };
    });
 
    await step.email("send-llm-summary", async () => {
      const allRequests = events?.map((event) => event.payload.requests);
      // categorized: { bugs: 2, features: 4, praise: 5 }
      const categorized = await categorizeUsingLLM(allRequests);
      const { bugs, features, praise } = categorized;
      return {
        subject: `🧠 LLM Feedback Digest - Last 6 Hours`,
        body: `
          🔧 Bugs reported: ${bugs}\n
          🌟 Feature requests: ${features}\n
          🙌 Praise received: ${praise}\n\n
          View full feedback log in your dashboard.
        `,
      };
    });
  }
);
 
const firstDigestWorkflow = workflow(
  "customer-requests-digest-workflow",
  async ({ step, subscriber, payload }) => {
    const { events } = await step.digest("digest-recent-requests", async () => {
      return {
        unit: "minutes",
        amount: 15,
      };
    });
 
    await step.inApp("in-app-summary", async () => {
      return {
        subject: `📝 ${events.length} new requests received`,
        body: `You’ve received ${events.length} customer requests in the last 15 minutes.`,
      };
    });
 
    await step.custom("trigger-llm-categorize-workflow", async () => {
      return await secondDigestWorkflow.trigger({
        to: subscriber?.subscriberId as string,
        payload: {
          requests: events.map((event) => event.payload),
        },
      });
    });
  }
);
```

Changing the step content after triggering the workflow with digest step will not affect the existing digested events.

## [Next Steps](https://docs.novu.co/#next-steps)

- [Learn more about the Digest Engine](https://docs.novu.co/framework/typescript/steps/digest)

## [Frequently Asked Questions](https://docs.novu.co/#frequently-asked-questions)

### [If digest step fails, will the workflow continue to the next step?](https://docs.novu.co/#if-digest-step-fails-will-the-workflow-continue-to-the-next-step)

No, workflow execution will stop immediately if the digest step fails due to an error.

[Vue Email\\ \\ Learn how to use Vue Email to build beautiful email templates](https://docs.novu.co/framework/content/vue-email) [Delay Action\\ \\ Learn how to use Delay steps in your notification workflows](https://docs.novu.co/framework/delay)

### On this page

[Defining a digest step](https://docs.novu.co/#defining-a-digest-step) [Writing digest content](https://docs.novu.co/#writing-digest-content) [Cron based digest](https://docs.novu.co/#cron-based-digest) [Custom Digest Key](https://docs.novu.co/#custom-digest-key) [Two digest steps in a workflow](https://docs.novu.co/#two-digest-steps-in-a-workflow) [Next Steps](https://docs.novu.co/#next-steps) [Frequently Asked Questions](https://docs.novu.co/#frequently-asked-questions) [If digest step fails, will the workflow continue to the next step?](https://docs.novu.co/#if-digest-step-fails-will-the-workflow-continue-to-the-next-step)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/digest.mdx)Open in ChatGPTOpen in Claude