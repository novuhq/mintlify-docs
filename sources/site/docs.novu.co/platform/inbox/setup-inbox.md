# Source: https://docs.novu.co/platform/inbox/setup-inbox

# Set up the Inbox

Learn how to integrate the Novu Inbox component into your application to display real-time notifications for your subscribers.

The Inbox component displays a notification bell by default, which opens a menu containing the subscriber's notifications and preferences.

## [Installation](https://docs.novu.co/#installation)

To get started, install the Inbox UI:

Next.jsReact

npmpnpmyarnbun

```
npm install @novu/nextjs
```

## [Try Inbox in keyless mode](https://docs.novu.co/#try-inbox-in-keyless-mode)

Keyless mode lets you test the look and features of the Inbox component instantly in your application, no setup required.

![Inbox keyless](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fkeyless-inbox.ebbe15c5.png&w=3840&q=75)

Next.jsReact

```
import { Inbox } from '@novu/nextjs';
 
export function Novu() {
  return (
    <Inbox />
  );
}
```

This is only for testing, the data is temporary (expires in 24h) and not tied to real subscribers.

## [Use Inbox with real subscribers](https://docs.novu.co/#use-inbox-with-real-subscribers)

To display real-time notifications for your subscribers, connect the Inbox component to your Novu environment using your `applicationIdentifier` and a `subscriberId`. You can create or manage subscribers from the [Novu Dashboard](https://dashboard.novu.co/subscribers).

### [US region (default)](https://docs.novu.co/#us-region-default)

Next.jsReact

```
import { Inbox } from '@novu/nextjs';
 
export function Novu() {
  return (
    <Inbox
      applicationIdentifier="APPLICATION_IDENTIFIER"
      subscriber="SUBSCRIBER_ID"
    />
  );
}
```

[Sign in](https://dashboard.novu.co/auth/sign-up) to get your own API keys

### [EU region](https://docs.novu.co/#eu-region)

If your Novu account is in the EU region, then include the `backendUrl` and `socketUrl` props to connect to EU-specific API endpoints:

Next.jsReact

```
import { Inbox } from '@novu/nextjs';
 
export function Novu() {
  return (
    <Inbox
      applicationIdentifier="APPLICATION_IDENTIFIER"
      subscriber="SUBSCRIBER_ID"
      backendUrl="https://eu.api.novu.co"
      socketUrl="wss://eu.socket.novu.co"
    />
  );
}
```

[Sign in](https://dashboard.novu.co/auth/sign-up) to get your own API keys

[Introduction to Inbox\\ \\ Learn how to integrate Novu Inbox component, a pre-built notification center component for real-time in-app notifications in your application.](https://docs.novu.co/platform/inbox) [Snooze\\ \\ Allow users to temporarily hide notifications and resurface them later using built-in snooze functionality in the Inbox component.](https://docs.novu.co/platform/inbox/features/snooze)

### On this page

[Installation](https://docs.novu.co/#installation) [Try Inbox in keyless mode](https://docs.novu.co/#try-inbox-in-keyless-mode) [Use Inbox with real subscribers](https://docs.novu.co/#use-inbox-with-real-subscribers) [US region (default)](https://docs.novu.co/#us-region-default) [EU region](https://docs.novu.co/#eu-region)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/setup-inbox.mdx)Open in ChatGPTOpen in Claude