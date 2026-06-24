# Source: https://docs.novu.co/guides

# Novu Guides and Tutorials

Step-by-step guides for integrating Novu with popular services like Clerk, Stripe, and Segment.

## [Integration Guides](https://docs.novu.co/#integration-guides)

Novu provides various ways to integrate with external services to trigger notification workflows. Here are the main integration approaches:

### [Webhook Integration Guides](https://docs.novu.co/#webhook-integration-guides)

Webhooks enable real-time event-driven communication between applications, making integrations more efficient and responsive.

In Novu, webhooks trigger notification workflows whenever specific events occur in external applications. This ensures notifications are delivered exactly when they're needed, keeping users informed without delay.

For example, when a user signs up via Clerk or completes a payment through Stripe, a webhook delivers the event payload to Novu, which then processes it and triggers the appropriate workflow.

This allows for real-time notifications—whether it's a welcome email, payment confirmation SMS, or in-app alert—without the need for constant polling, ensuring efficiency and a seamless user experience.

[**Clerk**\\ \\ Use Clerks webhooks events to trigger authentication related notifications workflows.](https://docs.novu.co/guides/webhooks/clerk)

### Stripe

Use Stripe webhooks events to trigger payment related notifications workflows.

### [Analytics & Data Platform Integrations](https://docs.novu.co/#analytics--data-platform-integrations)

Some integrations use different mechanisms than webhooks to send data to Novu. For example, analytics and data platforms often use custom destinations or functions to forward events.

[**Segment**\\ \\ Use Segment's Destination Functions to forward user events and traits to trigger notification workflows.](https://docs.novu.co/guides/webhooks/segment)

### [Workflow Automation Platform Integrations](https://docs.novu.co/#workflow-automation-platform-integrations)

Workflow automation platforms help orchestrate complex business processes and event-driven workflows. Integrating Novu with these platforms allows you to trigger notifications as part of your automated workflows.

[**Inngest**\\ \\ Use Inngest's event-driven workflows to trigger notifications at specific steps in your automation pipeline.](https://docs.novu.co/guides/inngest) [**Trigger.dev**\\ \\ Leverage Trigger.dev's developer-friendly workflow engine to send notifications based on scheduled or event-driven triggers.](https://docs.novu.co/guides/triggerdotdev)

[Inngest\\ \\ This guide walks you through integrating Inngest with Novu notifications](https://docs.novu.co/guides/inngest)

### On this page

[Integration Guides](https://docs.novu.co/#integration-guides) [Webhook Integration Guides](https://docs.novu.co/#webhook-integration-guides) [Analytics & Data Platform Integrations](https://docs.novu.co/#analytics--data-platform-integrations) [Workflow Automation Platform Integrations](https://docs.novu.co/#workflow-automation-platform-integrations)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/guides/index.mdx)Open in ChatGPTOpen in Claude