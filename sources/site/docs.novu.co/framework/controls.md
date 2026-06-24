# Source: https://docs.novu.co/framework/controls

# Novu Framework Controls

Learn how to use Controls in your notification workflows

Controls are defined using [JSON Schema](https://docs.novu.co/framework/schema/json-schema) or [Zod](https://zod.dev), providing a strong run-time validation system for your workflows.

This ensures that you as the developer and your non-technical peers are speaking the same language. Those responsible for styling and copy can edit with confidence, knowing their changes are tested in code.

## [Controls vs Payload](https://docs.novu.co/#controls-vs-payload)

**Control Schema** - For Non-Technical Peers and Developers. Managed in the Novu Dashboard UI, defined by developers and used by non-technical peers.

**Payload Schema** - For Developers. Passed during the `novu.trigger` method, and controlled by the developer.

## [Common usecases](https://docs.novu.co/#common-usecases)

- **Content** - Modify any static content: email subject, email body, push notification title, etc...
- **Styling** - Modify the styling of the content: button color, background color, font size, etc...
- **Behaviour** - Modify the behaviour of the content: show/hide a section, show/hide a button, etc...
- **Order** - Modify the order of the content: the order of the email sections, the order of the buttons, etc...
- **Actions** - Modify the behaviour of actions: digest duration, etc...
- **Other** - Any other use case that should be controller without modifying code

## [Step Controls](https://docs.novu.co/#step-controls)

Step Control schema defines the control passed during the `step` method. These controls can be modified and persisted in the Novu Dashboard UI. The snippet below shows a configuration for the Step Control schema. If you don't provide a schema, Typescript will infer the data type to `unknown`, reminding you of the best practice to specify your schema.

Zod SchemaClass-Validator SchemaJSON Schema

```
import { z } from 'zod';
import { render } from 'react-email';
import { ReactEmailContent } from './ReactEmailContent';
 
workflow('new-signup', async ({ step, payload }) => {
  await step.email(
    'send-email',
    async (controls) => {
      return {
        subject: controls.subject,
        body: render(
          <ReactEmailContent hideBanner={controls.hideBanner} components={controls.components} />
        ),
      };
    },
    {
      controlSchema: z.object({
        hideBanner: z.boolean().default(false),
        subject: z.string().default('Hi {{subscriber.firstName | capitalize}}'),
        components: z.array(
          z.object({
            type: z.enum(['header', 'cta-row', 'footer']),
            content: z.string(),
          })
        ),
      }),
    }
  );
});
```

For the full list of parameters, check out the [full SDK reference](https://docs.novu.co/framework/typescript/steps).

## [Schema Validation & IDE IntelliSense](https://docs.novu.co/#schema-validation--ide-intellisense)

You can use **Zod, Class-Validator or JSON Schema** based on your needs.

- **[Zod](https://zod.dev/)** - A TypeScript-first schema declaration and validation library. _(Novu supports Zod v3)_
- **[Class-Validator](https://github.com/typestack/class-validator)** - A TypeScript-first validation library using decorators for OOP-style applications.
- **[JSON Schema](https://docs.novu.co/framework/schema/json-schema)** - The most popular schema language for defining JSON data structures.

If you only want local IDE IntelliSense, you are able to pass plain JS Classes, which will not provide any Schema Definition useable by Novu Platform.

All provided **Zod** and **Class-Transformer** Schemas are compiled into **JSON Schema** which is passed to Novu. This ensures a consistent validation approach and UX by managing Payload and Control Data directly from the Platform.

There may be inconsistencies when using Class-Transformer especially with nested schema objects. Please check out the guidelines on converting Class-Transformer classes to JSON Schema before using it here: [class-validator-jsonschema](https://www.npmjs.com/package/class-validator-jsonschema).

## [Using Variables](https://docs.novu.co/#using-variables)

To facilitate the use of variables in the control schema, enclose the variable name in double curly braces using the `{{variableName}}` syntax. For example, `{{subscriber.firstName | capitalize}}` will be dynamically replaced with the actual value of the subscriber's first name at runtime. You can use variables in any step control value, whether set by the developer or within the Novu Dashboard UI. To facilitate this, the Novu Dashboard UI offers auto-completion for variables. Simply start typing `{{` to view a list of all available variables.

![Example for variables autocomplete in dashboard](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcontrols-autocomplete.ed8f273d.gif&w=3840&q=75)

### [Variable Options](https://docs.novu.co/#variable-options)

- **Subscriber Attributes**: Access all [subscriber attributes](https://docs.novu.co/platform/concepts/subscribers#subscriber-attributes). Example: `{{subscriber.firstName}}`
- **Payload Variables**: Use all payload variables defined in the `payloadSchema`. Example: `{{payload.userId}}`
- **Liquid Filters**: Apply [liquid filters](https://liquidjs.com/filters/overview.html) to format or manipulate variable values. Examples: `{{subscriber.firstName | append: ': ' | append: payload.status | capitalize}}` or `{{payload.invoiceDate | date: '%a, %b %d, %y'}}` will format the date as `Thu, Jan 01, 24`

[Payload\\ \\ Learn how to define and validate workflow payload schemas for data passed during the novu.trigger method.](https://docs.novu.co/framework/payload) [Email\\ \\ Learn how to configure the Email channel](https://docs.novu.co/framework/email-channel)

### On this page

[Controls vs Payload](https://docs.novu.co/#controls-vs-payload) [Common usecases](https://docs.novu.co/#common-usecases) [Step Controls](https://docs.novu.co/#step-controls) [Schema Validation & IDE IntelliSense](https://docs.novu.co/#schema-validation--ide-intellisense) [Using Variables](https://docs.novu.co/#using-variables) [Variable Options](https://docs.novu.co/#variable-options)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/controls.mdx)Open in ChatGPTOpen in Claude