# Source: https://docs.novu.co/framework/email-channel

# Novu Framework Email Channel

Learn how to configure the Email channel

The Email Channel is a critical component for delivering notifications reliably. Whether it's a password reset, an onboarding email, or an alert about account activity, email remains a trusted medium for reaching users. Novu simplifies this process, allowing you to focus on implementation rather than infrastructure.

Learn more about the [Email Channel](https://docs.novu.co/platform/integrations/email).

```
await step.email('email', async () => {
  return {
    subject: 'You received a message',
    body: 'A new post has been created',
  };
});
```

[Controls\\ \\ Learn how to use Controls in your notification workflows](https://docs.novu.co/framework/controls) [In-App\\ \\ Learn how to configure the In-App channel](https://docs.novu.co/framework/in-app-channel)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/email-channel.mdx)Open in ChatGPTOpen in Claude