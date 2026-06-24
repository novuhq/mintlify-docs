# Source: https://docs.novu.co/guides/webhooks/stripe

# Novu and Stripe integration guide

This guide walks you through integrating Stripe webhooks with Novu notifications in a Next.js application.

You'll learn how to automatically trigger notification workflows when **any Stripe event** occurs, such as **payment, subscription, or customer events**.

## [Overview](https://docs.novu.co/#overview)

When specific events happen in Stripe (e.g., payment, subscription, or customer events), this integration will:

1. Receive the webhook event from Stripe.
2. Verify the webhook signature.
3. Process the event data.
4. Trigger the corresponding **Novu notification workflow**.

You can also clone this repository: [https://github.com/novuhq/stripe-to-novu-webhooks](https://github.com/novuhq/stripe-to-novu-webhooks)

## [Prerequisites](https://docs.novu.co/#prerequisites)

Before proceeding, ensure you have:

- A **Stripe account** ([Sign up here](https://dashboard.stripe.com/signup)).
- A **Novu account** ([Sign up here](https://novu.com/signup)).

## [Install Dependencies](https://docs.novu.co/#install-dependencies)

Run the following command to install the required packages:

```
npm install @novu/api @clerk/nextjs @stripe
```

## [Configure Environment Variables](https://docs.novu.co/#configure-environment-variables)

Add the following variables to your `.env.local` file:

```
NOVU_SECRET_KEY=novu_secret_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
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

## [Set Up Stripe Webhook Endpoint](https://docs.novu.co/#set-up-stripe-webhook-endpoint)

Stripe supports two endpoint types: Account and Connect. Create an endpoint for Account unless you’ve created a Connect application. You can register up to 16 webhook endpoints on each Stripe account.

Note

When you create an endpoint in the Dashboard, you can choose between your Account’s API version or the latest API version. You can test other API versions in Workbench using stripe webhook\_endpoints create, but you must create a webhook endpoint using the API to use other API versions in production.

Use the following steps to register a webhook endpoint in the Developers Dashboard.

1. Navigate to the [**Webhooks page**](https://dashboard.stripe.com/webhooks).
 
2. Click **Add Endpoint**.
 
3. Add your webhook endpoint’s HTTPS URL in **Endpoint URL**.
 
 ```
       https://your-forwarding-URL/api/webhooks/stripe
    ```
 
4. If you have a **Stripe Connect account**, enter a description, then click **Listen to events** on **Connected accounts**.
 
5. Select the [event types](https://docs.stripe.com/api#event_types) you’re currently receiving in your local webhook endpoint in **Select events**.
 
6. Click **Add endpoint**.
 

## [Add Signing Secret to Environment Variables](https://docs.novu.co/#add-signing-secret-to-environment-variables)

1. Copy the **Signing Secret** from Stripe's **Webhook Endpoint Settings**.
2. Add it to your `.env.local` file:

```
STRIPE_WEBHOOK_SECRET=your_signing_secret_here
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

Create `app/api/webhooks/stripe/route.ts`:

app

api

webhooks

stripe

route.ts

The following snippet is the complete code of how to create a webhook endpoint for Clerk in Next.js:

```
import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { triggerWorkflow } from "@/app/utils/novu";
 
 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 
const supportedEvents = [
  "customer.subscription.created",
  "customer.subscription.updated",
];
 
export async function POST(request: NextRequest) {
  const webhookPayload = await request.text();
  const response = JSON.parse(webhookPayload);
 
  const signature = request.headers.get("Stripe-Signature");
 
  try {
    let event = stripe.webhooks.constructEvent(
      webhookPayload,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
 
    if (supportedEvents.includes(event.type)) {
      const workflow = event.type.replaceAll(".", "-");
      const subscriber = await buildSubscriberData(response);
      const payload = await payloadBuilder(response);
      console.log(
        "Triggering workflow:", workflow,
        "Subscriber:", subscriber,
        "Payload:", payload
      );
      return await triggerWorkflow(workflow, subscriber, payload);
    }
 
    return NextResponse.json({ status: "success", event: event.type, response: response });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
 
 
 
async function buildSubscriberData(response: any) {
  const customer = await stripe.customers.retrieve(response.data.object.customer);
  console.log("Customer", customer);
  
  if ('deleted' in customer) {
    throw new Error('Customer has been deleted');
  }
  
  // Split the full name into first and last name
  const [firstName = '', lastName = ''] = (customer.name || '').split(' ');
  
  return {
    subscriberId: customer.id,
    email: customer.email || 'test2@test.com',
    firstName: firstName || '',
    lastName: lastName || '',
    phone: customer?.phone || '',
    locale: customer?.preferred_locales?.[0] || 'en', // Use first preferred locale or default to 'en'
    avatar: '', // Stripe customer doesn't have avatar
    data: {
      stripeCustomerId: customer.id,
    },
  };
}
 
async function payloadBuilder(response: any) {
  const webhookData = JSON.parse(response);
  return webhookData;
}
```

## [Add Novu Workflow Notification Trigger Function](https://docs.novu.co/#add-novu-workflow-notification-trigger-function)

Create `app/utils/novu.ts` :

app

utils

novu.ts

api

webhooks

stripe

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

---

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
 

## [Disable Email Delivery by Stripe](https://docs.novu.co/#disable-email-delivery-by-stripe)

By default, Stripe sends email notifications whenever necessary, such as subscription created, updated, and more.

To prevent users from receiving duplicate emails, we need to disable email delivery by Stripe for the notifications handled by Novu.

1. In your Stripe Dashboard, navigate to the **Settings**.
 
2. Under the **Product Settings** section, navigate to the **Billing** tab.
 
3. Toggle **off** delivery of the events you want to handle with Novu.
 

This ensures that Stripe does not send duplicate emails, allowing Novu to manage the notifications seamlessly.

## [Test the Webhook](https://docs.novu.co/#test-the-webhook)

[**Stripe CLI**\\ \\ Learn how you can test the webhook events using the Stripe CLI.](https://docs.stripe.com/stripe-cli/triggers)

[Clerk\\ \\ This guide walks you through integrating Clerk webhooks with Novu notifications in a Next.js application.](https://docs.novu.co/guides/webhooks/clerk) [Segment\\ \\ Learn how to set up Segment as a data source for Novu using Destination Functions. Send user events from Segment to trigger notifications in Novu.](https://docs.novu.co/guides/webhooks/segment)

### On this page

[Overview](https://docs.novu.co/#overview) [Prerequisites](https://docs.novu.co/#prerequisites) [Install Dependencies](https://docs.novu.co/#install-dependencies) [Configure Environment Variables](https://docs.novu.co/#configure-environment-variables) [Expose Your Local Server](https://docs.novu.co/#expose-your-local-server) [localtunnel](https://docs.novu.co/#localtunnel) [ngrok](https://docs.novu.co/#ngrok) [Set Up Stripe Webhook Endpoint](https://docs.novu.co/#set-up-stripe-webhook-endpoint) [Add Signing Secret to Environment Variables](https://docs.novu.co/#add-signing-secret-to-environment-variables) [Make Webhook Route Public](https://docs.novu.co/#make-webhook-route-public) [Create Webhook Endpoint for Clerk in Next.js](https://docs.novu.co/#create-webhook-endpoint-for-clerk-in-nextjs) [Add Novu Workflow Notification Trigger Function](https://docs.novu.co/#add-novu-workflow-notification-trigger-function) [Add or create Novu workflows in your Novu dashboard](https://docs.novu.co/#add-or-create-novu-workflows-in-your-novu-dashboard) [Identify the Triggering Event(s)](https://docs.novu.co/#identify-the-triggering-events) [Choose Your Starting Point](https://docs.novu.co/#choose-your-starting-point) [Configure the Workflow](https://docs.novu.co/#configure-the-workflow) [Set Trigger Conditions](https://docs.novu.co/#set-trigger-conditions) [Disable Email Delivery by Stripe](https://docs.novu.co/#disable-email-delivery-by-stripe) [Test the Webhook](https://docs.novu.co/#test-the-webhook)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/guides/webhooks/stripe.mdx)Open in ChatGPTOpen in Claude