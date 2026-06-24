# Source: https://docs.novu.co/framework/tags

# Workflow Tags

Learn how to implement and manage notification tags programmatically using the Novu Framework SDK.

**Tags** act like labels or categories that help you organize and manage notifications in your app. By grouping notifications under specific tags, you can better control how they're filtered, displayed, or managed by both your app and your users.

[Learn more about why and how to use tags](https://docs.novu.co/platform/workflow/configure-workflow#tags)

## [How to Add Tags to Notifications](https://docs.novu.co/#how-to-add-tags-to-notifications)

Adding tags to a notification is simple and can be done directly in the workflow configuration. Here's an example:

```
import { workflow } from '@novu/framework';
 
workflow(
  'acme-login-alert',
  async ({ step, payload }) => {
    await step.inApp('inbox', async () => {
      return {
        subject: 'New Login Detected',
        body: "We noticed a login from a new device or location. If this wasn't you, change your password immediately.",
      };
    });
  },
  {
    tags: ['security'],
  }
);
 
workflow(
  'acme-password-change',
  async ({ step, payload }) => {
    await step.inApp('inbox', async () => {
      return {
        subject: 'Password Changed',
        body: "Your password was successfully updated. If you didn't request this, contact support right away.",
      };
    });
  },
  {
    tags: ['security'],
  }
);
```

Let's break it down: In the above workflows, whenever someone logs in from a new device, or changes their password, the notification is tagged as security.

**Benefits:**

- **Filtered Views**: Users can quickly locate security-related notifications in their inbox.
- **Custom Preferences**: Users who only want security alerts can opt in or out of that tag category.

[Bridge Endpoint\\ \\ Learn how to configure the Novu Bridge Endpoint, the single HTTP endpoint your application exposes to communicate with the Novu Worker Engine.](https://docs.novu.co/framework/endpoint) [Payload\\ \\ Learn how to define and validate workflow payload schemas for data passed during the novu.trigger method.](https://docs.novu.co/framework/payload)

### On this page

[How to Add Tags to Notifications](https://docs.novu.co/#how-to-add-tags-to-notifications)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/tags.mdx)Open in ChatGPTOpen in Claude