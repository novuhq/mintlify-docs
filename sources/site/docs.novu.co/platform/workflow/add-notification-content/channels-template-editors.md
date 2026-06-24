# Source: https://docs.novu.co/platform/workflow/add-notification-content/channels-template-editors

Add Notification Content

# Template Editors

Learn how to design and configure notification content for email, in-app, push, and SMS.

The channel template editors are where you define the content of the notification that is delivered to your subscribers when a workflow runs.

Each channel exposes an editor aligned with how messages are delivered on that channel:

- **SMS and chat**: Body field only
- **Push, email, and in-app**: Subject and body fields

All editors (including the Subject field editors) support variables and dynamic data that can be used to [personalize notification content](https://docs.novu.co/platform/workflow/add-notification-content/personalize-content). Notification preview is also supported on all editors.

While some channel editors share common features, some channels expose additional channel-specific features that can be used to configure and customize the notification content for that channel.

Variables autocomplete is supported in all channel template editors

## [In-app template editor](https://docs.novu.co/#in-app-template-editor)

The in-app template editor defines how notifications appear inside your application through the Novu [<Inbox />](https://docs.novu.co/platform/inbox). In-app notifications are UI-driven, not just message-driven. This means that the template is responsible for both content and interaction.

To learn how in-app notifications are rendered and displayed in your application, see the [<Inbox />](https://docs.novu.co/platform/inbox) documentation.

The template editor lets you control what users see, how they act on it, and how it appears in your application and consists of the following configurable fields:

![Template fields](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftemplate-fields.4d702235.gif&w=3840&q=75)

### [Disable content sanitization](https://docs.novu.co/#disable-content-sanitization)

By default, Novu sanitizes both the subject and body fields to prevent unsafe HTML from being rendered. This includes sanitizing:

- Suspicious HTML tags.
- HTML entities such as `<`, `>`, and `&`.

You should only disable content sanitization when:

- You fully trust the trigger payload.
- You control all dynamic data sources.

Disabling sanitization can expose your application to security risks such as XSS attacks. Only disable this option when using trusted data sources.

### [Avatar customization](https://docs.novu.co/#avatar-customization)

You can control how the notification avatar is displayed using one of the following methods:

- Provide a custom avatar URL.
- Select from the available built-in icons.

![Customize Avatar](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcustomize-avatar.3c1d951a.gif&w=3840&q=75)

### [Action buttons](https://docs.novu.co/#action-buttons)

In-app notifications support primary and secondary actions. For each action, you can configure:

- Button text
- Redirect URL
- Navigation targets (`_self`, `_blank`, `_parent`, `_top`, and `_unfencedTop`)

![Action buttons](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faction-button.c5cc829d.gif&w=3840&q=75)

Actions allow users to respond directly from the Inbox without navigating elsewhere in the UI.

### [Redirect URL](https://docs.novu.co/#redirect-url)

The redirect URL defines where the user is navigated when the notification itself is clicked.

You can:

- Define a static or dynamic URL.
- Control navigation behavior using targets.
- Omit the redirect URL and handle clicks using the `onNotificationClick` handler in the [<Inbox />](https://docs.novu.co/platform/inbox) component.

This enables full control over client-side navigation behavior.

### [Data object](https://docs.novu.co/#data-object)

The data object is a customizable key-value store available in the in-app step. You can use it to extend each Inbox component notification by embedding custom data.

To learn more about how to use the data object to customize how messages appear in the [<Inbox />](https://docs.novu.co/platform/inbox), refer to the [Data Object](https://docs.novu.co/platform/inbox/configuration/data-object) documentation.

## [Email template editor](https://docs.novu.co/#email-template-editor)

The email template editor defines how email notifications are structured, rendered, and delivered. Novu dashboard provides multiple authoring modes:

You can submit custom HTML email templates via the Novu API. This method supports workflows where you render templates externally and use Novu purely for delivery.

### [Block editor](https://docs.novu.co/#block-editor)

The block editor is a `WYSIWYG` editor that allows you to create and edit email templates. It has two fields: subject and body.

A block can be added by clicking on the plus (+) icon in the top-left corner of body field or by adding a forward slash (`/`). In both cases, a menu appears with the list of supported blocks:

### Supported Content Blocks

You can duplicate or delete blocks using the block menu controls.

Once you switch from block editor to code editor, you can’t go back to the block editor unless you reset the template.

#### [Custom HTML block](https://docs.novu.co/#custom-html-block)

The custom HTML block allows you to insert raw HTML inside a block editor layout.

- Allows injecting variables using `{{ ... }}`
- Supports LiquidJS control structures like `{% for %}` or `{% if %}`

Use this block when you need inline markup control within a visual layout, but don't require full LiquidJS logic.

#### [Repeat block](https://docs.novu.co/#repeat-block)

The repeat block lets you iterate over an array and render its child blocks for each item in that array. It works similarly to a JavaScript `for` loop and is used for displaying structured or repeated data such as order items, activity feeds, or grouped records.

When the workflow runs, Novu evaluates the array you provide and repeats the block’s content for every element, allowing you to build dynamic lists.

In the video above, the repeat block iterates over the following array:

- `{{payload.order.items}}` is the array containing the items in an order.

Within the repeat block, each item in the array becomes the current iteration context, which allows you to reference item-level properties directly. For example:

- `{{payload.order.items.name}}`
- `{{payload.order.items.price}}`

This approach ensures each item in the array is rendered with its own data, making the Repeat block ideal for building dynamic, data-driven content.

#### [Show block conditionally](https://docs.novu.co/#show-block-conditionally)

The show block conditionally feature lets you control whether a content block is rendered based on runtime data. It allows you to show or hide specific parts of a template using conditions evaluated against subscriber properties or payload variables when the workflow runs.

This is useful for keeping templates flexible and avoiding duplicated layouts, for example, showing a call-to-action only when it’s relevant to the recipient.

The feature is supported by the following blocks:

- Button block
- Custom HTML block
- Image block
- Repeat block

In the editor, conditional visibility is accessed using the **eye icon** on a supported block. When enabled, you define a condition that determines whether the block is rendered.

For example, you can display a **Track your order** button only when a subscriber has a custom data field `showTracking` set to `true`. You can apply the same logic using payload variables passed when triggering the workflow, allowing content to adapt dynamically to each notification.

![Show block](https://docs.novu.co/images/workflows/add-notification-content/channels-template-editors/show-block.gif)

#### [Digest block](https://docs.novu.co/#digest-block)

The Digest block allows you to loop over the events collected by your digest step and displays them in your email content. It handles both layout and repetition automatically.

The Digest block is only available in Email steps that come after a Digest step in the workflow.

When you add a digest block to your email template editor:

- Novu automatically inserts a Repeat block that iterates over the digested events.
- You can define how many times the event is iterated.
- Inside the loop, you can also use the special alias variable `current` to reference the item currently being processed, for example, `current.payload.name`.
- The block also supports rendering a summary using the `steps.digest-step.eventCount` variable, typically with the pluralize LiquidJS filter.

![Digest block](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdigest-block.9c17666c.gif&w=3840&q=75)

To learn more about using digested data and digest-related variables in templates, see the [Personalize Content](https://docs.novu.co/platform/workflow/add-notification-content/personalize-content) documentation.

### [Code editor (Custom HTML)](https://docs.novu.co/#code-editor-custom-html)

The code editor provides a built-in interface for writing raw HTML and embedding LiquidJS expressions directly inside the Novu dashboard. This gives you full control over layout, structure, and rendering beyond the capabilities of Novu's block editor.

The editor supports advanced use cases such as:

- Migrating existing HTML email templates
- Implementing full design systems
- Executing flow control logic directly inside email templates
- Complete layout and styling freedom without editor constraints

![Novu code editor](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcode-editor.f778c236.png&w=3840&q=75)

Switching from code editor to the block editor will reset your code.

### [Email layouts](https://docs.novu.co/#email-layouts)

Layouts are reusable components used with email steps in the workflow, designed to bring consistency, maintainability, and efficiency to your email communications. With layouts, you can create a component using headers, footers and other branding elements and reuse that component across multiple email steps.

Every layout must include the `{{content}}` variable. This variable dynamically injects the content of the email step.

On the Free plan, only one layout can be created per environment. Pro and higher plans support up to 100 layouts per environment. If you need more than 100 layouts, please [contact Support](mailto:support@novu.co).

#### [Layout features](https://docs.novu.co/#layout-features)

- Reusable across workflows.
- Support both block and code editors.
- Each environment maintains its own set of layouts.
- Supports variables and translations.

Payload variables are not supported in layouts because one layout can be used across multiple workflows and workflows can have strict payload schema validation.

#### [Apply an email layout to a workflow](https://docs.novu.co/#apply-an-email-layout-to-a-workflow)

1. Navigate to [Workflows page](https://dashboard.novu.co/workflows) on Novu dashboard.
2. Select a workflow from the list.
3. Select an email step.
4. Choose your layout from the Layout selector.

![Using layouts in workflow](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Femail-layout.92be6ffd.gif&w=3840&q=75)

The selected layout wraps around the content written in the email editor.

#### [Manage email layouts](https://docs.novu.co/#manage-email-layouts)

Email layouts are managed from the **Layouts** section of the Novu dashboard. From here, you can create, edit, delete, and reuse layouts across workflows.

![Layouts page](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flayouts-page.b0fc9bf2.gif&w=3840&q=75)

**Create an email layout**

1. Navigate to the [Layout page](https://dashboard.novu.co/layouts) on Novu dashboard.
2. Click on the **Create layout** button on the top right corner.
3. Fill in:

- **Layout name**: Provide a human-readable name.
- **Identifier**: Provide a unique ID. Novu generates one automatically if you do not provide it. You cannot change the identifier after it is created.

4. (Optional) Enable [translations](https://docs.novu.co/platform/workflow/advanced-features/translations) for the layout.
5. Click **Create layout**.

A new layout is created and can be edited using either the block editor or the code editor.

**Edit email layout**

1. Navigate to [Layout page](https://dashboard.novu.co/layouts) on Novu dashboard.
2. Select a layout from the list.
3. To update the layout name or enable translations, click the **cog** icon in the editor. ![Edit a layout](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fedit-layout.c1d9d2e5.gif&w=3840&q=75)
4. Modify the layout content using the block or code editor.
5. Click **Save changes**.

Changes apply immediately to all workflows using the layout.

**Delete an email layout**

Deleting a layout is permanent and cannot be undone.

1. Navigate to [Layout page](https://dashboard.novu.co/layouts) on Novu dashboard.
2. Select a layout from the list.
3. Click the cog icon in the layout editor.
4. Click **Delete layout** and confirm. If the layout is used by an email step, then you are notified on which step uses this layout. ![Delete layout](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdelete-layout.d05921c5.gif&w=3840&q=75)

[Code Steps\\ \\ Learn how to add code steps to a workflow, publish them with the Novu CLI, and use code-managed steps with UI-managed steps in a workflow.](https://docs.novu.co/platform/workflow/add-and-configure-steps/code-steps) [Personalize Content\\ \\ Learn how to personalize notification content in Novu using template variables, context data, and LiquidJS filters across all channel template editors.](https://docs.novu.co/platform/workflow/add-notification-content/personalize-content)

### On this page

[In-app template editor](https://docs.novu.co/#in-app-template-editor) [Disable content sanitization](https://docs.novu.co/#disable-content-sanitization) [Avatar customization](https://docs.novu.co/#avatar-customization) [Action buttons](https://docs.novu.co/#action-buttons) [Redirect URL](https://docs.novu.co/#redirect-url) [Data object](https://docs.novu.co/#data-object) [Email template editor](https://docs.novu.co/#email-template-editor) [Block editor](https://docs.novu.co/#block-editor) [Custom HTML block](https://docs.novu.co/#custom-html-block) [Repeat block](https://docs.novu.co/#repeat-block) [Show block conditionally](https://docs.novu.co/#show-block-conditionally) [Digest block](https://docs.novu.co/#digest-block) [Code editor (Custom HTML)](https://docs.novu.co/#code-editor-custom-html) [Email layouts](https://docs.novu.co/#email-layouts) [Layout features](https://docs.novu.co/#layout-features) [Apply an email layout to a workflow](https://docs.novu.co/#apply-an-email-layout-to-a-workflow) [Manage email layouts](https://docs.novu.co/#manage-email-layouts)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/workflow/add-notification-content/channels-template-editors.mdx)Open in ChatGPTOpen in Claude