# Source: https://docs.novu.co/framework/skip

# Novu Framework Skip Function

Skip any step of the workflow based on a condition

The `skip` action is used to skip the next step in the workflow. `skip` function is available for all the steps in the workflow.

## [Common usecases](https://docs.novu.co/#common-usecases)

- Skip the step if the user has already seen the notification
- Skip the step if the user has not completed the previous step

## [Example](https://docs.novu.co/#example)

In this example, we will send an in-app notification for task reminder to the user and then send an email reminder 6 hours later if the user has not read the in-app notification.

```
workflow('skip-email-if-in-app-notification-seen', async ({ payload }) => {
  const inAppNotification = await step.inApp(
    'send-in-app-notification',
    async () => {
      return {
        subject: 'Task reminder!',
        body: 'Task is not yet complete. Please complete the task.',
      };
    },
  );
 
  // delay for 6 hrs
  await step.delay("delay-step-before-email", async () => {
    return {
      unit: 'hours',
      amount: 6,
    };
  });
 
  // send email notification after 6 hrs if the in-app notification has not been read
  await step.email(
    'send-email',
    () => {
      return {
        subject: `Task reminder!`,
        body: 'Task is not yet complete. Please complete the task.',
      };
    },
    {
      // skip the email step if the in-app notification has been read
      skip: () => inAppNotification.read === true,
    }
  );
});
```

[Custom Step\\ \\ Used to execute any custom code as a step in the workflow.](https://docs.novu.co/framework/custom) [Overview\\ \\ Learn how to use Novu's TypeScript SDK to build type-safe notification workflows with advanced features like payload validation and step controls.](https://docs.novu.co/framework/typescript/overview)

### On this page

[Common usecases](https://docs.novu.co/#common-usecases) [Example](https://docs.novu.co/#example)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/skip.mdx)Open in ChatGPTOpen in Claude