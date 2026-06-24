# Source: https://docs.novu.co/platform/integrations/push/push-activity-tracking

[Push](https://docs.novu.co/platform/integrations/push)

# Push Notification Activity Tracking

Learn how to manually forward push notification events from your application to Novu for unified activity tracking.

To enable activity tracking for Push channel notifications, Novu supports a manual integration approach for push notifications. Where your application captures and forwards push notification events to Novu. Once received, Novu processes and displays these events on the dashboard for a unified tracking experience.

## [How it works](https://docs.novu.co/#how-it-works)

The process involves a four-step data flow from your subscriber's device to Novu's servers:

1. **Client application listens**: Your application listens for push notification interactions. For example, the user opens a notification.
2. **Event sent to your backend:** When an event occurs, your application sends a payload containing the event details to an endpoint on your own server.
3. **Backend forwards to Novu:** Your server receives this data and uses the Novu SDK to securely forward the event to Novu's API.
4. **Event appears in Novu:** Novu processes the event and displays it in the **Activity Feed**, alongside events from your other channels.

## [Step 1: Enable push activity tracking in Novu](https://docs.novu.co/#step-1-enable-push-activity-tracking-in-novu)

Enable push activity tracking in your Novu dashboard and get the necessary credentials.

1. Log in to the Novu dashboard.
2. Navigate to the **Integration Store** page, and then select your push provider.
3. Enable the **Push Activity Tracking** toggle. ![Enable push activity tracking toggle in the Novu integration store](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fenable-activity-tracking.36ddfa12.png&w=3840&q=75)
4. Once enabled, your unique **Environment ID** and **Integration ID** are displayed. Copy and save both of these; you will need them for your backend code.
5. Click **Save Changes**.

## [Step 2: Listen for push events in your application](https://docs.novu.co/#step-2-listen-for-push-events-in-your-application)

When push notifications are delivered or interacted with, your application must capture those events and forward them to your backend. The exact code implementation depends on the push provider that you use.

The goal is to capture the event and send a JSON payload to your backend. You must send these fields:

- `eventType`: A string describing the event (for example, `opened`, `clicked`).
- `eventId`: The unique identifier for the notification, which Novu includes in the push payload as `__nvMessageId`.

ExpoFCMOneSignal

```
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
 
// Listen for notification interactions
Notifications.addNotificationResponseReceivedListener(async (response) => {
  const eventData = {
    eventType: "opened",
    eventId: response.notification.request.content.data?.__nvMessageId,
    timestamp: new Date().toISOString(),
    actionIdentifier: response.actionIdentifier,
    content: {
      title: response.notification.request.content.title,
      body: response.notification.request.content.body,
      data: response.notification.request.content.data,
    },
    // Optional device context
    deviceId: Constants.sessionId,
    platform: Platform.OS,
  }});
 
  await fetch("https://your-api.com/api/notifications/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });
```

## [Step 3: Forward events to Novu from your backend](https://docs.novu.co/#step-3-forward-events-to-novu-from-your-backend)

Create an endpoint on your backend that receives the event data from your application and uses the Novu SDK to forward it to Novu.

```
import { Novu } from '@novu/api';
 
const novuClient = new Novu({
  apiKey: process.env.NOVU_API_KEY,
});
 
// Your backend API endpoint that receives events from your mobile application
app.post('/api/notifications/events', async (req, res) => {
  // Forward the event data to Novu
  const response = await novuClient.activity.track({
    environmentId: process.env.NOVU_ENVIRONMENT_ID,
    integrationId: process.env.NOVU_INTEGRATION_ID,
    requestBody: req.body,
  });
 
  res.status(200).json({ success: true, data: response });
});
```

Both `Integration ID` and `Environment ID` can be found in the push provider integration page after enabling Push Activity Tracking.

Once these steps are completed, your application will send push notification engagement data to Novu. This gives you a complete, unified view of your notification performance in the Activity Feed.

[Pushpad\\ \\ Learn how to use the Pushpad provider to send web push notifications using Novu](https://docs.novu.co/platform/integrations/push/pushpad) [SMS\\ \\ Integrate SMS providers with Novu to deliver text message notifications. Configure providers, set up workflows, and manage delivery.](https://docs.novu.co/platform/integrations/sms)

### On this page

[How it works](https://docs.novu.co/#how-it-works) [Step 1: Enable push activity tracking in Novu](https://docs.novu.co/#step-1-enable-push-activity-tracking-in-novu) [Step 2: Listen for push events in your application](https://docs.novu.co/#step-2-listen-for-push-events-in-your-application) [Step 3: Forward events to Novu from your backend](https://docs.novu.co/#step-3-forward-events-to-novu-from-your-backend)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/push/push-activity-tracking.mdx)Open in ChatGPTOpen in Claude