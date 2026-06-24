# Source: https://docs.novu.co/platform/inbox

# Introduction to Inbox

Learn how to integrate Novu Inbox component, a pre-built notification center component for real-time in-app notifications in your application.

The Novu Inbox is a prebuilt, ready-to-use, and fully customizable UI component for delivering real-time in-app notifications. It gives your subscribers a centralized place to view and manage notifications.

With just a few lines of code, you can embed a polished, real-time notification experience directly into your application.

![Introduction to inbox](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintro-to-inbox.0a9ce931.png&w=3840&q=75)

## [Composable architecture](https://docs.novu.co/#composable-architecture)

The Novu Inbox is built with a composable architecture. It is composed of other sub-components:

[**Bell**\\ \\ Used to display the bell icon and trigger the notification component when clicked](https://docs.novu.co/platform/inbox/advanced-customization/customize-bell#bell-component) [**Notifications**\\ \\ Displays the notifications list](https://docs.novu.co/platform/inbox/advanced-customization/customize-popover#notifications-component) [**InboxContent**\\ \\ Displays the content of the `<Inbox />` menu](https://docs.novu.co/platform/inbox/advanced-customization/customize-popover#inboxcontent-component) [**Preferences**\\ \\ Used to display the preferences modal](https://docs.novu.co/platform/inbox/configuration/preferences#using-the-preferences--component)

![Fully functional and customizable React Inbox component](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Foverview%402x.cae3ebf9.png&w=3840&q=75)

By composing these individual components, you can create multiple popular inbox layouts that fit perfectly within your application's design.

Design files

To aid your design process, we provide a [free Figma file](https://www.figma.com/community/file/1425407348374863860) that contains all of the design assets. Make a copy of the file into your own account to get started with customizing your graphical Inbox elements.

## [Key feature](https://docs.novu.co/#key-feature)

- Full stack integration: The Inbox handles UI, unread states, routing, and preferences all in one place.
- Highly customizable: Override styles, replace every UI elements and icons.
- Flexible layouts: Use the default Inbox UI layout or build your own.
- Built-in support for Tabs and filters, localization, snoozing, preferences management, and more.

## [How it works](https://docs.novu.co/#how-it-works)

At a high level, the Inbox abstracts away the complexity of building a notification center.

1. When you drop the Inbox component into your application, it securely connects to Novu's services.
2. It automatically fetches user notifications and manages the real-time unread count displayed on the bell icon.
3. When a user clicks the bell, it presents the list of notifications and user preferences.
4. All user interactions, such as marking a notification as read or changing a preference, are automatically synchronized with the Novu backend in real-time.

## [Ways to implement the Novu Inbox](https://docs.novu.co/#ways-to-implement-the-novu-inbox)

There are two integration approaches, depending on your needs for speed versus customization.

### [The "Plug-and-Play" approach](https://docs.novu.co/#the-plug-and-play-approach)

This is the fastest way to integrate the Novu Inbox. The Inbox component, encapsulate all the UI and logic. You simply drop the component into your application, configure it with the necessary properties, and you're done.

### ["Build-Your-Own" Approach](https://docs.novu.co/#build-your-own-approach)

For maximum flexibility and complete control over the look and feel, use the [@novu/react SDK](https://docs.novu.co/platform/sdks/react) for react hooks or [@novu/js SDK](https://docs.novu.co/platform/sdks/javascript) for framework agnostic javascript methods.

You get the power of Novu's notification engine while building a user interface that perfectly matches your application's design system.

[Vanilla JS\\ \\ Learn how to integrate the Novu Inbox component into a Vanilla JS and HTML project.](https://docs.novu.co/platform/quickstart/vanilla-js) [Set up the Inbox\\ \\ Learn how to integrate the Novu Inbox component into your application to display real-time notifications for your subscribers.](https://docs.novu.co/platform/inbox/setup-inbox)

### On this page

[Composable architecture](https://docs.novu.co/#composable-architecture) [Key feature](https://docs.novu.co/#key-feature) [How it works](https://docs.novu.co/#how-it-works) [Ways to implement the Novu Inbox](https://docs.novu.co/#ways-to-implement-the-novu-inbox) [The "Plug-and-Play" approach](https://docs.novu.co/#the-plug-and-play-approach) ["Build-Your-Own" Approach](https://docs.novu.co/#build-your-own-approach)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/index.mdx)Open in ChatGPTOpen in Claude