# Source: https://docs.novu.co/platform/sdks/server/python

[Server-Side](https://docs.novu.co/platform/sdks/server)

# Novu Python SDK

Connect a Python application to Novu

Novu's Python SDK provides simple, yet comprehensive notification management, and delivery capabilities through multiple channels that you can implement using code that integrates seamlessly with your Python application.

[Explore the source code on GitHub](https://github.com/novuhq/novu-py)

## [Installation](https://docs.novu.co/#installation)

PIPPoetryShell and script usage with uv

PIP is the default package installer for Python, enabling easy installation and management of packages from PyPI via the command line.

```
pip install novu-py
```

## [Usage](https://docs.novu.co/#usage)

US RegionEU Region

SynchronousAsynchronous

```
import novu_py
from novu_py import Novu
import os
 
with Novu(
secret_key=os.getenv("NOVU_SECRET_KEY", ""),
) as novu:
 
    res = novu.trigger(trigger_event_request_dto=novu_py.TriggerEventRequestDto(
        workflow_id="workflow_identifier",
        to={
            "subscriber_id": "subscriber_unique_identifier",
            "first_name": "Albert",
            "last_name": "Einstein",
            "email": "albert@einstein.com",
        },
        payload={
            "comment_id": "string",
            "post": {
                "text": "string",
            },
        },
        overrides={
          "email": {
            "bcc": "no-reply@novu.co"
          }
        },
    ))
 
    # Handle response
    print(res)
```

[Typescript\\ \\ Connect a TS/JS application to Novu](https://docs.novu.co/platform/sdks/server/typescript) [Go SDK\\ \\ Connect a Go application to Novu](https://docs.novu.co/platform/sdks/server/go)

### On this page

[Installation](https://docs.novu.co/#installation) [Usage](https://docs.novu.co/#usage)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/sdks/server/python.mdx)Open in ChatGPTOpen in Claude