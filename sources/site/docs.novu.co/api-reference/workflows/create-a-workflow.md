# Source: https://docs.novu.co/api-reference/workflows/create-a-workflow

# Create a workflow

Creates a new workflow in the Novu Cloud environment

POST

/`v2`/`workflows`

Send

Server URL

Headers

Body

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Request Body](https://docs.novu.co/#request-body)

`application/json`Required

Workflow creation details

`name`Requiredstring

Name of the workflow

`description`string

Description of the workflow

`tags`array<string>

Tags associated with the workflow

`active`boolean

Whether the workflow is active

Default: `false`

`validatePayload`boolean

Enable or disable payload schema validation

`payloadSchema`object

The payload JSON Schema for the workflow

Show Attributes

`isTranslationEnabled`boolean

Enable or disable translations for this workflow

Default: `false`

`workflowId`Requiredstring

Unique identifier for the workflow

Pattern: `"SLUG_IDENTIFIER_REGEX"`

`steps`Requiredarray<object | object | object | object | object | object | object | object | object | object>

Steps of the workflow

Show Attributes

`__source`string

Source of workflow creation

Default: `"editor"`Value in: `"template_store" | "editor" | "notification_directory" | "onboarding_digest_demo" | "onboarding_in_app" | "empty_state" | "dropdown" | "onboarding_get_started" | "bridge" | "dashboard" | "ai"`

`preferences`object

Workflow preferences

`severity`string

Severity of the workflow

Value in: `"high" | "medium" | "low" | "none"`

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

201400401403404405409413414415422429500503

Created

`name`Requiredstring

Name of the workflow

`description`string

Description of the workflow

`tags`array<string>

Tags associated with the workflow

`active`boolean

Whether the workflow is active

Default: `false`

`validatePayload`boolean

Enable or disable payload schema validation

`payloadSchema`object | null

The payload JSON Schema for the workflow

Show Attributes

`isTranslationEnabled`boolean

Enable or disable translations for this workflow

Default: `false`

`_id`Requiredstring

Database identifier of the workflow

`workflowId`Requiredstring

Workflow identifier

`slug`Requiredstring

Slug of the workflow

`updatedAt`Requiredstring

Last updated timestamp

`createdAt`Requiredstring

Creation timestamp

`updatedBy`object

User who last updated the workflow

`lastPublishedAt`string | null

Timestamp of the last workflow publication

`lastPublishedBy`object

User who last published the workflow

`steps`Requiredarray<object | object | object | object | object | object | object | object | object | object>

Steps of the workflow

Show Attributes

`origin`Requiredstring

Origin of the layout

Value in: `"novu-cloud" | "novu-cloud-v1" | "external"`

`preferences`Requiredobject

Preferences for the workflow

`status`Requiredstring

Status of the workflow

Value in: `"ACTIVE" | "INACTIVE" | "ERROR"`

`issues`object

Runtime issues for workflow creation and update

Show Attributes

`lastTriggeredAt`string | null

Timestamp of the last workflow trigger

`payloadExample`object | null

Generated payload example based on the payload schema

Show Attributes

`severity`Requiredstring

Severity of the workflow

Value in: `"high" | "medium" | "low" | "none"`

```
export interface Response {
  /**
   * Name of the workflow
   */
  name: string;
  /**
   * Description of the workflow
   */
  description?: string;
  /**
   * Tags associated with the workflow
   */
  tags?: string[];
  /**
   * Whether the workflow is active
   */
  active?: boolean;
  /**
   * Enable or disable payload schema validation
   */
  validatePayload?: boolean;
  /**
   * The payload JSON Schema for the workflow
   */
  payloadSchema?: {
    [k: string]: unknown;
  } | null;
  /**
   * Enable or disable translations for this workflow
   */
  isTranslationEnabled?: boolean;
  /**
   * Database identifier of the workflow
   */
  _id: string;
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Slug of the workflow
   */
  slug: string;
  /**
   * Last updated timestamp
   */
  updatedAt: string;
  /**
   * Creation timestamp
   */
  createdAt: string;
  /**
   * User who last updated the workflow
   */
  updatedBy?: UserResponseDto;
  /**
   * Timestamp of the last workflow publication
   */
  lastPublishedAt?: string | null;
  /**
   * User who last published the workflow
   */
  lastPublishedBy?: UserResponseDto1;
  /**
   * Steps of the workflow
   */
  steps: (
    | InAppStepResponseDto
    | EmailStepResponseDto
    | SmsStepResponseDto
    | PushStepResponseDto
    | ChatStepResponseDto
    | DelayStepResponseDto
    | DigestStepResponseDto
    | CustomStepResponseDto
    | ThrottleStepResponseDto
    | HttpRequestStepResponseDto
  )[];
  /**
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Preferences for the workflow
   */
  preferences: WorkflowPreferencesResponseDto;
  /**
   * Status of the workflow
   */
  status: "ACTIVE" | "INACTIVE" | "ERROR";
  /**
   * Runtime issues for workflow creation and update
   */
  issues?: {
    [k: string]: RuntimeIssueDto;
  };
  /**
   * Timestamp of the last workflow trigger
   */
  lastTriggeredAt?: string | null;
  /**
   * Generated payload example based on the payload schema
   */
  payloadExample?: {
    [k: string]: unknown;
  } | null;
  /**
   * Severity of the workflow
   */
  severity: "high" | "medium" | "low" | "none";
}
export interface UserResponseDto {
  /**
   * User ID
   */
  _id: string;
  /**
   * User first name
   */
  firstName?: string | null;
  /**
   * User last name
   */
  lastName?: string | null;
  /**
   * User external ID
   */
  externalId?: string | null;
}
export interface UserResponseDto1 {
  /**
   * User ID
   */
  _id: string;
  /**
   * User first name
   */
  firstName?: string | null;
  /**
   * User last name
   */
  lastName?: string | null;
  /**
   * User external ID
   */
  externalId?: string | null;
}
export interface InAppStepResponseDto {
  /**
   * Controls metadata for the in-app step
   */
  controls: InAppControlsMetadataResponseDto;
  /**
   * Control values for the in-app step
   */
  controlValues?: InAppControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface InAppControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema;
  /**
   * Control values specific to In-App
   */
  values: InAppControlDto;
}
export interface UiSchema {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface UiSchemaProperty {
  /**
   * Placeholder for the UI Schema Property
   */
  placeholder?:
    | string
    | number
    | boolean
    | {
        [k: string]: unknown;
      }
    | (
        | string
        | number
        | boolean
        | {
            [k: string]: unknown;
          }
      )[];
  /**
   * Component type for the UI Schema Property
   */
  component:
    | "EMAIL_EDITOR_SELECT"
    | "LAYOUT_SELECT"
    | "BLOCK_EDITOR"
    | "EMAIL_BODY"
    | "TEXT_FULL_LINE"
    | "TEXT_INLINE_LABEL"
    | "IN_APP_BODY"
    | "IN_APP_AVATAR"
    | "IN_APP_PRIMARY_SUBJECT"
    | "IN_APP_BUTTON_DROPDOWN"
    | "IN_APP_DISABLE_SANITIZATION_SWITCH"
    | "DISABLE_SANITIZATION_SWITCH"
    | "URL_TEXT_BOX"
    | "DIGEST_AMOUNT"
    | "DIGEST_UNIT"
    | "DIGEST_TYPE"
    | "DIGEST_KEY"
    | "DIGEST_CRON"
    | "DELAY_AMOUNT"
    | "DELAY_UNIT"
    | "DELAY_TYPE"
    | "DELAY_CRON"
    | "DELAY_DYNAMIC_KEY"
    | "THROTTLE_TYPE"
    | "THROTTLE_WINDOW"
    | "THROTTLE_UNIT"
    | "THROTTLE_DYNAMIC_KEY"
    | "THROTTLE_THRESHOLD"
    | "THROTTLE_KEY"
    | "EXTEND_TO_SCHEDULE"
    | "SMS_BODY"
    | "CHAT_BODY"
    | "PUSH_BODY"
    | "PUSH_SUBJECT"
    | "QUERY_EDITOR"
    | "DATA"
    | "LAYOUT_EMAIL"
    | "DESTINATION_METHOD"
    | "DESTINATION_URL"
    | "DESTINATION_HEADERS"
    | "DESTINATION_BODY"
    | "DESTINATION_RESPONSE_BODY_SCHEMA"
    | "DESTINATION_ENFORCE_SCHEMA_VALIDATION"
    | "DESTINATION_CONTINUE_ON_FAILURE"
    | "DESTINATION_TIMEOUT";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty1;
  };
}
export interface UiSchemaProperty1 {
  /**
   * Placeholder for the UI Schema Property
   */
  placeholder?:
    | string
    | number
    | boolean
    | {
        [k: string]: unknown;
      }
    | (
        | string
        | number
        | boolean
        | {
            [k: string]: unknown;
          }
      )[];
  /**
   * Component type for the UI Schema Property
   */
  component:
    | "EMAIL_EDITOR_SELECT"
    | "LAYOUT_SELECT"
    | "BLOCK_EDITOR"
    | "EMAIL_BODY"
    | "TEXT_FULL_LINE"
    | "TEXT_INLINE_LABEL"
    | "IN_APP_BODY"
    | "IN_APP_AVATAR"
    | "IN_APP_PRIMARY_SUBJECT"
    | "IN_APP_BUTTON_DROPDOWN"
    | "IN_APP_DISABLE_SANITIZATION_SWITCH"
    | "DISABLE_SANITIZATION_SWITCH"
    | "URL_TEXT_BOX"
    | "DIGEST_AMOUNT"
    | "DIGEST_UNIT"
    | "DIGEST_TYPE"
    | "DIGEST_KEY"
    | "DIGEST_CRON"
    | "DELAY_AMOUNT"
    | "DELAY_UNIT"
    | "DELAY_TYPE"
    | "DELAY_CRON"
    | "DELAY_DYNAMIC_KEY"
    | "THROTTLE_TYPE"
    | "THROTTLE_WINDOW"
    | "THROTTLE_UNIT"
    | "THROTTLE_DYNAMIC_KEY"
    | "THROTTLE_THRESHOLD"
    | "THROTTLE_KEY"
    | "EXTEND_TO_SCHEDULE"
    | "SMS_BODY"
    | "CHAT_BODY"
    | "PUSH_BODY"
    | "PUSH_SUBJECT"
    | "QUERY_EDITOR"
    | "DATA"
    | "LAYOUT_EMAIL"
    | "DESTINATION_METHOD"
    | "DESTINATION_URL"
    | "DESTINATION_HEADERS"
    | "DESTINATION_BODY"
    | "DESTINATION_RESPONSE_BODY_SCHEMA"
    | "DESTINATION_ENFORCE_SCHEMA_VALIDATION"
    | "DESTINATION_CONTINUE_ON_FAILURE"
    | "DESTINATION_TIMEOUT";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty1;
  };
}
export interface InAppControlDto {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Content/body of the in-app message. Required if subject is empty.
   */
  body?: string;
  /**
   * Subject/title of the in-app message. Required if body is empty.
   */
  subject?: string;
  /**
   * URL for an avatar image. Must be a valid URL or start with / or {{ variable }}.
   */
  avatar?: string;
  /**
   * Primary action button details.
   */
  primaryAction?: ActionDto;
  /**
   * Secondary action button details.
   */
  secondaryAction?: ActionDto1;
  /**
   * Redirection URL configuration for the main content click (if no actions defined/clicked)..
   */
  redirect?: RedirectDto1;
  /**
   * Disable sanitization of the output.
   */
  disableOutputSanitization?: boolean;
  /**
   * Additional data payload for the step.
   */
  data?: {
    [k: string]: unknown;
  };
}
export interface ActionDto {
  /**
   * Label for the action button.
   */
  label?: string;
  /**
   * Redirect configuration for the action.
   */
  redirect?: RedirectDto;
}
export interface RedirectDto {
  /**
   * URL to redirect to
   */
  url: string;
  /**
   * Target attribute for the redirect link
   */
  target?: "_self" | "_blank" | "_parent" | "_top" | "_unfencedTop";
}
export interface ActionDto1 {
  /**
   * Label for the action button.
   */
  label?: string;
  /**
   * Redirect configuration for the action.
   */
  redirect?: RedirectDto;
}
export interface RedirectDto1 {
  /**
   * URL to redirect to
   */
  url: string;
  /**
   * Target attribute for the redirect link
   */
  target?: "_self" | "_blank" | "_parent" | "_top" | "_unfencedTop";
}
export interface InAppControlDto1 {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Content/body of the in-app message. Required if subject is empty.
   */
  body?: string;
  /**
   * Subject/title of the in-app message. Required if body is empty.
   */
  subject?: string;
  /**
   * URL for an avatar image. Must be a valid URL or start with / or {{ variable }}.
   */
  avatar?: string;
  /**
   * Primary action button details.
   */
  primaryAction?: ActionDto;
  /**
   * Secondary action button details.
   */
  secondaryAction?: ActionDto1;
  /**
   * Redirection URL configuration for the main content click (if no actions defined/clicked)..
   */
  redirect?: RedirectDto1;
  /**
   * Disable sanitization of the output.
   */
  disableOutputSanitization?: boolean;
  /**
   * Additional data payload for the step.
   */
  data?: {
    [k: string]: unknown;
  };
}
export interface StepIssuesDto {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface StepContentIssueDto {
  /**
   * Type of step content issue
   */
  issueType:
    | "ILLEGAL_VARIABLE_IN_CONTROL_VALUE"
    | "INVALID_FILTER_ARG_IN_VARIABLE"
    | "INVALID_URL"
    | "MISSING_VALUE"
    | "TIER_LIMIT_EXCEEDED";
  /**
   * Name of the variable related to the issue
   */
  variableName?: string;
  /**
   * Detailed message describing the issue
   */
  message: string;
}
export interface StepIntegrationIssue {
  /**
   * Type of integration issue
   */
  issueType: "MISSING_INTEGRATION" | "INBOX_NOT_CONNECTED";
  /**
   * Name of the variable related to the issue
   */
  variableName?: string;
  /**
   * Detailed message describing the issue
   */
  message: string;
}
export interface EmailStepResponseDto {
  /**
   * Controls metadata for the email step
   */
  controls: EmailControlsMetadataResponseDto;
  /**
   * Control values for the email step
   */
  controlValues?: EmailControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto1;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface EmailControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema1;
  /**
   * Control values specific to Email
   */
  values: EmailControlDto;
}
export interface UiSchema1 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface EmailControlDto {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Subject of the email.
   */
  subject: string;
  /**
   * Body content of the email, either a valid Maily JSON object, or html string.
   */
  body: string;
  /**
   * Type of editor to use for the body.
   */
  editorType?: "block" | "html";
  /**
   * Disable sanitization of the output.
   */
  disableOutputSanitization?: boolean;
  /**
   * Layout ID to use for the email. Null means no layout, undefined means default layout.
   */
  layoutId?: string | null;
}
export interface EmailControlDto1 {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Subject of the email.
   */
  subject: string;
  /**
   * Body content of the email, either a valid Maily JSON object, or html string.
   */
  body: string;
  /**
   * Type of editor to use for the body.
   */
  editorType?: "block" | "html";
  /**
   * Disable sanitization of the output.
   */
  disableOutputSanitization?: boolean;
  /**
   * Layout ID to use for the email. Null means no layout, undefined means default layout.
   */
  layoutId?: string | null;
}
export interface StepIssuesDto1 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface SmsStepResponseDto {
  /**
   * Controls metadata for the SMS step
   */
  controls: SmsControlsMetadataResponseDto;
  /**
   * Control values for the SMS step
   */
  controlValues?: SmsControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto2;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface SmsControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema2;
  /**
   * Control values specific to SMS
   */
  values: SmsControlDto;
}
export interface UiSchema2 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface SmsControlDto {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Content of the SMS message.
   */
  body?: string;
}
export interface SmsControlDto1 {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Content of the SMS message.
   */
  body?: string;
}
export interface StepIssuesDto2 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface PushStepResponseDto {
  /**
   * Controls metadata for the push step
   */
  controls: PushControlsMetadataResponseDto;
  /**
   * Control values for the push step
   */
  controlValues?: PushControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto3;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface PushControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema3;
  /**
   * Control values specific to Push
   */
  values: PushControlDto;
}
export interface UiSchema3 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface PushControlDto {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Subject/title of the push notification.
   */
  subject?: string;
  /**
   * Body content of the push notification.
   */
  body?: string;
}
export interface PushControlDto1 {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Subject/title of the push notification.
   */
  subject?: string;
  /**
   * Body content of the push notification.
   */
  body?: string;
}
export interface StepIssuesDto3 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface ChatStepResponseDto {
  /**
   * Controls metadata for the chat step
   */
  controls: ChatControlsMetadataResponseDto;
  /**
   * Control values for the chat step
   */
  controlValues?: ChatControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto4;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface ChatControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema4;
  /**
   * Control values specific to Chat
   */
  values: ChatControlDto;
}
export interface UiSchema4 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface ChatControlDto {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Content of the chat message.
   */
  body?: string;
}
export interface ChatControlDto1 {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Content of the chat message.
   */
  body?: string;
}
export interface StepIssuesDto4 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface DelayStepResponseDto {
  /**
   * Controls metadata for the delay step
   */
  controls: DelayControlsMetadataResponseDto;
  /**
   * Control values for the delay step
   */
  controlValues?: DelayControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto5;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface DelayControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema5;
  /**
   * Control values specific to Delay
   */
  values: DelayControlDto;
}
export interface UiSchema5 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface DelayControlDto {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Type of the delay. Currently only 'regular' is supported by the schema.
   */
  type: "regular" | "timed";
  /**
   * Amount of time to delay.
   */
  amount?: number;
  /**
   * Unit of time for the delay amount.
   */
  unit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
  /**
   * Cron expression for the delay. Min length 1.
   */
  cron?: string;
}
export interface DelayControlDto1 {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * Type of the delay. Currently only 'regular' is supported by the schema.
   */
  type: "regular" | "timed";
  /**
   * Amount of time to delay.
   */
  amount?: number;
  /**
   * Unit of time for the delay amount.
   */
  unit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
  /**
   * Cron expression for the delay. Min length 1.
   */
  cron?: string;
}
export interface StepIssuesDto5 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface DigestStepResponseDto {
  /**
   * Controls metadata for the digest step
   */
  controls: DigestControlsMetadataResponseDto;
  /**
   * Control values for the digest step
   */
  controlValues?: DigestControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto6;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface DigestControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema6;
  /**
   * Control values specific to Digest
   */
  values: DigestControlDto;
}
export interface UiSchema6 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface DigestControlDto {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * The type of digest strategy. Determines which fields are applicable.
   */
  type?: "regular" | "timed";
  /**
   * The amount of time for the digest interval (for REGULAR type). Min 1.
   */
  amount?: number;
  /**
   * The unit of time for the digest interval (for REGULAR type).
   */
  unit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
  /**
   * Configuration for look-back window (for REGULAR type).
   */
  lookBackWindow?: LookBackWindowDto;
  /**
   * Cron expression for TIMED digest. Min length 1.
   */
  cron?: string;
  /**
   * Specify a custom key for digesting events instead of the default event key.
   */
  digestKey?: string;
}
export interface LookBackWindowDto {
  /**
   * Amount of time for the look-back window.
   */
  amount: number;
  /**
   * Unit of time for the look-back window.
   */
  unit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
}
export interface DigestControlDto1 {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * The type of digest strategy. Determines which fields are applicable.
   */
  type?: "regular" | "timed";
  /**
   * The amount of time for the digest interval (for REGULAR type). Min 1.
   */
  amount?: number;
  /**
   * The unit of time for the digest interval (for REGULAR type).
   */
  unit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
  /**
   * Configuration for look-back window (for REGULAR type).
   */
  lookBackWindow?: LookBackWindowDto;
  /**
   * Cron expression for TIMED digest. Min length 1.
   */
  cron?: string;
  /**
   * Specify a custom key for digesting events instead of the default event key.
   */
  digestKey?: string;
}
export interface StepIssuesDto6 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface CustomStepResponseDto {
  /**
   * Controls metadata for the custom step
   */
  controls: CustomControlsMetadataResponseDto;
  /**
   * Control values for the custom step
   */
  controlValues?: CustomControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto7;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface CustomControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema7;
  /**
   * Control values specific to Custom step
   */
  values: CustomControlDto;
}
export interface UiSchema7 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface CustomControlDto {
  /**
   * Custom control values for the step.
   */
  custom?: {
    [k: string]: unknown;
  };
}
export interface CustomControlDto1 {
  /**
   * Custom control values for the step.
   */
  custom?: {
    [k: string]: unknown;
  };
}
export interface StepIssuesDto7 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface ThrottleStepResponseDto {
  /**
   * Controls metadata for the throttle step
   */
  controls: ThrottleControlsMetadataResponseDto;
  /**
   * Control values for the throttle step
   */
  controlValues?: ThrottleControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto8;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface ThrottleControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema8;
  /**
   * Control values specific to Throttle
   */
  values: ThrottleControlDto;
}
export interface UiSchema8 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface ThrottleControlDto {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * The type of throttle window.
   */
  type: "fixed" | "dynamic";
  /**
   * The amount of time for the throttle window (required for fixed type).
   */
  amount?: number;
  /**
   * The unit of time for the throttle window (required for fixed type).
   */
  unit?: "minutes" | "hours" | "days";
  /**
   * Key path to retrieve dynamic window value (required for dynamic type).
   */
  dynamicKey?: string;
  /**
   * The maximum number of executions allowed within the window. Defaults to 1.
   */
  threshold?: number;
  /**
   * Optional key for grouping throttle rules. If not provided, defaults to workflow and subscriber combination.
   */
  throttleKey?: string;
}
export interface ThrottleControlDto1 {
  /**
   * JSONLogic filter conditions for conditionally skipping the step execution. Supports complex logical operations with AND, OR, and comparison operators. See https://jsonlogic.com/ for full typing reference.
   */
  skip?: {
    [k: string]: unknown;
  };
  /**
   * The type of throttle window.
   */
  type: "fixed" | "dynamic";
  /**
   * The amount of time for the throttle window (required for fixed type).
   */
  amount?: number;
  /**
   * The unit of time for the throttle window (required for fixed type).
   */
  unit?: "minutes" | "hours" | "days";
  /**
   * Key path to retrieve dynamic window value (required for dynamic type).
   */
  dynamicKey?: string;
  /**
   * The maximum number of executions allowed within the window. Defaults to 1.
   */
  threshold?: number;
  /**
   * Optional key for grouping throttle rules. If not provided, defaults to workflow and subscriber combination.
   */
  throttleKey?: string;
}
export interface StepIssuesDto8 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface HttpRequestStepResponseDto {
  /**
   * Controls metadata for the HTTP request step
   */
  controls: HttpRequestControlsMetadataResponseDto;
  /**
   * Control values for the HTTP request step
   */
  controlValues?: HttpRequestControlDto1;
  /**
   * JSON Schema for variables, follows the JSON Schema standard
   */
  variables: {
    [k: string]: unknown;
  };
  /**
   * Unique identifier of the step
   */
  stepId: string;
  /**
   * Database identifier of the step
   */
  _id: string;
  /**
   * Name of the step
   */
  name: string;
  /**
   * Slug of the step
   */
  slug: string;
  /**
   * Type of the step
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
   * Origin of the layout
   */
  origin: "novu-cloud" | "novu-cloud-v1" | "external";
  /**
   * Workflow identifier
   */
  workflowId: string;
  /**
   * Workflow database identifier
   */
  workflowDatabaseId: string;
  /**
   * Issues associated with the step
   */
  issues?: StepIssuesDto9;
  /**
   * Hash identifying the deployed Cloudflare Worker for this step
   */
  stepResolverHash?: string;
}
export interface HttpRequestControlsMetadataResponseDto {
  /**
   * JSON Schema for data
   */
  dataSchema?: {
    [k: string]: unknown;
  };
  /**
   * UI Schema for rendering
   */
  uiSchema?: UiSchema9;
  /**
   * Control values specific to HTTP Request step
   */
  values: HttpRequestControlDto;
}
export interface UiSchema9 {
  /**
   * Group of the UI Schema
   */
  group?:
    | "IN_APP"
    | "EMAIL"
    | "DIGEST"
    | "DELAY"
    | "THROTTLE"
    | "SMS"
    | "CHAT"
    | "PUSH"
    | "SKIP"
    | "LAYOUT"
    | "HTTP_REQUEST";
  /**
   * Properties of the UI Schema
   */
  properties?: {
    [k: string]: UiSchemaProperty;
  };
}
export interface HttpRequestControlDto {
  /**
   * HTTP method
   */
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  /**
   * Target URL for the HTTP request
   */
  url: string;
  /**
   * Request headers as key-value pairs
   */
  headers?: HttpRequestKeyValuePairDto[];
  /**
   * Request body as a raw JSON string. Key-value arrays are supported for legacy workflows.
   */
  body?: string | HttpRequestKeyValuePairDto1[];
  /**
   * JSON schema to validate response body against
   */
  responseBodySchema?: {
    [k: string]: unknown;
  };
  /**
   * Whether to enforce response body schema validation
   */
  enforceSchemaValidation?: boolean;
  /**
   * Whether to continue workflow execution on failure
   */
  continueOnFailure?: boolean;
}
export interface HttpRequestKeyValuePairDto {
  /**
   * Key of the key-value pair
   */
  key: string;
  /**
   * Value of the key-value pair
   */
  value: string;
}
export interface HttpRequestKeyValuePairDto1 {
  /**
   * Key of the key-value pair
   */
  key: string;
  /**
   * Value of the key-value pair
   */
  value: string;
}
export interface HttpRequestControlDto1 {
  /**
   * HTTP method
   */
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  /**
   * Target URL for the HTTP request
   */
  url: string;
  /**
   * Request headers as key-value pairs
   */
  headers?: HttpRequestKeyValuePairDto[];
  /**
   * Request body as a raw JSON string. Key-value arrays are supported for legacy workflows.
   */
  body?: string | HttpRequestKeyValuePairDto1[];
  /**
   * JSON schema to validate response body against
   */
  responseBodySchema?: {
    [k: string]: unknown;
  };
  /**
   * Whether to enforce response body schema validation
   */
  enforceSchemaValidation?: boolean;
  /**
   * Whether to continue workflow execution on failure
   */
  continueOnFailure?: boolean;
}
export interface StepIssuesDto9 {
  /**
   * Controls-related issues
   */
  controls?: {
    [k: string]: StepContentIssueDto[];
  };
  /**
   * Integration-related issues
   */
  integration?: {
    [k: string]: StepIntegrationIssue[];
  };
}
export interface WorkflowPreferencesResponseDto {
  /**
   * User-specific workflow preferences
   */
  user?: WorkflowPreferencesDto;
  /**
   * Default workflow preferences
   */
  default: WorkflowPreferencesDto1;
}
export interface WorkflowPreferencesDto {
  /**
   * A preference for the workflow. The values specified here will be used if no preference is specified for a channel.
   */
  all: WorkflowPreferenceDto & WorkflowPreferenceDto1;
  /**
   * Preferences for different communication channels
   */
  channels: {
    [k: string]: ChannelPreferenceDto;
  };
}
export interface WorkflowPreferenceDto {
  /**
   * A flag specifying if notification delivery is enabled for the workflow. If true, notification delivery is enabled by default for all channels. This setting can be overridden by the channel preferences.
   */
  enabled: boolean;
  /**
   * A flag specifying if the preference is read-only. If true, the preference cannot be changed by the Subscriber.
   */
  readOnly: boolean;
}
export interface WorkflowPreferenceDto1 {
  /**
   * A flag specifying if notification delivery is enabled for the workflow. If true, notification delivery is enabled by default for all channels. This setting can be overridden by the channel preferences.
   */
  enabled: boolean;
  /**
   * A flag specifying if the preference is read-only. If true, the preference cannot be changed by the Subscriber.
   */
  readOnly: boolean;
}
export interface ChannelPreferenceDto {
  /**
   * A flag specifying if notification delivery is enabled for the channel. If true, notification delivery is enabled.
   */
  enabled: boolean;
}
export interface WorkflowPreferencesDto1 {
  /**
   * A preference for the workflow. The values specified here will be used if no preference is specified for a channel.
   */
  all: WorkflowPreferenceDto & WorkflowPreferenceDto1;
  /**
   * Preferences for different communication channels
   */
  channels: {
    [k: string]: ChannelPreferenceDto;
  };
}
export interface RuntimeIssueDto {}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X POST "https://api.novu.co/v2/workflows" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "string",
    "description": "string",
    "tags": [
      "string"
    ],
    "active": false,
    "validatePayload": true,
    "payloadSchema": {},
    "isTranslationEnabled": false,
    "workflowId": "string",
    "steps": [
      {
        "_id": "string",
        "stepId": "string",
        "name": "string",
        "type": "in_app",
        "controlValues": {
          "skip": {
            "and": [
              {
                "==": [
                  {
                    "var": "payload.tier"
                  },
                  "pro"
                ]
              },
              {
                "==": [
                  {
                    "var": "subscriber.data.role"
                  },
                  "admin"
                ]
              },
              {
                ">": [
                  {
                    "var": "payload.amount"
                  },
                  "4"
                ]
              }
            ]
          },
          "body": "string",
          "subject": "string",
          "avatar": "string",
          "primaryAction": {
            "label": "string",
            "redirect": {
              "url": "string",
              "target": "_self"
            }
          },
          "secondaryAction": {
            "label": "string",
            "redirect": {
              "url": "string",
              "target": "_self"
            }
          },
          "redirect": {
            "url": "string",
            "target": "_self"
          },
          "disableOutputSanitization": false,
          "data": {}
        }
      }
    ],
    "__source": "template_store",
    "preferences": {
      "user": {
        "all": {
          "enabled": true,
          "readOnly": false
        },
        "channels": {
          "email": {
            "enabled": true
          },
          "sms": {
            "enabled": false
          }
        }
      },
      "workflow": {
        "all": {
          "enabled": true,
          "readOnly": false
        },
        "channels": {
          "email": {
            "enabled": true
          },
          "sms": {
            "enabled": false
          }
        }
      }
    },
    "severity": "high"
  }'
```

201400401403404405409413414415422429500503

```
{
  "name": "string",
  "description": "string",
  "tags": [
    "string"
  ],
  "active": false,
  "validatePayload": true,
  "payloadSchema": {},
  "isTranslationEnabled": false,
  "_id": "string",
  "workflowId": "string",
  "slug": "string",
  "updatedAt": "string",
  "createdAt": "string",
  "updatedBy": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "externalId": "string"
  },
  "lastPublishedAt": "string",
  "lastPublishedBy": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "externalId": "string"
  },
  "steps": [
    {
      "controls": {
        "dataSchema": {},
        "uiSchema": {
          "group": "IN_APP",
          "properties": {
            "property1": {
              "placeholder": "string",
              "component": "EMAIL_EDITOR_SELECT",
              "properties": {
                "property1": {
                  "placeholder": "string",
                  "component": "EMAIL_EDITOR_SELECT",
                  "properties": {}
                },
                "property2": {
                  "placeholder": "string",
                  "component": "EMAIL_EDITOR_SELECT",
                  "properties": {}
                }
              }
            },
            "property2": {
              "placeholder": "string",
              "component": "EMAIL_EDITOR_SELECT",
              "properties": {
                "property1": {
                  "placeholder": "string",
                  "component": "EMAIL_EDITOR_SELECT",
                  "properties": {}
                },
                "property2": {
                  "placeholder": "string",
                  "component": "EMAIL_EDITOR_SELECT",
                  "properties": {}
                }
              }
            }
          }
        },
        "values": {
          "skip": {
            "and": [
              {
                "==": [
                  {
                    "var": "payload.tier"
                  },
                  "pro"
                ]
              },
              {
                "==": [
                  {
                    "var": "subscriber.data.role"
                  },
                  "admin"
                ]
              },
              {
                ">": [
                  {
                    "var": "payload.amount"
                  },
                  "4"
                ]
              }
            ]
          },
          "body": "string",
          "subject": "string",
          "avatar": "string",
          "primaryAction": {
            "label": "string",
            "redirect": {
              "url": "string",
              "target": "_self"
            }
          },
          "secondaryAction": {
            "label": "string",
            "redirect": {
              "url": "string",
              "target": "_self"
            }
          },
          "redirect": {
            "url": "string",
            "target": "_self"
          },
          "disableOutputSanitization": false,
          "data": {}
        }
      },
      "controlValues": {
        "skip": {
          "and": [
            {
              "==": [
                {
                  "var": "payload.tier"
                },
                "pro"
              ]
            },
            {
              "==": [
                {
                  "var": "subscriber.data.role"
                },
                "admin"
              ]
            },
            {
              ">": [
                {
                  "var": "payload.amount"
                },
                "4"
              ]
            }
          ]
        },
        "body": "string",
        "subject": "string",
        "avatar": "string",
        "primaryAction": {
          "label": "string",
          "redirect": {
            "url": "string",
            "target": "_self"
          }
        },
        "secondaryAction": {
          "label": "string",
          "redirect": {
            "url": "string",
            "target": "_self"
          }
        },
        "redirect": {
          "url": "string",
          "target": "_self"
        },
        "disableOutputSanitization": false,
        "data": {}
      },
      "variables": {},
      "stepId": "string",
      "_id": "string",
      "name": "string",
      "slug": "string",
      "type": "in_app",
      "origin": "novu-cloud",
      "workflowId": "string",
      "workflowDatabaseId": "string",
      "issues": {
        "controls": {
          "property1": [
            {
              "issueType": "ILLEGAL_VARIABLE_IN_CONTROL_VALUE",
              "variableName": "string",
              "message": "string"
            }
          ],
          "property2": [
            {
              "issueType": "ILLEGAL_VARIABLE_IN_CONTROL_VALUE",
              "variableName": "string",
              "message": "string"
            }
          ]
        },
        "integration": {
          "property1": [
            {
              "issueType": "MISSING_INTEGRATION",
              "variableName": "string",
              "message": "string"
            }
          ],
          "property2": [
            {
              "issueType": "MISSING_INTEGRATION",
              "variableName": "string",
              "message": "string"
            }
          ]
        }
      },
      "stepResolverHash": "string"
    }
  ],
  "origin": "novu-cloud",
  "preferences": {
    "user": {
      "all": {
        "enabled": true,
        "readOnly": false
      },
      "channels": {
        "email": {
          "enabled": true
        },
        "sms": {
          "enabled": false
        }
      }
    },
    "default": {
      "all": {
        "enabled": true,
        "readOnly": false
      },
      "channels": {
        "email": {
          "enabled": true
        },
        "sms": {
          "enabled": false
        }
      }
    }
  },
  "status": "ACTIVE",
  "issues": {
    "property1": {},
    "property2": {}
  },
  "lastTriggeredAt": "string",
  "payloadExample": {},
  "severity": "high"
}
```

[Workflow schema\\ \\ Reference the Novu workflow schema used in API requests and responses. Review fields, data types, and object structure for this resource.](https://docs.novu.co/api-reference/workflows/workflow-schema) [Retrieve a workflow GET\\ \\ Fetches details of a specific workflow by its unique identifier \*\*workflowId\*\*](https://docs.novu.co/api-reference/workflows/retrieve-a-workflow)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/workflows/create-a-workflow.mdx)Open in ChatGPTOpen in Claude