# Source: https://docs.novu.co/framework/content/svelte-email

# Svelte Email Integration

Learn how to use Svelte Email to build beautiful email templates

Integrating Novu Framework with [Svelte email](https://react.email/) for your Svelte application can be done in three steps. If you don't have an app, you can [clone our Svelte example](https://github.com/novuhq/novu-svelte-email).

Install Svelte email components

Install the required Svelte email components.

```
  npm install svelte-email
```

Create email templates folder

Create a new folder called `emails` in your `src` folder.

Write your email

Create a new file called `test-email.svelte` in your `emails` folder.

```
<script lang="ts">
    import {
        Body,
        Container,
        Head,
        Html,
        Preview,
    } from 'svelte-email';
 
    export let name: string;
</script>
 
<Html>
    <Head />
    <Preview>Welcome to Svelte Email</Preview>
    <Body>
        <Container>
            <h1>Welcome, {name}!</h1>
            <p>Thanks for trying Svelte Email. We're thrilled to have you on board.</p>
        </Container>
    </Body>
</Html>
```

Create a new file called `test-email.ts` in your `emails` folder.

```
import { render } from 'svelte-email';
import TestEmail from './test-email.svelte';
 
export function renderEmail(name: string) {
    return render({
        template: TestEmail,
        props: {
            name,
        },
    });
}
```

Write your workflow

Define your workflow using the above template

```
import { workflow } from '@novu/framework';
import { renderEmail } from './emails/test-email';
import { z } from 'zod';
 
export const testWorkflow = workflow('test-workflow', async ({ step, payload }) => {
    await step.email('send-email', async (controls) => {
        return {
            subject: controls.subject,
            body: renderEmail(payload.userName),
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

[Remix & React Email\\ \\ Learn how to integrate React Email with Novu Framework in a Remix application](https://docs.novu.co/framework/content/remix-react-email) [Vue Email\\ \\ Learn how to use Vue Email to build beautiful email templates](https://docs.novu.co/framework/content/vue-email)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/content/svelte-email.mdx)Open in ChatGPTOpen in Claude