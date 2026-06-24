# Source: https://docs.novu.co/platform/sdks/react-native

# Novu React Native SDK

Learn how to add Novu powered Inbox to your React Native app

You can build your own Inbox UI with Novu's React Native hooks SDK. Novu will take care of data fetching will help you build a fully custom notification-center UI.

View our [React Native Expo Template](https://github.com/novuhq/novu-expo) for a live example of the inbox in action.

Install the React Native hooks SDK

```
npm install @novu/react-native
```

Add the Novu provider to your react-native file

The `NovuProvider` component is used to provide the Novu context to the inbox hooks. Make sure that the provider is wrapping your Inbox hook usages at the component tree.

US RegionEU RegionHMAC Encryption

```
import { NovuProvider } from "@novu/react-native";
 
function Layout() {
  return (
    <NovuProvider
      subscriber="YOUR_SUBSCRIBER_ID"
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
    >
      {/* Your app components where you want to use the hooks */}
    </NovuProvider>
  );
}
```

You can find the `applicationIdentifier` in the Novu Dashboard under the [API keys page](https://dashboard.novu.co/api-keys). The `subscriberId` is the unique identifier of the user in your application, learn more about subscribers [here](https://docs.novu.co/platform/concepts/subscribers).

Build your own inbox UI

```
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
 
import { useNotifications, Notification } from "@novu/react-native";
 
function YourCustomInbox() {
  const { notifications, isLoading, fetchMore, hasMore, refetch } =
    useNotifications();
 
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.body}</Text>
    </View>
  );
 
  const renderFooter = () => {
    if (!hasMore) return null;
 
    return (
      <View>
        <ActivityIndicator size="small" color="#2196F3" />
      </View>
    );
  };
 
  const renderEmpty = () => (
    <View>
      <Text>No updates available</Text>
    </View>
  );
 
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }
 
  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={["#2196F3"]}
        />
      }
    />
  );
}
```

Trigger a notification

Now that you have the inbox component added to your application, you can trigger an Inbox notification to see it in action.

[@novu/js\\ \\ Complete API reference for the Novu JavaScript package](https://docs.novu.co/platform/sdks/javascript) [NovuProvider\\ \\ Learn how to use the NovuProvider component to set up the Novu context in your React Native application](https://docs.novu.co/platform/sdks/react-native/hooks/novu-provider)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/react-native/index.mdx)Open in ChatGPTOpen in Claude