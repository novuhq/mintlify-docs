# Source: https://docs.novu.co/platform/inbox/advanced-features/multi-tenancy

Advanced Features

# Inbox Multi-tenancy Configuration

Learn how to use context to implement multi-tenant notifications to support different organizations or workspaces within your application.

Multi-tenancy in Novu lets you isolate notifications for different organizations, environments, or workspaces within the same Novu project. Instead of creating separate subscribers or workflows for each tenant, you can use [Contexts](https://docs.novu.co/platform/workflow/advanced-features/contexts) to define and manage tenant boundaries.

This guide assumes you already understand what Contexts are. If not, start with the [Contexts](https://docs.novu.co/platform/workflow/advanced-features/contexts) documentation.

## [How multi-tenancy works in Novu](https://docs.novu.co/#how-multi-tenancy-works-in-novu)

Multi-tenancy in Novu is built on top of Contexts, which act as lightweight tags that group notifications by logical boundaries such as tenants, workspaces, or environments.

When a notification is triggered with a tenant context, Novu automatically associates all notifications and preferences with that tenant. The same tenant context passed to the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context) filters notifications for that specific organization, ensuring users only see messages relevant to their workspace.

## [How to implement multi-tenancy in Novu](https://docs.novu.co/#how-to-implement-multi-tenancy-in-novu)

Implementing a multi-tenant system involves a few key steps:

### [Define a tenant context](https://docs.novu.co/#define-a-tenant-context)

A Tenant Context is a JSON object that identifies a specific tenant and can store any related data you need, such as company name, logo, or plan type.

You can create a tenant context using the Novu dashboard, API or from the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context). if it doesn’t already exist, Novu automatically creates it.

Here are ways you can pass context:

```
// Simple tenant ID
 
context: {
  tenant: 'acme-corp' 
}
 
// Rich tenant object
 
context: {
  tenant: {
    id: 'acme-corp',
    data: {
      name: 'Acme Corporation',
      logo: 'https://cdn.acme.com/logo.png'
    }
  }
}
```

You can also manage all tenant contexts centrally from the Novu dashboard or API.

To learn more about creating, updating, and deleting contexts, see the [Manage Contexts](https://docs.novu.co/platform/workflow/advanced-features/contexts) guide.

### [Applying tenant context in workflows](https://docs.novu.co/#applying-tenant-context-in-workflows)

Once you’ve defined your tenant context, you can use it when triggering workflows. During workflow trigger, Novu first checks if that context already exists.

If not, Novu automatically creates it — but if it does exist, Novu reuses the existing record instead of updating it, to prevent accidental overwrites.

```
import { novu } from './client';
 
await novu.trigger({
  workflowId: "workflowId",
  to: {
    subscriberId: 'user-123',
  },
  payload: {
    amount: '$250',
    plan: 'Pro',
  },
  context: {
    tenant: {
      id: 'acme-corp',
      data: {
        name: 'Acme Corporation',
        plan: 'enterprise',
      },
    },
  },
});
```

In this example:

- The tenant context identifies the organization (“Acme Corporation”).
- Notifications triggered with this tenant context will be isolated to that tenant’s workspace.
- The same tenant ID must be passed to the Inbox to display these notifications.

Learn more about applying Context in workflows in [Contexts in Workflows](https://docs.novu.co/platform/workflow/advanced-features/contexts/contexts-in-workflows) documentation.

### [Filter the Inbox by tenant](https://docs.novu.co/#filter-the-inbox-by-tenant)

Once your workflows are sending tenant-scoped notifications, you can filter the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context) so that each subscriber only sees notifications relevant to their tenant.

This is done by passing the same tenant context used in your workflow triggers to the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context).

```
import { Inbox } from '@novu/react';
 
<Inbox
  applicationIdentifier="APPLICATION_IDENTIFIER"
  subscriber="SUBSCRIBER_ID"
  context={{
    tenant: {
      id: 'acme-corp',
      data: {
        name: 'Acme Corporation',
        plan: 'enterprise',
      },
    },
  }}
/>
```

In this setup:

- The [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context) filters notifications based on an exact context match.
- Only notifications triggered with tenant: `{ id: 'acme-corp' }` will appear in the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context).
- Notifications from other tenants are automatically excluded.

If the tenant context doesn’t already exist in Novu, the Inbox will automatically find or create it. Learn more in [Inbox with Context](https://docs.novu.co/platform/inbox/configuration/inbox-with-context).

### [Customize notification content based on tenant](https://docs.novu.co/#customize-notification-content-based-on-tenant)

With contexts, you can use tenant-level data to dynamically personalize notification content, branding, and workflow logic, all from a single workflow definition.

This eliminates the need to duplicate workflows or templates for each tenant while still keeping the experience distinct and relevant.

#### [Using tenant data in templates](https://docs.novu.co/#using-tenant-data-in-templates)

Once a tenant context is created, its data becomes accessible in all template editors (email, in-app, SMS, and push) through the `{{context}}` helper.

#### [Dynamic logic per tenant](https://docs.novu.co/#dynamic-logic-per-tenant)

You can also use tenant context data to control conditional logic inside your workflows. For example, you may want to send certain updates only to enterprise tenants.

To learn more about customizing notification content with context, refer to the [Contexts in Workflows](https://docs.novu.co/platform/workflow/advanced-features/contexts/contexts-in-workflows) documentation.

[Localization\\ \\ Learn how to customize the Inbox UI for different languages using the localization prop.](https://docs.novu.co/platform/inbox/advanced-features/localization) [Headless Mode\\ \\ Learn how to build custom Inbox UI for your application using Novu custom hooks](https://docs.novu.co/platform/inbox/headless-mode)

### On this page

[How multi-tenancy works in Novu](https://docs.novu.co/#how-multi-tenancy-works-in-novu) [How to implement multi-tenancy in Novu](https://docs.novu.co/#how-to-implement-multi-tenancy-in-novu) [Define a tenant context](https://docs.novu.co/#define-a-tenant-context) [Applying tenant context in workflows](https://docs.novu.co/#applying-tenant-context-in-workflows) [Filter the Inbox by tenant](https://docs.novu.co/#filter-the-inbox-by-tenant) [Customize notification content based on tenant](https://docs.novu.co/#customize-notification-content-based-on-tenant) [Using tenant data in templates](https://docs.novu.co/#using-tenant-data-in-templates) [Dynamic logic per tenant](https://docs.novu.co/#dynamic-logic-per-tenant)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/advanced-features/multi-tenancy.mdx)Open in ChatGPTOpen in Claude