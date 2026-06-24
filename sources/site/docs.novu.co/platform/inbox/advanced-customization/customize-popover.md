# Source: https://docs.novu.co/platform/inbox/advanced-customization/customize-popover

Advanced Customization

# Customize Popover

Learn how to display the Inbox content outside the default popover and integrate it into your own custom popover or page layout.

The Inbox component provides a built-in popover triggered by its bell icon. In situations where you want more control over how and where notifications appear, you can display the notification feed directly or mount it inside your own custom popover, modal, or panel.

## [Display the standalone notification feed](https://docs.novu.co/#display-the-standalone-notification-feed)

You can render the notification feed directly into any part of your application, such as a dashboard panel or a dedicated notifications page. This is useful for situations where you don't need a popover trigger at all. Novu provides two components for this.

Both components support the same customization props as the Inbox component, except for configuration options (like `applicationIdentifier`, `subscriber`, and `renderBell`).

### [Notifications component](https://docs.novu.co/#notifications-component)

The Notifications component renders the core notification experience, which includes the Inbox header (with title and dropdown), the scrollable list of notifications, and the footer.

![notfications component](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnotifications-component.76470730.png&w=3840&q=75)

```
import { Inbox, Notifications } from '@novu/react';
 
function NotificationFeed() {
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
    >
      <Notifications />
    </Inbox>
  );
}
 
export default NotificationFeed;
```

### [InboxContent component](https://docs.novu.co/#inboxcontent-component)

The InboxContent component renders everything the Notifications component does, but with one key addition: the Preferences page. This allows users to manage their notification settings directly from the component.

![notfications component](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finboxcontent-component.6f749b58.png&w=3840&q=75)

```
import { Inbox, InboxContent } from '@novu/react';
 
function NotificationFeed() {
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriber="YOUR_SUBSCRIBER_ID"
    >
      <InboxContent />
    </Inbox>
  );
}
 
export default NotificationFeed;
```

## [Building a custom popover](https://docs.novu.co/#building-a-custom-popover)

Use the Notifications or InboxContent components inside your own popover to keep all of Novu’s notification functionality while integrating with any external UI library. Trigger the popover with the Bell component or your own custom trigger.

Using NotificationsUsing InboxContentWith shadcn/ui Drawer

```
import { Inbox, Notifications, Bell } from '@novu/react';
import { Popover, PopoverTrigger } from '@radix-ui/react-popover';
import { PopoverContent } from '@radix-ui/react-popover';
 
function CustomPopoverPage() {
 
  return (
      <Inbox
        applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
        subscriber="YOUR_SUBSCRIBER_ID"
      >
        <Popover>
          <PopoverTrigger>
            <Bell />
          </PopoverTrigger>
          <PopoverContent className="h-[600px] w-[400px] p-0">
            <Notifications />
          </PopoverContent>
        </Popover>
      </Inbox>
  );
}
export default CustomPopoverPage;
```

[Customize Bell Icon\\ \\ Learn how to fully customize the inbox component bell icon using your own components or third-party libraries.](https://docs.novu.co/platform/inbox/advanced-customization/customize-bell) [Customize Notification Items\\ \\ Learn how to use render props in the Inbox component to customize the subject, body, avatar, default and custom actions, or the entire notification item.](https://docs.novu.co/platform/inbox/advanced-customization/customize-notification-items)

### On this page

[Display the standalone notification feed](https://docs.novu.co/#display-the-standalone-notification-feed) [Notifications component](https://docs.novu.co/#notifications-component) [InboxContent component](https://docs.novu.co/#inboxcontent-component) [Building a custom popover](https://docs.novu.co/#building-a-custom-popover)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/advanced-customization/customize-popover.mdx)Open in ChatGPTOpen in Claude