# Source: https://docs.novu.co/framework/schema/class-validator

# Class Validator Schema

Integrate Class Validator with your notification workflows

Novu Framework allows you to use [Class Validator](https://www.npmjs.com/package/class-validator) to define the [Control](https://docs.novu.co/framework/controls) and [Payload](https://docs.novu.co/framework/payload) schemas for your workflows.

## [Add class validator to your project](https://docs.novu.co/#add-class-validator-to-your-project)

Install Class Validator Packages

```
npm install class-validator class-validator-jsonschema reflect-metadata
```

Novu requires the `class-validator-jsonschema` package to generate JSON schemas from your DTOs. You may also need the `reflect-metadata` package.

Use Class Validator in your workflow

After installation, the Class Validator DTOs can be used interchangeably with the `controlSchema` and `payloadSchema` options in your workflow definitions.

```
import { workflow } from '@novu/framework';
import { IsString, IsBoolean, IsNotEmpty, IsOptional, Type, NestedValidation } from "class-validator";
 
class TestComponent {
    @IsString()
    subject: string;
 
    @IsString()
    content: string;
}
 
class TestControlSchema {
    @IsBoolean()
    hideBanner: boolean;
 
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    subject?: string;
 
    // Allowing no code control over the component in the Dashboard UI
    @Type(() => NewSignUpComponent)
    @NestedValidation({ each: true })
    @IsOptional()
    components?: NewSignUpComponent[];
}
 
class TestPayloadSchema {
    @IsString()
    username: string;
}
 
export const testWorkflow = workflow('test-workflow', async ({ step, payload }) => {
    await step.email('send-email', async (controls) => {
        return {
            subject: controls.subject,
            body: 'Hello, World!',
        };
    },
    {
        controlSchema: TestControlSchema,
    });
}, {
    payloadSchema: TestPayloadSchema,
});
```

## [Controls and Payload UI](https://docs.novu.co/#controls-and-payload-ui)

When you define a `controlSchema` for a step, Novu will automatically generate a UI for the controls in the workflow editor.

- **Form Input Title** - Will be derived from the key of the Class Validator schema. Unfortunately Class Validator does not support custom titles at this point.
- **Form Input Type** - Will be derived from the Class Validator schema type, with support for `string`, `number`, `boolean`, and `enum` and `array` types.
- **Default Value** - Unfortunately Class Validator does not support default values at this point.
- **Validation** - Will be derived from the Class Validator schema validation decorators, including `@Min`, `@Max`, `@IsEmail`, `@IsUrl` and etc...

[JSON Schema\\ \\ Learn how to use JSON Schema to define the workflow payload and step inputs](https://docs.novu.co/framework/schema/json-schema) [Production Deployment Guide\\ \\ Learn how to deploy your Novu Framework application to production including networking, security, and HMAC verification setup.](https://docs.novu.co/framework/deployment/production)

### On this page

[Add class validator to your project](https://docs.novu.co/#add-class-validator-to-your-project) [Controls and Payload UI](https://docs.novu.co/#controls-and-payload-ui)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/schema/class-validator.mdx)Open in ChatGPTOpen in Claude