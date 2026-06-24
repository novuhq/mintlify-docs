# Source: https://docs.novu.co/framework/content/remix-react-email

# Remix & React Email

Learn how to integrate React Email with Novu Framework in a Remix application

Integrating Novu Framework with [React email](https://react.email/) for your Remix application can be done in three steps. If you don't have an app, you can [clone our Remix example](https://github.com/novuhq/novu-framework-remix-example).

Install React email components

Install the required React email components.

```
  npm i @react-email/components react-email
```

Create email templates folder

Create an `emails` folder in the `app` directory of your Remix app.

Write your email

Create a new `sample-email.tsx` file for your email template.

```
import { Button, Html } from "@react-email/components";
 
function Email(props) {
  return (
    <Html>
      <Button
        href="https://example.com"
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  );
}
 
export function renderEmail(inputs) {
  return render(<Email {...inputs} />);
}
```

Write your workflow

Define your workflow using the above template

```
import { renderEmail } from './sample-email.tsx';
import { workflow } from '@novu/framework';
 
workflow('new-signup', async ({ step, payload }) => {
  await step.email('send-email', async (inputs) => {
    return {
      subject: `Welcome to Remix and React E-mail`,
      body: renderEmail(inputs),
    }
  });
});
```

[React Email\\ \\ Learn how to use React Email to build beautiful email templates](https://docs.novu.co/framework/content/react-email) [Svelte Email\\ \\ Learn how to use Svelte Email to build beautiful email templates](https://docs.novu.co/framework/content/svelte-email)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/content/remix-react-email.mdx)Open in ChatGPTOpen in Claude