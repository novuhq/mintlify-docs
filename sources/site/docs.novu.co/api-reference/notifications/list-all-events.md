# Source: https://docs.novu.co/api-reference/notifications/list-all-events

# List all events

List all notification events (triggered events) for the current environment. This API supports filtering by **channels**, **templates**, **emails**, **subscriberIds**, **transactionId**, **topicKey**, **severity**, **contextKeys**. Checkout all available filters in the query section. This API returns event triggers, to list each channel notifications, check messages APIs.

GET

/`v1`/`notifications`

Send

Server URL

Headers

Query

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Query Parameters](https://docs.novu.co/#query-parameters)

`channels`array<string>

Array of channel types

`templates`array<string>

Array of template IDs or a single template ID

`emails`array<string>

Array of email addresses or a single email address

`search`Deprecatedstring

Search term (deprecated)

`subscriberIds`array<string>

Array of subscriber IDs or a single subscriber ID

`severity`array<string>

Array of severity levels or a single severity level

`page`number

Page number for pagination

Default: `0`Minimum: `0`

`limit`number

Limit for pagination

Default: `10`Minimum: `1`Maximum: `50`

`transactionId`string

The transaction ID to filter by

`topicKey`string

Topic Key for filtering notifications by topic

`subscriptionId`string

Subscription ID for filtering notifications by subscription

`contextKeys`array<string>

Filter by exact context keys, order insensitive (format: "type:id")

`after`string

Date filter for records after this timestamp. Defaults to earliest date allowed by subscription plan

`before`string

Date filter for records before this timestamp. Defaults to current time of request (now)

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200400401403404405409413414415422429500503

`hasMore`Requiredboolean

Indicates if there are more activities in the result set

`data`Requiredarray<object>

Array of activity notifications

Show Attributes

`pageSize`Requirednumber

Page size of the activities

`page`Requirednumber

Current page of the activities

```
export interface Response {
  /**
   * Indicates if there are more activities in the result set
   */
  hasMore: boolean;
  /**
   * Array of activity notifications
   */
  data: ActivityNotificationResponseDto[];
  /**
   * Page size of the activities
   */
  pageSize: number;
  /**
   * Current page of the activities
   */
  page: number;
}
export interface ActivityNotificationResponseDto {
  /**
   * Unique identifier of the notification
   */
  _id?: string;
  /**
   * Environment ID of the notification
   */
  _environmentId: string;
  /**
   * Organization ID of the notification
   */
  _organizationId: string;
  /**
   * Subscriber ID of the notification
   */
  _subscriberId: string;
  /**
   * Transaction ID of the notification
   */
  transactionId: string;
  /**
   * Template ID of the notification
   */
  _templateId?: string;
  /**
   * Digested Notification ID
   */
  _digestedNotificationId?: string;
  /**
   * Creation time of the notification
   */
  createdAt?: string;
  /**
   * Last updated time of the notification
   */
  updatedAt?: string;
  channels?: (
    | "in_app"
    | "email"
    | "sms"
    | "chat"
    | "push"
    | "digest"
    | "trigger"
    | "delay"
    | "throttle"
    | "custom"
    | "http_request"
  )[];
  /**
   * Subscriber of the notification
   */
  subscriber?: ActivityNotificationSubscriberResponseDto;
  /**
   * Template of the notification
   */
  template?: ActivityNotificationTemplateResponseDto;
  /**
   * Jobs of the notification
   */
  jobs?: ActivityNotificationJobResponseDto[];
  /**
   * Payload of the notification
   */
  payload?: {
    [k: string]: unknown;
  };
  /**
   * Tags associated with the notification
   */
  tags?: string[];
  /**
   * Controls associated with the notification
   */
  controls?: {
    [k: string]: unknown;
  };
  /**
   * To field for subscriber definition
   */
  to?: {
    [k: string]: unknown;
  };
  /**
   * Topics of the notification
   */
  topics?: ActivityTopicDto[];
  /**
   * Severity of the workflow
   */
  severity?: "high" | "medium" | "low" | "none";
  /**
   * Criticality of the notification
   */
  critical?: boolean;
  /**
   * Context (single or multi) in which the notification was sent
   */
  contextKeys?: string[];
}
export interface ActivityNotificationSubscriberResponseDto {
  /**
   * First name of the subscriber
   */
  firstName?: string;
  /**
   * External unique identifier of the subscriber
   */
  subscriberId: string;
  /**
   * Internal to Novu unique identifier of the subscriber
   */
  _id: string;
  /**
   * Last name of the subscriber
   */
  lastName?: string;
  /**
   * Email address of the subscriber
   */
  email?: string;
  /**
   * Phone number of the subscriber
   */
  phone?: string;
}
export interface ActivityNotificationTemplateResponseDto {
  /**
   * Unique identifier of the template
   */
  _id?: string;
  /**
   * Name of the template
   */
  name: string;
  /**
   * Origin of the layout
   */
  origin?: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Triggers of the template
   */
  triggers: NotificationTriggerDto[];
}
export interface NotificationTriggerDto {
  /**
   * Type of the trigger
   */
  type: "event";
  /**
   * Identifier of the trigger
   */
  identifier: string;
  /**
   * Variables of the trigger
   */
  variables: NotificationTriggerVariable[];
  /**
   * Subscriber variables of the trigger
   */
  subscriberVariables?: NotificationTriggerVariable1[];
}
export interface NotificationTriggerVariable {
  /**
   * Name of the variable
   */
  name: string;
}
export interface NotificationTriggerVariable1 {
  /**
   * Name of the variable
   */
  name: string;
}
export interface ActivityNotificationJobResponseDto {
  /**
   * Unique identifier of the job
   */
  _id: string;
  /**
   * Type of the job
   */
  type:
    | "in_app"
    | "email"
    | "sms"
    | "chat"
    | "push"
    | "digest"
    | "trigger"
    | "delay"
    | "throttle"
    | "custom"
    | "http_request";
  /**
   * Optional digest for the job, including metadata and events
   */
  digest?: DigestMetadataDto;
  /**
   * Execution details of the job
   */
  executionDetails: ActivityNotificationExecutionDetailResponseDto[];
  /**
   * Step details of the job
   */
  step: ActivityNotificationStepResponseDto;
  /**
   * Optional context object for additional error details.
   */
  overrides?: {
    [k: string]: unknown;
  };
  /**
   * Optional payload for the job
   */
  payload?: {};
  /**
   * Provider ID of the job
   */
  providerId:
    | "emailjs"
    | "mailgun"
    | "mailjet"
    | "mandrill"
    | "nodemailer"
    | "postmark"
    | "sendgrid"
    | "sendinblue"
    | "ses"
    | "netcore"
    | "infobip-email"
    | "resend"
    | "plunk"
    | "mailersend"
    | "mailtrap"
    | "clickatell"
    | "outlook365"
    | "novu-email"
    | "sparkpost"
    | "email-webhook"
    | "braze"
    | "novu-email-agent"
    | "nexmo"
    | "plivo"
    | "sms77"
    | "sms-central"
    | "sns"
    | "telnyx"
    | "twilio"
    | "gupshup"
    | "firetext"
    | "infobip-sms"
    | "burst-sms"
    | "bulk-sms"
    | "isend-sms"
    | "forty-six-elks"
    | "kannel"
    | "maqsam"
    | "termii"
    | "africas-talking"
    | "novu-sms"
    | "sendchamp"
    | "generic-sms"
    | "clicksend"
    | "bandwidth"
    | "messagebird"
    | "simpletexting"
    | "azure-sms"
    | "ring-central"
    | "brevo-sms"
    | "eazy-sms"
    | "mobishastra"
    | "afro-message"
    | "unifonic"
    | "smsmode"
    | "imedia"
    | "sinch"
    | "isendpro-sms"
    | "cm-telecom"
    | "fcm"
    | "apns"
    | "expo"
    | "one-signal"
    | "pushpad"
    | "push-webhook"
    | "pusher-beams"
    | "appio"
    | "novu"
    | "slack"
    | "discord"
    | "msteams"
    | "mattermost"
    | "ryver"
    | "zulip"
    | "grafana-on-call"
    | "getstream"
    | "rocket-chat"
    | "whatsapp-business"
    | "chat-webhook"
    | "novu-slack"
    | "telegram"
    | "anthropic"
    | "novu-anthropic"
    | "anthropic-aws";
  /**
   * Status of the job
   */
  status: string;
  /**
   * Updated time of the notification
   */
  updatedAt?: string;
  /**
   * The number of times the digest/delay job has been extended to align with the subscribers schedule
   */
  scheduleExtensionsCount?: number;
}
export interface DigestMetadataDto {
  /**
   * Optional key for the digest
   */
  digestKey?: string;
  /**
   * Amount for the digest
   */
  amount?: number;
  /**
   * Unit of the digest
   */
  unit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
  /**
   * The Digest Type
   */
  type: "regular" | "backoff" | "timed";
  /**
   * Optional array of events associated with the digest, represented as key-value pairs
   */
  events?: {
    [k: string]: unknown;
  }[];
  /**
   * Regular digest: Indicates if backoff is enabled for the regular digest
   */
  backoff?: boolean;
  /**
   * Regular digest: Amount for backoff
   */
  backoffAmount?: number;
  /**
   * Regular digest: Unit for backoff
   */
  backoffUnit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
  /**
   * Regular digest: Indicates if the digest should update
   */
  updateMode?: boolean;
  /**
   * Configuration for timed digest
   */
  timed?: DigestTimedConfigDto;
}
export interface DigestTimedConfigDto {
  /**
   * Time at which the digest is triggered
   */
  atTime?: string;
  /**
   * Days of the week for the digest
   */
  weekDays?: ("monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday")[];
  /**
   * Specific days of the month for the digest
   */
  monthDays?: number[];
  /**
   * Ordinal position for the digest
   */
  ordinal?: "1" | "2" | "3" | "4" | "5" | "last";
  /**
   * Value of the ordinal
   */
  ordinalValue?:
    | "day"
    | "weekday"
    | "weekend"
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday";
  /**
   * Type of monthly schedule
   */
  monthlyType?: "each" | "on";
  /**
   * Cron expression for scheduling
   */
  cronExpression?: string;
  /**
   * Until date for scheduling
   */
  untilDate?: string;
}
export interface ActivityNotificationExecutionDetailResponseDto {
  /**
   * Unique identifier of the execution detail
   */
  _id: string;
  /**
   * Creation time of the execution detail
   */
  createdAt?: string;
  /**
   * Status of the execution detail
   */
  status: "Success" | "Warning" | "Failed" | "Pending" | "Queued" | "ReadConfirmation";
  /**
   * Detailed information about the execution
   */
  detail: string;
  /**
   * Whether the execution is a retry or not
   */
  isRetry: boolean;
  /**
   * Whether the execution is a test or not
   */
  isTest: boolean;
  /**
   * Provider ID of the job
   */
  providerId?:
    | "emailjs"
    | "mailgun"
    | "mailjet"
    | "mandrill"
    | "nodemailer"
    | "postmark"
    | "sendgrid"
    | "sendinblue"
    | "ses"
    | "netcore"
    | "infobip-email"
    | "resend"
    | "plunk"
    | "mailersend"
    | "mailtrap"
    | "clickatell"
    | "outlook365"
    | "novu-email"
    | "sparkpost"
    | "email-webhook"
    | "braze"
    | "novu-email-agent"
    | "nexmo"
    | "plivo"
    | "sms77"
    | "sms-central"
    | "sns"
    | "telnyx"
    | "twilio"
    | "gupshup"
    | "firetext"
    | "infobip-sms"
    | "burst-sms"
    | "bulk-sms"
    | "isend-sms"
    | "forty-six-elks"
    | "kannel"
    | "maqsam"
    | "termii"
    | "africas-talking"
    | "novu-sms"
    | "sendchamp"
    | "generic-sms"
    | "clicksend"
    | "bandwidth"
    | "messagebird"
    | "simpletexting"
    | "azure-sms"
    | "ring-central"
    | "brevo-sms"
    | "eazy-sms"
    | "mobishastra"
    | "afro-message"
    | "unifonic"
    | "smsmode"
    | "imedia"
    | "sinch"
    | "isendpro-sms"
    | "cm-telecom"
    | "fcm"
    | "apns"
    | "expo"
    | "one-signal"
    | "pushpad"
    | "push-webhook"
    | "pusher-beams"
    | "appio"
    | "novu"
    | "slack"
    | "discord"
    | "msteams"
    | "mattermost"
    | "ryver"
    | "zulip"
    | "grafana-on-call"
    | "getstream"
    | "rocket-chat"
    | "whatsapp-business"
    | "chat-webhook"
    | "novu-slack"
    | "telegram"
    | "anthropic"
    | "novu-anthropic"
    | "anthropic-aws";
  /**
   * Raw data of the execution
   */
  raw?: string | null;
  /**
   * Source of the execution detail
   */
  source: "Credentials" | "Internal" | "Payload" | "Webhook";
}
export interface ActivityNotificationStepResponseDto {
  /**
   * Unique identifier of the step
   */
  _id: string;
  /**
   * Whether the step is active or not
   */
  active: boolean;
  /**
   * Reply callback settings
   */
  replyCallback?: {};
  /**
   * Control variables
   */
  controlVariables?: {};
  /**
   * Metadata for the workflow step
   */
  metadata?: {};
  /**
   * Step issues
   */
  issues?: {};
  /**
   * Filter criteria for the step
   */
  filters: StepFilterDto[];
  /**
   * Optional template for the step
   */
  template?: MessageTemplateDto;
  /**
   * Variants of the step
   */
  variants?: ActivityNotificationStepResponseDto1[];
  /**
   * The identifier for the template associated with this step
   */
  _templateId: string;
  /**
   * The name of the step
   */
  name?: string;
  /**
   * The unique identifier for the parent step
   */
  _parentId?: string | null;
}
export interface StepFilterDto {
  isNegated: boolean;
  type: "BOOLEAN" | "TEXT" | "DATE" | "NUMBER" | "STATEMENT" | "LIST" | "MULTI_LIST" | "GROUP";
  value: "AND" | "OR";
  children: FieldFilterPartDto[];
}
export interface FieldFilterPartDto {
  field: string;
  value: string;
  operator:
    | "LARGER"
    | "SMALLER"
    | "LARGER_EQUAL"
    | "SMALLER_EQUAL"
    | "EQUAL"
    | "NOT_EQUAL"
    | "ALL_IN"
    | "ANY_IN"
    | "NOT_IN"
    | "BETWEEN"
    | "NOT_BETWEEN"
    | "LIKE"
    | "NOT_LIKE"
    | "IN";
  on: "subscriber" | "payload";
}
export interface MessageTemplateDto {}
export interface ActivityNotificationStepResponseDto1 {
  /**
   * Unique identifier of the step
   */
  _id: string;
  /**
   * Whether the step is active or not
   */
  active: boolean;
  /**
   * Reply callback settings
   */
  replyCallback?: {};
  /**
   * Control variables
   */
  controlVariables?: {};
  /**
   * Metadata for the workflow step
   */
  metadata?: {};
  /**
   * Step issues
   */
  issues?: {};
  /**
   * Filter criteria for the step
   */
  filters: StepFilterDto[];
  /**
   * Optional template for the step
   */
  template?: MessageTemplateDto;
  /**
   * Variants of the step
   */
  variants?: ActivityNotificationStepResponseDto1[];
  /**
   * The identifier for the template associated with this step
   */
  _templateId: string;
  /**
   * The name of the step
   */
  name?: string;
  /**
   * The unique identifier for the parent step
   */
  _parentId?: string | null;
}
export interface ActivityTopicDto {
  /**
   * Internal Topic ID of the notification
   */
  _topicId: string;
  /**
   * Topic Key of the notification
   */
  topicKey: string;
}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X GET "https://api.novu.co/v1/notifications?channels=in_app&templates=string&emails=string&search=string&subscriberIds=string&severity=string&page=0&limit=10&transactionId=string&topicKey=string&subscriptionId=string&contextKeys=string&after=string&before=string" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>"
```

200400401403404405409413414415422429500503

```
{
  "hasMore": true,
  "data": [
    {
      "_id": "string",
      "_environmentId": "string",
      "_organizationId": "string",
      "_subscriberId": "string",
      "transactionId": "string",
      "_templateId": "string",
      "_digestedNotificationId": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "channels": [
        "in_app"
      ],
      "subscriber": {
        "firstName": "string",
        "subscriberId": "string",
        "_id": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string"
      },
      "template": {
        "_id": "string",
        "name": "string",
        "origin": "novu-cloud",
        "triggers": [
          {
            "type": "event",
            "identifier": "string",
            "variables": [
              {
                "name": "string"
              }
            ],
            "subscriberVariables": [
              {
                "name": "string"
              }
            ]
          }
        ]
      },
      "jobs": [
        {
          "_id": "string",
          "type": "in_app",
          "digest": {
            "digestKey": "string",
            "amount": 0,
            "unit": "seconds",
            "type": "regular",
            "events": [
              {}
            ],
            "backoff": true,
            "backoffAmount": 0,
            "backoffUnit": "seconds",
            "updateMode": true,
            "timed": {
              "atTime": "string",
              "weekDays": [
                "monday"
              ],
              "monthDays": [
                0
              ],
              "ordinal": "1",
              "ordinalValue": "day",
              "monthlyType": "each",
              "cronExpression": "string",
              "untilDate": "string"
            }
          },
          "executionDetails": [
            {
              "_id": "string",
              "createdAt": "string",
              "status": "Success",
              "detail": "string",
              "isRetry": true,
              "isTest": true,
              "providerId": "emailjs",
              "raw": "string",
              "source": "Credentials"
            }
          ],
          "step": {
            "_id": "string",
            "active": true,
            "replyCallback": {},
            "controlVariables": {},
            "metadata": {},
            "issues": {},
            "filters": [
              {
                "isNegated": true,
                "type": "BOOLEAN",
                "value": "AND",
                "children": [
                  {
                    "field": "string",
                    "value": "string",
                    "operator": "LARGER",
                    "on": "subscriber"
                  }
                ]
              }
            ],
            "template": {},
            "variants": [
              {
                "_id": "string",
                "active": true,
                "replyCallback": {},
                "controlVariables": {},
                "metadata": {},
                "issues": {},
                "filters": [
                  {
                    "isNegated": true,
                    "type": "BOOLEAN",
                    "value": "AND",
                    "children": [
                      {
                        "field": "string",
                        "value": "string",
                        "operator": "LARGER",
                        "on": "subscriber"
                      }
                    ]
                  }
                ],
                "template": {},
                "variants": [],
                "_templateId": "string",
                "name": "string",
                "_parentId": "string"
              }
            ],
            "_templateId": "string",
            "name": "string",
            "_parentId": "string"
          },
          "overrides": {
            "workflowId": "some_wf_id",
            "stepId": "some_wf_id"
          },
          "payload": {},
          "providerId": "emailjs",
          "status": "string",
          "updatedAt": "string",
          "scheduleExtensionsCount": 0
        }
      ],
      "payload": {},
      "tags": [
        "string"
      ],
      "controls": {},
      "to": {},
      "topics": [
        {
          "_topicId": "string",
          "topicKey": "string"
        }
      ],
      "severity": "high",
      "critical": true,
      "contextKeys": [
        "string"
      ]
    }
  ],
  "pageSize": 0,
  "page": 0
}
```

[Notification event schema\\ \\ Reference the Novu notification event schema used in API requests and responses. Review fields, data types, and object structure for this resource.](https://docs.novu.co/api-reference/notifications/notification-event-schema) [Retrieve an event GET\\ \\ Retrieve an event by its unique key identifier \*\*notificationId\*\*. Here \*\*notificationId\*\* is of mongodbId type. This API returns the event details - execution logs, status, actual notification (message) generated by each workflow step.](https://docs.novu.co/api-reference/notifications/retrieve-an-event)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/notifications/list-all-events.mdx)Open in ChatGPTOpen in Claude