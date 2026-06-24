# Source: https://docs.novu.co/platform/sdks/server/go

[Server-Side](https://docs.novu.co/platform/sdks/server)

# Go SDK for Novu

Connect a Go application to Novu

Novu's Go SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code that integrates seamlessly with your Go application.

[Explore the source code on GitHub](https://github.com/novuhq/novu-go)

## [Installation](https://docs.novu.co/#installation)

```
go get github.com/novuhq/novu-go
```

## [Usage](https://docs.novu.co/#usage)

US RegionEU Region

```
package main
 
import (
	"context"
	novugo "github.com/novuhq/novu-go"
	"github.com/novuhq/novu-go/models/components"
	"log"
	"os"
)
 
func main() {
ctx := context.Background()
 
    s := novugo.New(
    	novugo.WithSecurity(os.Getenv("NOVU_SECRET_KEY")),
    )
 
    res, err := s.Trigger(ctx, components.TriggerEventRequestDto{
    	WorkflowID: "workflow_identifier",
    	Payload: map[string]any{
    		"comment_id": "string",
    		"post": map[string]any{
    			"text": "string",
    		},
    	},
    	Overrides: map[string]map[string]any{
    		"email": map[string]any{
    			"bcc": "no-reply@novu.co",
    		},
    	},
    	To: components.CreateToSubscriberPayloadDto(
    		components.SubscriberPayloadDto{
    			SubscriberID: "subscriber_uniuqe_identifier",
    			FirstName: "Albert",
    			LastName: "Einstein",
    			Email: "albert@einstein.com",
    		},
    	),
    }, nil)
    if err != nil {
    	log.Fatal(err)
    }
    if res.TriggerEventResponseDto != nil {
    	// handle response
    }
 
}
```

[Python\\ \\ Connect a Python application to Novu](https://docs.novu.co/platform/sdks/server/python) [PHP SDK\\ \\ Connect a PHP application to Novu](https://docs.novu.co/platform/sdks/server/php)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/go.mdx)Open in ChatGPTOpen in Claude