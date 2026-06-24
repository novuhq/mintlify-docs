# Source: https://docs.novu.co/platform/sdks/server/kotlin

[Server-Side](https://docs.novu.co/platform/sdks/server)

# Novu Kotlin SDK

Connect a Kotlin application to Novu

This SDK is community maintained. Feel free to contribute on our [GitHub repository](https://github.com/novuhq/novu-kotlin).

Novu's Kotlin SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code that integrates seamlessly with your Kotlin application.

[Explore the source code on GitHub](https://github.com/novuhq/novu-kotlin)

## [Installation](https://docs.novu.co/#installation)

Maven users:

```
<dependency>
  <groupId>co.novu</groupId>
  <artifactId>novu-kotlin</artifactId>
  <version>{use-latest-version}</version>
</dependency>
```

The latest version can be found [on GitHub.](https://github.com/novuhq/novu-kotlin#installation)

Gradle users:

```
implementation 'co.novu:novu-kotlin:{use-latest-version}' //Groovy
 
implementation ("co.novu:novu-kotlin:{use-latest-version}") //Kotlin
```

Sync your project, and you should have the artifacts downloaded.

## [Usage](https://docs.novu.co/#usage)

```
 
// without changing the backend URL
import co.novu.Novu
import co.novu.extentions.environments
 
fun main() {
    val novu = Novu(apiKey = "NOVU_SECRET_KEY")
    val environment = novu.environments()
    println(environment)
}
```

[Java\\ \\ Connect a Java application to Novu](https://docs.novu.co/platform/sdks/server/java) [Laravel\\ \\ Connect a Laravel application to Novu](https://docs.novu.co/platform/sdks/server/laravel)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/kotlin.mdx)Open in ChatGPTOpen in Claude