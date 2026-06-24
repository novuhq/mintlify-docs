# Source: https://docs.novu.co/framework/deployment/syncing

# Syncing Changes to Cloud

Learn how to sync your local workflow changes to the Novu Cloud Dashboard across development and production environments.

Novu operates in a multi environment setup, with the currently available environments:

- **Local Studio** - Running against your local machine, this is where you can create, edit, and preview workflows.
- **Development** - Acts as a Staging environment, where your non-technical peers can view and modify controls.
- **Production** - For triggering workflows to your customers.

## [Sync changes to Novu Cloud](https://docs.novu.co/#sync-changes-to-novu-cloud)

Novu Framework operates in a GitOps model. This means that the source of truth for your workflows and configurations are located in your Git as Code.

The general workflow for pushing changes to Novu Cloud is as follows:

- Create a feature branch
- Develop workflows locally in your bridge application
- Sync changes to the Development environment to test e2e
- Merge the feature branch to your `dev` branch
 - This will trigger a CI/CD pipeline that will deploy the changes to the Development environment
- Test the changes in the Development environment
- Merge the `dev` branch to the `main` branch
 - This will trigger a CI/CD pipeline that will deploy the changes to the Production environment

## [CI/CD Integrations](https://docs.novu.co/#cicd-integrations)

Novu currently supports the following CI integrations:

- **GitHub Actions** - [Direct Integration](https://docs.novu.co/framework/deployment/actions)
- **GitLab CI** - Using our [CLI command](https://docs.novu.co/framework/deployment/cli)
- **Jenkins** - Using our [CLI command](https://docs.novu.co/framework/deployment/cli)
- **CircleCI** - Using our [CLI command](https://docs.novu.co/framework/deployment/cli)
- **Bitbucket Pipelines** - Using our [CLI command](https://docs.novu.co/framework/deployment/cli)
- **Azure DevOps** - Using our [CLI command](https://docs.novu.co/framework/deployment/cli)
- **Travis CI** - Using our [CLI command](https://docs.novu.co/framework/deployment/cli)
- **Other** - For any other CI/CD tool, you can use our [CLI command](https://docs.novu.co/framework/deployment/cli)

Direct integration with other CI/CD tools is on our roadmap. If you would like to see a specific CI/CD tool integrated, please reach out to us.

[Production Deployment Guide\\ \\ Learn how to deploy your Novu Framework application to production including networking, security, and HMAC verification setup.](https://docs.novu.co/framework/deployment/production) [CLI\\ \\ Learn how to use the Novu CLI to synchronize your workflows to Novu Cloud for production deployment.](https://docs.novu.co/framework/deployment/cli)

### On this page

[Sync changes to Novu Cloud](https://docs.novu.co/#sync-changes-to-novu-cloud) [CI/CD Integrations](https://docs.novu.co/#cicd-integrations)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/deployment/syncing.mdx)Open in ChatGPTOpen in Claude