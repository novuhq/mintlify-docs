# Source: https://docs.novu.co/platform/integrations/demo-integration

# Demo Integrations

Learn about the default Novu Email and SMS provider.

Demo integrations are built-in, sandboxed providers for the email and SMS channels. Their purpose is to allow you to test your notification workflows immediately, without needing to sign up for or connect a real third-party provider.

When you create a Novu account, your environments come pre-configured with two demo email integrations and two demo SMS integrations. All demo integrations are active by default, and you can set any of them as the primary integration for their channel at any time from the **Integration Store**.

Demo integrations are only available in Novu cloud. This feature doesn't work in community self-hosted version and local environment.

## [Limits of the demo integrations](https://docs.novu.co/#limits-of-the-demo-integrations)

Demo integrations are intended strictly for testing and development. To ensure this, they operate with the following rules:

- Both the demo email and demo SMS integrations are limited to 300 notifications per month each.
- The demo Email integration can only send emails to the address associated with your logged-in Novu account. It does not deliver messages to any other email address.

## [How test using a demo integration](https://docs.novu.co/#how-test-using-a-demo-integration)

Demo integrations are active by default, so you can start testing in just a few steps.

The demo integrations are set as primary by default in new Novu environments.

1. Log in to the Novu dashboard.
2. Click **Workflows**.
3. Click **Create workflow** and [create a new workflow](https://docs.novu.co/platform/workflow/create-a-workflow).
4. Add two steps in the workflow: one for Email and one for SMS. ![Add step](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadd-step.b632ca26.png&w=3840&q=75)
5. Click **Test Workflow**. ![Test workflow](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftest-workflow.96ce3874.png&w=3840&q=75)
6. Verify the notification. There are two ways to confirm that your test was successful:
 - Check the activity feed or event logs to confirm if the notification was successfully sent to the various channels. ![Event logs](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fevent-logs.0c2a9a7e.png&w=3840&q=75)
 - Check the inbox of the email address and phone number you use for your Novu account. You should receive a real email and SMS from the demo integration.

## [Next step](https://docs.novu.co/#next-step)

Once you have finished testing with the demo integrations, select a channel below to find the list of all supported providers integrations and their guides:

[**Email**\\ \\ Integrate Email providers.](https://docs.novu.co/platform/integrations/email) [**SMS**\\ \\ Integrate SMS providers.](https://docs.novu.co/platform/integrations/sms) [**Push**\\ \\ Integrate Push providers.](https://docs.novu.co/platform/integrations/push) [**Chat**\\ \\ Integrate Chat providers.](https://docs.novu.co/platform/integrations/chat) [**In-App**\\ \\ Integrate In-app notifications.](https://docs.novu.co/platform/inbox)

[Overview\\ \\ Learn about the providers that Novu supports for Email, Push, SMS and Chant channels, and how to integrate them to send notifications and receive events.](https://docs.novu.co/platform/integrations) [Chat\\ \\ Configure and manage chat providers like Slack, Microsoft Teams, WhatsApp, and Discord with Novu's notification infrastructure.](https://docs.novu.co/platform/integrations/chat)

### On this page

[Limits of the demo integrations](https://docs.novu.co/#limits-of-the-demo-integrations) [How test using a demo integration](https://docs.novu.co/#how-test-using-a-demo-integration) [Next step](https://docs.novu.co/#next-step)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/demo-integration.mdx)Open in ChatGPTOpen in Claude