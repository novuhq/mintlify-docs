# Source: https://docs.novu.co/platform/sdks/react/hooks/novu-provider

@novu/react/Hooks

# NovuProvider

Learn how to use the NovuProvider component to set up the Novu context in your React application

The `NovuProvider` is the top-level component that provides the [Novu instance](https://docs.novu.co/platform/inbox/headless-mode) to the rest of the hooks through the context. Usually, it's placed somewhere in the root of your application, which makes the hooks accessible throughout the application.

## [Props](https://docs.novu.co/#props)

| Prop | Type | Default |
| --- | --- | --- |
| 
`children?`

 | 

`ReactNode`

 | \- |
| 

`socketUrl?`

 | 

`string`

 | \- |
| 

`apiUrl?`

 | 

`string`

 | \- |
| 

`contextHash?`

 | 

`string`

 | \- |
| 

`context?`

 | 

`object`

 | \- |
| 

`subscriberHash?`

 | 

`string`

 | \- |
| 

`applicationIdentifier?`

 | 

`string`

 | \- |
| 

`subscriberId?`

 | 

`string`

 | \- |

## [Example Usage](https://docs.novu.co/#example-usage)

USEUUsing ContextHMAC Encryption

```
import { NovuProvider } from '@novu/react';
 
function App() {
  return (
    <NovuProvider
      subscriber="SUBSCRIBER_ID"
      applicationIdentifier="APPLICATION_IDENTIFIER"
    >
      {/* Your app components */}
    </NovuProvider>
  );
}
```

[@novu/react\\ \\ API reference for @novu/react components including Inbox, Bell, Notifications, and Subscription.](https://docs.novu.co/platform/sdks/react) [Subscription\\ \\ Learn how to use the useSubscriptions, useCreateSubscription, and other hooks to manage subscriptions in Novu.](https://docs.novu.co/platform/sdks/react/hooks/subscription)

### On this page

[Props](https://docs.novu.co/#props) [Example Usage](https://docs.novu.co/#example-usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/react/hooks/novu-provider.mdx)Open in ChatGPTOpen in Claude