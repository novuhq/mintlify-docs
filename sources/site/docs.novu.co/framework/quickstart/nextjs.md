# Source: https://docs.novu.co/framework/quickstart/nextjs

Quickstart

# Next.js Framework Quickstart Guide

Get started with Novu Framework in a Next.js application

In this guide, we will add a Novu [Bridge Endpoint](https://docs.novu.co/framework/endpoint) to a Next.js application and send our first test workflow.

Create a Next.js application

This link can be copied right from the onboarding guide on the Novu Studio or can always be copied from the [API Keys](https://dashboard.novu.co/api-keys) page on the Novu Dashboard.

```
npx novu init --secret-key=<YOUR_NOVU_SECRET_KEY>
```

The sample application will create an `.env` file containing the `NOVU_SECRET_KEY` environment variable required for securing your endpoint. And a sample workflow demonstrating the flexibility of Novu using Step Controls.

### Manually add to an existing application (5 minutes)

## [Start your application](https://docs.novu.co/#start-your-application)

To start your boilerplate Next.js server with the Novu Endpoint configured, run the following command:

```
cd my-novu-app && npm run dev
```

The sample application will start on [`https://localhost:4000`](https://localhost:4000) and your novu endpoint will be exposed at `/api/novu` served by the Next.js API.

If your Next.js application is running on other than `4000` port, restart the `novu dev` command with the port:

```
npx novu@latest dev --port <YOUR_NEXTJS_APPLICATION_PORT>
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

[Introduction\\ \\ Discover how the Novu Framework empowers you to build, customize, and manage advanced notification workflows with a mix of code and no-code capabilities.](https://docs.novu.co/framework/introduction) [Express\\ \\ Get started with Novu Framework in an Express application](https://docs.novu.co/framework/quickstart/express)

### On this page

[Start your application](https://docs.novu.co/#start-your-application) [Test your endpoint](https://docs.novu.co/#test-your-endpoint) [Deploy your application](https://docs.novu.co/#deploy-your-application)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/quickstart/nextjs.mdx)Open in ChatGPTOpen in Claude