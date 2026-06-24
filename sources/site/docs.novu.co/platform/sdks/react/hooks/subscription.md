# Source: https://docs.novu.co/platform/sdks/react/hooks/subscription

@novu/react/Hooks

# React hooks for subscription management

Learn how to use the useSubscriptions, useCreateSubscription, and other hooks to manage subscriptions in Novu.

The `@novu/react` package provides a set of Subscription hooks for managing topic subscriptions without using the prebuilt Subscription components.

These hooks let you build fully custom experiences by working directly with the subscription data model.

If you prefer to use the default Subscription components, refer to the [Subscription components documentation](https://docs.novu.co/platform/subscription/quickstart).

## [`useSubscriptions`](https://docs.novu.co/#usesubscriptions)

Fetches all subscriptions associated with a specific topic for the current subscriber.

### [Hook parameters](https://docs.novu.co/#hook-parameters)

| Prop | Type | Default |
| --- | --- | --- |
| 
`onError?`

 | 

`(error: NovuError) => void`

 | \- |
| 

`onSuccess?`

 | 

`(data: TopicSubscription[]) => void`

 | \- |
| 

`topicKey`

 | 

`string`

 | \- |

### [Return value](https://docs.novu.co/#return-value)

| Prop | Type | Default |
| --- | --- | --- |
| 
`refetch?`

 | 

`() => Promise<void>`

 | \- |
| 

`isFetching?`

 | 

`boolean`

 | \- |
| 

`isLoading?`

 | 

`boolean`

 | \- |
| 

`error?`

 | 

`NovuError | undefined`

 | \- |
| 

`subscriptions?`

 | 

`TopicSubscription[]`

 | `[]` |

### [Example usage](https://docs.novu.co/#example-usage)

This example fetches all subscriptions for a given topic and exposes them for rendering once loading completes.

```
import { useSubscriptions } from "@novu/react";
 
const { subscriptions, isLoading } = useSubscriptions({
  topicKey: "project-123",
});
```

## [`useSubscription`](https://docs.novu.co/#usesubscription)

Fetches a specific subscription instance.

### [Hook parameters](https://docs.novu.co/#hook-parameters-1)

| Prop | Type | Default |
| --- | --- | --- |
| 
`onError?`

 | 

`(error: NovuError) => void`

 | \- |
| 

`onSuccess?`

 | 

`(data: TopicSubscription | null) => void`

 | \- |
| 

`identifier?`

 | 

`string`

 | \- |
| 

`topicKey`

 | 

`string`

 | \- |

### [Return value](https://docs.novu.co/#return-value-1)

| Prop | Type | Default |
| --- | --- | --- |
| 
`refetch?`

 | 

`() => Promise<void>`

 | \- |
| 

`isLoading?`

 | 

`boolean`

 | \- |
| 

`error?`

 | 

`NovuError | undefined`

 | \- |
| 

`subscription?`

 | 

`TopicSubscription | null`

 | \- |

### [Example usage](https://docs.novu.co/#example-usage-1)

This example shows how to retrieve a specific subscription by its identifier to access its preferences.

```
import { useSubscription } from "@novu/react";
 
const { subscription, isLoading } = useSubscription({
  topicKey: "project-123",
  identifier: "user-preference-1",
});
```

## [`useCreateSubscription`](https://docs.novu.co/#usecreatesubscription)

Creates a new subscription to a topic for the current subscriber.

### [Return value](https://docs.novu.co/#return-value-2)

| Prop | Type | Default |
| --- | --- | --- |
| 
`error?`

 | 

`NovuError | undefined`

 | \- |
| 

`isCreating?`

 | 

`boolean`

 | \- |
| 

`create?`

 | 

`(args: CreateSubscriptionArgs) => Promise<{ data?: TopicSubscription; error?: NovuError }>`

 | \- |

### [Example usage](https://docs.novu.co/#example-usage-2)

This example demonstrates how to trigger the creation of a new subscription for a topic.

```
import { useCreateSubscription } from "@novu/react";
 
const { create, isCreating } = useCreateSubscription();
 
await create({
  topicKey: "project-123",
  identifier: "project-updates",
});
```

## [`useUpdateSubscription`](https://docs.novu.co/#useupdatesubscription)

Updates an existing subscription's properties or preferences list.

### [Return value](https://docs.novu.co/#return-value-3)

| Prop | Type | Default |
| --- | --- | --- |
| 
`error?`

 | 

`NovuError | undefined`

 | \- |
| 

`isUpdating?`

 | 

`boolean`

 | \- |
| 

`update?`

 | 

`(args: UpdateSubscriptionArgs) => Promise<{ data?: TopicSubscription; error?: NovuError }>`

 | \- |

### [Example usage](https://docs.novu.co/#example-usage-3)

This example shows how to update the preferences of an existing subscription, such as toggling a specific workflow.

```
import { useUpdateSubscription } from "@novu/react";
 
const { update, isUpdating } = useUpdateSubscription();
 
const handleToggle = async () => {
  await update({
    topicKey: "project-123",
    subscriptionId: "sub-id-123",
    preferences: [{ workflowId: "workflow-one", enabled: false }]
  });
};
```

## [`useRemoveSubscription`](https://docs.novu.co/#useremovesubscription)

Unsubscribes the current user from a topic by removing the subscription instance.

### [Return value](https://docs.novu.co/#return-value-4)

| Prop | Type | Default |
| --- | --- | --- |
| 
`error?`

 | 

`NovuError | undefined`

 | \- |
| 

`isRemoving?`

 | 

`boolean`

 | \- |
| 

`remove?`

 | 

`(args: { subscriptionId: string; topicKey: string }) => Promise<{ error?: NovuError }>`

 | \- |

### [Example usage](https://docs.novu.co/#example-usage-4)

This example renders an unsubscribe button that removes the subscription when clicked.

```
import { useRemoveSubscription } from "@novu/react";
 
function UnsubscribeButton({ subscriptionId }) {
  const { remove, isRemoving } = useRemoveSubscription();
 
  return (
    <button
      onClick={() =>
        remove({
          subscriptionId,
          topicKey: "project-123",
        })
      }
      disabled={isRemoving}
    >
      {isRemoving ? "Removing..." : "Unsubscribe"}
    </button>
  );
}
```

[NovuProvider\\ \\ Learn how to use the NovuProvider component to set up the Novu context in your React application](https://docs.novu.co/platform/sdks/react/hooks/novu-provider) [useCounts\\ \\ Learn how to use the useCounts hook to fetch notification counts in your React application](https://docs.novu.co/platform/sdks/react/hooks/use-counts)

### On this page

[`useSubscriptions`](https://docs.novu.co/#usesubscriptions) [Hook parameters](https://docs.novu.co/#hook-parameters) [Return value](https://docs.novu.co/#return-value) [Example usage](https://docs.novu.co/#example-usage) [`useSubscription`](https://docs.novu.co/#usesubscription) [Hook parameters](https://docs.novu.co/#hook-parameters-1) [Return value](https://docs.novu.co/#return-value-1) [Example usage](https://docs.novu.co/#example-usage-1) [`useCreateSubscription`](https://docs.novu.co/#usecreatesubscription) [Return value](https://docs.novu.co/#return-value-2) [Example usage](https://docs.novu.co/#example-usage-2) [`useUpdateSubscription`](https://docs.novu.co/#useupdatesubscription) [Return value](https://docs.novu.co/#return-value-3) [Example usage](https://docs.novu.co/#example-usage-3) [`useRemoveSubscription`](https://docs.novu.co/#useremovesubscription) [Return value](https://docs.novu.co/#return-value-4) [Example usage](https://docs.novu.co/#example-usage-4)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/react/hooks/subscription.mdx)Open in ChatGPTOpen in Claude