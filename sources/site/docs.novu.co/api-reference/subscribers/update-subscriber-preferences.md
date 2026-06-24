# Source: https://docs.novu.co/api-reference/subscribers/update-subscriber-preferences

# Update subscriber preferences

Update subscriber preferences by its unique key identifier **subscriberId**. **workflowId** is optional field, if provided, this API will update that workflow preference, otherwise it will update global preferences

PATCH

/`v2`/`subscribers`/`{subscriberId}`/`preferences`

Send

Server URL

Headers

Path

Body

## [Authorization](https://docs.novu.co/#authorization)

`Authorization`<token>

API key authentication. Allowed headers-- "Authorization: ApiKey <novu\_secret\_key>".

In: `header`

## [Request Body](https://docs.novu.co/#request-body)

`application/json`Required

`channels`object

Channel-specific preference settings

`workflowId`string

Workflow internal \_id, identifier or slug. If provided, update workflow specific preferences, otherwise update global preferences

`schedule`object

Subscriber schedule

`context`object

Show Attributes

## [Path Parameters](https://docs.novu.co/#path-parameters)

`subscriberId`Requiredstring

The identifier of the subscriber

## [Header Parameters](https://docs.novu.co/#header-parameters)

`idempotency-key`string

A header for idempotency purposes

## [Response Body](https://docs.novu.co/#response-body)

200400401403404405409413414415422429500503

OK

`global`Requiredobject

Global preference settings

`workflows`Requiredarray<object>

Workflow-specific preference settings

Show Attributes

```
export interface Response {
  /**
   * Global preference settings
   */
  global: SubscriberGlobalPreferenceDto;
  /**
   * Workflow-specific preference settings
   */
  workflows: SubscriberWorkflowPreferenceDto[];
}
export interface SubscriberGlobalPreferenceDto {
  /**
   * Whether notifications are enabled globally
   */
  enabled: boolean;
  /**
   * Channel-specific preference settings
   */
  channels: SubscriberPreferenceChannels;
  /**
   * Subscriber schedule
   */
  schedule?: ScheduleDto;
}
export interface SubscriberPreferenceChannels {
  /**
   * Email channel preference
   */
  email?: boolean;
  /**
   * SMS channel preference
   */
  sms?: boolean;
  /**
   * In-app channel preference
   */
  in_app?: boolean;
  /**
   * Chat channel preference
   */
  chat?: boolean;
  /**
   * Push notification channel preference
   */
  push?: boolean;
}
export interface ScheduleDto {
  /**
   * Schedule enabled
   */
  isEnabled: boolean;
  /**
   * Weekly schedule
   */
  weeklySchedule?: WeeklyScheduleDto;
}
export interface WeeklyScheduleDto {
  /**
   * Monday schedule
   */
  monday?: DayScheduleDto;
  /**
   * Tuesday schedule
   */
  tuesday?: DayScheduleDto1;
  /**
   * Wednesday schedule
   */
  wednesday?: DayScheduleDto2;
  /**
   * Thursday schedule
   */
  thursday?: DayScheduleDto3;
  /**
   * Friday schedule
   */
  friday?: DayScheduleDto4;
  /**
   * Saturday schedule
   */
  saturday?: DayScheduleDto5;
  /**
   * Sunday schedule
   */
  sunday?: DayScheduleDto6;
}
export interface DayScheduleDto {
  /**
   * Day schedule enabled
   */
  isEnabled: boolean;
  /**
   * Hours
   */
  hours?: TimeRangeDto[];
}
export interface TimeRangeDto {
  /**
   * Start time
   */
  start: string;
  /**
   * End time
   */
  end: string;
}
export interface DayScheduleDto1 {
  /**
   * Day schedule enabled
   */
  isEnabled: boolean;
  /**
   * Hours
   */
  hours?: TimeRangeDto[];
}
export interface DayScheduleDto2 {
  /**
   * Day schedule enabled
   */
  isEnabled: boolean;
  /**
   * Hours
   */
  hours?: TimeRangeDto[];
}
export interface DayScheduleDto3 {
  /**
   * Day schedule enabled
   */
  isEnabled: boolean;
  /**
   * Hours
   */
  hours?: TimeRangeDto[];
}
export interface DayScheduleDto4 {
  /**
   * Day schedule enabled
   */
  isEnabled: boolean;
  /**
   * Hours
   */
  hours?: TimeRangeDto[];
}
export interface DayScheduleDto5 {
  /**
   * Day schedule enabled
   */
  isEnabled: boolean;
  /**
   * Hours
   */
  hours?: TimeRangeDto[];
}
export interface DayScheduleDto6 {
  /**
   * Day schedule enabled
   */
  isEnabled: boolean;
  /**
   * Hours
   */
  hours?: TimeRangeDto[];
}
export interface SubscriberWorkflowPreferenceDto {
  /**
   * Whether notifications are enabled for this workflow
   */
  enabled: boolean;
  /**
   * Channel-specific preference settings for this workflow
   */
  channels: SubscriberPreferenceChannels1;
  /**
   * List of preference overrides
   */
  overrides: SubscriberPreferenceOverrideDto[];
  /**
   * Workflow information
   */
  workflow: SubscriberPreferencesWorkflowInfoDto;
  /**
   * Timestamp when the subscriber last updated their preference. Only present if subscriber explicitly set preferences.
   */
  updatedAt?: string;
}
export interface SubscriberPreferenceChannels1 {
  /**
   * Email channel preference
   */
  email?: boolean;
  /**
   * SMS channel preference
   */
  sms?: boolean;
  /**
   * In-app channel preference
   */
  in_app?: boolean;
  /**
   * Chat channel preference
   */
  chat?: boolean;
  /**
   * Push notification channel preference
   */
  push?: boolean;
}
export interface SubscriberPreferenceOverrideDto {
  /**
   * Channel type through which the message is sent
   */
  channel: "in_app" | "email" | "sms" | "chat" | "push";
  /**
   * The source of overrides
   */
  source: "subscriber" | "template" | "workflowOverride";
}
export interface SubscriberPreferencesWorkflowInfoDto {
  /**
   * Workflow slug
   */
  slug: string;
  /**
   * Unique identifier of the workflow
   */
  identifier: string;
  /**
   * Display name of the workflow
   */
  name: string;
  /**
   * last updated date
   */
  updatedAt?: string;
}
 
```

cURLJavaScriptPHPPythonGoTypeScriptCsharp (SDK)

```
curl -X PATCH "https://api.novu.co/v2/subscribers/string/preferences" \
  -H "idempotency-key: string" \
  -H "Authorization: <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "channels": {
      "email": true,
      "sms": true,
      "in_app": true,
      "push": true,
      "chat": true
    },
    "workflowId": "string",
    "schedule": {
      "isEnabled": true,
      "weeklySchedule": {
        "monday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "tuesday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "wednesday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "thursday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "friday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "saturday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "sunday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        }
      }
    },
    "context": {
      "property1": "org-acme",
      "property2": "org-acme"
    }
  }'
```

200400401403404405409413414415422429500503

```
{
  "global": {
    "enabled": true,
    "channels": {
      "email": true,
      "sms": false,
      "in_app": true,
      "chat": false,
      "push": true
    },
    "schedule": {
      "isEnabled": true,
      "weeklySchedule": {
        "monday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "tuesday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "wednesday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "thursday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "friday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "saturday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        },
        "sunday": {
          "isEnabled": true,
          "hours": [
            {
              "start": "09:00 AM",
              "end": "05:00 PM"
            }
          ]
        }
      }
    }
  },
  "workflows": [
    {
      "enabled": true,
      "channels": {
        "email": true,
        "sms": false,
        "in_app": true,
        "chat": false,
        "push": true
      },
      "overrides": [
        {
          "channel": "in_app",
          "source": "subscriber"
        }
      ],
      "workflow": {
        "slug": "string",
        "identifier": "string",
        "name": "string",
        "updatedAt": "string"
      },
      "updatedAt": "string"
    }
  ]
}
```

[Retrieve subscriber preferences GET\\ \\ Retrieve subscriber channel preferences by its unique key identifier \*\*subscriberId\*\*. This API returns all five channels preferences for all workflows and global preferences.](https://docs.novu.co/api-reference/subscribers/retrieve-subscriber-preferences) [Bulk update subscriber preferences PATCH\\ \\ Bulk update subscriber preferences by its unique key identifier \*\*subscriberId\*\*. This API allows updating multiple workflow preferences in a single request.](https://docs.novu.co/api-reference/subscribers/bulk-update-subscriber-preferences)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/api-reference/subscribers/update-subscriber-preferences.mdx)Open in ChatGPTOpen in Claude