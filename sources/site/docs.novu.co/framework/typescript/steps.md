# Source: https://docs.novu.co/framework/typescript/steps

# Step Interface

Learn about the Novu Framework step interface and its configuration options

## [Examples](https://docs.novu.co/#examples)

Control SchemaSkipDisable Output SanitizationProvider OverridesProvider Passthrough

```
await step.email('stepId', resolver, {
  controlSchema: z.object({
    subject: z.string(),
    components: z.array(z.object({
      type: z.enum(['text', 'button']),
      content: z.string(),
    })),
  }),
});
```

## [Channel Steps Interface](https://docs.novu.co/#channel-steps-interface)

All channels follow the same shared interface:

### [stepId](https://docs.novu.co/#stepid)

- **Type**: `string`
- **Required**: Yes
- **Description**: This is the unique identifier for the step in the workflow context. It is used to reference and display the step in the dashboard interface.

### [resolver](https://docs.novu.co/#resolver)

- **Type**: `Promise`
- **Required**: Yes
- **Description**: This is an async function that returns the content of the step which called `Outputs`. Each channel has its own output schema.

### [options](https://docs.novu.co/#options)

- **Type**: `StepOptions`
- **Description**: Additional step configuration.

## [Options Object](https://docs.novu.co/#options-object)

This is an optional configuration object that defines: [Controls Schema](https://docs.novu.co/framework/controls), [Provider Overrides](https://docs.novu.co/#provider-overrides), skip and other configurations.

### [skip](https://docs.novu.co/#skip)

- **Type**: `(controls: InferProperties<controlSchema>) => boolean | Promise<boolean>`
- **Description**: A function that returns a boolean value to skip the step. This is helpful when you want to use previous step results or other custom logic to skip the step from executing.

### [controlSchema](https://docs.novu.co/#controlschema)

- **Type**: `JsonSchema | ZodSchema`
- **Description**: This defined the UI Controls exposed in the dashboard for the step. They can be nested and of any JSON Schema supported structure.

### [providers](https://docs.novu.co/#providers)

- **Type**: `ProvidersOverride`
- **Description**: This object used to access and override the underlying deliver providers SDKs. This is useful when you want to customize the content of the notification with properties that are unique to the provider.

### [disableOutputSanitization](https://docs.novu.co/#disableoutputsanitization)

- **Type**: `boolean`
- **Default**: `false`
- **Description**: A flag to disable output sanitization for the step. This is useful when you want to return unescaped HTML content to the provider or the `<Inbox/>` component.

## [Providers Overrides Object](https://docs.novu.co/#providers-overrides-object)

This object used to access and override the underlying deliver providers SDKs. This is useful when you want to customize the content of the notification with properties that are unique to the provider.

An example of this is the `slack` provider, which allows you to customize the content of the notification with Slack `blocks` to create a rich notification experience.

```
type ProvidersOverride = {
  [key: ProviderEnum]: ProviderCallback;
};
 
type ProviderCallback = (
  params: ProviderOverridesParams
) => ProviderOverrideOutput | Promise<ProviderOverrideOutput>;
 
type ProviderOverridesParams = {
  controls: StepControls;
  output: StepOutput;
};
 
interface ProviderOverrideOutput {
  // A map of the properties used by the Provider.
  // These properties are strongly typed and validated
  // against the underlying provider SDK.
  [key in KnownProviderKey]: KnownProviderValue;
  // The passthrough object is used to pass through
  // the original request to the provider.
  // These properties are not validated.
  _passthrough?: {
    body: Record<string, unknown>;
    headers: Record<string, unknown>;
    query: Record<string, unknown>;
  };
}
```

The `_passthrough` object and the known provider values are deeply merged prior to sending the request to the provider, with the `_passthrough` object taking precedence.

[Workflow\\ \\ Learn about the Novu Framework workflow interface and its configuration options](https://docs.novu.co/framework/typescript/workflow) [Chat\\ \\ Learn how to use the chat step to send messages to chat platforms like Slack, Discord, and Microsoft Teams](https://docs.novu.co/framework/typescript/steps/chat)

### On this page

[Examples](https://docs.novu.co/#examples) [Channel Steps Interface](https://docs.novu.co/#channel-steps-interface) [stepId](https://docs.novu.co/#stepid) [resolver](https://docs.novu.co/#resolver) [options](https://docs.novu.co/#options) [Options Object](https://docs.novu.co/#options-object) [skip](https://docs.novu.co/#skip) [controlSchema](https://docs.novu.co/#controlschema) [providers](https://docs.novu.co/#providers) [disableOutputSanitization](https://docs.novu.co/#disableoutputsanitization) [Providers Overrides Object](https://docs.novu.co/#providers-overrides-object)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/typescript/steps/index.mdx)Open in ChatGPTOpen in Claude