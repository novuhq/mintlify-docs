# Source: https://docs.novu.co/platform/integrations/email/activity-tracking/manual-configuration/sendgrid

[E-mail](https://docs.novu.co/platform/integrations/email)/[Activity Tracking](https://docs.novu.co/platform/integrations/email/activity-tracking)/Manual configuration

# SendGrid Email Activity Tracking Setup

A step-by-step guide to manually configure SendGrid event webhooks for Novu activity tracking.

If the API key used in your Novu SendGrid integration does not have the required permissions, the automatic setup will fail with an `access forbidden` error. This indicates that Novu lacks the permissions needed to configure the webhook on your behalf.

This guide will walk you through resolving this issue.

## [Step 1: Update SendGrid API key permissions](https://docs.novu.co/#step-1-update-sendgrid-api-key-permissions)

First, you need to update your API key in your SendGrid account to grant the necessary permissions.

1. Log in to your SendGrid account.
2. Under **Settings**, click **API Keys**.
3. Choose whether to edit an existing key or create a new one:
 - To create a new API key, click **Create API Key**.
 - To update an existing key, click the settings icon next to it and select **Edit API Key**. ![Edit existing key or creating a new one](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsendgrid-api.512b4496.png&w=3840&q=75)
4. Set the key permissions to either:
 - **Full Access**, or
 - Custom Access with at least the following enabled:
 - **Mail Send**
 - **Mail Settings** ![Custom access](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcustom-access.5c2ef29c.png&w=3840&q=75)
5. If you created a new key, return to the Novu dashboard and update your SendGrid integration settings with the new API key.

## [Step 2: Enable activity tracking in Novu](https://docs.novu.co/#step-2-enable-activity-tracking-in-novu)

Once your API key has the correct permissions, return to your Novu dashboard to complete the setup.

1. Navigate to the **Integrations** page and select your **SendGrid** integration.
2. Click the **Email Activity Tracking** toggle to enable it.

With the updated permissions, Novu should now successfully auto-configure the webhook for you. You should see a green checkmark indicating that the webhook is active. If you see this, your setup is complete.

![Enable activity tracking in Novu](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fenable-activity-tracking.1ef258db.gif&w=3840&q=75)

## [Step 3: Manual configuration (only if auto-configuration fails)](https://docs.novu.co/#step-3-manual-configuration-only-if-auto-configuration-fails)

If the automatic configuration fails for any reason, or if you prefer to set it up manually, follow these steps.

### [Part 1: Configure the webhook in SendGrid](https://docs.novu.co/#part-1-configure-the-webhook-in-sendgrid)

1. In your Novu SendGrid integration settings, enable the **Email Activity Tracking** toggle to reveal the **Inbound Webhook URL**
2. Copy the this Inbound Webhook URL.
3. Log in to the SendGrid dashboard.
4. Go to the Settings page, and click **Mail Settings**.
5. Click on **Event Webhook**.
6. Click **Create new webhook** ![Create new SendGrid webhook](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsendgrid-webhook.8176e96f.png&w=3840&q=75)
7. Give the webhook a friendly name.
8. Paste the Inbound Webhook URL copied from Novu into the **Post URL** field.
9. Under **Actions to be posted**, select the events Novu supports that you want to track ![Add new event webhook](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fadd-new-event-webhook.7639ed2c.png&w=3840&q=75)
10. Under Singnature Verification, enable **Enable Signed Event Webhook**
11. Click **Save**

### [Part 2: Add the signing key to Novu (Recommended)](https://docs.novu.co/#part-2-add-the-signing-key-to-novu-recommended)

For enhanced security, you should add a signing key to verify that webhooks are coming from SendGrid.

1. Log in to the SendGrid dashboard.
2. Go to the Settings page, and click **Mail Settings**.
3. Click the settings icon next to the webhhok a menu will appear.
4. Click **Edit**. ![Add new event webhook](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fedit-sendgrid-webhook.c87cfb04.png&w=3840&q=75)
5. Enable **Signed Webhook Verification** if is hasn't been enabled. A **Verification Key** will be displayed.
6. Copy the verification key. ![Add new event webhook](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsendgrid-verification-key.f0e32e1f.png&w=3840&q=75)
7. Return to your Novu SendGrid integration settings.
8. Paste the key you just copied from SendGrid into the **Inbound Webhook Signing Key** field. ![Add new event webhook](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finbound-signing-key-sendgrid.41f7d557.png&w=3840&q=75)
9. Click **Save**.

Your SendGrid integration is now manually configured to send activity data to Novu.

[Resend\\ \\ A step-by-step guide to manually configure Resend event webhooks for Novu activity tracking.](https://docs.novu.co/platform/integrations/email/activity-tracking/manual-configuration/resend) [Push\\ \\ Connect push providers like FCM, APNS, and OneSignal to Novu. Manage device tokens and deliver mobile and web push notifications.](https://docs.novu.co/platform/integrations/push)

### On this page

[Step 1: Update SendGrid API key permissions](https://docs.novu.co/#step-1-update-sendgrid-api-key-permissions) [Step 2: Enable activity tracking in Novu](https://docs.novu.co/#step-2-enable-activity-tracking-in-novu) [Step 3: Manual configuration (only if auto-configuration fails)](https://docs.novu.co/#step-3-manual-configuration-only-if-auto-configuration-fails) [Part 1: Configure the webhook in SendGrid](https://docs.novu.co/#part-1-configure-the-webhook-in-sendgrid) [Part 2: Add the signing key to Novu (Recommended)](https://docs.novu.co/#part-2-add-the-signing-key-to-novu-recommended)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/activity-tracking/manual-configuration/sendgrid.mdx)Open in ChatGPTOpen in Claude