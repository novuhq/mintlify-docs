# Source: https://docs.novu.co/framework/quickstart/nuxt

Quickstart

# Nuxt Framework Quickstart Guide

Get started with Novu Framework in a Nuxt application

In this guide, we will add a Novu [Bridge Endpoint](https://docs.novu.co/framework/endpoint) to a Nuxt application and send our first test workflow.

## [Set up your local environment](https://docs.novu.co/#set-up-your-local-environment)

Start the Local Studio by running:

```
npx novu dev
```

The Local Studio will be available at: [http://localhost:2022](http://localhost:2022). This is where you can preview and test your workflows.

## [Install packages](https://docs.novu.co/#install-packages)

Install the Novu Framework package:

```
npm install @novu/framework
```

This package provides all the necessary tools to build and manage your notification workflows.

## [Add a Novu API Endpoint](https://docs.novu.co/#add-a-novu-api-endpoint)

```
import { serve } from '@novu/framework/nuxt';
import { testWorkflow } from "../novu/workflows";
 
export default defineEventHandler(serve({ workflows: [myWorkflow] }));
```

## [Configure your secret key](https://docs.novu.co/#configure-your-secret-key)

.env

```
NOVU_SECRET_KEY=your_secret_key
```

## [Create your workflow definition](https://docs.novu.co/#create-your-workflow-definition)

Add a `novu` folder in your app folder as such `app/server/api/novu.ts` that will contain your workflow definitions.

app/novu/workflows.ts

```
import { workflow } from '@novu/framework';
 
export const testWorkflow = workflow('test-workflow', async ({ step }) => {
  await step.email('test-email', async () => {
    return {
      subject: 'Test Email',
      body: 'This is a test email from Novu Framework!',
    };
  });
});
```

 

## [Start your application](https://docs.novu.co/#start-your-application)

Start your Nuxt application with the Novu Endpoint configured.

```
cd my-novu-app && npm run dev
```

If your Nuxt application is running on other than `4000` port, restart the `npx novu dev` command with the port:

```
npx novu@latest dev --port <YOUR_NUXT_APPLICATION_PORT>
```

## [Test your endpoint](https://docs.novu.co/#test-your-endpoint)

Test your workflow by triggering it from the Local Studio or using the Novu API:

```
curl -X  POST https://api.novu.co/v1/events/trigger   -H 'Authorization: ApiKey YOUR_API_KEY'    -H 'Content-Type: application/json'    -d '{
    "name": "my-workflow",
    "to": "subscriber-id",
    "payload": {}
  }'
```

You should see the notification being processed in your Local Studio.

## [Deploy your application](https://docs.novu.co/#deploy-your-application)

Deploy your application to your preferred hosting provider. Make sure the `/api/novu` endpoint is accessible from the internet.

For local development and testing, you can use tools like ngrok to expose your local server to the internet.

Now that you have your first workflow running, you can:

- Learn about [Workflow Controls](https://docs.novu.co/framework/controls) to expose no-code editing capabilities
- Explore different [Channel Steps](https://docs.novu.co/framework/email-channel) like Email, SMS, Push, and more
- Set up [Action Steps](https://docs.novu.co/framework/digest) like Delay and Digest
- Check out our [React Email integration](https://docs.novu.co/framework/content/react-email) for building beautiful email templates

[SvelteKit\\ \\ Get started with Novu Framework in a SvelteKit application](https://docs.novu.co/framework/quickstart/svelte) [H3\\ \\ Get started with Novu Framework in an H3 application](https://docs.novu.co/framework/quickstart/h3)

### On this page

[Set up your local environment](https://docs.novu.co/#set-up-your-local-environment) [Install packages](https://docs.novu.co/#install-packages) [Add a Novu API Endpoint](https://docs.novu.co/#add-a-novu-api-endpoint) [Configure your secret key](https://docs.novu.co/#configure-your-secret-key) [Create your workflow definition](https://docs.novu.co/#create-your-workflow-definition) [Start your application](https://docs.novu.co/#start-your-application) [Test your endpoint](https://docs.novu.co/#test-your-endpoint) [Deploy your application](https://docs.novu.co/#deploy-your-application)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/quickstart/nuxt.mdx)Open in ChatGPTOpen in Claude