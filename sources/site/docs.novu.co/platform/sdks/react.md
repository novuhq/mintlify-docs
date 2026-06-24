# Source: https://docs.novu.co/platform/sdks/react

@novu/react

# API reference for the @novu/react package

API reference for @novu/react components including Inbox, Bell, Notifications, and Subscription.

## [Components](https://docs.novu.co/#components)

The @novu/react package provides React components for building notification UIs.

## [Inbox](https://docs.novu.co/#inbox)

The main component for displaying notifications.

### [Props](https://docs.novu.co/#props)

| Prop | Type | Default |
| --- | --- | --- |
| 
`applicationIdentifier?`

 | 

`string`

 | \- |
| 

`subscriber?`

 | 

`string | Subscriber`

 | \- |
| 

`subscriberId?`

 | 

`string`

 | \- |
| 

`context?`

 | 

`Partial<Record<string, ContextValue>>`

 | \- |
| 

`routerPush?`

 | 

`RouterPush`

 | \- |
| 

`defaultSchedule?`

 | 

`DefaultSchedule`

 | \- |
| 

`preferencesSort?`

 | 

`PreferencesSort`

 | \- |
| 

`preferenceGroups?`

 | 

`PreferenceGroups`

 | \- |
| 

`preferencesFilter?`

 | 

`PreferencesFilter`

 | \- |
| 

`tabs?`

 | 

`Tab[]`

 | \- |
| 

`localization?`

 | 

`InboxLocalization`

 | \- |
| 

`socketOptions?`

 | 

`NovuSocketOptions`

 | \- |
| 

`socketUrl?`

 | 

`string`

 | \- |
| 

`backendUrl?`

 | 

`string`

 | \- |
| 

`contextHash?`

 | 

`string`

 | \- |
| 

`subscriberHash?`

 | 

`string`

 | \- |
| 

`appearance?`

 | 

`ReactInboxAppearance`

 | \- |

### [Usage](https://docs.novu.co/#usage)

```
import { Inbox } from "@novu/react";
 
function NovuInbox() {
  return (
    <Inbox
      applicationIdentifier="APPLICATION_IDENTIFIER"
      subscriber={{
        subscriberId: "SUBSCRIBER_ID",
      }}
      apiUrl="https://api.novu.co"
      socketUrl="https://socket.novu.co"
      placement="right"
      placementOffset={10}
      onNotificationClick={(notification) => {
        // Handle notification click
        console.log(notification);
      }}
    />
  );
}
```

### [Appearance Configuration](https://docs.novu.co/#appearance-configuration)

| Prop | Type | Default |
| --- | --- | --- |
| 
`baseTheme?`

 | 

`AllTheme | AllTheme[]`

 | \- |
| 

`icons?`

 | 

`AllIconOverrides`

 | \- |
| 

`animations?`

 | 

`boolean`

 | \- |
| 

`variables?`

 | 

`Variables`

 | \- |

#### [Variables](https://docs.novu.co/#variables)

| Prop | Type | Default |
| --- | --- | --- |
| 
`colorSeverityLow?`

 | 

`string`

 | \- |
| 

`colorSeverityMedium?`

 | 

`string`

 | \- |
| 

`colorSeverityHigh?`

 | 

`string`

 | \- |
| 

`colorStripes?`

 | 

`string`

 | \- |
| 

`borderRadius?`

 | 

`string`

 | \- |
| 

`fontSize?`

 | 

`string`

 | \- |
| 

`colorRing?`

 | 

`string`

 | \- |
| 

`colorShadow?`

 | 

`string`

 | \- |
| 

`colorNeutral?`

 | 

`string`

 | \- |
| 

`colorCounterForeground?`

 | 

`string`

 | \- |
| 

`colorCounter?`

 | 

`string`

 | \- |
| 

`colorSecondaryForeground?`

 | 

`string`

 | \- |
| 

`colorSecondary?`

 | 

`string`

 | \- |
| 

`colorPrimaryForeground?`

 | 

`string`

 | \- |
| 

`colorPrimary?`

 | 

`string`

 | \- |
| 

`colorForeground?`

 | 

`string`

 | \- |
| 

`colorBackground?`

 | 

`string`

 | \- |

#### [Elements](https://docs.novu.co/#elements)

| Prop | Type | Default |
| --- | --- | --- |
| 
`channelConnectButtonLabel?`

 | 

`ElementStyles | ((context: { connected: boolean; }) => string)`

 | \- |
| 

`channelConnectButtonIcon?`

 | 

`ElementStyles | ((context: { connected: boolean; }) => string)`

 | \- |
| 

`channelConnectButtonInner?`

 | 

`ElementStyles | ((context: { connected: boolean; }) => string)`

 | \- |
| 

`channelConnectButton?`

 | 

`ElementStyles | ((context: { connected: boolean; }) => string)`

 | \- |
| 

`channelConnectButtonContainer?`

 | 

`ElementStyles | ((context: { connected: boolean; }) => string)`

 | \- |
| 

`linkSlackUserButtonLabel?`

 | 

`ElementStyles | ((context: { linked: boolean; }) => string)`

 | \- |
| 

`linkSlackUserButtonIcon?`

 | 

`ElementStyles | ((context: { linked: boolean; }) => string)`

 | \- |
| 

`linkSlackUserButtonContainer?`

 | 

`ElementStyles | ((context: { linked: boolean; }) => string)`

 | \- |
| 

`linkSlackUserButton?`

 | 

`ElementStyles | ((context: { linked: boolean; }) => string)`

 | \- |
| 

`linkSlackUserContainer?`

 | 

`ElementStyles | ((context: { linked: boolean; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupWorkflowLabel?`

 | 

`ElementStyles | ((context: { preference: { label: string; preference: SubscriptionPreference; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupWorkflowRow?`

 | 

`ElementStyles | ((context: { preference: { label: string; preference: SubscriptionPreference; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupBody?`

 | 

`ElementStyles | ((context: { group: { label: string; group: { label: string; preference: SubscriptionPreference; }[]; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupActionsContainerRight__icon?`

 | 

`ElementStyles | ((context: { group: { label: string; group: { label: string; preference: SubscriptionPreference; }[]; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupActionsContainer?`

 | 

`ElementStyles | ((context: { group: { label: string; group: { label: string; preference: SubscriptionPreference; }[]; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupLabel?`

 | 

`ElementStyles | ((context: { group: { label: string; group: { label: string; preference: SubscriptionPreference; }[]; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupLabelIcon?`

 | 

`ElementStyles | ((context: { group: { label: string; group: { label: string; preference: SubscriptionPreference; }[]; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupLabelContainer?`

 | 

`ElementStyles | ((context: { group: { label: string; group: { label: string; preference: SubscriptionPreference; }[]; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupHeader?`

 | 

`ElementStyles | ((context: { group: { label: string; group: { label: string; preference: SubscriptionPreference; }[]; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceGroupContainer?`

 | 

`ElementStyles | ((context: { group: { label: string; group: { label: string; preference: SubscriptionPreference; }[]; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceLabel?`

 | 

`ElementStyles | ((context: { preference: { label: string; preference: SubscriptionPreference; }; }) => string)`

 | \- |
| 

`subscriptionPreferenceRow?`

 | 

`ElementStyles | ((context: { preference: { label: string; preference: SubscriptionPreference; }; }) => string)`

 | \- |
| 

`subscriptionPreferencesFallbackDescription?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesFallbackHeader?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesFallbackTexts?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesFallback?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesGroupsContainer?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesContent?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesInfoIcon?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesHeader?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesHeaderContainer?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionPreferencesContainer?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscription__popoverContent?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionTriggerIcon?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscription__popoverTrigger?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscription__popoverTriggerContainer?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionButtonLabel?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionButtonIcon?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionButtonContainer?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionButton__button?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`subscriptionContainer?`

 | 

`ElementStyles | ((context: { subscription?: TopicSubscription | undefined; }) => string)`

 | \- |
| 

`notificationSnoozedUntil__icon?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationDeliveredAt__icon?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationDeliveredAt__badge?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`dayScheduleCopyFooterContainer?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`dayScheduleCopyDay?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`dayScheduleCopySelectAll?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`dayScheduleCopyIcon?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`dayScheduleCopyTitle?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleInfo?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleInfoIcon?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleInfoContainer?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleBodyColumn?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleBodyRow?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleTableBody?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleHeaderColumn?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleTableHeader?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleTable?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleDescription?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleBody?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleActionsContainerRight?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleActionsContainer?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleLabel?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleLabelInfoIcon?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleLabelScheduleIcon?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleLabelContainer?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleHeader?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`scheduleContainer?`

 | 

`ElementStyles | ((context: { schedule?: Schedule | undefined; }) => string)`

 | \- |
| 

`channelSwitchContainer?`

 | 

`ElementStyles | ((context: { preference?: Preference | undefined; preferenceGroup?: { name: string; preferences: Preference[]; } | undefined; }) => string)`

 | \- |
| 

`channelName?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`channelLabelContainer?`

 | 

`ElementStyles | ((context: { preference?: Preference | undefined; preferenceGroup?: { name: string; preferences: Preference[]; } | undefined; }) => string)`

 | \- |
| 

`channelLabel?`

 | 

`ElementStyles | ((context: { preference?: Preference | undefined; preferenceGroup?: { name: string; preferences: Preference[]; } | undefined; }) => string)`

 | \- |
| 

`channelsContainer?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`channel__icon?`

 | 

`ElementStyles | ((context: { preference?: Preference | undefined; preferenceGroup?: { name: string; preferences: Preference[]; } | undefined; }) => string)`

 | \- |
| 

`channelIconContainer?`

 | 

`ElementStyles | ((context: { preference?: Preference | undefined; preferenceGroup?: { name: string; preferences: Preference[]; } | undefined; }) => string)`

 | \- |
| 

`channelContainer?`

 | 

`ElementStyles | ((context: { preference?: Preference | undefined; preferenceGroup?: { name: string; preferences: Preference[]; } | undefined; }) => string)`

 | \- |
| 

`preferencesGroupWorkflows?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupInfoIcon?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupInfo?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupChannels?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupBody?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupActionsContainerRight__icon?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupActionsContainer?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupLabel?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupLabelIcon?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupLabelContainer?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupHeader?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`preferencesGroupContainer?`

 | 

`ElementStyles | ((context: { preferenceGroup: { name: string; preferences: Preference[]; }; }) => string)`

 | \- |
| 

`workflowArrow__icon?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`workflowContainerRight__icon?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`workflowLabelContainer?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`workflowLabelIcon?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`workflowLabelHeaderContainer?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`workflowLabelHeader?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`workflowLabel?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`workflowContainer?`

 | 

`ElementStyles | ((context: { preference: Preference; }) => string)`

 | \- |
| 

`notificationSecondaryAction__button?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationPrimaryAction__button?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationCustomActions?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationDefaultActions?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationDate?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationImageLoadingFallback?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationImage?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationBody?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationSubject?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationDot?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationTextContainer?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationContent?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`severityLow__notificationBar?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`severityMedium__notificationBar?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`severityHigh__notificationBar?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationBar?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`severityLow__notification?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`severityMedium__notification?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`severityHigh__notification?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notification?`

 | 

`ElementStyles | ((context: { notification: Notification; }) => string)`

 | \- |
| 

`notificationList?`

 | 

`ElementStyles | ((context: { notifications: Notification[]; }) => string)`

 | \- |
| 

`notificationListContainer?`

 | 

`ElementStyles | ((context: { notifications: Notification[]; }) => string)`

 | \- |
| 

`preferencesContainer?`

 | 

`ElementStyles | ((context: { preferences?: Preference[] | undefined; groups: { name: string; preferences: Preference[]; }[]; }) => string)`

 | \- |
| 

`bellDot?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`severityGlowLow__bellSeverityGlow?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`severityGlowMedium__bellSeverityGlow?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`severityGlowHigh__bellSeverityGlow?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`bellSeverityGlow?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`severityLow__bellContainer?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`severityMedium__bellContainer?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`severityHigh__bellContainer?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`bellContainer?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`bellIcon?`

 | 

`ElementStyles | ((context: { unreadCount: { total: number; severity: Record<string, number>; }; }) => string)`

 | \- |
| 

`channelConnectButtonMisconfiguredTooltip?`

 | 

`ElementStyles`

 | \- |
| 

`connectChatMisconfiguredTooltip?`

 | 

`ElementStyles`

 | \- |
| 

`connectChatButtonLabel?`

 | 

`ElementStyles`

 | \- |
| 

`connectChatButtonContainer?`

 | 

`ElementStyles`

 | \- |
| 

`connectChatButton?`

 | 

`ElementStyles`

 | \- |
| 

`connectChatContainer?`

 | 

`ElementStyles`

 | \- |
| 

`em?`

 | 

`ElementStyles`

 | \- |
| 

`strong?`

 | 

`ElementStyles`

 | \- |
| 

`notificationSnoozeCustomTime_popoverContent?`

 | 

`ElementStyles`

 | \- |
| 

`notificationSnooze__dropdownItem__icon?`

 | 

`ElementStyles`

 | \- |
| 

`notificationSnooze__dropdownItem?`

 | 

`ElementStyles`

 | \- |
| 

`notificationSnooze__dropdownContent?`

 | 

`ElementStyles`

 | \- |
| 

`timeSelect__dropdownItemCheck__icon?`

 | 

`ElementStyles`

 | \- |
| 

`timeSelect__dropdownItemLabelContainer?`

 | 

`ElementStyles`

 | \- |
| 

`timeSelect__dropdownItemLabel?`

 | 

`ElementStyles`

 | \- |
| 

`timeSelect__dropdownItem?`

 | 

`ElementStyles`

 | \- |
| 

`timeSelect__dropdownContent?`

 | 

`ElementStyles`

 | \- |
| 

`timeSelect__time?`

 | 

`ElementStyles`

 | \- |
| 

`timeSelect__dropdownTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`dayScheduleCopy__dropdownContent?`

 | 

`ElementStyles`

 | \- |
| 

`dayScheduleCopy__dropdownTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesList__skeletonText?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesList__skeletonSwitchThumb?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesList__skeletonSwitch?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesList__skeletonIcon?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesList__skeletonItem?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesList__skeletonContent?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesList__skeleton?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesListEmptyNotice?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesListEmptyNoticeContainer?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesHeader__icon?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesHeader__title?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesHeader__back__button__icon?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesHeader__back__button?`

 | 

`ElementStyles`

 | \- |
| 

`preferencesHeader?`

 | 

`ElementStyles`

 | \- |
| 

`channelSwitchThumb?`

 | 

`ElementStyles`

 | \- |
| 

`channelSwitch?`

 | 

`ElementStyles`

 | \- |
| 

`channelsContainerCollapsible?`

 | 

`ElementStyles`

 | \- |
| 

`workflowDescription?`

 | 

`ElementStyles`

 | \- |
| 

`workflowLabelDisabled__icon?`

 | 

`ElementStyles`

 | \- |
| 

`workflowContainerDisabledNotice?`

 | 

`ElementStyles`

 | \- |
| 

`moreTabs__dropdownItemRight__icon?`

 | 

`ElementStyles`

 | \- |
| 

`moreTabs__dropdownItemLabel?`

 | 

`ElementStyles`

 | \- |
| 

`moreTabs__dropdownItem?`

 | 

`ElementStyles`

 | \- |
| 

`moreTabs__dropdownContent?`

 | 

`ElementStyles`

 | \- |
| 

`moreTabs__dropdownTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`moreTabs__icon?`

 | 

`ElementStyles`

 | \- |
| 

`moreTabs__button?`

 | 

`ElementStyles`

 | \- |
| 

`moreActions__dots?`

 | 

`ElementStyles`

 | \- |
| 

`moreActions__dropdownItemLeft__icon?`

 | 

`ElementStyles`

 | \- |
| 

`moreActions__dropdownItemLabel?`

 | 

`ElementStyles`

 | \- |
| 

`moreActions__dropdownItem?`

 | 

`ElementStyles`

 | \- |
| 

`moreActions__dropdownContent?`

 | 

`ElementStyles`

 | \- |
| 

`moreActions__dropdownTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`moreActionsContainer?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownItemCheck__icon?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownItem__icon?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownItemRight__icon?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownItemLeft__icon?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownItemLabelContainer?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownItemLabel?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownItem?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownContent?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__dropdownTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`inboxStatus__title?`

 | 

`ElementStyles`

 | \- |
| 

`notificationsTabsTriggerCount?`

 | 

`ElementStyles`

 | \- |
| 

`notificationsTabsTriggerLabel?`

 | 

`ElementStyles`

 | \- |
| 

`notificationsTabs__tabsTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`notificationsTabs__tabsContent?`

 | 

`ElementStyles`

 | \- |
| 

`notificationsTabs__tabsList?`

 | 

`ElementStyles`

 | \- |
| 

`notificationsTabs__tabsRoot?`

 | 

`ElementStyles`

 | \- |
| 

`notificationUnsnooze__icon?`

 | 

`ElementStyles`

 | \- |
| 

`notificationSnooze__icon?`

 | 

`ElementStyles`

 | \- |
| 

`notificationUnarchive__icon?`

 | 

`ElementStyles`

 | \- |
| 

`notificationArchive__icon?`

 | 

`ElementStyles`

 | \- |
| 

`notificationUnread__icon?`

 | 

`ElementStyles`

 | \- |
| 

`notificationRead__icon?`

 | 

`ElementStyles`

 | \- |
| 

`notificationUnsnooze__button?`

 | 

`ElementStyles`

 | \- |
| 

`notificationSnooze__button?`

 | 

`ElementStyles`

 | \- |
| 

`notificationUnarchive__button?`

 | 

`ElementStyles`

 | \- |
| 

`notificationArchive__button?`

 | 

`ElementStyles`

 | \- |
| 

`notificationUnread__button?`

 | 

`ElementStyles`

 | \- |
| 

`notificationRead__button?`

 | 

`ElementStyles`

 | \- |
| 

`notificationDateActionsContainer?`

 | 

`ElementStyles`

 | \- |
| 

`notificationBodyContainer?`

 | 

`ElementStyles`

 | \- |
| 

`notificationBody__em?`

 | 

`ElementStyles`

 | \- |
| 

`notificationBody__strong?`

 | 

`ElementStyles`

 | \- |
| 

`notificationSubject__em?`

 | 

`ElementStyles`

 | \- |
| 

`notificationSubject__strong?`

 | 

`ElementStyles`

 | \- |
| 

`notificationListNewNotificationsNotice__button?`

 | 

`ElementStyles`

 | \- |
| 

`notificationList__skeletonText?`

 | 

`ElementStyles`

 | \- |
| 

`notificationList__skeletonAvatar?`

 | 

`ElementStyles`

 | \- |
| 

`notificationList__skeletonItem?`

 | 

`ElementStyles`

 | \- |
| 

`notificationList__skeletonContent?`

 | 

`ElementStyles`

 | \- |
| 

`notificationList__skeleton?`

 | 

`ElementStyles`

 | \- |
| 

`notificationListEmptyNotice?`

 | 

`ElementStyles`

 | \- |
| 

`notificationListEmptyNoticeIcon?`

 | 

`ElementStyles`

 | \- |
| 

`notificationListEmptyNoticeOverlay?`

 | 

`ElementStyles`

 | \- |
| 

`notificationListEmptyNoticeContainer?`

 | 

`ElementStyles`

 | \- |
| 

`inbox__popoverContent?`

 | 

`ElementStyles`

 | \- |
| 

`inbox__popoverTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`inboxContent?`

 | 

`ElementStyles`

 | \- |
| 

`dots?`

 | 

`ElementStyles`

 | \- |
| 

`tabsTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`tabsContent?`

 | 

`ElementStyles`

 | \- |
| 

`tabsList?`

 | 

`ElementStyles`

 | \- |
| 

`tabsRoot?`

 | 

`ElementStyles`

 | \- |
| 

`skeletonSwitchThumb?`

 | 

`ElementStyles`

 | \- |
| 

`skeletonSwitch?`

 | 

`ElementStyles`

 | \- |
| 

`skeletonAvatar?`

 | 

`ElementStyles`

 | \- |
| 

`skeletonText?`

 | 

`ElementStyles`

 | \- |
| 

`back__button?`

 | 

`ElementStyles`

 | \- |
| 

`snoozeDatePicker__timePickerLabel?`

 | 

`ElementStyles`

 | \- |
| 

`snoozeDatePicker__timePickerContainer?`

 | 

`ElementStyles`

 | \- |
| 

`snoozeDatePickerApply__button?`

 | 

`ElementStyles`

 | \- |
| 

`snoozeDatePickerCancel__button?`

 | 

`ElementStyles`

 | \- |
| 

`snoozeDatePicker__actions?`

 | 

`ElementStyles`

 | \- |
| 

`snoozeDatePicker?`

 | 

`ElementStyles`

 | \- |
| 

`timePickerMinute__input?`

 | 

`ElementStyles`

 | \- |
| 

`timePickerHour__input?`

 | 

`ElementStyles`

 | \- |
| 

`timePicker__separator?`

 | 

`ElementStyles`

 | \- |
| 

`timePicker__periodSelect?`

 | 

`ElementStyles`

 | \- |
| 

`timePicker__minuteSelect?`

 | 

`ElementStyles`

 | \- |
| 

`timePicker__hourSelect?`

 | 

`ElementStyles`

 | \- |
| 

`timePicker?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerCalendarDay__button?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerHeaderMonth?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerCalendar?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerControlNextTrigger__icon?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerControlPrevTrigger__icon?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerControlNextTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerControlPrevTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerControl?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerGridHeader?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerGridCellTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerGridCell?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerGridRow?`

 | 

`ElementStyles`

 | \- |
| 

`datePickerGrid?`

 | 

`ElementStyles`

 | \- |
| 

`datePicker?`

 | 

`ElementStyles`

 | \- |
| 

`dropdownItem__icon?`

 | 

`ElementStyles`

 | \- |
| 

`dropdownItemRight__icon?`

 | 

`ElementStyles`

 | \- |
| 

`dropdownItemLeft__icon?`

 | 

`ElementStyles`

 | \- |
| 

`dropdownItemLabelContainer?`

 | 

`ElementStyles`

 | \- |
| 

`dropdownItemLabel?`

 | 

`ElementStyles`

 | \- |
| 

`dropdownItem?`

 | 

`ElementStyles`

 | \- |
| 

`dropdownTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`dropdownContent?`

 | 

`ElementStyles`

 | \- |
| 

`loading?`

 | 

`ElementStyles`

 | \- |
| 

`inboxHeader?`

 | 

`ElementStyles`

 | \- |
| 

`preferences__button?`

 | 

`ElementStyles`

 | \- |
| 

`lockIcon?`

 | 

`ElementStyles`

 | \- |
| 

`tooltipTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`tooltipContent?`

 | 

`ElementStyles`

 | \- |
| 

`collapsible?`

 | 

`ElementStyles`

 | \- |
| 

`popoverClose?`

 | 

`ElementStyles`

 | \- |
| 

`popoverTrigger?`

 | 

`ElementStyles`

 | \- |
| 

`popoverContent?`

 | 

`ElementStyles`

 | \- |
| 

`badge?`

 | 

`ElementStyles`

 | \- |
| 

`icon?`

 | 

`ElementStyles`

 | \- |
| 

`input?`

 | 

`ElementStyles`

 | \- |
| 

`button?`

 | 

`ElementStyles`

 | \- |
| 

`root?`

 | 

`ElementStyles`

 | \- |

## [Bell](https://docs.novu.co/#bell)

A customizable notification bell component.

### [Props](https://docs.novu.co/#props-1)

| Prop | Type | Default |
| --- | --- | --- |
| 
`renderBell?`

 | 

`BellRenderer`

 | \- |

### [Usage](https://docs.novu.co/#usage-1)

```
import { Bell } from "@novu/react";
import { BellIcon } from "lucide-react";
 
function NotificationBell() {
  return (
    <Bell
      renderBell={(unreadCount) => (
        <div className="relative">
          <BellIcon className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
      )}
    />
  );
}
```

## [Notifications](https://docs.novu.co/#notifications)

A component for rendering a list of notifications.

### [Props](https://docs.novu.co/#props-2)

| Prop | Type | Default |
| --- | --- | --- |
| 
`renderCustomActions?`

 | 

`CustomActionsRenderer`

 | \- |
| 

`renderDefaultActions?`

 | 

`DefaultActionsRenderer`

 | \- |
| 

`renderBody?`

 | 

`BodyRenderer`

 | \- |
| 

`renderSubject?`

 | 

`SubjectRenderer`

 | \- |
| 

`renderAvatar?`

 | 

`AvatarRenderer`

 | \- |
| 

`renderNotification?`

 | 

`NotificationsRenderer`

 | \- |
| 

`onSecondaryActionClick?`

 | 

`NotificationActionClickHandler`

 | \- |
| 

`onPrimaryActionClick?`

 | 

`NotificationActionClickHandler`

 | \- |
| 

`onNotificationClick?`

 | 

`NotificationClickHandler`

 | \- |

### [Usage](https://docs.novu.co/#usage-2)

```
import { Notifications } from "@novu/react";
 
function NotificationList() {
  return (
    <Notifications
      onNotificationClick={(notification) => {
        // Handle notification click
        console.log(notification);
      }}
      renderNotification={({ body, createdAt }) => (
        <div className="flex gap-2 p-2">
          <div className="flex-1">
            <p>{body}</p>
            <time className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString()}
            </time>
          </div>
        </div>
      )}
    />
  );
}
```

## [InboxContent](https://docs.novu.co/#inboxcontent)

A component for building custom notification inboxes.

### [Props](https://docs.novu.co/#props-3)

| Prop | Type | Default |
| --- | --- | --- |
| 
`renderCustomActions?`

 | 

`CustomActionsRenderer`

 | \- |
| 

`renderDefaultActions?`

 | 

`DefaultActionsRenderer`

 | \- |
| 

`renderBody?`

 | 

`BodyRenderer`

 | \- |
| 

`renderSubject?`

 | 

`SubjectRenderer`

 | \- |
| 

`renderAvatar?`

 | 

`AvatarRenderer`

 | \- |
| 

`renderNotification?`

 | 

`NotificationsRenderer`

 | \- |
| 

`hideNav?`

 | 

`boolean`

 | \- |
| 

`initialPage?`

 | 

`InboxPage`

 | \- |
| 

`onSecondaryActionClick?`

 | 

`NotificationActionClickHandler`

 | \- |
| 

`onPrimaryActionClick?`

 | 

`NotificationActionClickHandler`

 | \- |
| 

`onNotificationClick?`

 | 

`NotificationClickHandler`

 | \- |

### [Usage](https://docs.novu.co/#usage-3)

```
import { InboxContent } from "@novu/react";
 
function CustomInbox() {
  return (
    <div className="custom-inbox-wrapper">
      <InboxContent
        onNotificationClick={(notification) => {
          // Handle notification click
          console.log(notification);
        }}
        onPrimaryActionClick={(notification) => {
          // Handle primary action click
          console.log(notification);
        }}
        hideNav={false}
        renderNotification={({ body, createdAt }) => (
          <div className="notification-item">
            <p>{body}</p>
            <time>{new Date(createdAt).toLocaleDateString()}</time>
          </div>
        )}
      />
    </div>
  );
}
```

## [Subscription](https://docs.novu.co/#subscription)

### [Props](https://docs.novu.co/#props-4)

| Prop | Type | Default |
| --- | --- | --- |
| 
`container?`

 | 

`string | Node | null`

 | \- |
| 

`appearance?`

 | 

`ReactSubscriptionAppearance`

 | \- |
| 

`localization?`

 | 

`SubscriptionLocalization`

 | \- |
| 

`preferences?`

 | 

`UIPreference[]`

 | \- |
| 

`identifier?`

 | 

`string`

 | \- |
| 

`topicKey?`

 | 

`string`

 | \- |
| 

`placementOffset?`

 | 

`OffsetOptions`

 | \- |
| 

`placement?`

 | 

`Placement`

 | \- |
| 

`open?`

 | 

`boolean`

 | \- |
| 

`renderPreferences?`

 | 

`PreferencesRenderer`

 | \- |
| 

`children?`

 | 

`ReactNode`

 | \- |

### [Appearance configuration](https://docs.novu.co/#appearance-configuration-1)

| Prop | Type | Default |
| --- | --- | --- |
| 
`baseTheme?`

 | 

`SubscriptionTheme | SubscriptionTheme[]`

 | \- |
| 

`icons?`

 | 

`SubscriptionIconOverrides`

 | \- |
| 

`animations?`

 | 

`boolean`

 | \- |
| 

`elements?`

 | 

`Partial<{ root: ElementStyles; button: ElementStyles; input: ElementStyles; icon: ElementStyles; badge: ElementStyles; ... 5 more ...; tooltipTrigger: ElementStyles; } & {} & { ...; }>`

 | \- |
| 

`variables?`

 | 

`Variables`

 | \- |

### [Usage](https://docs.novu.co/#usage-4)

```
import { NovuProvider, Subscription } from "@novu/react";
 
function SubscriptionManager() {
  return (
    <NovuProvider
      subscriber="SUBSCRIBER_ID"
      applicationIdentifier="APPLICATION_IDENTIFIER"
    >
      <Subscription
      topic="product-updates"
      identifier="user-preference-1"
      preferences={["workflow-one", "workflow-two"]}
      appearance={{
        baseTheme: isDark ? subscriptionDarkTheme : undefined,
      }}
    />
    </NovuProvider>
  );
}
```

[Overview\\ \\ Explore Novu's server-side and client-side SDKs for integrating notifications across multiple languages and frameworks.](https://docs.novu.co/platform/sdks) [NovuProvider\\ \\ Learn how to use the NovuProvider component to set up the Novu context in your React application](https://docs.novu.co/platform/sdks/react/hooks/novu-provider)

### On this page

[Components](https://docs.novu.co/#components) [Inbox](https://docs.novu.co/#inbox) [Props](https://docs.novu.co/#props) [Usage](https://docs.novu.co/#usage) [Appearance Configuration](https://docs.novu.co/#appearance-configuration) [Variables](https://docs.novu.co/#variables) [Elements](https://docs.novu.co/#elements) [Bell](https://docs.novu.co/#bell) [Props](https://docs.novu.co/#props-1) [Usage](https://docs.novu.co/#usage-1) [Notifications](https://docs.novu.co/#notifications) [Props](https://docs.novu.co/#props-2) [Usage](https://docs.novu.co/#usage-2) [InboxContent](https://docs.novu.co/#inboxcontent) [Props](https://docs.novu.co/#props-3) [Usage](https://docs.novu.co/#usage-3) [Subscription](https://docs.novu.co/#subscription) [Props](https://docs.novu.co/#props-4) [Appearance configuration](https://docs.novu.co/#appearance-configuration-1) [Usage](https://docs.novu.co/#usage-4)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/react/index.mdx)Open in ChatGPTOpen in Claude