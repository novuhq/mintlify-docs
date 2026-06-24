# Source: https://docs.novu.co/framework/delay

# Framework Delay Implementation

Learn how to use Delay steps in your notification workflows

The delay action awaits a specified amount of time before moving on to trigger the following steps of the workflow.

Learn more about the [Delay](https://docs.novu.co/platform/workflow/add-and-configure-steps#delay).

## [Common usecases](https://docs.novu.co/#common-usecases)

- Waiting for X amount of time before sending the message
- Wait for a short period of time before sending a push message in case the user seen the notification in the Inbox Component
- Allow the user some time to cancel an action that generated a notification

## [Adding a delay step](https://docs.novu.co/#adding-a-delay-step)

Delay steps can be inserted at any stage of your workflow execution, they can happen after or before any action. The workflow execution will be halted for the given amount of time and then resumed to the next step in the flow.

The action can also be skipped using the skip parameter conditionally to allow more complex usecases of when to wait and when to send an email immediately.

Delay with skip conditionDelay and Inbox step

Here, we are delaying the execution of the next step by 1 day and skipping the delay step if the isCriticalMessage function returns true.

```
await step.delay(
  'delay',
  () => {
    return {
      type: 'regular',
      unit: 'days',
      amount: 1,
    };
  },
  {
    skip: () => isCriticalMessage(),
  }
);
```

Changing the step content after triggering the workflow with delay step will not affect the existing pending delayed notification content.

## [Frequently Asked Questions](https://docs.novu.co/#frequently-asked-questions)

### [If delay step fails, will the workflow continue to the next step?](https://docs.novu.co/#if-delay-step-fails-will-the-workflow-continue-to-the-next-step)

No, workflow execution will stop immediately if the delay step fails due to an error.

[Digest Action\\ \\ Learn how to use the Digest Engine to collect multiple events into a single message](https://docs.novu.co/framework/digest) [Custom Step\\ \\ Used to execute any custom code as a step in the workflow.](https://docs.novu.co/framework/custom)

### On this page

[Common usecases](https://docs.novu.co/#common-usecases) [Adding a delay step](https://docs.novu.co/#adding-a-delay-step) [Frequently Asked Questions](https://docs.novu.co/#frequently-asked-questions) [If delay step fails, will the workflow continue to the next step?](https://docs.novu.co/#if-delay-step-fails-will-the-workflow-continue-to-the-next-step)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/delay.mdx)Open in ChatGPTOpen in Claude