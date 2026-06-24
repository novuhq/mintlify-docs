# Source: https://docs.novu.co/platform/quickstart/vue

Quickstart

# Novu Vue Quickstart Guide

Create an account and learn how to start using Novu Inbox in your vue application.

This guide walks you through integrating Novu's Inbox into your Vue application for real time in-app notifications, from setup to triggering your first notification. By the end, you'll have a working notification inbox.

This guide uses @novu/js javascript sdk to build the Inbox component in Vue. Novu currently does not support native Vue Inbox component.

### [Create a Novu account](https://docs.novu.co/#create-a-novu-account)

[Create a Novu account](https://dashboard.novu.co/auth/sign-up) or [sign in](https://dashboard.novu.co/auth/sign-in) to access the Novu dashboard.

### [Create a Vue application](https://docs.novu.co/#create-a-vue-application)

Run the following command to create a new Vue app:

npmpnpmyarnbun

```
npm create vue@latest novu-inbox-vue
```

### [Install `@novu/js`](https://docs.novu.co/#install-novujs)

The [Novu JavaScript SDK](https://docs.novu.co/platform/sdks/javascript) gives you access to the Inbox component.

Run the following command to install the SDK:

npmpnpmyarnbun

```
npm install @novu/js
```

### [Add the Inbox component](https://docs.novu.co/#add-the-inbox-component)

Create the `src/components/NovuInbox.vue` file to add the Inbox component passing applicationIdentifier and subscriberId:

src/components/NovuInbox.vue

```
<template>
  <!-- 
    This empty div serves as a mounting point for the Novu Inbox.
    We use Vue's ref attribute to get direct access to this DOM element.
  -->
  <div ref="novuInbox"></div>
</template>
 
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { NovuUI } from "@novu/js/ui";
 
interface NovuOptions {
  options: {
    applicationIdentifier: string;
    subscriberId: string;
  };
}
 
// Create a reactive reference to hold the DOM element
const novuInbox = ref<HTMLElement | null>(null);
// Store the Novu instance for cleanup during unmount
let novuInstance: NovuUI | null = null;
 
onMounted(() => {
  // Ensure our div reference exists before proceeding
  if (!novuInbox.value) {
    console.error("Novu inbox container element not found");
    return;
  }
 
  try {
    // Initialize the Novu UI instance with required configuration
    const novu = new NovuUI({
      options: {
        applicationIdentifier: 'YOUR_APPLICATION_IDENTIFIER',
        subscriberId: 'YOUR_SUBSCRIBER_ID',
      },
    } as NovuOptions);
 
    // Mount the Inbox component to our div reference
    // This is where Novu creates and injects its Inbox UI
    novu.mountComponent({
      name: "Inbox",
      props: {},
      element: novuInbox.value, // The actual DOM element where Inbox will be mounted
    });
 
    // Store the instance for cleanup
    novuInstance = novu;
  } catch (error) {
    console.error("Failed to initialize Novu inbox:", error);
  }
});
 
// Clean up when the component is destroyed
onUnmounted(() => {
  if (novuInstance && novuInbox.value) {
    try {
      // Properly unmount the Novu component to prevent memory leaks
      novuInstance.unmountComponent(novuInbox.value);
    } catch (error) {
      console.error("Failed to unmount Novu inbox:", error);
    }
  }
});
</script>
```

If you're signed in to your Novu account, then the applicationIdentifier and subscriberId are automatically entered in the code sample above. Otherwise, you can manually retrieve them:

- `applicationIdentifier` - In the Novu dashboard, click API Keys, and then locate your unique Application Identifier.
- `subscriberId` - This represents a user in your system (typically the user's ID in your database). For quick start purposes, an auto-generated subscriberId is provided for your Dashboard user.

**Note:** If you pass a `subscriberId` that does not exist yet, Novu will automatically create a new subscriber with that ID.

### [Add the Inbox component to your application](https://docs.novu.co/#add-the-inbox-component-to-your-application)

Import and use the `NovuInbox` component in `src/App.vue` file:

src/App.vue

```
<script setup lang="ts">
import NovuInbox from "./components/NovuInbox.vue";
</script>
 
<template>
  <NovuInbox />
</template>
```

### [Run Your Application](https://docs.novu.co/#run-your-application)

Start your development server:

npmpnpmyarnbun

```
npm run start
```

Once the application is running, a bell icon will appear on the top left side of the screen. Clicking it opens the notification inbox UI.

Currently, there are no notifications. Let's trigger one!

### [Trigger your first notification](https://docs.novu.co/#trigger-your-first-notification)

In this step, you'll create a simple workflow to send your first notification via the Inbox component. Follow these steps to set up and trigger a workflow from your Novu dashboard.

1. Go to your [Novu dashboard](https://dashboard-v2.novu.co/auth/sign-in).
2. In the sidebar, click **Workflows**.
3. Click **Create Workflow**. Enter a name for your workflow (e.g., "Welcome Notification").
4. Click **Create Workflow** to save it.
5. Click the **Add Step** icon in the workflow editor and then select **In-App** as the step type.
6. In the In-App template editor, enter the following:

- **Subject**: "Welcome to Novu"
- **Body**: "Hello, world! "

7. Once you've added the subject and body, close the editor.
8. Click **Trigger**.
9. Click **Test Workflow**.

### [View the notification in your app](https://docs.novu.co/#view-the-notification-in-your-app)

Go back to your Vue app, then click the bell icon.

You should see the notification you just sent from Novu! 🎉

## [Next steps](https://docs.novu.co/#next-steps)

[**Javascript SDK API Reference**\\ \\ Explore JavaScript SDK API reference for more advanced use cases.](https://docs.novu.co/platform/sdks/javascript) [**Build Workflow**\\ \\ Design and manage advanced notification workflows.](https://docs.novu.co/platform/workflow) [**Multi Tenancy**\\ \\ Manage multiple tenants within an organization.](https://docs.novu.co/platform/concepts/tenants)

[Angular\\ \\ Create an account and learn how to start using Novu Inbox Notification in your angular application.](https://docs.novu.co/platform/quickstart/angular) [Vanilla JS\\ \\ Learn how to integrate the Novu Inbox component into a Vanilla JS and HTML project.](https://docs.novu.co/platform/quickstart/vanilla-js)

### On this page

[Create a Novu account](https://docs.novu.co/#create-a-novu-account) [Create a Vue application](https://docs.novu.co/#create-a-vue-application) [Install `@novu/js`](https://docs.novu.co/#install-novujs) [Add the Inbox component](https://docs.novu.co/#add-the-inbox-component) [Add the Inbox component to your application](https://docs.novu.co/#add-the-inbox-component-to-your-application) [Run Your Application](https://docs.novu.co/#run-your-application) [Trigger your first notification](https://docs.novu.co/#trigger-your-first-notification) [View the notification in your app](https://docs.novu.co/#view-the-notification-in-your-app) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/quickstart/vue.mdx)Open in ChatGPTOpen in Claude