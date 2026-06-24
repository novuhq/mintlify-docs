# Source: https://docs.novu.co/platform/integrations/sms/sns

[SMS](https://docs.novu.co/platform/integrations/sms)/Providers

# AWS SNS SMS Provider

Learn how to use the SNS provider to send sms notifications using Novu

You can use the [SNS](https://aws.amazon.com/sns/) provider to send transactional emails to your customers using the Novu Platform with a single API to create multi-channel experiences.

## [Getting Started](https://docs.novu.co/#getting-started)

Before you can use SNS as your SMS provider in the Novu platform, you'll need to set up an Amazon Web Services (AWS) account and configure the necessary settings. Here are the steps to get started:

- **Create an AWS Account**: If you don't already have an AWS account, you'll need to create one. You can sign up for an AWS account on the [AWS website](https://aws.amazon.com/).
- **Set Up Amazon SNS**: After you've created your AWS account, navigate to the AWS Management Console. In the Services menu, locate and click on "Simple Notification Service (SNS)." Follow the prompts to set up SNS for your account.
- **Configure SMS Preferences**: In your SNS dashboard, configure your SMS preferences. This includes setting up your sender ID and opting in for SMS messaging.
- **Create Access Keys**: To access SNS programmatically, you'll need to create AWS Access Keys. These keys are used to authenticate your integration with the Novu platform. Go to the [AWS Identity and Access Management console](https://signin.aws.amazon.com/) to create access keys.

## [Create an SNS integration with Novu](https://docs.novu.co/#create-an-sns-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-sms-sns) page on Novu.
- Click the "Add a provider" button.
- Choose your preferred deployment environment: `Development` or `Production`. Then Click the `Create` button.
- Enter your `Access Key ID`, `Secret Access key`, and `AWS region`.
- Click on the `Disabled` button and mark it as `Active`.
- Click on the `Update` button.
- You should now be able to send SMS notifications using **SNS** in Novu.

[SMS77\\ \\ Learn how to use the SMS77 provider to send sms notifications using Novu](https://docs.novu.co/platform/integrations/sms/sms77) [Telnyx\\ \\ Learn how to use the Telnyx provider to send sms notifications using Novu](https://docs.novu.co/platform/integrations/sms/telnyx)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Create an SNS integration with Novu](https://docs.novu.co/#create-an-sns-integration-with-novu)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/sms/(providers)/sns.mdx)Open in ChatGPTOpen in Claude