# Source: https://docs.novu.co/platform/quickstart/vanilla-js

Quickstart

# Novu Vanilla JS Quickstart Guide

Learn how to integrate the Novu Inbox component into a Vanilla JS and HTML project.

This guide walks you through integrating Novu’s Inbox into your Vanilla JS and HTML project for in-app notifications in real-time, from setup to triggering your first notification. By the end, you'll have a working notification inbox.

### [Add Novu ESM script](https://docs.novu.co/#add-novu-esm-script)

Add the following code to your HTML file:

index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Novu Inbox - Vanilla JS</title>
 
  <!-- Novu Styles (important for proper UI rendering) -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/@novu/js@3.11.0/dist/index.css"
  />
  <style>
    /*
      Example: hide the 3rd option in the Inbox status dropdown.
      (We add stable custom classes via `appearance.elements.*` and then use plain CSS.)
    */
    .hide-snooze-dropdown-item:nth-child(3) {
      display: none !important;
    }
 
    .hide-snooze-button {
      display: none !important;
    }
  </style>
</head>
<body>
  <h2>Novu Inbox - Vanilla JS Demo</h2>
 
  <!-- Mount point: Novu will inject Inbox UI here -->
  <div id="novu-inbox"></div>
 
  <!--
  Novu UI for vanilla HTML:
  - The published UI entrypoint is ESM and has dependencies (SolidJS, etc.)
  - esm.sh bundles those deps so it can run directly in the browser.
-->
  <script type="module">
    import { NovuUI } from "https://esm.sh/@novu/js@3.11.0/ui?bundle";
 
    document.addEventListener("DOMContentLoaded", () => {
      const mountEl = document.getElementById("novu-inbox");
      if (!mountEl) {
        console.error("Missing #novu-inbox mount element");
        return;
      }
 
      const novu = new NovuUI({
        options: {
          applicationIdentifier: "NOVU_APPLICATION_IDENTIFIER",
          subscriberId: "NOVU_SUBSCRIBER_ID",
        },
 
        // to hide the snooze button and the 3rd option in the Inbox status dropdown
        appearance: {
          elements: {
            notificationSnooze__button: "hide-snooze-button",
            inboxStatus__dropdownItem: "hide-snooze-dropdown-item",
          },
        },
      });
 
      // Mount Inbox into #novu-inbox
      novu.mountComponent({
        name: "Inbox",
        props: {
          onNotificationClick: (notification) => {
            console.log("notification clicked", notification);
          },
        },
        element: mountEl,
      });
 
      // Optional cleanup example
      window.addEventListener("beforeunload", () => {
        novu.unmountComponent(mountEl);
      });
    });
  </script>
</body>
</html>
```

### [Change subscriberId and applicationIdentifier](https://docs.novu.co/#change-subscriberid-and-applicationidentifier)

In above code, replace `NOVU_APPLICATION_IDENTIFIER` with actual applicationIdentifier value and `NOVU_SUBSCRIBER_ID` with actual subscriberId value.

- `applicationIdentifier` – In the Novu dashboard, click API Keys, and then locate your unique Application Identifier.
- `subscriberId` – This represents a user in your system (typically the user's ID in your database). For quick start purposes, an auto-generated subscriberId is provided for your Dashboard user.

**Note:** If you pass a `subscriberId` that does not exist yet, Novu will automatically create a new subscriber with that ID.

### [Run Your Application](https://docs.novu.co/#run-your-application)

Open `index.html` in your browser. You should see the Novu Inbox component with a bell icon.

### [Trigger your first notification](https://docs.novu.co/#trigger-your-first-notification)

In this step, you'll create a simple workflow to send your first notification via the Inbox component. Follow these steps to set up and trigger a workflow from your Novu dashboard.

1. Go to your [Novu dashboard](https://dashboard.novu.co/auth/sign-in).
 
2. In the sidebar, click **Workflows**.
 
3. Click **Create Workflow**. Enter a name for your workflow (e.g., "Welcome Notification").
 
4. Click **Create Workflow** to save it.
 
5. Click the **Add Step** icon in the workflow editor and then select **In-App** as the step type.
 
6. In the In-App template editor, enter the following:
 
 - **Subject**: "Welcome to Novu"
 - **Body**: "Hello, world! "
7. Once you’ve added the subject and body, close the editor.
 
8. Click **Trigger**.
 
9. Click **Test Workflow**.
 

### [View the notification in your app](https://docs.novu.co/#view-the-notification-in-your-app)

Open `index.html` in your browser, then click the bell icon.

You should see the notification you just sent from Novu! 🎉

## [Next steps](https://docs.novu.co/#next-steps)

[**Styling**\\ \\ Customize the look and feel of your Inbox to match your application's design.](https://docs.novu.co/inbox/react/styling) [**Inbox and preferences UI components**\\ \\ Explore our full-stack UI components libraries for building in-app notifications.](https://docs.novu.co/platform/inbox) [**Build Workflow**\\ \\ Design and manage advanced notification workflows.](https://docs.novu.co/platform/workflow) [**Multi Tenancy**\\ \\ Manage multiple tenants within an organization.](https://docs.novu.co/platform/concepts/tenants)

[Vue\\ \\ Create an account and learn how to start using Novu Inbox in your vue application.](https://docs.novu.co/platform/quickstart/vue) [Introduction to Inbox\\ \\ Learn how to integrate Novu Inbox component, a pre-built notification center component for real-time in-app notifications in your application.](https://docs.novu.co/platform/inbox)

### On this page

[Add Novu ESM script](https://docs.novu.co/#add-novu-esm-script) [Change subscriberId and applicationIdentifier](https://docs.novu.co/#change-subscriberid-and-applicationidentifier) [Run Your Application](https://docs.novu.co/#run-your-application) [Trigger your first notification](https://docs.novu.co/#trigger-your-first-notification) [View the notification in your app](https://docs.novu.co/#view-the-notification-in-your-app) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/quickstart/vanilla-js.mdx)Open in ChatGPTOpen in Claude