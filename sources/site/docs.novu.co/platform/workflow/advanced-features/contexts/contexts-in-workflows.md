# Source: https://docs.novu.co/platform/workflow/advanced-features/contexts/contexts-in-workflows

Advanced Features/[Contexts](https://docs.novu.co/platform/workflow/advanced-features/contexts)

# Personalize workflows and templates in Novu using context

Use contexts in Novu to personalize notification templates, control workflow logic, and customize the Inbox component.

Contexts let you personalize how notifications are rendered and delivered by making contextual data available inside template editors, step conditions, and the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context) component.

## [How to use context](https://docs.novu.co/#how-to-use-context)

Once a context is created either through the Novu dashboard or API, its data becomes available for use in your templates editors, step conditions, and for customizing the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context) component.

### [Using context data in the template editor](https://docs.novu.co/#using-context-data-in-the-template-editor)

Use the `{{context}}` Handlebars helper to access context data in any template editor. The context key you provide while creating the context (for example, tenant, region) becomes the accessor.

For example, if a context with this data is created:

```
{
  "context": {
    "tenant": {
      "id": "acme-corp",
      "data": {
        "name": "Acme Corporation",
        "plan": "enterprise"
      } 
    }
  }
}
```

You can access the `name` and `plan` in your in-app, email, SMS, or push template like this:

```
<p>Welcome, new user from {{context.tenant.data.name}}!</p>
<p>Your account is on the {{context.tenant.data.plan}} plan.</p>
```

Or

```
Welcome, new user from {{context.tenant.data.name}}!
Your account is on the {{context.tenant.data.plan}} plan.
```

![Using context data in the template editor](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontext.ad76577f.gif&w=3840&q=75)

Refer to the Inbox documentation, to learn how to use context in the [<Inbox />](https://docs.novu.co/platform/inbox/configuration/inbox-with-context) component.

### [Using context in step conditions](https://docs.novu.co/#using-context-in-step-conditions)

You can use context variables in the **Step conditions** tab of a workflow step to add conditional logic to your notifications. For example, only send a "Feature X is now enabled" email if `context.tenant.data.plan` is `enterprise`. ![Context step conditions](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontext-step-conditions.04602f43.png&w=3840&q=75)

To learn how contexts are structured or how to define them, refer to the [Managing Contexts](https://docs.novu.co/platform/workflow/advanced-features/contexts/manage-contexts) documentation.

## [Viewing and debugging contexts](https://docs.novu.co/#viewing-and-debugging-contexts)

Once you start using contexts in your workflows, Novu provides full observability so you can monitor and debug your context usage after a workflow has been triggered.

### [Searching for workflow runs](https://docs.novu.co/#searching-for-workflow-runs)

You can filter your workflow runs to find all executions associated with a specific context.

1. Navigate to the **Activity Feed** in your Novu dashboard.
2. Select the **Workflow Runs** tab.
3. In the search bar, click **Context** and enter the context `type` and `id` using the format `type:id`.

![Searching for workflow runs](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsearch-context-activityfeed.b40d2cc1.png&w=3840&q=75)

### [Verifying the resolved context](https://docs.novu.co/#verifying-the-resolved-context)

To confirm that Novu received and processed your context data correctly, you can inspect the API traces for a specific run.

1. From the **Activity Feed**, select the relevant workflow run from the list in the **Requests** tab.
2. In the workflow run details, go to the **API Traces** tab.

Here, you will see the full context object that was resolved and attached to that specific workflow execution.

![Verifying the resolved context](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fresolved-context.90e083f0.png&w=3840&q=75)

[Manage contexts\\ \\ Learn how to create, update, and delete contexts in Novu using the dashboard, or API.](https://docs.novu.co/platform/workflow/advanced-features/contexts/manage-contexts) [Overview\\ \\ Learn about the providers that Novu supports for Email, Push, SMS and Chant channels, and how to integrate them to send notifications and receive events.](https://docs.novu.co/platform/integrations)

### On this page

[How to use context](https://docs.novu.co/#how-to-use-context) [Using context data in the template editor](https://docs.novu.co/#using-context-data-in-the-template-editor) [Using context in step conditions](https://docs.novu.co/#using-context-in-step-conditions) [Viewing and debugging contexts](https://docs.novu.co/#viewing-and-debugging-contexts) [Searching for workflow runs](https://docs.novu.co/#searching-for-workflow-runs) [Verifying the resolved context](https://docs.novu.co/#verifying-the-resolved-context)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/workflow/advanced-features/contexts/contexts-in-workflows.mdx)Open in ChatGPTOpen in Claude