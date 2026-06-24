# Source: https://docs.novu.co/platform/workflow/advanced-features/contexts

Advanced Features

# Workflow Context

Learn what Contexts are in Novu, how they differ from payloads, and how they help you organize and personalize notifications across workflows.

_Contexts_ are flexible, user-defined data objects that help you organize and personalize your notifications. They let you attach metadata, such as tenant, region, or app details, and enable contextual behavior to workflows, notifications, and other entities across Novu.

![Contexts](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FContexts.0e14f84b.png&w=3840&q=75)

In simple terms, a context acts like an extended version of the payload. While the payload exists only for the duration of a single workflow execution, contexts are persistent and can be reused across multiple workflows or API calls. This makes them ideal for multi-tenant environments, dynamic branding, and use cases where notifications depend on shared or reusable data.

## [How context works](https://docs.novu.co/#how-context-works)

Context solves the common problem of sending differentiated notifications to the same subscriber without creating duplicate subscriber records or complex workarounds.

For example, if you have a single subscriber entity, `john@acme.com`, who uses two different applications you offer: "Notion Email" and "Notion Calendar". You want to send notifications specific to each application.

Without context, you might have to create two different subscribers or use workarounds with subscriber ID prefixes to differentiate the notifications.

```
// Problem: How does Novu know which app is sending the notification?
 
// Notion Email notification
await novu.trigger({
  workflowId: "workflowId",
  to: { subscriberId: 'john@acme.com' },
  payload: { title: 'You have 1 new email' }
});
 
// Notion Calendar notification  
await novu.trigger({  
  workflowId: "workflowId",
  to: 'john@acme.com',
  payload: { title: 'You have a new meeting invite' }
});
```

However, with context, you can provide this metadata directly in the trigger. This allows you to use a single workflow and subscriber entity, while dynamically changing content or logic based on the context.

```
// Solution: Pass an 'app' context to differentiate triggers.
 
// Notion Email notification
await novu.trigger({
  workflowId: "workflowId",
  to: { subscriberId: 'john@acme.com' },
  payload: { title: 'You have 1 new email' },
  context: {
    app: 'notion-email',
    branding: {
      logo: "url_for_email_logo.png"
    }
  }
});
 
// Notion Calendar notification  
await novu.trigger({
  workflowId: "workflowId",
  to: { subscriberId: 'john@acme.com' },
  payload: { title: 'You have a new meeting invite' },
  context: {
    app: 'notion-calendar',
    branding: {
      logo: "url_for_calendar_logo.png"
    }
  }
});
```

Here are some ways that you can use contexts:

- **Multi-tenancy and app routing**: Use a tenant or app context to dynamically alter notification content, branding, or logic for different customers or applications from a single workflow.
- **A/B testing**: Pass a campaign identifier in a context (for example, campaign: 'new-welcome-email-v2'). Use this in a condition step to split users into different notification paths and measure which performs better.
- **Data residency and compliance**: Use a region context to tag notifications with their origin. This can help in applying data retention policies or filtering data for compliance audits.

[Translations\\ \\ Learn how to translate your workflow step content into multiple languages](https://docs.novu.co/platform/workflow/advanced-features/translations) [Manage contexts\\ \\ Learn how to create, update, and delete contexts in Novu using the dashboard, or API.](https://docs.novu.co/platform/workflow/advanced-features/contexts/manage-contexts)

### On this page

[How context works](https://docs.novu.co/#how-context-works)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/workflow/advanced-features/contexts/index.mdx)Open in ChatGPTOpen in Claude