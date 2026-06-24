```tsx app/layout.tsx
'use client';

import { Inbox } from '@novu/react';

export function NovuInbox() {
  return (
    <Inbox
      applicationIdentifier="YOUR_APPLICATION_IDENTIFIER"
      subscriberId="YOUR_SUBSCRIBER_ID"
    />
  );
}
```