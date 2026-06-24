# Source: https://docs.novu.co/platform/sdks/server/laravel

[Server-Side](https://docs.novu.co/platform/sdks/server)

# Novu Laravel SDK

Connect a Laravel application to Novu

This SDK is community maintained. Feel free to contribute on our [GitHub repository](https://github.com/novuhq/novu-laravel).

Novu's Laravel SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code that integrates seamlessly with your Laravel application.

[Explore the source code on GitHub](https://github.com/novuhq/novu-laravel)

## [Installation](https://docs.novu.co/#installation)

```
composer require novu/novu-laravel
```

 If you're ready to start integrating in your Laravel app, jump straight to our [Laravel quickstart.]()

## [Usage](https://docs.novu.co/#usage)

```
use Novu\Laravel\Facades\Novu;
 
$response = Novu::triggerEvent([
    'name' => '<WORKFLOW_TRIGGER_IDENTIFIER_FROM_DASHBOARD>',
    'payload' => ['customVariables' => 'Hello'],
    'to' => [
        'subscriberId' => '<SUBSCRIBER_ID_FROM_DASHBOARD>',
        'phone' => '07983887777'
    ]
])->toArray();
 
// or you can use the novu() helper function like so:
novu()->triggerEvent([
    'name' => '<WORKFLOW_TRIGGER_IDENTIFIER_FROM_DASHBOARD>',
    'payload' => ['customVariables' => 'Hello'],
    'to' => [
        'subscriberId' => '<SUBSCRIBER_ID_FROM_DASHBOARD>',
        'phone' => '07983887777'
    ]
])->toArray();
```

[Kotlin\\ \\ Connect a Kotlin application to Novu](https://docs.novu.co/platform/sdks/server/kotlin) [Ruby\\ \\ Connect a Ruby application to Novu](https://docs.novu.co/platform/sdks/server/ruby)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/laravel.mdx)Open in ChatGPTOpen in Claude