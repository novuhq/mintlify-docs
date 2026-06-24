# Source: https://docs.novu.co/guides/webhooks/clerk

# Novu and Clerk integration guide

This guide walks you through integrating Clerk webhooks with Novu notifications in a Next.js application.

You'll learn how to automatically trigger notification workflows when **any Clerk event** occurs, such as **user creation, email events, or password changes**.

## [Overview](https://docs.novu.co/#overview)

When specific events happen in Clerk (e.g., user signup, password changes, email verification), this integration will:

1. Receive the webhook event from Clerk.
2. Verify the webhook signature.
3. Process the event data.
4. Trigger the corresponding **Novu notification workflow**.

You can also clone this repository: [https://github.com/novuhq/clerk-to-novu-webhooks](https://github.com/novuhq/clerk-to-novu-webhooks)

## [Prerequisites](https://docs.novu.co/#prerequisites)

Before proceeding, ensure you have:

- A **Clerk + Next.js app** ([Set up Clerk](https://clerk.com/docs/quickstarts/nextjs)).
- A **Novu account** ([Sign up here](https://novu.com/signup)).

## [Install Dependencies](https://docs.novu.co/#install-dependencies)

Run the following command to install the required packages:

```
npm install svix @novu/api @clerk/nextjs
```

## [Configure Environment Variables](https://docs.novu.co/#configure-environment-variables)

Add the following variables to your `.env.local` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_SIGNING_SECRET=whsec_...
NOVU_SECRET_KEY=novu_secret_...
```

## [Expose Your Local Server](https://docs.novu.co/#expose-your-local-server)

To test webhooks locally, you need to expose your **local server** to the internet.

There are two common options:

localtunnelngrok

### [localtunnel](https://docs.novu.co/#localtunnel)

**localtunnel** is a simple and free way to expose your local server without requiring an account.

1. Start a localtunnel listener
 
 ```
    npx localtunnel 3000
    ```
 
2. Copy and save the generated **public URL** (e.g., `https://your-localtunnel-url.loca.lt`).
 

Learn more about **localtunnel** [here](https://www.npmjs.com/package/localtunnel).

**localtunnel** links may expire quickly and sometimes face reliability issues.

## [Set Up Clerk Webhook Endpoint](https://docs.novu.co/#set-up-clerk-webhook-endpoint)

1. Go to the **Clerk Webhooks** page ([link](https://dashboard.clerk.com/last-active?path=webhooks)).
 
2. Click **Add Endpoint**.
 
3. Set the **Endpoint URL** as:
 
 ```
       https://your-forwarding-URL/api/webhooks/clerk
    ```
 
4. Subscribe to the **relevant Clerk events** (e.g., `user.created`, `email.created` etc.).
 

You can find the list of all supported Clerk events [here](https://clerk.com/docs/reference/webhooks/events), or proceed to the section which going over [Identify the Triggering Event(s).](https://docs.novu.co/#identify-the-triggering-events)

5. Click **Create** and keep the settings page open.

## [Add Signing Secret to Environment Variables](https://docs.novu.co/#add-signing-secret-to-environment-variables)

1. Copy the **Signing Secret** from Clerk's **Webhook Endpoint Settings**.
2. Add it to your `.env.local` file:

```
CLERK_SIGNING_SECRET=your_signing_secret_here
```

## [Make Webhook Route Public](https://docs.novu.co/#make-webhook-route-public)

Ensure the webhook route is public by updating `middleware.ts` :

```
import { clerkMiddleware } from '@clerk/nextjs/server';
 
export default clerkMiddleware({
  publicRoutes: ['/api/webhooks'],
});
```

## [Create Webhook Endpoint for Clerk in Next.js](https://docs.novu.co/#create-webhook-endpoint-for-clerk-in-nextjs)

Create `app/api/webhooks/clerk/route.ts`:

app

api

webhooks

clerk

route.ts

The following snippet is the complete code of how to create a webhook endpoint for Clerk in Next.js:

```
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, UserJSON } from '@clerk/nextjs/server'
import { triggerWorkflow } from '@/app/utils/novu'
 
// Single source of truth for all supported Clerk events and their corresponding Novu workflows
const EVENT_TO_WORKFLOW_MAPPINGS = {
    // Session events
    'session.created': 'recent-login-v2',
    
    // User events
    'user.created': 'user-created',
    
    // Email events
    'email.created': {
        'magic_link_sign_in': 'auth-magic-link-login',
        'magic_link_sign_up': 'auth-magic-link-registration',
        'magic_link_user_profile': 'profile-magic-link-update',
        'organization_invitation': 'organization-invitation-v2',
        'organization_invitation_accepted': 'org-member-joined',
        'passkey_added': 'security-passkey-created',
        'passkey_removed': 'security-passkey-deleted',
        'password_changed': 'security-password-updated',
        'password_removed': 'security-password-deleted',
        'primary_email_address_changed': 'profile-email-updated',
        'reset_password_code': 'reset-password-code-v2',
        'verification_code': 'verification-code-v2',
        'waitlist_confirmation': 'waitlist-signup-confirmed',
        'waitlist_invitation': 'waitlist-access-granted',
        'invitation': 'user-invitation'
    }
} as const;
 
export async function POST(request: Request) {
    try {
        const SIGNING_SECRET = process.env.SIGNING_SECRET
        if (!SIGNING_SECRET) {
            throw new Error('Please add SIGNING_SECRET from Clerk Dashboard to .env')
        }
 
        const webhook = new Webhook(SIGNING_SECRET)
        const headerPayload = await headers()
        const validatedHeaders = validateHeaders(headerPayload)
 
        const payload = await request.json()
        const body = JSON.stringify(payload)
 
        const event = await verifyWebhook(webhook, body, {
            'svix-id': validatedHeaders.svix_id,
            'svix-timestamp': validatedHeaders.svix_timestamp,
            'svix-signature': validatedHeaders.svix_signature,
        })
 
        await handleWebhookEvent(event)
 
        return new Response('Webhook received', { status: 200 })
    } catch (error) {
        console.error('Webhook processing error:', error)
        return new Response(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 400 })
    }
}
 
const handleWebhookEvent = async (event: WebhookEvent) => {
    const workflow = await workflowBuilder(event)
    if (!workflow) {
        console.log(`Unsupported event type: ${event.type}`)
        return
    }
 
    const subscriber = await subscriberBuilder(event)
    const payload = await payloadBuilder(event)
 
    await triggerWorkflow(workflow, subscriber, payload)
}
 
async function workflowBuilder(event: WebhookEvent): Promise<string | undefined> {
    if (!EVENT_TO_WORKFLOW_MAPPINGS[event.type as keyof typeof EVENT_TO_WORKFLOW_MAPPINGS]) {
        return undefined;
    }
 
    if (event.type === 'email.created' && event.data.slug) {
        const emailMappings = EVENT_TO_WORKFLOW_MAPPINGS['email.created'];
        const emailSlug = event.data.slug as keyof typeof emailMappings;
        return emailMappings[emailSlug] || `email-${String(emailSlug).replace(/_/g, '-')}`;
    }
 
    return EVENT_TO_WORKFLOW_MAPPINGS[event.type as keyof typeof EVENT_TO_WORKFLOW_MAPPINGS] as string;
}
 
async function subscriberBuilder(response: WebhookEvent) {
    const userData = response.data as UserJSON;
    
    if (!userData.id) {
        throw new Error('Missing subscriber ID from webhook data');
    }
 
    return {
        subscriberId: (userData as any).user_id ?? userData.id,
        firstName: userData.first_name ?? undefined,
        lastName: userData.last_name ?? undefined,
        email: (userData.email_addresses?.[0]?.email_address ?? (userData as any).to_email_address) ?? undefined,
        phone: userData.phone_numbers?.[0]?.phone_number ?? undefined,
        locale: 'en_US',
        avatar: userData.image_url ?? undefined,
        data: {
            clerkUserId: (userData as any).user_id ?? userData.id,
            username: userData.username ?? '',
        },
    }
}
 
async function payloadBuilder(response: WebhookEvent) {
    return response.data;
}
 
const validateHeaders = (headerPayload: Headers) => {
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')
 
    if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Error('Missing Svix headers')
    }
 
    return { svix_id, svix_timestamp, svix_signature }
}
 
const verifyWebhook = async (webhook: Webhook, body: string, headers: any): Promise<WebhookEvent> => {
    try {
        return webhook.verify(body, headers) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        throw new Error('Verification error')
    }
}
```

### Breakdown of the code

## [Add Novu Workflow Notification Trigger Function](https://docs.novu.co/#add-novu-workflow-notification-trigger-function)

Create `app/utils/novu.ts` :

app

utils

novu.ts

api

webhooks

clerk

route.ts

```
import { Novu } from '@novu/api';
import { SubscriberPayloadDto } from '@novu/api/models/components/subscriberpayloaddto';
 
const novu = new Novu({
    secretKey: process.env['NOVU_SECRET_KEY']
});
 
export async function triggerWorkflow(workflowId: string, subscriber: SubscriberPayloadDto, payload: object) {
    try {
        console.log("Payload:", payload ,"Triggering workflow:", workflowId, "Subscriber:", subscriber)
        await novu.trigger({
            workflowId,
            to: subscriber,
            payload
        });
        return new Response('Notification triggered', { status: 200 });
    } catch (error) {
        return new Response('Error triggering notification', { status: 500 });
    }
}
```

## [Add or create Novu workflows in your Novu dashboard](https://docs.novu.co/#add-or-create-novu-workflows-in-your-novu-dashboard)

In Novu, a webhook event—such as a user being created or updated—can trigger one or more workflows, depending on how you want to handle these events in your application.

A workflow defines a sequence of actions (e.g., sending notifications, updating records) that execute when triggered by a webhook.

The Novu dashboard allows you to either create a custom workflow from scratch or choose from pre-built templates to streamline the process.

**Steps to Create a Workflow**

Follow these steps to set up your workflow(s) in the Novu dashboard:

### [Identify the Triggering Event(s)](https://docs.novu.co/#identify-the-triggering-events)

Determine which webhook events will activate your workflow (e.g., "user created," "user updated").

Check your webhook configuration to understand the event data being sent.

### Supported webhook events

### Payload structure

### [Choose Your Starting Point](https://docs.novu.co/#choose-your-starting-point)

Use a Workflow TemplateCreate a Blank WorkflowCode-First Workflow (Novu Framework)

Browse the workflow template store in the Novu dashboard. If a template matches your use case (e.g., "User Onboarding"), select it and proceed to customize it.

![Dashboard Template Store](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fworkflow-fromTemplate.9c23aabc.gif&w=3840&q=75)

### [Configure the Workflow](https://docs.novu.co/#configure-the-workflow)

- For a template, tweak the existing steps to align with your requirements.
 
- For a blank workflow, add actions like sending emails, sending in-app notifications, Push notifications, or other actions.
 
- For a code-first workflow, you can use the Novu Framework to build your workflow right within your code base.
 

### [Set Trigger Conditions](https://docs.novu.co/#set-trigger-conditions)

- Link the workflow to the correct webhook event(s).
 
- Ensure the trigger matches the event data (e.g., event type or payload) sent by your application.
 

Tips for Success

- **Start Simple:** Use templates for common tasks and switch to blank workflows for unique needs.
 
- **Test Thoroughly:** Simulate webhook events to ensure your workflows behave as expected.
 
- **Plan for Growth:** Organize workflows logically (separate or combined) to make future updates easier.
 

## [Disable Email **Delivered by Clerk**](https://docs.novu.co/#disable-email-delivered-by-clerk)

By default, Clerk sends email notifications whenever necessary, such as Magic Links for email verification, Invitations, Password Resets, and more.

To prevent users from receiving duplicate emails, we need to disable email delivery by Clerk for the notifications handled by Novu.

1. Navigate to the **Emails** section in the Clerk Dashboard.
 
 ![Clerk's Dashboard 1](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fclerk-email-dashboard.aa1eb7df.png&w=3840&q=75)
 
2. Select any **email.created** event that you want Novu to handle.
 
3. Toggle **off** email delivery for the selected event.
 
 ![Clerk's Dashboard 2](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fclerk-email-dashboard2.a62cf438.png&w=3840&q=75)
 

This ensures that Clerk does not send duplicate emails, allowing Novu to manage the notifications seamlessly.

## [Test the Webhook](https://docs.novu.co/#test-the-webhook)

1. Start your Next.js server.
2. Go to **Clerk Webhooks → Testing**.
3. Select an event (e.g., `user.created`, `email.created`).
4. Click **Send Example**.
5. Verify logs in **your terminal**.

[Trigger.dev\\ \\ Integrate Novu with Trigger.dev to send notifications from background jobs. Covers setup, subscribers, and practical examples.](https://docs.novu.co/guides/triggerdotdev) [Stripe\\ \\ This guide walks you through integrating Stripe webhooks with Novu notifications in a Next.js application.](https://docs.novu.co/guides/webhooks/stripe)

### On this page

[Overview](https://docs.novu.co/#overview) [Prerequisites](https://docs.novu.co/#prerequisites) [Install Dependencies](https://docs.novu.co/#install-dependencies) [Configure Environment Variables](https://docs.novu.co/#configure-environment-variables) [Expose Your Local Server](https://docs.novu.co/#expose-your-local-server) [localtunnel](https://docs.novu.co/#localtunnel) [ngrok](https://docs.novu.co/#ngrok) [Set Up Clerk Webhook Endpoint](https://docs.novu.co/#set-up-clerk-webhook-endpoint) [Add Signing Secret to Environment Variables](https://docs.novu.co/#add-signing-secret-to-environment-variables) [Make Webhook Route Public](https://docs.novu.co/#make-webhook-route-public) [Create Webhook Endpoint for Clerk in Next.js](https://docs.novu.co/#create-webhook-endpoint-for-clerk-in-nextjs) [Add Novu Workflow Notification Trigger Function](https://docs.novu.co/#add-novu-workflow-notification-trigger-function) [Add or create Novu workflows in your Novu dashboard](https://docs.novu.co/#add-or-create-novu-workflows-in-your-novu-dashboard) [Identify the Triggering Event(s)](https://docs.novu.co/#identify-the-triggering-events) [Choose Your Starting Point](https://docs.novu.co/#choose-your-starting-point) [Configure the Workflow](https://docs.novu.co/#configure-the-workflow) [Set Trigger Conditions](https://docs.novu.co/#set-trigger-conditions) [Disable Email **Delivered by Clerk**](https://docs.novu.co/#disable-email-delivered-by-clerk) [Test the Webhook](https://docs.novu.co/#test-the-webhook)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/guides/webhooks/clerk.mdx)Open in ChatGPTOpen in Claude