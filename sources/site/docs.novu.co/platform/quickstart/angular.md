# Source: https://docs.novu.co/platform/quickstart/angular

Quickstart

# Novu Angular Quickstart Guide

Create an account and learn how to start using Novu Inbox Notification in your angular application.

This guide walks you through integrating Novu’s Inbox into your Angular application for real time in-app notifications, from setup to triggering your first notification. By the end, you'll have a working notification inbox.

This guide uses @novu/js javascript sdk to build the Inbox component in Angular. Novu currently does not support native Angular Inbox component.

## [Create a Novu account](https://docs.novu.co/#create-a-novu-account)

[Create a Novu account](https://dashboard.novu.co/auth/sign-up) or [sign in](https://dashboard.novu.co/auth/sign-in) to access the Novu dashboard.

## [Create an Angular application](https://docs.novu.co/#create-an-angular-application)

Run the following command to create a new Angular app using [angular cli](https://angular.dev/tools/cli/setup-local#install-the-angular-cli):

```
ng new novu-inbox-angular
cd novu-inbox-angular
```

## [Install `@novu/js`](https://docs.novu.co/#install-novujs)

The [Novu JavaScript SDK](https://docs.novu.co/platform/sdks/javascript) gives you access to the Inbox component.

Run the following command to install the SDK:

npmpnpmyarnbun

```
npm install @novu/js
```

## [Add the Inbox component](https://docs.novu.co/#add-the-inbox-component)

Update the `src/app/app.ts` file to add the Inbox component. You'll need to provide your applicationIdentifier and subscriberId:

app.component.ts

```
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NovuUI } from '@novu/js/ui';
 
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit { 
  @ViewChild('novuInbox') novuInbox!: ElementRef<HTMLElement>;
  title = 'novu-angular';
 
  ngAfterViewInit() {
      const novu = new NovuUI({
        options: {
          applicationIdentifier: 'YOUR_APPLICATION_IDENTIFIER',
          subscriberId: 'YOUR_SUBSCRIBER_ID',
        },
      });
 
      novu.mountComponent({
        name: 'Inbox',
        props: {},
        element: this.novuInbox.nativeElement,
      });
  }
}
```

If you’re signed in to your Novu account, then the applicationIdentifier and subscriberId are automatically entered in the code sample above. Otherwise, you can manually retrieve them:

- `applicationIdentifier` - In the Novu dashboard, click API Keys, and then locate your unique Application Identifier.
- `subscriberId` - This represents a user in your system (typically the user's ID in your database). For quick start purposes, an auto-generated subscriberId is provided for your Dashboard user.

**Note:** If you pass a `subscriberId` that does not exist yet, Novu will automatically create a new subscriber with that ID.

## [Add the Inbox component to your application](https://docs.novu.co/#add-the-inbox-component-to-your-application)

Add a `#novuInbox` reference to your application in the starting of the `src/app/app.html` file:

src/app/app.html

```
<div #novuInbox></div>
```

## [Run Your Application](https://docs.novu.co/#run-your-application)

Start your development server:

npmpnpmyarnbun

```
npm run start
```

Once the application is running, a bell icon will appear on the top left side of the screen. Clicking it opens the notification inbox UI.

Currently, there are no notifications. Let’s trigger one!

## [Trigger your first notification](https://docs.novu.co/#trigger-your-first-notification)

In this step, you'll create a simple workflow to send your first notification via the Inbox component. Follow these steps to set up and trigger a workflow from your Novu dashboard.

1. Go to your [Novu dashboard](https://dashboard-v2.novu.co/auth/sign-in).
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

## [View the notification in your app](https://docs.novu.co/#view-the-notification-in-your-app)

Go back to your Angular app, then click the bell icon.

You should see the notification you just sent from Novu! 🎉

## [Next steps](https://docs.novu.co/#next-steps)

[**Javascript SDK API Reference**\\ \\ Explore JavaScript SDK API reference for more advanced use cases.](https://docs.novu.co/platform/sdks/javascript) [**Build Workflow**\\ \\ Design and manage advanced notification workflows.](https://docs.novu.co/platform/workflow) [**Multi Tenancy**\\ \\ Manage multiple tenants within an organization.](https://docs.novu.co/platform/concepts/tenants)

[Remix\\ \\ Integrate Novu in-app notifications into your Remix application. Follow step-by-step setup from install to first notification.](https://docs.novu.co/platform/quickstart/remix) [Vue\\ \\ Create an account and learn how to start using Novu Inbox in your vue application.](https://docs.novu.co/platform/quickstart/vue)

### On this page

[Create a Novu account](https://docs.novu.co/#create-a-novu-account) [Create an Angular application](https://docs.novu.co/#create-an-angular-application) [Install `@novu/js`](https://docs.novu.co/#install-novujs) [Add the Inbox component](https://docs.novu.co/#add-the-inbox-component) [Add the Inbox component to your application](https://docs.novu.co/#add-the-inbox-component-to-your-application) [Run Your Application](https://docs.novu.co/#run-your-application) [Trigger your first notification](https://docs.novu.co/#trigger-your-first-notification) [View the notification in your app](https://docs.novu.co/#view-the-notification-in-your-app) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/quickstart/angular.mdx)Open in ChatGPTOpen in Claude