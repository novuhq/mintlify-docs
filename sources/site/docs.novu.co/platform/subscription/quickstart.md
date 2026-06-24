# Source: https://docs.novu.co/platform/subscription/quickstart

# <Subscription /> Quickstart Guide

Learn how to integrate and render the Subscription component in your React app to manage user preferences.

Subscription is avialable from v3.12.0 for the `@novu/nextjs`, `@novu/react` and `@novu/js` packages.

This quickstart shows how to render the subscription UI in your app. The subscription UI lets users subscribe to topics, define conditions, and manage how they receive notifications.

To learn how to render custom UI for the Subscription preferences, refer to the [Headless hooks documentation](https://docs.novu.co/platform/subscription/headless-hooks).

The [<Subscription />](https://docs.novu.co/platform/subscription/quickstart) component is designed to work within an existing Novu environment and uses the same provider and session context as the Inbox component.

### [Create a topic](https://docs.novu.co/#create-a-topic)

Subscriptions are managed at the topic level. You can create a topic manually in the Novu Dashboard or via the API.

However, you don't have to create it beforehand. If the topic key you provide to the component does not exist, Novu will automatically create it for you.

Topics can represent any category of notifications. To learn more, see the [Topics documentation](https://docs.novu.co/platform/concepts/topics).

### [Install `@novu/nextjs`](https://docs.novu.co/#install-novunextjs)

Ensure you have the latest version of the `@novu/nextjs` package installed in your project.

```
npm install @novu/nextjs
```

### [Initialize the Novu client](https://docs.novu.co/#initialize-the-novu-client)

Wrap your app or the specific section where the subscription component would live with the `<NovuProvider>`. Configure the provider with your `applicationIdentifier` and the current user's `subscriberId`.

```
import { NovuProvider } from '@novu/nextjs';
 
const NOVU_CONFIG = {
  subscriber="SUBSCRIBER_ID"
  applicationIdentifier="APPLICATION_IDENTIFIER"
};
 
function App() {
  return (
    <NovuProvider {...NOVU_CONFIG}>
      {/* Application content */}
    </NovuProvider>
  );
}
```

### [Add the component](https://docs.novu.co/#add-the-component)

Place the [<Subscription />](https://docs.novu.co/platform/subscription/quickstart) component inside the provider. You must pass the `topicKey`.

The `identifier` prop is optional, you only need to provide it if you intend to manage multiple distinct subscriptions for the same topic.

```
import { NovuProvider, Subscription } from '@novu/nextjs';
 
const NOVU_CONFIG = {
  subscriber="SUBSCRIBER_ID"
  applicationIdentifier="APPLICATION_IDENTIFIER"
};
 
function App() {
  return (
    <NovuProvider {...NOVU_CONFIG}>
      <Subscription
        topicKey="project-123"
        identifier="project-updates"
      />
    </NovuProvider>
  );
}
```

## [Next steps](https://docs.novu.co/#next-steps)

[**Customize the UI**\\ \\ Customize and configure the Subscription component appearance and behavior.](https://docs.novu.co/platform/subscription/customize-and-configure) [**Overview**\\ \\ Learn how Subscriptions work and explore the available components.](https://docs.novu.co/platform/subscription/overview)

[Introduction\\ \\ Learn what a Subscription is in Novu, how they fit into the notification system.](https://docs.novu.co/platform/subscription) [Customize and configure\\ \\ Learn how to filter visible preferences, customize styling, and use custom render functions.](https://docs.novu.co/platform/subscription/customize-and-configure)

### On this page

[Create a topic](https://docs.novu.co/#create-a-topic) [Install `@novu/nextjs`](https://docs.novu.co/#install-novunextjs) [Initialize the Novu client](https://docs.novu.co/#initialize-the-novu-client) [Add the component](https://docs.novu.co/#add-the-component) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/subscription/quickstart.mdx)Open in ChatGPTOpen in Claude