# Source: https://docs.novu.co/platform/workflow/create-a-workflow

# How to create a Workflow in Novu

Create a workflow and define its identifier, metadata, and initial configuration.

A workflow defines how Novu delivers notifications for a specific event. It contains the steps, templates, and rules that control how messages are sent across channels.

You can create workflows in the Novu dashboard, using the [Novu API](https://docs.novu.co/api-reference/workflows/create-a-workflow) or define them in code using the [Novu Framework](https://docs.novu.co/framework/introduction#create-a-workflow). This guide focuses on creating workflows in the Novu dashboard.

Workflows can only be created and managed in the development environment. Once created, workflows can be synced to other environments. To learn more, refer to [Environments](https://docs.novu.co/platform/developer/environments#publishable-assets).

## [Create a workflow](https://docs.novu.co/#create-a-workflow)

You can create a Novu workflow in the following ways:

- **Create from scratch**: Build a custom workflow tailored to your exact needs.
- **Create from template**: Start with pre-built workflows for common use cases.

### [Create a workflow from scratch](https://docs.novu.co/#create-a-workflow-from-scratch)

1. Go to the [Novu Dashboard](https://dashboard.novu.co).
2. Navigate to **Workflows**.
3. Click **Create workflow**. 
 ![Create a workflow](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-a-workflow.6970a99d.png&w=3840&q=75)
4. Fill in the [workflow details](https://docs.novu.co/#workflow-details):
 - **Name** (Required): The display name shown in the dashboard. You can change this later in the workflow editor.
 - **Identifier** (Required): The `workflowId` is immutable. It must be in a valid slug format (letters, numbers, hyphens, dots and underscores only) and must be unique within one environment.
 
 The `workflowId` is required when triggering a workflow and when using [trigger overrides](https://docs.novu.co/platform/integrations/trigger-overrides). It is also used to conditionally display notifications in the [<Inbox />](https://docs.novu.co/platform/inbox).
 
 - **Tags** (Optional): Organize and categorize workflows. Tags can be added later in the workflow editor.
 
 To learn more about Tags, refer to [workflow tags](https://docs.novu.co/platform/workflow/configure-workflow#tags).
 
 - **Description** (Optional): Document the workflow’s purpose and behavior for your team. Description can be added later in the workflow editor. ![Create workflow](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-workflow.eedf3ffb.png&w=3840&q=75)
5. **Enable translations** (Optional): Support multiple locales for this workflow. This can be enabled after workflow creation in the workflow editor.
 
 To learn more about translations, refer to [Translations](https://docs.novu.co/platform/workflow/advanced-features/translations).
 
6. Click **Create workflow**.

After creating the workflow, you’re redirected to the Workflow Editor, where you can configure the workflow and add steps.

### [Create a workflow from a template](https://docs.novu.co/#create-a-workflow-from-a-template)

Templates are pre-built workflows for common notification scenarios. They include pre-configured steps, sample content, and pre-filled workflow details that you can customize.

To create a workflow from a template:

1. Go to the [Novu Dashboard](https://dashboard.novu.co).
2. Navigate to **Workflows**.
3. From the **Workflows** page, you can access templates in two ways:
 - Click the icon on the **Create workflow** button and select **From template**. ![Create from template](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-from-template.576e3833.png&w=3840&q=75)
 - Click **Explore templates**. ![Create from explore](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-from-explore.7cd02fb7.png&w=3840&q=75)
4. Select a template.
5. Click **Create workflow**.

## [Manage workflows](https://docs.novu.co/#manage-workflows)

Once created, you can manage workflows from the Workflows page:

### [Update a workflow](https://docs.novu.co/#update-a-workflow)

After creating a workflow, you can modify its configuration at any time from the workflow editor. This allows you to evolve notification logic without creating a new workflow.

Click on any workflow to open the workflow editor, where you can:

- Update name and description (identifier cannot be changed)
- Add or remove the workflow tags.
- Change [workflow status](https://docs.novu.co/platform/workflow/configure-workflow#workflow-status).
- Configure [channel preferences](https://docs.novu.co/platform/workflow/configure-workflow#channel-preferences) and [payload schema](https://docs.novu.co/platform/workflow/configure-workflow#payload-schema).
- Add, remove, or reorder [steps](https://docs.novu.co/platform/workflow/add-and-configure-steps#add-a-step-to-a-workflow).

### [Duplicate a workflow](https://docs.novu.co/#duplicate-a-workflow)

Duplicating a workflow lets you reuse an existing configuration as a starting point for a new workflow. This is useful when workflows share similar logic but differ in trigger identifiers, content, or steps.

1. Find the workflow in **Workflows** page.
2. Click the three-dot menu (•••).
3. Select **Duplicate workflow**.
4. Provide a new name and identifier. ![Duplicate a workflow](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fduplicate-workflow.29f4214b.png&w=3840&q=75)
5. Click **Duplicate Workflow**. ![Duplicate workflow](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fduplicate-a-workflow.3ded98cd.png&w=3840&q=75)

### [Delete a workflow](https://docs.novu.co/#delete-a-workflow)

Deleting a workflow is permanent and cannot be undone. Any existing triggers referencing the deleted workflow will fail with a `workflow not found` error. Execution history is preserved in the [Novu Activity Feed](https://docs.novu.co/platform/workflow/monitor-and-debug-workflow).

1. Find the workflow in **Workflows** page.
2. Click the three-dot menu (•••).
3. Select **Delete**.
4. Confirm deletion.

[Overview\\ \\ Learn how to create, configure, and work with notification workflows in Novu.](https://docs.novu.co/platform/workflow) [Configure Workflow\\ \\ Configure workflow metadata, delivery preferences, and payload schema in the workflow editor.](https://docs.novu.co/platform/workflow/configure-workflow)

### On this page

[Create a workflow](https://docs.novu.co/#create-a-workflow) [Create a workflow from scratch](https://docs.novu.co/#create-a-workflow-from-scratch) [Create a workflow from a template](https://docs.novu.co/#create-a-workflow-from-a-template) [Manage workflows](https://docs.novu.co/#manage-workflows) [Update a workflow](https://docs.novu.co/#update-a-workflow) [Duplicate a workflow](https://docs.novu.co/#duplicate-a-workflow) [Delete a workflow](https://docs.novu.co/#delete-a-workflow)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/workflow/create-a-workflow.mdx)Open in ChatGPTOpen in Claude