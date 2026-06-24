# Source: https://docs.novu.co/api-reference/subscribers/subscriber-schema

# Subscriber schema Model API Reference (Subscribers)

Reference the Novu subscriber schema used in API requests and responses. Review fields, data types, and object structure for this resource.

### [Subscriber](https://docs.novu.co/#subscriber)

Subscriber is the end user that receives notifications. Subscriber has subscriber attributes like firstName, lastName, email, phone, etc, `data` field to store any custom attributes in key value pairs and channel credentials for push and chat channel provider's integrations. Read more about subscribers on [subscribers concept page](https://docs.novu.co/platform/concepts/subscribers).

| Prop | Type | Default |
| --- | --- | --- |
| 
`updatedAt?`

 | 

`string`

 | \- |
| 

`createdAt?`

 | 

`string`

 | \- |
| 

`deleted?`

 | 

`boolean`

 | \- |
| 

`environmentId?`

 | 

`string`

 | \- |
| 

`organizationId?`

 | 

`string`

 | \- |
| 

`subscriberId?`

 | 

`string`

 | \- |
| 

`timezone?`

 | 

`string | null`

 | \- |
| 

`data?`

 | 

`{ [k: string]: any; } | null`

 | \- |
| 

`v?`

 | 

`number`

 | \- |
| 

`lastOnlineAt?`

 | 

`string | null`

 | \- |
| 

`isOnline?`

 | 

`boolean | null`

 | \- |
| 

`topics?`

 | 

`string[]`

 | \- |
| 

`channels?`

 | 

`ChannelSettingsDto[]`

 | \- |
| 

`locale?`

 | 

`string | null`

 | \- |
| 

`avatar?`

 | 

`string | null`

 | \- |
| 

`phone?`

 | 

`string | null`

 | \- |
| 

`email?`

 | 

`string | null`

 | \- |
| 

`lastName?`

 | 

`string | null`

 | \- |
| 

`firstName?`

 | 

`string | null`

 | \- |
| 

`id?`

 | 

`string`

 | \- |

### [ChannelSettingsDto](https://docs.novu.co/#channelsettingsdto)

ChannelSettings are credentials for push and chat channel provider's integrations. One subscriber can have credentials for multiple integrations of same provider of one channel type

| Prop | Type | Default |
| --- | --- | --- |
| 
`integrationId?`

 | 

`string`

 | \- |
| 

`credentials?`

 | 

`ChannelCredentials`

 | \- |
| 

`integrationIdentifier?`

 | 

`string`

 | \- |
| 

`providerId?`

 | 

`ChatOrPushProviderEnum`

 | \- |

### [Credentials](https://docs.novu.co/#credentials)

Credentials like deviceTokens, webhookUrl, etc for a specific integration. `providerId` could be chat channel providerId or push channel providerId.

| Prop | Type | Default |
| --- | --- | --- |
| 
`appIOBaseUrl?`

 | 

`string`

 | \- |
| 

`tenantId?`

 | 

`string`

 | \- |
| 

`senderId?`

 | 

`string`

 | \- |
| 

`appSid?`

 | 

`string`

 | \- |
| 

`accessKey?`

 | 

`string`

 | \- |
| 

`phoneNumberIdentification?`

 | 

`string`

 | \- |
| 

`channelId?`

 | 

`string`

 | \- |
| 

`externalLink?`

 | 

`string`

 | \- |
| 

`state?`

 | 

`string`

 | \- |
| 

`imageUrl?`

 | 

`string`

 | \- |
| 

`title?`

 | 

`string`

 | \- |
| 

`alertUid?`

 | 

`string`

 | \- |
| 

`instanceId?`

 | 

`string`

 | \- |
| 

`authenticationTokenKey?`

 | 

`string`

 | \- |
| 

`authenticateByToken?`

 | 

`boolean`

 | \- |
| 

`apiToken?`

 | 

`string`

 | \- |
| 

`datePath?`

 | 

`string`

 | \- |
| 

`idPath?`

 | 

`string`

 | \- |
| 

`secretKeyRequestHeader?`

 | 

`string`

 | \- |
| 

`apiKeyRequestHeader?`

 | 

`string`

 | \- |
| 

`ipPoolName?`

 | 

`string`

 | \- |
| 

`serviceAccount?`

 | 

`string`

 | \- |
| 

`hmac?`

 | 

`boolean`

 | \- |
| 

`redirectUrl?`

 | 

`string`

 | \- |
| 

`webhookUrl?`

 | 

`string`

 | \- |
| 

`baseUrl?`

 | 

`string`

 | \- |
| 

`tlsOptions?`

 | 

`TlsOptions`

 | \- |
| 

`ignoreTls?`

 | 

`boolean`

 | \- |
| 

`requireTls?`

 | 

`boolean`

 | \- |
| 

`clientId?`

 | 

`string`

 | \- |
| 

`applicationId?`

 | 

`string`

 | \- |
| 

`projectName?`

 | 

`string`

 | \- |
| 

`senderName?`

 | 

`string`

 | \- |
| 

`from?`

 | 

`string`

 | \- |
| 

`token?`

 | 

`string`

 | \- |
| 

`messageProfileId?`

 | 

`string`

 | \- |
| 

`accountSid?`

 | 

`string`

 | \- |
| 

`region?`

 | 

`string`

 | \- |
| 

`secure?`

 | 

`boolean`

 | \- |
| 

`port?`

 | 

`string`

 | \- |
| 

`host?`

 | 

`string`

 | \- |
| 

`password?`

 | 

`string`

 | \- |
| 

`domain?`

 | 

`string`

 | \- |
| 

`secretKey?`

 | 

`string`

 | \- |
| 

`user?`

 | 

`string`

 | \- |
| 

`apiKey?`

 | 

`string`

 | \- |

[Cancel triggered event DELETE\\ \\ Using a previously generated transactionId during the event trigger, will cancel any active or pending workflows. This is useful to cancel active digests, delays etc...](https://docs.novu.co/api-reference/events/cancel-triggered-event) [Create a subscriber POST\\ \\ Create a subscriber with the subscriber attributes. \*\*subscriberId\*\* is a required field, rest other fields are optional, if the subscriber already exists, it will be updated](https://docs.novu.co/api-reference/subscribers/create-a-subscriber)

### On this page

[Subscriber](https://docs.novu.co/#subscriber) [ChannelSettingsDto](https://docs.novu.co/#channelsettingsdto) [Credentials](https://docs.novu.co/#credentials)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/subscribers/subscriber-schema.mdx)Open in ChatGPTOpen in Claude