# Source: https://docs.novu.co/platform/sdks/server/ruby

[Server-Side](https://docs.novu.co/platform/sdks/server)

# Novu Ruby SDK

Connect a Ruby application to Novu

This SDK is community maintained. Feel free to contribute on our [GitHub repository](https://github.com/novuhq/novu-ruby).

Novu's Ruby SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code that integrates seamlessly with your Ruby application.

[Explore the source code on GitHub](https://github.com/novuhq/novu-ruby)

## [Installation](https://docs.novu.co/#installation)

```
gem install novu
```

## [Usage](https://docs.novu.co/#usage)

```
require 'novu'
 
client = Novu::Client.new(access_token: 'YOUR_NOVU_API_TOKEN')
 
payload = {
    'name' => 'Trigger1',
    'payload' => { # optional
        'first-name' => 'Adam' # optional
    },
    'to' => {
        'subscriberId' => '7789'
    },
    'transactionId' => '89kjfke9893' #optional
}
 
client.trigger_event(payload)
```

[Laravel\\ \\ Connect a Laravel application to Novu](https://docs.novu.co/platform/sdks/server/laravel) [API keys\\ \\ Manage authentication credentials and connection endpoints for your Novu integration.](https://docs.novu.co/platform/developer/api-keys)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/ruby.mdx)Open in ChatGPTOpen in Claude