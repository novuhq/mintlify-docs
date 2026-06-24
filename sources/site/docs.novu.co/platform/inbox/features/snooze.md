# Source: https://docs.novu.co/platform/inbox/features/snooze

<Inbox /> Features

# Snooze Notifications

Allow users to temporarily hide notifications and resurface them later using built-in snooze functionality in the Inbox component.

The `<Inbox />` component includes built-in support for snoozing notifications, which can be used to temporarily dismiss notifications and have them reappear at a more convenient time.

![Snooze icon on the inbox notification](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsnooze.a3179611.png&w=3840&q=75)

Snooze is supported in client-side SDKs starting from version 3.3.0 and is only available for cloud workspaces.

## [How snooze works](https://docs.novu.co/#how-snooze-works)

When a subscriber snoozes a notification:

- It is temporarily removed from the general list.
- It appears in the Snoozed tab. ![Snooze tab](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsnooze-tab.e1254f6f.png&w=3840&q=75)
- It reappears in the general list after the specified time elapses.

During the snooze period, the notification cannot be marked as read, unread, or archived. All of these behaviors are handled automatically by the Inbox component.

## [How to snooze a notification](https://docs.novu.co/#how-to-snooze-a-notification)

All dates and times are interpreted in your subscriber's local timezone. They can snooze a notification directly from the Inbox using one of the following options:

- Preset options:
 - An hour from now
 - Tomorrow
- Custom date and time:
 - A built-in date and time picker allows users to select a specific future time.

![Snooze a notification](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsnooze-notification.715aec77.png&w=3840&q=75)

The minimium snooze time must be at least 3 minutes in the future. While the maximum duration a notification can be snoozed depends on your cloud workspace plan:

- **Free**: Up to 24 hours per notification
- **Trial**: Up to 90 days during the 14-day trial, same as Pro
- **Pro / Team**: Up to 90 days
- **Enterprise**: Defaults to 90 days, extendable on request

While the Inbox component handles snoozing automatically, the [JavaScript SDK](https://docs.novu.co/platform/sdks/javascript#methods) also exposes `.snooze()` and `.unsnooze()` methods on the notification object to build custom snooze functionality.

This lets you create custom UI elements or workflows that trigger snooze actions outside of the default menu.

## [Managing snoozed notifications](https://docs.novu.co/#managing-snoozed-notifications)

The Inbox component includes a dedicated Snoozed tab that automatically displays notifications scheduled to reappear later. From this tab, users can review all snoozed notifications and take further actions as needed.

Users can unsnooze a notification at any time, which immediately returns it to the All tab. Once unsnoozed, the notification regains its standard behavior. It can be marked as read, unread, or archived like any other item.

| Action | Result |
| --- | --- |
| Manual unsnooze | Restores the notification exactly as it was: same tab, same read/unread state. If it was read before snoozing, it re-enters the All tab still marked read. |
| Automatic unsnooze (timer expires) | Re-delivers the notification to All as a new, unread item with an updated delivery timestamp. |

This logic is built into the component and does not require any additional configuration. Notifications automatically reappear in the All tab once their snooze duration elapses.

## [Hiding snooze button](https://docs.novu.co/#hiding-snooze-button)

If you don't need the Snooze feature, you can hide it from the Inbox component UI using the [appearance](https://docs.novu.co/platform/inbox/configuration/styling#style-the-inbox-ui-elements) prop. The example below hides the snooze button and snoozed list item in the dropdown menu.

```
import { Inbox } from '@novu/react';
 
 
export const InboxWithSnoozeHidden = () => {
  return (
    <Inbox
      applicationIdentifier={"APPLICATION_IDENTIFIER"}
      subscriber={{
        subscriberId: "SUBSCRIBER_ID"
      }}
      appearance={{
        elements: {
          notificationSnooze__button: "hidden",
          inboxStatus__dropdownItem: "[&:nth-child(3)]:hidden",
        },
      }}
    />
  )
}
```

[Set up the Inbox\\ \\ Learn how to integrate the Novu Inbox component into your application to display real-time notifications for your subscribers.](https://docs.novu.co/platform/inbox/setup-inbox) [Schedule\\ \\ Learn how subscribers can use the Schedule feature in the Inbox component to control when they receive notifications from email, SMS and push channels.](https://docs.novu.co/platform/inbox/features/schedule)

### On this page

[How snooze works](https://docs.novu.co/#how-snooze-works) [How to snooze a notification](https://docs.novu.co/#how-to-snooze-a-notification) [Managing snoozed notifications](https://docs.novu.co/#managing-snoozed-notifications) [Hiding snooze button](https://docs.novu.co/#hiding-snooze-button)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/features/snooze.mdx)Open in ChatGPTOpen in Claude