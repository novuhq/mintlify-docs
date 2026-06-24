# Source: https://docs.novu.co/guides/webhooks/segment

# How to integrate Segment with Novu

Learn how to set up Segment as a data source for Novu using Destination Functions. Send user events from Segment to trigger notifications in Novu.

This guide demonstrates how to use Segment's Destination Functions to send user events and traits to Novu. You'll learn how to:

- Create a custom Segment destination for Novu
- Map Segment identify calls to Novu subscribers
- Trigger notification workflows from Segment track events
- Handle errors and retry logic for reliable delivery

By the end, you'll have a working integration that creates subscribers and triggers notification workflows in Novu based on Segment events.

**Prerequisites**

Before you start, ensure you have:

- A **Segment account** with access to **Functions** (check your workspace permissions)
- A **Novu account** with an **API key** (find this in your Novu dashboard under Settings > API Keys)

## [Create a Destination Function in Segment](https://docs.novu.co/#create-a-destination-function-in-segment)

1. Log in to your Segment account
2. Navigate to **Connections** > **Functions** in the left sidebar
3. Click **New Function** and select **Destination**
4. Name your function (e.g., Novu Destination) and click **Create Function**

## [Configure the Destination Function](https://docs.novu.co/#configure-the-destination-function)

The Destination Function will handle two key Segment event types:

- **identify**: Creates or updates a subscriber in Novu
- **track**: Triggers a notification workflow in Novu

Paste the following complete code into the Segment Function editor:

```
/**
 * Handles identify events: Creates or updates a subscriber in Novu
 * @param {SegmentIdentifyEvent} event - The Segment identify event
 * @param {FunctionSettings} settings - Function settings including API key
 */
async function onIdentify(event, settings) {
  const endpoint = 'https://api.novu.co/v2/subscribers';
  const apiKey = settings.apiKey;
 
  if (!apiKey) throw new Error('Novu API key is missing in settings');
  if (!event.userId) throw new Error('userId is required in identify event');
 
  const subscriberData = {
    subscriberId: event.userId,
    firstName: event.traits?.firstName || null,
    lastName: event.traits?.lastName || null,
    email: event.traits?.email || null,
    phone: event.traits?.phone || null,
    avatar: event.traits?.avatar || null,
  };
 
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `ApiKey ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(subscriberData)
    });
 
    const responseBody = await response.json();
    if (!response.ok) {
      if (response.status >= 500 || response.status === 429) {
        throw new RetryError(`Server error: ${response.status}`);
      }
      throw new Error(`API error: ${response.status} - ${responseBody.message || 'Unknown error'}`);
    }
  } catch (error) {
    throw error instanceof RetryError ? error : new RetryError(error.message);
  }
}
 
// Mapping of Segment track events to Novu workflows
const EVENT_TO_WORKFLOW_MAPPINGS = {
  'User Registered': 'welcome'
  // Add more mappings: 'Event Name': 'novu-workflow-name'
};
 
/**
 * Handles track events: Triggers a notification workflow in Novu
 * @param {SegmentTrackEvent} event - The Segment track event
 * @param {FunctionSettings} settings - Function settings including API key
 */
async function onTrack(event, settings) {
  const endpoint = 'https://api.novu.co/v1/events/trigger';
  const apiKey = settings.apiKey;
 
  if (!apiKey) throw new Error('Novu API key is missing in settings');
  if (!event.userId) throw new Error('userId is required in track event');
 
  const workflow = EVENT_TO_WORKFLOW_MAPPINGS[event.event];
  if (!workflow) throw new Error(`No workflow mapped for event: ${event.event}`);
 
  const triggerEvent = {
    name: workflow,
    to: { subscriberId: event.userId },
    payload: event.properties || {}
  };
 
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `ApiKey ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(triggerEvent)
    });
 
    const responseBody = await response.json();
    if (!response.ok) {
      if (response.status >= 500 || response.status === 429) {
        throw new RetryError(`Server error: ${response.status}`);
      }
      throw new Error(`API error: ${response.status} - ${responseBody.message || 'Unknown error'}`);
    }
  } catch (error) {
    throw error instanceof RetryError ? error : new RetryError(error.message);
  }
}
```

### Code Explanation

**Customize the Mapping**: Update `EVENT_TO_WORKFLOW_MAPPINGS` with your Segment event names and corresponding Novu workflow names.

## [Deploy the Function](https://docs.novu.co/#deploy-the-function)

1. Click **Save** in the Function editor
2. Enable the function by toggling it to **Active**

## [Connect the Function to a Source](https://docs.novu.co/#connect-the-function-to-a-source)

1. Go to **Connections** > Select your **Source** (e.g., website, app)
2. In the **Destinations** tab, click **Add Destination**
3. Choose your **Novu Destination Function** from the list
4. Click **Connect**. When prompted, enter your **Novu API key** in the apiKey field
5. Save the configuration

## [Testing the Integration](https://docs.novu.co/#testing-the-integration)

Verify everything works:

### 1\. Send an identify event

### 2\. Send a track event

Use Segment's **Debugger** to monitor function calls and catch any errors.

### Troubleshooting

### Additional Notes

With this setup, your Segment events will seamlessly flow into Novu, enabling powerful notification workflows tailored to your users' actions.

[Stripe\\ \\ This guide walks you through integrating Stripe webhooks with Novu notifications in a Next.js application.](https://docs.novu.co/guides/webhooks/stripe) [Managing Workflows\\ \\ Update workflow definitions in Development with the Novu API, then publish them to other environments through CI/CD.](https://docs.novu.co/guides/recipes/managing-workflows)

### On this page

[Create a Destination Function in Segment](https://docs.novu.co/#create-a-destination-function-in-segment) [Configure the Destination Function](https://docs.novu.co/#configure-the-destination-function) [Deploy the Function](https://docs.novu.co/#deploy-the-function) [Connect the Function to a Source](https://docs.novu.co/#connect-the-function-to-a-source) [Testing the Integration](https://docs.novu.co/#testing-the-integration)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/guides/webhooks/segment.mdx)Open in ChatGPTOpen in Claude