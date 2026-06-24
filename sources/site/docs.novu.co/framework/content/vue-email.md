# Source: https://docs.novu.co/framework/content/vue-email

# Vue Email Integration

Learn how to use Vue Email to build beautiful email templates

You can integrate Novu Framework with [Vue Email](https://vuemail.net/) in a few simple steps. This guide will walk you through the process of creating a new email template using Vue Email and Nuxt.

For a Quickstart Boilerplate project using Nuxt.js, and Vue Email, check out the [Vue Email Starter repository](https://github.com/novuhq/novu-framework-nuxt-example/)

## [Quickstart](https://docs.novu.co/#quickstart)

Install Vue.Email components

```
npm install @vue-email/components
```

Create templates folder

Create a new folder called `emails` in your `src` folder.

Update nuxt.config.ts File

```
export default defineNuxtConfig({
    build: {
        transpile: ['@vue/email'],
    },
    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
    },
});
```

Write your email

```
<script setup lang="ts">
import { VueEmail, Button, Container, Head, Html, Preview } from '@vue-email/components';
 
defineProps<{
    name: string;
}>();
</script>
 
<template>
    <VueEmail>
        <Html>
            <Head />
            <Preview>Welcome to Vue Email</Preview>
            <Container>
                <h1>Welcome, {{ name }}!</h1>
                <p>Thanks for trying Vue Email. We're thrilled to have you on board.</p>
            </Container>
        </Html>
    </VueEmail>
</template>
```

Write your workflow

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

## [Learn More](https://docs.novu.co/#learn-more)

To learn more, refer to [Vue Email documentation](https://vuemail.net/).

[Svelte Email\\ \\ Learn how to use Svelte Email to build beautiful email templates](https://docs.novu.co/framework/content/svelte-email) [Digest Action\\ \\ Learn how to use the Digest Engine to collect multiple events into a single message](https://docs.novu.co/framework/digest)

### On this page

[Quickstart](https://docs.novu.co/#quickstart) [Learn More](https://docs.novu.co/#learn-more)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/content/vue-email.mdx)Open in ChatGPTOpen in Claude