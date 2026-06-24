# Source: https://docs.novu.co/platform/developer/environments

# Environments

Understanding and managing environments in Novu

Novu uses environments to separate your workflows and its data. This lets you safely test changes, like a new workflow, in one environment before moving it to a live production environment.

## [Types of environments](https://docs.novu.co/#types-of-environments)

When you create a Novu account, you are provided with a development and production environment by default. On certain plans, you can also create custom environments to match your team’s workflow.

- **Development environment**: Use the development environment to build and test new workflows, layouts, translations, and experiment with different configurations before publishing to other environments.
- **Production environment**: The production environment is used to send notifications to your subscribers. To ensure stability and prevent unintended changes, this environment is view-only for workflows, layouts, and translations. Changes are not made here directly, they are made from other environment and then published to this production environment.
- **Custom environment**: Custom environments are only available on [Team and Enterprise plans](https://novu.co/pricing). You can use them to reflect your release process, for example, staging or QA.

## [Create a custom environment](https://docs.novu.co/#create-a-custom-environment)

To create a custom environment:

1. Log in to the Novu dashboard.
2. Go to the [Environments page](https://dashboard.novu.co/environments) in the Novu dashboard.
3. Click **Create environment**. A menu appears.
4. Enter your preferred environment name in the **Name** field.
5. Assign unique colors to easily distinguish between environments. ![Publish changes](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcreate-environment.8297cd42.png&w=3840&q=75)
6. Click **Create environment**. The new environment is created and is available in the environments list.

## [What's unique to each environment?](https://docs.novu.co/#whats-unique-to-each-environment)

Each environment in Novu has it's own isolated resources, while the development environment has assets that can be published to other environments.

Each environment maintains some isolated set of resources, while you can share or promote other assets through publishing.

### [Environment-specific resources](https://docs.novu.co/#environment-specific-resources)

These resources are completely separate and unique to each environment. Data in one environment has no connection to data in another. They are:

- Activity feed
- API keys (application identifier and secret key)
- Integrations (Provider credentials)
- Subscribers
- Topics
- Webhooks

### [Publishable assets](https://docs.novu.co/#publishable-assets)

These assets are managed centrally in the development environment and then published to other environments.

- Layouts
- Translations
- Workflows

### [Environment credentials](https://docs.novu.co/#environment-credentials)

Each environment has two unique identifiers:

- **Application Identifier**
 
 - Public ID for client-side apps
 - Used with [<Inbox />](https://docs.novu.co/platform/inbox)
 - Different for each environment
 - Safe to expose in frontend code
- **API Secret Key**
 
 - Used for backend API authentication
 - Keep this secure and never expose publicly
 - Different for each environment

Configure these credentials in your application based on the active environment, similar to how you manage other service credentials.

## [Publish changes to other environments](https://docs.novu.co/#publish-changes-to-other-environments)

Novu provides a publish mechanism that allows you to promote changes from your development environment to production or other custom environments. This process ensures that all changes are deliberate, reviewed, and deployed in a controlled manner.

The publishing process bundles all modifications made to workflows, layouts, and translations since the last publish event.

You can promote changes to other environments by following these steps:

1. Ensure you are in the **Development** environment. All changes must originate from here.
2. Click **Publish changes**. A list of available environments appears. ![Publish changes](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpublish-changes.fff17cc3.png&w=3840&q=75)
3. Select the environment that you want to publish to. ![Publish changes](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flist-of-environment.74f51cf2.png&w=3840&q=75)
4. Select the checkboxes next to the workflows that you want to publish. A menu appears, showing all the available workflows. ![Publish changes](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpublish-changes-modal.fe51dbc9.png&w=3840&q=75)
5. Click the publish button to publish the selected workflows to the selected environment.

[API keys\\ \\ Manage authentication credentials and connection endpoints for your Novu integration.](https://docs.novu.co/platform/developer/api-keys) [Environment Variables\\ \\ Create reusable, environment-scoped variables in the dashboard and reference them in workflows.](https://docs.novu.co/platform/developer/environment-variables)

### On this page

[Types of environments](https://docs.novu.co/#types-of-environments) [Create a custom environment](https://docs.novu.co/#create-a-custom-environment) [What's unique to each environment?](https://docs.novu.co/#whats-unique-to-each-environment) [Environment-specific resources](https://docs.novu.co/#environment-specific-resources) [Publishable assets](https://docs.novu.co/#publishable-assets) [Environment credentials](https://docs.novu.co/#environment-credentials) [Publish changes to other environments](https://docs.novu.co/#publish-changes-to-other-environments)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/developer/environments.mdx)Open in ChatGPTOpen in Claude