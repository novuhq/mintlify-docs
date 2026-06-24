# Source: https://docs.novu.co/platform/sdks/server/java

[Server-Side](https://docs.novu.co/platform/sdks/server)

# Novu Java SDK

Connect a Java application to Novu

Novu's Java SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code that integrates seamlessly with your Java application.

[Explore the source code on GitHub.](https://github.com/novuhq/novu-java)

## [Installation](https://docs.novu.co/#installation)

JDK 11 or later is required.

Maven users:

```
<dependency>
    <groupId>co.novu</groupId>
    <artifactId>novu-java</artifactId>
    <version>LATEST</version>
</dependency>
```

The latest version can be found [on GitHub.](https://github.com/novuhq/novu-java#sdk-installation)

Gradle users:

```
implementation 'co.novu:novu-java:LATEST'
```

Sync your project, and you should have the artifacts downloaded.

## [Usage](https://docs.novu.co/#usage)

US RegionEU Region

```
package hello.world;
 
import co.novu.Novu;
import co.novu.models.components.*;
import co.novu.models.errors.*;
import co.novu.models.operations.EventsControllerTriggerResponse;
import java.lang.Exception;
import java.util.Map;
 
public class Application {
 
    public static void main(String[] args) throws PayloadValidationExceptionDto, ErrorDto, ValidationErrorDto, Exception {
 
        Novu sdk = Novu.builder()
                .secretKey("YOUR_SECRET_KEY_HERE")
            .build();
 
        EventsControllerTriggerResponse res = sdk.trigger()
                .body(TriggerEventRequestDto.builder()
                    .workflowId("workflow_identifier")
                    .to(To2.of("SUBSCRIBER_ID"))
                    .payload(Map.ofEntries(
                        Map.entry("comment_id", "string"),
                        Map.entry("post", Map.ofEntries(
                            Map.entry("text", "string")))))
                    .overrides(TriggerEventRequestDtoOverrides.builder()
                        .build())
                    .actor(TriggerEventRequestDtoActor.of("<value>"))
                    .context(Map.ofEntries(
                        Map.entry("tenant", TriggerEventRequestDtoContextUnion.of("org-acme"))))
                    .build())
                .call();
 
        if (res.triggerEventResponseDto().isPresent()) {
            // handle response
        }
    }
}
```

[.NET\\ \\ Connect a .NET application to Novu](https://docs.novu.co/platform/sdks/server/dotnet) [Kotlin\\ \\ Connect a Kotlin application to Novu](https://docs.novu.co/platform/sdks/server/kotlin)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/java.mdx)Open in ChatGPTOpen in Claude