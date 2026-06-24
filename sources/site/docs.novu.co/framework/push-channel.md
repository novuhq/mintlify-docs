# Source: https://docs.novu.co/framework/push-channel

# Novu Framework Push Channel

Learn how to configure the Push channel

Push notifications are a powerful way to deliver real-time updates, reminders, and personalized messages to your users across mobile and web platforms. Whether it's a promotional alert, a system notification, or a critical update, push notifications are key to enhancing engagement and retention.

Learn more about the [Push Channel](https://docs.novu.co/platform/integrations/push)

```
await step.push('push', async () => {
  return {
    subject: 'You received a message',
    body: 'A new post has been created',
  };
});
```

[In-App\\ \\ Learn how to configure the In-App channel](https://docs.novu.co/framework/in-app-channel) [SMS\\ \\ Learn how to configure the SMS channel](https://docs.novu.co/framework/sms-channel)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/push-channel.mdx)Open in ChatGPTOpen in Claude