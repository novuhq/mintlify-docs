# Source: https://docs.novu.co/platform/inbox/prepare-for-production

# Prepare Inbox component for Production

Learn how to prepare your Inbox for production by enabling HMAC encryption for security and managing Novu's branding.

Before deploying the Inbox UI to production, you should secure your integration and configure the correct environment. You can also remove Novu's branding from your notifications.

This ensures that your end users receive notifications safely, without exposure to unnecessary risks, and in a way that aligns with your product branding.

## [Set the correct environment](https://docs.novu.co/#set-the-correct-environment)

Novu supports multiple environments, including development, production, and any custom environments you create.

When preparing for deployment, choose the environment that will serve as your production environment and update your configuration accordingly:

- Use the API keys for your selected production environment from the [API Keys](https://dashboard.novu.co/api-keys) page in your application.
 
- Store keys in `.env` file or your server’s environment variables.
 
- Confirm your `applicationIdentifier` and `subscriber` match the configuration for your chosen production environment.
 
- Add these two props, if using the EU region:
 
 - `apiUrl` with value **[https://eu.api.novu.co](https://eu.api.novu.co)**
 - `socketUrl` with value **wss://eu.socket.novu.co**

## [Secure your Inbox with HMAC encryption](https://docs.novu.co/#secure-your-inbox-with-hmac-encryption)

When you add the Inbox to your application, you're required to pass:

- `subscriberId`: Identifies the current subscriber.
- `applicationIdentifier`: A public key to communicate with the notification feed API.

Without additional security, a malicious actor could potentially guess another subscriber's `subscriberId` and use your public `applicationIdentifier` to view that user's notifications.

You can prevent this by enabling HMAC (Hash-based Message Authentication Code) encryption. This process uses a _secret key_ to create a secure signature (`subscriberHash`) for each `subscriberId`. Novu then verifies this hash to ensure that requests to view a notification feed are authentic and not from an impersonator.

Follow these steps to enable HMAC encryption.

### [1\. Enable HMAC in the dashboard](https://docs.novu.co/#1-enable-hmac-in-the-dashboard)

Activate the HMAC security feature within your Novu in-app provider settings.

1. Go to [Novu Dashboard](https://dashboard.novu.co).
2. Navigate to the [Integrations Store](https://dashboard.novu.co/integrations) page.
3. Click on the **Novu In-App** for your chosen production environment
4. A side panel opens from the right side of the screen with the provider settings, enable `Security HMAC encryption` toggle in **Integration Credentials** section. ![Enabling HMAC in the Novu dashboard](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhmac.b29678e1.png&w=3840&q=75)

### [2\. Generate HMAC hash on the server side](https://docs.novu.co/#2-generate-hmac-hash-on-the-server-side)

Next, use your secret key from the API Keys page on the Novu dashboard to generate an HMAC hash of the `subscriberId` on the server side.

Without ContextWith Context

utils/hmac-hash.ts

```
import { createHmac } from 'crypto';
 
// The subscriberId of the logged-in user
const subscriberId = 'REPLACE_WITH_SUBSCRIBER_ID';
 
// The secret key from your Novu API Keys page
const novuSecretKey = process.env.NOVU_SECRET_KEY;
 
// Generate the HMAC hash
const hmacHash = createHmac('sha256', novuSecretKey)
  .update(subscriberId)
  .digest('hex');
```

Keep `NOVU_SECRET_KEY` secure and never expose it to the client.

### [3\. Use the HMAC hash in the Inbox component](https://docs.novu.co/#3-use-the-hmac-hash-in-the-inbox-component)

Send the `hmacHash` generated in the previous step to the client side application. You can include it in the initial data payload when a subscriber or user logs in or fetch it from a dedicated API endpoint.

Pass the hash to the `subscriberHash` prop in your Inbox component.

Without ContextWith Context

components/InboxWithSubscriberHash.tsx

```
import { Inbox } from '@novu/react';
 
// Example: The hmacHash is passed to the frontend
// as part of the user object after they authenticate.
 
const { user } = currentUser();
const hmacHash = user?.novuSubscriberHash;
 
<Inbox
  applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
  subscriber="YOUR_SUBSCRIBER_ID"
  subscriberHash={hmacHash}
/>;
```

If HMAC encryption is active in In-App provider settings and `subscriberHash` along with `subscriberId` is not provided, then Inbox will not load

## [Remove Novu branding](https://docs.novu.co/#remove-novu-branding)

Users on a paid plan can remove the "Inbox by Novu" branding from the Inbox UI.

To remove the branding:

1. Go to [Novu Dashboard](https://dashboard.novu.co).
2. Navigate to the **Settings** page.
3. Under the **Organization** tab, find the **Branding & Integrations** section.
4. Enable the **Remove Novu branding** toggle.

![Removing Novu branding](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnovu-branding.7b6f16a3.png&w=3840&q=75)

[Headless Mode\\ \\ Learn how to build custom Inbox UI for your application using Novu custom hooks](https://docs.novu.co/platform/inbox/headless-mode) [Migrate to the New Inbox\\ \\ This guide outlines the key differences between the \`@novu/notification-center\` package and the new \`@novu/react\` package and how to migrate to the latest Inbox version.](https://docs.novu.co/platform/inbox/migration-guide)

### On this page

[Set the correct environment](https://docs.novu.co/#set-the-correct-environment) [Secure your Inbox with HMAC encryption](https://docs.novu.co/#secure-your-inbox-with-hmac-encryption) [1\. Enable HMAC in the dashboard](https://docs.novu.co/#1-enable-hmac-in-the-dashboard) [2\. Generate HMAC hash on the server side](https://docs.novu.co/#2-generate-hmac-hash-on-the-server-side) [3\. Use the HMAC hash in the Inbox component](https://docs.novu.co/#3-use-the-hmac-hash-in-the-inbox-component) [Remove Novu branding](https://docs.novu.co/#remove-novu-branding)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/inbox/prepare-for-production.mdx)Open in ChatGPTOpen in Claude