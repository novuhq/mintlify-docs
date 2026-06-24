# Source: https://docs.novu.co/framework/schema/zod

# Zod Schema Validation

Learn how to integrate Zod with Novu Framework

Novu Framework allows you to use [Zod](https://zod.dev/) to define the [Control](https://docs.novu.co/framework/controls) and [Payload](https://docs.novu.co/framework/payload) schemas for your workflows. _(Supports Zod v3)_

## [Add Zod to your project](https://docs.novu.co/#add-zod-to-your-project)

Install Zod Packages

```
npm install zod
```

Novu Framework supports Zod v3. Make sure you're using this version for optimal performance and feature support.

Use Zod in your workflow

```
import { workflow } from '@novu/framework';
import { z } from 'zod';
 
export const testWorkflow = workflow('test-workflow', async ({ step, payload }) => {
    await step.email('send-email', async (controls) => {
        return {
            subject: controls.subject,
            body: 'Hello World',
        };
    },
    {
        controlSchema: z.object({
            subject: z.string().default('A Successful Test on Novu from {{userName}}'),
        }),
    });
}, {
    payloadSchema: z.object({
        userName: z.string().default('John Doe'),
    }),
});
```

## [Controls and Payload UI](https://docs.novu.co/#controls-and-payload-ui)

When you define a `controlSchema` for a step, Novu will automatically generate a UI for the controls in the workflow editor.

- **Form Input Title** - Will be derived from the key of the Zod schema. Unfortunately Zod does not support custom titles at this point.
- **Form Input Type** - Will be derived from the Zod schema type, with support for `string`, `number`, `boolean`, and `enum` and `array` types.
- **Default Value** - Will be derived from the Zod schema default value.
- **Validation** - Will be derived from the Zod schema validation rules, including `min`, `max`, `email`, `url`, `regex` and etc...

[SMS\\ \\ Learn how to use the SMS step to send text messages to users](https://docs.novu.co/framework/typescript/steps/sms) [JSON Schema\\ \\ Learn how to use JSON Schema to define the workflow payload and step inputs](https://docs.novu.co/framework/schema/json-schema)

### On this page

[Add Zod to your project](https://docs.novu.co/#add-zod-to-your-project) [Controls and Payload UI](https://docs.novu.co/#controls-and-payload-ui)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/schema/zod.mdx)Open in ChatGPTOpen in Claude