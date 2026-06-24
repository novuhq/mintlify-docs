# Source: https://docs.novu.co/platform/sdks/server/dotnet

[Server-Side](https://docs.novu.co/platform/sdks/server)

# Novu .NET SDK

Connect a .NET application to Novu

Novu's .NET SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code that integrates seamlessly with your C#/.NET application.

[Explore the source code on GitHub](https://github.com/novuhq/novu-csharp)

## [Installation](https://docs.novu.co/#installation)

```
dotnet add package Novu
```

## [Usage](https://docs.novu.co/#usage)

US RegionEU Region

```
using Novu;
using Novu.Models.Components;
using System.Collections.Generic;
 
var sdk = new NovuSDK(secretKey: "YOUR_SECRET_KEY_HERE");
 
var res = await sdk.TriggerAsync(triggerEventRequestDto: new TriggerEventRequestDto() {
    WorkflowId = "workflow_identifier",
    Payload = new Dictionary<string, object>() {
        { "comment_id", "string" },
        { "post", new Dictionary<string, object>() {
            { "text", "string" },
        } },
    },
    Overrides = new Overrides() {},
    To = To.CreateStr(
        "SUBSCRIBER_ID"
    ),
});
```

[PHP SDK\\ \\ Connect a PHP application to Novu](https://docs.novu.co/platform/sdks/server/php) [Java\\ \\ Connect a Java application to Novu](https://docs.novu.co/platform/sdks/server/java)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/dotnet.mdx)Open in ChatGPTOpen in Claude