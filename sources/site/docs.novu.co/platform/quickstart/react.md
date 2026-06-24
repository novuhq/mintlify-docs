# Source: https://docs.novu.co/platform/quickstart/react

Quickstart

# Novu React Quickstart Guide

Learn how to integrate the Novu Inbox component into a React application and add routing with React Router.

This guide walks you through integrating Novu’s Inbox into your React application for in-app notifications in real-time, from setup to triggering your first notification. By the end, you'll have a working notification inbox.

## [Create a Novu account](https://docs.novu.co/#create-a-novu-account)

[Create a Novu account](https://dashboard.novu.co/auth/sign-up) or [sign in](https://dashboard.novu.co/auth/sign-in) to access the Novu dashboard.

## [Create a React app using Vite](https://docs.novu.co/#create-a-react-app-using-vite)

Run the following command to create a new React app using [Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project):

npmpnpmyarnbun

```
npm create vite@latest novu-inbox-react -- --template react-ts
cd novu-inbox-react
npm install
npm run dev
```

## [Install `@novu/react`](https://docs.novu.co/#install-novureact)

The [Novu React SDK](https://docs.novu.co/platform/sdks/react) gives you access to the Inbox component.

Run the following command to install the SDK:

npmpnpmyarnbun

```
npm install @novu/react
```

## [Create the Inbox component](https://docs.novu.co/#create-the-inbox-component)

In the `src` directory, create a `components/novu-inbox.tsx` file and use the [<Inbox />](https://docs.novu.co/platform/inbox) component, passing applicationIdentifier and subscriberId:

src/components/novu-inbox.tsx

```
import { Inbox } from '@novu/react';
import { useNavigate } from 'react-router';
 
export function NovuInbox() {
  const navigate = useNavigate();
 
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
      routerPush={(path: string) => navigate(path)}
    />
  );
}
```

If you’re signed in to your Novu account, then the applicationIdentifier and subscriberId are automatically entered in the code sample above. Otherwise, you can manually retrieve them:

- `applicationIdentifier` – In the Novu dashboard, click API Keys, and then locate your unique Application Identifier.
- `subscriberId` – This represents a user in your system (typically the user's ID in your database). For quick start purposes, an auto-generated subscriberId is provided for your Dashboard user.

**Note:** If you pass a `subscriberId` that does not exist yet, Novu will automatically create a new subscriber with that ID.

## [Set up React Router and import the Inbox component](https://docs.novu.co/#set-up-react-router-and-import-the-inbox-component)

Now you can set up React Router and add the `NovuInbox` component to your app layout:

src/App.tsx

```
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NovuInbox } from './components/novu-inbox';
 
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <NovuInbox />
      </nav>
      {children}
    </div>
  );
}
 
function Home() {
  return <div>Welcome to the Home page!</div>;
}
 
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add your routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}
 
export default App;
```

## [Run Your Application](https://docs.novu.co/#run-your-application)

Start your development server:

npmpnpmyarnbun

```
npm run dev
```

Once the application is running, a bell icon will appear in the navbar. Clicking it opens the notification inbox UI.

Currently, there are no notifications. Let’s trigger one!

## [Trigger your first notification](https://docs.novu.co/#trigger-your-first-notification)

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
 

## [View the notification in your app](https://docs.novu.co/#view-the-notification-in-your-app)

Go back to your React app, then click the bell icon.

You should see the notification you just sent from Novu! 🎉

## [Next steps](https://docs.novu.co/#next-steps)

[**Styling**\\ \\ Customize the look and feel of your Inbox to match your application's design.](https://docs.novu.co/inbox/react/styling) [**Inbox and preferences UI components**\\ \\ Explore our full-stack UI components libraries for building in-app notifications.](https://docs.novu.co/platform/inbox) [**Build Workflow**\\ \\ Design and manage advanced notification workflows.](https://docs.novu.co/platform/workflow) [**Multi Tenancy**\\ \\ Manage multiple tenants within an organization.](https://docs.novu.co/platform/concepts/tenants)

[Multi-tenancy\\ \\ Learn about how to implement multi-tenant notifications in Novu](https://docs.novu.co/platform/concepts/tenants) [Next.js\\ \\ Set up Novu in-app notifications in your Next.js app. Install the SDK, add the Inbox component, and trigger your first notification.](https://docs.novu.co/platform/quickstart/nextjs)

### On this page

[Create a Novu account](https://docs.novu.co/#create-a-novu-account) [Create a React app using Vite](https://docs.novu.co/#create-a-react-app-using-vite) [Install `@novu/react`](https://docs.novu.co/#install-novureact) [Create the Inbox component](https://docs.novu.co/#create-the-inbox-component) [Set up React Router and import the Inbox component](https://docs.novu.co/#set-up-react-router-and-import-the-inbox-component) [Run Your Application](https://docs.novu.co/#run-your-application) [Trigger your first notification](https://docs.novu.co/#trigger-your-first-notification) [View the notification in your app](https://docs.novu.co/#view-the-notification-in-your-app) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/quickstart/react.mdx)Open in ChatGPTOpen in Claude