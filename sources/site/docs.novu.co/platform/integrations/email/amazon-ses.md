# Source: https://docs.novu.co/platform/integrations/email/amazon-ses

[E-mail](https://docs.novu.co/platform/integrations/email)/Providers

# Amazon SES Integration

Learn how to use the Amazon SES provider to send email notifications using Novu

You can use the [Amazon SES](https://aws.amazon.com/ses/) provider to send transactional emails to your customers using the Novu Platform with a single API to create multi-channel experiences.

## [Getting Started](https://docs.novu.co/#getting-started)

To use the Amazon SES provider in the email channel, you will need to create an SES account and add your credentials to the Amazon SES integration on the Novu platform.

## [Setting up SES in AWS?](https://docs.novu.co/#setting-up-ses-in-aws)

- Create a new IAM account with appropriate permission policies.
 
 Example policy rule `arn:aws:ses:<REGION>:<ACCOUNT>:identity/*`
 
- Create a new access key and save generated `ACCESS_KEY_ID` and `ACCESS_SECRET_KEY` carefully
- Choose Amazon Simple Email Service.
- Create a new identity.
- Either choose domain or email.
- Verify your domain (by adding a few DNS records as mentioned in SES instructions) or email (AWS sends a verification email to your email).
- Verify the recipient email also by creating a new email identity type \[only in sandbox mode\].
- Test if your SES is set up correctly using the test email feature.

## [Creating an SES integration with Novu](https://docs.novu.co/#creating-an-ses-integration-with-novu)

- Visit the [Integrations](https://dashboard.novu.co/integrations?utm_campaign=docs-integrations-ses) page on Novu.
- Click on Add a Provider.
- Select Amazon SES service.
- Enter previously saved `ACCESS_KEY_ID` and `ACCESS_SECRET_KEY`.
- Fill in the `From email address` field using the authenticated sender email id in the previous step.
- Enter `region` and `Sender name` also.

Example region format:- `us-east-1`. By default Novu uses `us-east-1` region.

- Click on the `Disabled` button and mark it as `Active`.
- Click on the **Update** button.
- You should now be able to send notifications using Amazon SES in Novu.

## [FAQs](https://docs.novu.co/#faqs)

### [Trigger from novu is successful but the subscriber is not receiving email](https://docs.novu.co/#trigger-from-novu-is-successful-but-the-subscriber-is-not-receiving-email)

Possible reasons:

- Subscriber's email address is not verified in SES if SES account is in sandbox environment.
- SES account daily sending limit has been reached if SES account is in sandbox environment.
- Incorrect credentials have been used while creating SES integration.

### [SignatureDoesNotMatch error with SES](https://docs.novu.co/#signaturedoesnotmatch-error-with-ses)

- Ensure that the `ACCESS_KEY_ID` and `ACCESS_SECRET_KEY` values are correct and have the necessary permissions. If using SMTP credentials, change it with IAM role credentials.
- If the issue persists, regenerate the credentials and update the integration with new credentials.

## [Next Steps](https://docs.novu.co/#next-steps)

[**Configure bcc, cc, and reply-to**\\ \\ Learn how to configure bcc, cc, and reply-to for your email notifications using email overrides](https://docs.novu.co/platform/integrations/email#sending-email-overrides) [**Sending email attachments**\\ \\ Learn how to send attachments with email notifications](https://docs.novu.co/platform/integrations/email#sending-email-attachments) [**Use different email integration**\\ \\ Learn how to use different email provider integrations to be used to send emails](https://docs.novu.co/platform/integrations/email#sending-email-overrides)

[SendGrid\\ \\ Learn how to use the SendGrid provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/sendgrid) [Postmark\\ \\ Learn how to use the Postmark provider to send email notifications using Novu](https://docs.novu.co/platform/integrations/email/postmark)

### On this page

[Getting Started](https://docs.novu.co/#getting-started) [Setting up SES in AWS?](https://docs.novu.co/#setting-up-ses-in-aws) [Creating an SES integration with Novu](https://docs.novu.co/#creating-an-ses-integration-with-novu) [FAQs](https://docs.novu.co/#faqs) [Trigger from novu is successful but the subscriber is not receiving email](https://docs.novu.co/#trigger-from-novu-is-successful-but-the-subscriber-is-not-receiving-email) [SignatureDoesNotMatch error with SES](https://docs.novu.co/#signaturedoesnotmatch-error-with-ses) [Next Steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/email/(providers)/amazon-ses.mdx)Open in ChatGPTOpen in Claude