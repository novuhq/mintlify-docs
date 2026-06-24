# Source: https://docs.novu.co/api-reference/messages/message-schema

# Message schema Model API Reference (Messages)

Reference the Novu message schema used in API requests and responses. Review fields, data types, and object structure for this resource.

### [Message](https://docs.novu.co/#message)

Message is a single notification that is sent to a subscriber. Each channel step in the workflow generates a message.

| Prop | Type | Default |
| --- | --- | --- |
| 
`contextKeys?`

 | 

`string[]`

 | \- |
| 

`overrides?`

 | 

`{ [k: string]: any; }`

 | \- |
| 

`payload?`

 | 

`{ [k: string]: any; }`

 | \- |
| 

`errorText?`

 | 

`string`

 | \- |
| 

`errorId?`

 | 

`string`

 | \- |
| 

`status?`

 | 

`MessageStatusEnum`

 | \- |
| 

`feedId?`

 | 

`string | null`

 | \- |
| 

`cta?`

 | 

`MessageCTA`

 | \- |
| 

`title?`

 | 

`string`

 | \- |
| 

`deviceTokens?`

 | 

`string[]`

 | \- |
| 

`providerId?`

 | 

`string`

 | \- |
| 

`directWebhookUrl?`

 | 

`string`

 | \- |
| 

`phone?`

 | 

`string`

 | \- |
| 

`email?`

 | 

`string`

 | \- |
| 

`snoozedUntil?`

 | 

`string`

 | \- |
| 

`seen?`

 | 

`boolean`

 | \- |
| 

`read?`

 | 

`boolean`

 | \- |
| 

`channel?`

 | 

`ChannelTypeEnum`

 | \- |
| 

`subject?`

 | 

`string`

 | \- |
| 

`transactionId?`

 | 

`string`

 | \- |
| 

`content?`

 | 

`string | EmailBlock[] | null`

 | \- |
| 

`lastReadDate?`

 | 

`string`

 | \- |
| 

`lastSeenDate?`

 | 

`string`

 | \- |
| 

`deliveredAt?`

 | 

`string[]`

 | \- |
| 

`createdAt?`

 | 

`string`

 | \- |
| 

`templateIdentifier?`

 | 

`string`

 | \- |
| 

`template?`

 | 

`WorkflowResponse`

 | \- |
| 

`subscriber?`

 | 

`SubscriberResponseDto`

 | \- |
| 

`subscriberId?`

 | 

`string`

 | \- |
| 

`notificationId?`

 | 

`string`

 | \- |
| 

`organizationId?`

 | 

`string`

 | \- |
| 

`messageTemplateId?`

 | 

`string | null`

 | \- |
| 

`environmentId?`

 | 

`string`

 | \- |
| 

`templateId?`

 | 

`string | null`

 | \- |
| 

`id?`

 | 

`string`

 | \- |

### [ChannelTypeEnum](https://docs.novu.co/#channeltypeenum)

```
ChannelTypeEnum {
  IN_APP = "in_app",
  EMAIL = "email",
  SMS = "sms",
  CHAT = "chat",
  PUSH = "push"
}
```

### [Workflow](https://docs.novu.co/#workflow)

Workflow is a collection of steps that are executed in order to send a notification.

| Prop | Type | Default |
| --- | --- | --- |
| 
`workflowIntegrationStatus?`

 | 

`WorkflowIntegrationStatus`

 | \- |
| 

`data?`

 | 

`WorkflowResponseData`

 | \- |
| 

`notificationGroup?`

 | 

`NotificationGroup`

 | \- |
| 

`deletedBy?`

 | 

`string`

 | \- |
| 

`deletedAt?`

 | 

`string`

 | \- |
| 

`deleted?`

 | 

`boolean`

 | \- |
| 

`parentId?`

 | 

`string`

 | \- |
| 

`notificationGroupId?`

 | 

`string`

 | \- |
| 

`triggers?`

 | 

`NotificationTrigger[]`

 | \- |
| 

`environmentId?`

 | 

`string`

 | \- |
| 

`creatorId?`

 | 

`string`

 | \- |
| 

`organizationId?`

 | 

`string`

 | \- |
| 

`steps?`

 | 

`NotificationStepDto[]`

 | \- |
| 

`tags?`

 | 

`string[]`

 | \- |
| 

`critical?`

 | 

`boolean`

 | \- |
| 

`preferenceSettings?`

 | 

`SubscriberPreferenceChannels`

 | \- |
| 

`draft?`

 | 

`boolean`

 | \- |
| 

`active?`

 | 

`boolean`

 | \- |
| 

`description?`

 | 

`string`

 | \- |
| 

`name?`

 | 

`string`

 | \- |
| 

`id?`

 | 

`string`

 | \- |

### [Actor](https://docs.novu.co/#actor)

Actor is the user who is skipped from sending the notification when workflow is triggered to a [topic](https://docs.novu.co/platform/concepts/topics).

| Prop | Type | Default |
| --- | --- | --- |
| 
`valueOf?`

 | 

`(() => string) | (() => Object)`

 | \- |
| 

`toString?`

 | 

`(() => string) | (() => string)`

 | \- |

### [MessageCTA](https://docs.novu.co/#messagecta)

MessageCTA is a call to action that is displayed in the [Inbox](https://docs.novu.co/platform/inbox) message. It can be used to redirect the user to a specific URL when the message is clicked.

| Prop | Type | Default |
| --- | --- | --- |
| 
`action?`

 | 

`MessageAction`

 | \- |
| 

`data?`

 | 

`MessageCTAData`

 | \- |
| 

`type?`

 | 

`"redirect"`

 | \- |

[Retrieve a variable usage GET\\ \\ Returns the workflows that reference this environment variable via \`{{env.KEY}}\` in their step controls. \*\*variableId\*\* is required.](https://docs.novu.co/api-reference/environment-variables/retrieve-a-variable-usage) [List all messages GET\\ \\ List all messages for the current environment. This API supports filtering by \*\*channel\*\*, \*\*subscriberId\*\*, and \*\*transactionId\*\*. This API returns a paginated list of messages.](https://docs.novu.co/api-reference/messages/list-all-messages)

### On this page

[Message](https://docs.novu.co/#message) [ChannelTypeEnum](https://docs.novu.co/#channeltypeenum) [Workflow](https://docs.novu.co/#workflow) [Actor](https://docs.novu.co/#actor) [MessageCTA](https://docs.novu.co/#messagecta)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/messages/message-schema.mdx)Open in ChatGPTOpen in Claude