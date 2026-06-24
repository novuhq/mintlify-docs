# Source: https://docs.novu.co/platform/subscription/customize-and-configure

# Customize and configure

Learn how to filter visible preferences, customize styling, and use custom render functions.

The Subscription UI works within the existing Novu environment and uses the same provider and styling architecture as the [<Inbox />](https://docs.novu.co/platform/inbox) component.

You can configure which options are visible to your users, apply your brand's theme, or take full control of the rendering.

## [Filter using preferences](https://docs.novu.co/#filter-using-preferences)

The `preferences` prop on the [<Subscription />](https://docs.novu.co/platform/subscription/overview) component controls which workflows the component displays to the user.

### [Default preferences](https://docs.novu.co/#default-preferences)

If you want to simply filter which workflows are visible without changing their labels, then you can pass an array of workflow identifier strings. The component uses the workflow names defined in the Dashboard as the labels.

```
import { NovuProvider, Subscription } from '@novu/react';
 
export function Novu() {
  return (
    <NovuProvider 
      subscriber="SUBSCRIBER_ID"
      applicationIdentifier="APPLICATION_IDENTIFIER"
    >
      <Subscription
        topicKey="product-updates"
        identifier="user-123"
        // Only shows these two workflows
        preferences={["workflow-identifier-1", "workflow-identifier-2"]}
      />
    </NovuProvider>
  )
}
```

### [Custom preferences](https://docs.novu.co/#custom-preferences)

You can filter using tags, workflow IDs, or both. You can also customize the labels, descriptions, or default states by passing an array of objects.

```
import { NovuProvider, Subscription,  } from '@novu/react';
 
export function Novu() {
  return (
    <NovuProvider 
      subscriber="SUBSCRIBER_ID"
      applicationIdentifier="APPLICATION_IDENTIFIER"
    >
      <Subscription 
        topicKey="product-updates"
        identifier="user-123"
        preferences={[
          {
            workflowId: "comment-on-task",
            label: "New Comments",
            enabled: true, // Force enabled by default
          },
          {
            // Group multiple workflows under one label and filter using tags
            filter: { tags: ['security', 'admin'] },
            label: 'Security Alerts',
            enabled: false,
          },
          {
            // Group multiple workflows under one label and filter using workflow id
            filter: { workflowIds: ['test-workflow1', 'test-workflow2'] },
            label: 'Test Group',
            enabled: false,
          },
        ]}
      />
    </NovuProvider>
  );
}
```

You can also update the labels for the workflows with the `dynamic` prop of the localization. For full localization options, see the [Inbox localization documentation](https://docs.novu.co/platform/inbox/advanced-features/localization).

## [Styling](https://docs.novu.co/#styling)

The [<Subscription />](https://docs.novu.co/platform/subscription/quickstart) component shares the same styling architecture as the Inbox component. You can use the `appearance` prop to customize elements, variables, icons and themes.

For full styling and theming options, see the [Inbox styling documentation](https://docs.novu.co/platform/inbox/configuration/styling).

### [Dark mode](https://docs.novu.co/#dark-mode)

Novu provides `subscriptionDarkTheme` in the `@novu/react/themes` package to apply the built-in dark theme to the [<Subscription />](https://docs.novu.co/platform/subscription/quickstart) component. You can apply this conditionally based on your app's state.

```
import { NovuProvider, Subscription } from '@novu/react';
import { subscriptionDarkTheme } from '@novu/react/themes';
 
export function Novu() {
  const isDarkMode = true;
  
  return (
    <NovuProvider 
      subscriber="SUBSCRIBER_ID"
      applicationIdentifier="APPLICATION_IDENTIFIER"
    >
      <Subscription
        topicKey="product-updates"
        identifier="user-123"
        appearance={{
          baseTheme: isDarkMode ? subscriptionDarkTheme : undefined,
        }}
      />
    </NovuProvider>
  );
}
```

### [Localization](https://docs.novu.co/#localization)

You can customize the text labels used in the component to support different languages or to match your app's voice. This works identically to Inbox localization.

```
import { NovuProvider, Subscription } from '@novu/react';
 
export function Novu() {
  return (
    <NovuProvider 
      subscriber="SUBSCRIBER_ID"
      applicationIdentifier="APPLICATION_IDENTIFIER"
    >
      <Subscription
        topicKey="product-updates"
        identifier="user-123"
        localization={{
          "subscription.subscribe": "Join",
          locale: "en-US",
        }}
      />
    </NovuProvider>
  );
}
```

For full localization options, see the [Inbox localization documentation](https://docs.novu.co/platform/inbox/advanced-features/localization).

## [Custom rendering](https://docs.novu.co/#custom-rendering)

The `renderPreferences` prop on the [<Subscription />](https://docs.novu.co/platform/subscription/quickstart) component lets you override how the component displays the list of workflows while still relying on the component to handle data fetching and state management.

The function receives the current `subscription` object and a `loading` boolean. You can map over the `preferences` array and render your own HTML elements.

```
import { NovuProvider, Subscription, TopicSubscription } from '@novu/react';
 
export function Novu() {
  return (
    <NovuProvider 
      subscriber="SUBSCRIBER_ID"
      applicationIdentifier="APPLICATION_IDENTIFIER"
    >
      <Subscription
        topicKey="product-updates"
        identifier="user-123"
        preferences={["workflow-1", "workflow-2"]}
        renderPreferences={(subscription?: TopicSubscription, loading?: boolean) => (
          <div>
            {subscription?.preferences.map((preference, idx) => (
              <div key={`${subscription.identifier}-${idx}`}>
                <label htmlFor={`pref-${idx}`}>{preference.label}</label>
                <span>{preference.description}</span>
                <input
                  id={`pref-${idx}`}
                  type="checkbox"
                  checked={preference.enabled}
                  onChange={(e) =>
                    preference.update({ value: e.target.checked })
                  }
                />
              </div>
            ))}
          </div>
        )}
      />
    </NovuProvider>
  )
}
```

[Setup the <Subscription />\\ \\ Learn how to integrate and render the Subscription component in your React app to manage user preferences.](https://docs.novu.co/platform/subscription/quickstart) [Headless hooks\\ \\ Build a fully custom Subscription interface using hooks.](https://docs.novu.co/platform/subscription/headless-hooks)

### On this page

[Filter using preferences](https://docs.novu.co/#filter-using-preferences) [Default preferences](https://docs.novu.co/#default-preferences) [Custom preferences](https://docs.novu.co/#custom-preferences) [Styling](https://docs.novu.co/#styling) [Dark mode](https://docs.novu.co/#dark-mode) [Localization](https://docs.novu.co/#localization) [Custom rendering](https://docs.novu.co/#custom-rendering)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/subscription/customize-and-configure.mdx)Open in ChatGPTOpen in Claude