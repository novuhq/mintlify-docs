# Source: https://docs.novu.co/framework/payload

# Workflow Payload

Learn how to define and validate workflow payload schemas for data passed during the novu.trigger method.

Workflow payload is the data passed during the `novu.trigger` method. This is useful for ensuring that the payload is correctly formatted and that the data is valid.

## [Payload Schema](https://docs.novu.co/#payload-schema)

Payload schema is defining the payload passed during the `novu.trigger` method. This is useful for ensuring that the payload is correctly formatted and that the data is valid.

```
import { render } from '@react-email/components';
import { ReactEmailContent } from './ReactEmailContent';
 
workflow(
  'comment-on-post',
  async ({ step, payload }) => {
    await step.email('send-email', async () => {
      return {
        subject: `You have a new comment from: ${payload.author_name}.`,
        body: render(<ReactEmailContent comment={payload.comment} />),
      };
    });
  },
  {
    payloadSchema: {
      // Always `object`
      type: 'object',
      // Specify the properties to validate. Supports deep nesting.
      properties: {
        post_id: { type: 'number' },
        author_name: { type: 'string' },
        comment: { type: 'string', maxLength: 200 },
      },
      // Specify the array of which properties are required.
      required: ['post_id', 'comment'],
      // Used to enforce full type strictness, with no rogue properties.
      additionalProperties: false,
      // The `as const` is important to let Typescript know that this
      // type won't change, enabling strong typing on `inputs` via type
      // inference of the provided JSON Schema.
    } as const,
  }
);
```

## [Passing Payload](https://docs.novu.co/#passing-payload)

Here is an example of the validated payload during trigger:

```
novu.trigger({
  workflowId: "workflowId",
  to: { subscriberId: 'subscriber_id' },
  payload: {
    post_id: 1234,
    author_name: 'John Doe',
    comment: 'Looks good!',
  },
});
```

[Tags\\ \\ Learn how to implement and manage notification tags programmatically using the Novu Framework SDK.](https://docs.novu.co/framework/tags) [Controls\\ \\ Learn how to use Controls in your notification workflows](https://docs.novu.co/framework/controls)

### On this page

[Payload Schema](https://docs.novu.co/#payload-schema) [Passing Payload](https://docs.novu.co/#passing-payload)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/payload.mdx)Open in ChatGPTOpen in Claude