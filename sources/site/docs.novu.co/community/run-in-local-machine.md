# Source: https://docs.novu.co/community/run-in-local-machine

# Run Novu in local machine

Prerequisites and steps to run Novu in local machine. Learn how to set up Novu on your local environment for testing and development.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/novuhq/novu)

## [Requirements](https://docs.novu.co/#requirements)

- Node.js version v20.8.1
- MongoDB
- Redis
- **(Optional)** pnpm - Needed if you want to install new packages
- **(Optional)** localstack (required only in S3 related modules)

We recommend having at least 8GB of RAM to run Novu on a local machine as Novu has multiple services running together with external services like redis, mongodb etc.

## [Setup the project](https://docs.novu.co/#setup-the-project)

After installing the required services on your machine, you can clone and set up your forked version of the project:

1. Clone the repository

Novu OrgForked Repo

```
git clone https://github.com/novuhq/novu.git
```

2. Install all dependencies

```
cd novu && npm run setup:project
```

3. Run the project

```
npm run start
```

The `npm run start` will start the Jarvis CLI tool which allows you to run the whole project with ease. If you only want to run parts of the platform, you can use the following run commands from the root project:

- **start
 
 **\- Synonym to `npm run start`
- **start
 
 **\- Only starts the dashboard management platform
- **start
 
 **\- Only starts the WebSocket service for notification center updates
- **start
 
 **\- Starts the widget wrapper project that hosts the notification center inside an iframe
- **start
 
 **\- Runs the API in watch mode
- **start
 
 **\- Runs the worker application in watch mode
- **start
 
 **\- Runs the Data Access Layer package in watch mode
- **start
 
 **\- Starts the watch mode for the shared client and API library
- **start
 
 **\- Runs and builds the React package for the Novu notification center

## [Set up your environment variables](https://docs.novu.co/#set-up-your-environment-variables)

If you have used Jarvis CLI tool from the previous step you don't need to setup the env variables as Jarvis will do that on the first run if setup wasn't done before.

The command `npm run setup:project` creates default environment variables that are required to run Novu in a development environment. However, if you want to test certain parts of Novu or run it in production mode, you need to change some of them. These are all the available environment variables:

### API Backend

### Worker

### Web Client

### Web Socket

## [Running tests](https://docs.novu.co/#running-tests)

After making changes, you can run the tests for the respective package using the appropriate CLI commands:

## [API](https://docs.novu.co/#api)

To run the API tests, run the following command:

```
npm run start:worker:test
npm run start:e2e:api
```

The tests create a new instance of Novu and a test db and run the tests against it. The test db is removed after all tests have finished running.

## [Dashboard](https://docs.novu.co/#dashboard)

To run the front end tests for the dashboard project using cypress you need to install localstack. The cypress tests perform E2E tests. To be able to perform E2E tests, you need to run the API service in the appropriate test environment.

Run the services in test env with the following commands:

```
npm run start:dashboard
npm run start:api:test
npm run start:worker:test
npm run start:ws:test
```

Run the cypress test suite with the following command:

```
cd apps/dashboard && npm run cypress:run
```

To open the cypress management window to debug tests, run the following commands:

```
cd apps/dashboard && npm run cypress:open
```

## [Different ports used by the services](https://docs.novu.co/#different-ports-used-by-the-services)

- **3000** - API
- **3002** - WebSocket Service
- **3003** - Webhook Service
- **3004** - Worker Service
- **4200** - Dashboard Management UI
- **4701** - Iframe embed for notification center
- **4500** - Widget Service

## [Testing providers](https://docs.novu.co/#testing-providers)

To run tests against the providers' folder, you can use the `npm run test:providers` command.

## [Local environment setup script (beta)](https://docs.novu.co/#local-environment-setup-script-beta)

As an option in our script runner `Jarvis` we have made available an option to run [this script](https://github.com/novuhq/novu/blob/2f2abdcaaad8a7735e0a2d488607c3276c8975fd/scripts/dev-environment-setup.sh) that will automatically try to install all the dependencies needed to be able to run Novu locally, as the previous step of installing the project dependencies through `pnpm install`. When executing it inside `Jarvis`, you will need to have previously installed by yourself `git` and `node`, as we mentioned earlier on this page.

The script can be run on its own without any previous dependency installed, as it is prepared to execute the following tasks:

- Check the running OS in the local machine (currently only MacOSx and [GNU Linux](https://en.wikipedia.org/wiki/GNU/Linux_naming_controversy)supported)
- Install of OS dependencies (currently only MacOSx supported) -- MacOSx: It will execute the following tasks --- Will try to install or update [XCode](https://developer.apple.com/xcode/) (skippable step; though XCode installs `[git](https://git-scm.com/)` that is a required dependency for later) --- Will install [Rosetta](https://support.apple.com/en-gb/HT211861) for Apple CPUs --- Will set up some opinionated OS settings
- Will check if `[git](https://git-scm.com/)` is installed and if not will abort the operation
- Will make [ZSH](https://en.wikipedia.org/wiki/Z_shell) the default shell to be able to execute the next task
- Will (opinionatedly) install [Oh My Zsh!](https://ohmyz.sh/) (skippable task)
- Will (opinionatedly) install the [Homebrew](https://brew.sh/) package manager and will set up your local environment to execute it besides adding some casks
- Will (opinionatedly) install [NVM](https://github.com/nvm-sh/nvm) as a Node.js version manager
- Will install the required [Node.js](https://nodejs.org/en/) version to be able to [run Novu](https://github.com/novuhq/novu/blob/2f2abdcaaad8a7735e0a2d488607c3276c8975fd/package.json#L180)
- Will install [PNPM](https://pnpm.io/) as a package manager, required dependency for some of the tasks inside Novu's scripts
- Will install [Docker](https://www.docker.com/) as containerized application development tool
- Will install required databases [MongoDB](https://www.mongodb.com/) (Community version) and [Redis](https://redis.io/) through Homebrew
- Will install the [AWS CLI](https://aws.amazon.com/cli/) tool (not required to run Novu; it is a core maintainer used tool)
- Will create a local development domain `local.novu.co` in your local machine
- Will clone the Novu repository in your local machine (skippable step) to a selected folder `$HOME/Dev`

This script has only been thoroughly tested in MacOSx. Little testing has been run in GNU Linux.

This script is not bullet-proof and some of the tasks have intertwined dependencies with each other. We have tried to make it as idempotent as possible but some loose knots will probably show because of conflicts between versions of the different dependencies. Please report to us any problem found and we will try to fix or assist though we do not have the resources to make it idempotent in every potential system and potential combinations

[Self-Hosted and Novu Cloud\\ \\ Understand the difference between Self-Hosted and Novu Cloud](https://docs.novu.co/community/self-hosted-and-novu-cloud) [Add a New Provider\\ \\ Steps to add a new provider to Novu](https://docs.novu.co/community/add-a-new-provider)

### On this page

[Requirements](https://docs.novu.co/#requirements) [Setup the project](https://docs.novu.co/#setup-the-project) [Set up your environment variables](https://docs.novu.co/#set-up-your-environment-variables) [Running tests](https://docs.novu.co/#running-tests) [API](https://docs.novu.co/#api) [Dashboard](https://docs.novu.co/#dashboard) [Different ports used by the services](https://docs.novu.co/#different-ports-used-by-the-services) [Testing providers](https://docs.novu.co/#testing-providers) [Local environment setup script (beta)](https://docs.novu.co/#local-environment-setup-script-beta)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/community/run-in-local-machine.mdx)Open in ChatGPTOpen in Claude