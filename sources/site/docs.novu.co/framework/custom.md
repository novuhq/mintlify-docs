# Source: https://docs.novu.co/framework/custom

# Custom Action Step

Used to execute any custom code as a step in the workflow.

A custom steps allows to execute any custom logic and persist in the durable execution context. The result of this step can be used in subsequent steps.

## [Common usecases](https://docs.novu.co/#common-usecases)

- Making an API call to 3rd party service
- Fetch data from a database to be used in subsequent steps
- Execute a custom logic to transform data
- Custom provider implementation

## [Custom Step Interface](https://docs.novu.co/#custom-step-interface)

```
const stepResult = await step.custom(
  'custom-step',
  async () => {
    return {
      item_name: 'A product name',
      item_price: 100,
    };
  },
  {
    outputSchema: {
      type: 'object',
      properties: {
        item_name: { type: 'string' },
        item_price: { type: 'number' },
      },
      required: ['item_name', 'item_price'],
    },
  }
);
```

### [Output Schema Definition](https://docs.novu.co/#output-schema-definition)

This JSON Schema definition is used to validate the output of the custom step. If the output does not match the schema, the workflow will fail. Novu Framework will infer the Typescript interface from the JSON Schema definition.

### [Return Value](https://docs.novu.co/#return-value)

The Custom Step function should return a valid serializable object. The return value will be persisted in the durable execution context.

## [Using the Custom Step Result](https://docs.novu.co/#using-the-custom-step-result)

The result can only be used in the `resolver` of the step/providers/skip functions of subsequent steps.

```
workflow('hello-world-workflow', async ({ payload }) => {
  const task = await step.custom(
    'fetch-db-data',
    async () => {
      const taskData = db.fetchTask(payload.task_id);
      return {
        task_id: taskData.id,
        task_title: taskData.title,
        complete: taskData.complete,
      };
    },
    {
      outputSchema: {
        type: 'object',
        properties: {
          task_title: { type: 'string' },
          task_id: { type: 'string' },
          complete: { type: 'boolean' },
        },
        required: ['task_id', 'complete'],
      },
    }
  );
 
  await step.email(
    'send-email',
    () => {
      return {
        subject: `Task reminder for ${task.task_title}`,
        body: 'Task is not yet complete. Please complete the task.',
      };
    },
    {
      // Only send the reminder E-mail if the task is not complete
      skip: () => !task.complete,
    }
  );
});
```

To read more about the full list of parameters, check out the [full SDK reference](https://docs.novu.co/framework/typescript/steps/custom).

[Delay Action\\ \\ Learn how to use Delay steps in your notification workflows](https://docs.novu.co/framework/delay) [Skip Function\\ \\ Skip any step of the workflow based on a condition](https://docs.novu.co/framework/skip)

### On this page

[Common usecases](https://docs.novu.co/#common-usecases) [Custom Step Interface](https://docs.novu.co/#custom-step-interface) [Output Schema Definition](https://docs.novu.co/#output-schema-definition) [Return Value](https://docs.novu.co/#return-value) [Using the Custom Step Result](https://docs.novu.co/#using-the-custom-step-result)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/custom.mdx)Open in ChatGPTOpen in Claude