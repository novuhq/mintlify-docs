# Source: https://docs.novu.co/platform/inbox/advanced-customization/customize-bell

Advanced Customization

# Customize Bell Icon

Learn how to fully customize the inbox component bell icon using your own components or third-party libraries.

The Novu Inbox includes a default bell icon that triggers the notification popover when clicked. You can use this bell as a standalone component or customize it to match your application's design system.

## [Bell component](https://docs.novu.co/#bell-component)

The Bell component displays Novu's default Inbox bell icon. It's designed to be used as a standalone trigger when you want to build your own custom notification center UI, such as a custom popover or a full-page view.

By using Bell component, you separate the trigger (the icon) from the content (the notification list), giving you full control over the layout and behavior of your application's notification center.

```
import { Inbox, Bell } from '@novu/react';
 
function BellComponent() {
  return (
      <Inbox
        applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
        subscriber="YOUR_SUBSCRIBER_ID"
      >
        <Bell/>
      </Inbox>
  );
}
export default BellComponent;
```

See the [Custom Popover documentation](https://docs.novu.co/platform/inbox/advanced-customization/customize-popover) for how to use the Bell component with third party library like Radix UI to trigger a custom popover that contains the notification list.

## [Replace the default Bell Icon](https://docs.novu.co/#replace-the-default-bell-icon)

Replace the default bell icon that comes with the Inbox component with your own custom React component or a third-party UI library component to match your application's design. You can do this using the `renderBell` prop.

![Custom bell](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcustom-bell.e91c4968.gif&w=3840&q=75)

Custom bellCustom bell showing unread countCustom bell with severity

```
import { Inbox } from '@novu/react';
 
function CustomBell() {
  return (
      <Inbox
        applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
        subscriber="YOUR_SUBSCRIBER_ID"
        renderBell={() => {
          return (
            <div className="bg-blue-300 p-4 inline-flex">
              New notifications
            </div>
          );
        }}
      />
  );
}
export default CustomBell;
```

[Icons\\ \\ Learn how to override the default icons in the Inbox UI using the appearance prop.](https://docs.novu.co/platform/inbox/configuration/icons) [Customize Popover\\ \\ Learn how to display the Inbox content outside the default popover and integrate it into your own custom popover or page layout.](https://docs.novu.co/platform/inbox/advanced-customization/customize-popover)

### On this page

[Bell component](https://docs.novu.co/#bell-component) [Replace the default Bell Icon](https://docs.novu.co/#replace-the-default-bell-icon)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/advanced-customization/customize-bell.mdx)Open in ChatGPTOpen in Claude