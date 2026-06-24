# Source: https://docs.novu.co/platform/sdks/react-native/hooks/novu-provider

[@novu/react-native](https://docs.novu.co/platform/sdks/react-native)/Hooks

# Novu React Native NovuProvider Hook

Learn how to use the NovuProvider component to set up the Novu context in your React Native application

The `NovuProvider` is the top-level component that provides the [Novu instance](https://docs.novu.co/platform/inbox/headless-mode) to the rest of the hooks through the context. Usually, it's placed somewhere in the root of your application, which makes the hooks accessible throughout the application.

## [Props](https://docs.novu.co/#props)

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| subscriberId | string | Yes | The unique identifier of the subscriber |
| applicationIdentifier | string | Yes | Your application identifier from Novu |
| subscriberHash | string | No | HMAC encryption hash for the subscriber |
| apiUrl | string | No | Custom api url for self-hosted instances |
| socketUrl | string | No | Custom socket URL for self-hosted instances |
| children | ReactNode | Yes | The child components that will have access to the Novu context |

## [Example Usage](https://docs.novu.co/#example-usage)

USEUHMAC Encryption

```
import { NovuProvider } from '@novu/react-native';
 
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

[Quickstart\\ \\ Learn how to add Novu powered Inbox to your React Native app](https://docs.novu.co/platform/sdks/react-native) [useNovu\\ \\ Learn how to use the useNovu hook to access the Novu client instance in your React Native application](https://docs.novu.co/platform/sdks/react-native/hooks/use-novu)

### On this page

[Props](https://docs.novu.co/#props) [Example Usage](https://docs.novu.co/#example-usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/react-native/hooks/novu-provider.mdx)Open in ChatGPTOpen in Claude