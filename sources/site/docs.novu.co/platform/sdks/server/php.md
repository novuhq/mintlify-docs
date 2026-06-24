# Source: https://docs.novu.co/platform/sdks/server/php

[Server-Side](https://docs.novu.co/platform/sdks/server)

# PHP SDK for Novu

Connect a PHP application to Novu

Novu's PHP SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code that integrates seamlessly with your PHP application.

[Explore the source code on GitHub](https://github.com/novuhq/php-novu)

## [Installation](https://docs.novu.co/#installation)

The SDK relies on [Composer](https://getcomposer.org/) to manage its dependencies.

To install the SDK and add it as a dependency to an existing composer.json file:

```
composer require "novuhq/novu"
```

## [Usage](https://docs.novu.co/#usage)

US RegionEU Region

```
declare(strict_types=1);
 
require 'vendor/autoload.php';
 
use novu;
use novu\Models\Components;
 
$sdk = novu\Novu::builder()
    ->setSecurity(
        '<YOUR_SECRET_KEY_HERE>'
    )
    ->build();
 
$triggerEventRequestDto = new Components\TriggerEventRequestDto(
    workflowId: 'workflow_identifier',
    to: new Components\SubscriberPayloadDto(
        subscriberId: 'subscriber_unique_identifier',
        firstName: 'Albert',
        lastName: 'Einstein',
        email: 'albert@einstein.com',
    ),
    payload: [
        'comment_id' => 'string',
        'post' => [
            'text' => 'string',
        ],
    ],
    overrides: [
        'email' => [
            'bcc' => 'no-reply@novu.co',
        ],
    ],
);
 
$response = $sdk->trigger(
    triggerEventRequestDto: $triggerEventRequestDto,
    idempotencyKey: '<value>'
 
);
 
if ($response->triggerEventResponseDto !== null) {
    // handle response
}
```

[Go SDK\\ \\ Connect a Go application to Novu](https://docs.novu.co/platform/sdks/server/go) [.NET\\ \\ Connect a .NET application to Novu](https://docs.novu.co/platform/sdks/server/dotnet)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/php.mdx)Open in ChatGPTOpen in Claude