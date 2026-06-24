# Source: https://docs.novu.co/platform/integrations/sms/twilio

[SMS](https://docs.novu.co/platform/integrations/sms)/Providers

# Twilio SMS Provider

Learn how to use the Twilio provider to send sms notifications using Novu

You can utilize the [Twilio](https://www.twilio.com/) API to communicate with your customers using SMS messaging. Let's look at how you can do that:

## [Setting up Twilio](https://docs.novu.co/#setting-up-twilio)

Create a Twilio Account

1. Go to [Twilio](https://www.twilio.com/) and create an account, starting with their free trial.
2. You'll be asked to verify your email and your phone number. Get them verified.

Get a Twilio Phone Number

1. Once verified, you'll get an option to 'get a Twilio phone number' from your Twilio console.
2. Click on it to get your Twilio phone number.

When first using Twilio there should be an option to get a Twilio phone number in the main console. Otherwise, you may have to [Buy](https://console.twilio.com/us1/develop/phone-numbers/manage/search?frameUrl=%2Fconsole%2Fphone-numbers%2Fsearch%3Fx-target-region%3Dus1&currentFrameUrl=%2Fconsole%2Fphone-numbers%2Fsearch%3FisoCountry%3DUS%26searchTerm%3D%26searchFilter%3Dleft%26searchType%3Dnumber%26x-target-region%3Dus1%26__override_layout__%3Dembed%26bifrost%3Dtrue) a number to begin using it. For first-time users, utilize the free number provided.

For more detailed instructions, follow one of their many [Tutorials](https://www.twilio.com/docs/usage/requests-to-twilio) within their docs.

Understand the Key Components

Irrespective of the language you use, the process requires:

1. Account SID and Auth token loaded into the code using secure environment variables
 
2. A Twilio client object that takes the SID and Token as variables
 
3. A message object containing:
 
 - Your Twilio phone number
 - The recipient's phone number
 - The SMS message body

## [Creating a Twilio integration with Novu](https://docs.novu.co/#creating-a-twilio-integration-with-novu)

Connect Twilio to Novu

1. Visit the [Integrations Store](https://dashboard.novu.co/integrations) on Novu
2. Click the "Add a provider" button
3. Locate **Twilio** and click on the `Disabled` button and mark it as `Active`
4. Click on the **Connect** button

Configure Twilio Credentials

1. Go to your [Console](https://console.twilio.com/) on Twilio and access the Account Info section
2. Enter your:
 - `Account SID`
 - `Auth Token`
 - `Twilio Phone Number`
3. Click on the **Save** button

## [Sending WhatsApp message](https://docs.novu.co/#sending-whatsapp-message)

To send WhatsApp messages with Twilio integration, prefix the phone number of the subscriber with `whatsapp:` as shown below:

Node.js

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ 
  secretKey: "<NOVU_SECRET_KEY>",
  // Required if using EU region
  // serverURL: "https://eu.api.novu.co",
});
 
await novu.trigger({
  workflowId: "workflowId",
  to: {
    subscriberId: "subscriberId",
    phone: "whatsapp:+14155238886",
  },
  payload: {},
});
```

### [Sending WhatsApp template message](https://docs.novu.co/#sending-whatsapp-template-message)

To send WhatsApp template messages with Twilio integration, you can use the `template` field in the `overrides` object.

Node.js

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ 
  secretKey: "<NOVU_SECRET_KEY>",
  // Required if using EU region
  // serverURL: "https://eu.api.novu.co",
});
 
await novu.trigger({
  workflowId: "workflowId",
  to: {
    subscriberId: "subscriberId",
    phone: "whatsapp:+14155238886",
  },
  payload: {},
  overrides: {
    providers: {
      twilio: {
        "_passthrough": {
          "body": {
            // example contentSid
            "contentSid": "HXb5b62575e6e4ff6129ad7c8efe1f983e",
            // example contentVariables
            "contentVariables": "{\"1\":\"12/1\",\"2\":\"3pm\"}"
          }
        }
      }
    }
  }
});
```

Read more about [sending a Message with the Twilio API for WhatsApp](https://www.twilio.com/docs/whatsapp/tutorial).

[SMS\\ \\ Integrate SMS providers with Novu to deliver text message notifications. Configure providers, set up workflows, and manage delivery.](https://docs.novu.co/platform/integrations/sms) [Infobip - SMS\\ \\ Learn how to use the Infobip provider to send sms notifications using Novu](https://docs.novu.co/platform/integrations/sms/infobip)

### On this page

[Setting up Twilio](https://docs.novu.co/#setting-up-twilio) [Creating a Twilio integration with Novu](https://docs.novu.co/#creating-a-twilio-integration-with-novu) [Sending WhatsApp message](https://docs.novu.co/#sending-whatsapp-message) [Sending WhatsApp template message](https://docs.novu.co/#sending-whatsapp-template-message)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/integrations/sms/(providers)/twilio.mdx)Open in ChatGPTOpen in Claude