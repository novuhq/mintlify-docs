# Source: https://docs.novu.co/platform/subscription/headless-hooks

# Headless hooks

Build a fully custom Subscription interface using hooks.

Novu `@novu/react` package provides Subscription hooks that let you build your own custom subscription experiences from scratch.

These hooks allow you to list, create, update, and delete subscriptions while leveraging Novu's state management.

Hooks are available in [`@novu/nextjs`](https://docs.novu.co/platform/sdks/react), [`@novu/react-native`](https://docs.novu.co/platform/sdks/react-native), [`@novu/react`](https://docs.novu.co/platform/sdks/react). For a complete reference on all available Subscription endpoints, refer to the [API reference documentation](https://docs.novu.co/platform/sdks/react/hooks/subscription).

## [List all subscriptions](https://docs.novu.co/#list-all-subscriptions)

The `useSubscriptions` hook retrieves all subscriptions associated with a specific topic for the current subscriber. This is useful for rendering a list of "My Subscriptions," where subscribers can view all the subscriptions they've subscribed to.

The `subscriptions` array contains `TopicSubscription` objects. You can refer to the [TopicSubscription interface](https://docs.novu.co/api-reference/topics/topic-schema#topicsubscription) for the full type definition.

```
import { useSubscriptions } from '@novu/react';
 
function SubscriptionList() {
  const { subscriptions, isLoading } = useSubscriptions({ 
    topicKey: 'product-updates' 
  });
 
  if (isLoading) return <div>Loading...</div>;
 
  return (
    <ul>
      {subscriptions.map((subscription) => (
        <li key={subscription.id}>
          <h3>{subscription.name}</h3>
+         {/* Render your custom subscription UI here */}
        </li>
      ))}
    </ul>
  );
}
```

## [Retrieve a single subscription](https://docs.novu.co/#retrieve-a-single-subscription)

If you need to manage a specific subscription instance, then use the `useSubscription` hook. This hook fetches the details and preferences for a single subscription.

```
import { useSubscription } from '@novu/react';
 
function ProjectSettings() {
  const { subscription, isLoading } = useSubscription({ 
    topicKey: 'project-123',
    identifier: 'user-project-alert'
  });
 
  if (isLoading) return <div>Loading...</div>;
 
  if (!subscription) return <div>You are not subscribed to this project.</div>;
 
  return (
    <div>
       <h3>{subscription.name}</h3>
       {/* Render preferences or other subscription details */}
    </div>
  );
}
```

## [Create a subscription](https://docs.novu.co/#create-a-subscription)

To allow users to opt-in to a topic, use the `useCreateSubscription` hook. This is often used on "Follow" or "Subscribe" buttons.

```
import { useCreateSubscription } from '@novu/react';
 
function SubscribeButton() {
  const { create, isCreating } = useCreateSubscription();
 
  const handleSubscribe = async () => {
    const { data, error } = await create({ 
      topicKey: 'project-123', 
      identifier: 'user-project-alert',
      // Optional: Set initial preferences
      preferences: [] 
    });
 
    if (error) {
        console.error('Failed to subscribe', error);
        return;
    }
    
    console.log('Subscribed successfully!', data);
  };
 
  return (
    <button onClick={handleSubscribe} disabled={isCreating}>
      {isCreating ? 'Subscribing...' : 'Subscribe to Updates'}
    </button>
  );
}
```

## [Update a subscription](https://docs.novu.co/#update-a-subscription)

Use `useUpdateSubscription` to modify an existing subscription. This is primarily used to toggle workflow preferences, enabling, or disabling specific notifications within the subscription.

```
import { useUpdateSubscription } from '@novu/react';
 
function PreferenceToggle({ identifier, preferences, name, topicKey }) {
  const { update, isUpdating } = useUpdateSubscription();
 
  const savePreferences = async () => {
    await update({
      topicKey,
      identifier,
      name,
      preferences,
    });
  };
 
  return (
    <button onClick={savePreferences} disabled={isUpdating}>
      Save preferences
    </button>
  );
}
```

### [Update a single preference](https://docs.novu.co/#update-a-single-preference)

If you need to update a single preference, use the dedicated helpers available on the subscription object, such as:

- `subscription.updatePreference(...)`, or
- mapping over `subscription.preferences` and calling `preference.update(...)`

```
import { useSubscription } from '@novu/react';
 
function PreferenceList() {
  const { subscription } = useSubscription({ 
    topicKey: 'project-123',
    identifier: 'user-project-alert'
  });
 
  if (!subscription) return null;
 
  return (
    <div>
      {subscription.preferences.map((preference) => (
        <div key={preference.workflowId}>
          <label>{preference.label}</label>
          <input 
            type="checkbox" 
            checked={preference.enabled} 
            // Update the preference directly using the instance method
            onChange={(e) => preference.update({ value: e.target.checked })}
          />
        </div>
      ))}
    </div>
  );
}
```

## [Delete a subscription](https://docs.novu.co/#delete-a-subscription)

To allow users to opt out or unsubscribe, use the `useRemoveSubscription` hook.

```
import { useRemoveSubscription } from '@novu/react';
 
function UnsubscribeButton({ identifier: string, topicKey: string }) {
  const { remove, isRemoving } = useRemoveSubscription();
 
  const handleUnsubscribe = async () => {
    await remove({ 
      identifier,
      topicKey,
    });
  };
 
  return (
    <button onClick={handleUnsubscribe} disabled={isRemoving}>
      {isRemoving ? 'Removing...' : 'Unsubscribe'}
    </button>
  );
}
```

[Customize and configure\\ \\ Learn how to filter visible preferences, customize styling, and use custom render functions.](https://docs.novu.co/platform/subscription/customize-and-configure) [Overview\\ \\ Learn how to create, configure, and work with notification workflows in Novu.](https://docs.novu.co/platform/workflow)

### On this page

[List all subscriptions](https://docs.novu.co/#list-all-subscriptions) [Retrieve a single subscription](https://docs.novu.co/#retrieve-a-single-subscription) [Create a subscription](https://docs.novu.co/#create-a-subscription) [Update a subscription](https://docs.novu.co/#update-a-subscription) [Update a single preference](https://docs.novu.co/#update-a-single-preference) [Delete a subscription](https://docs.novu.co/#delete-a-subscription)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/subscription/headless-hooks.mdx)Open in ChatGPTOpen in Claude