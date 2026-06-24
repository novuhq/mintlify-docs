# Source: https://docs.novu.co/framework/studio

# Local Studio

Learn how to use the Local Studio companion app for Novu Framework SDK

The Local Studio is a companion app to the Novu Framework SDK. Its goal is to provide a local environment that lives near your code.

To launch the Local Studio locally you can run the following command in your terminal:

Local Studio currently works only in the **Chrome** browser

```
npx novu@latest dev
```

Learn how to use the `novu` CLI package and the available [CLI flags](https://docs.novu.co/#novu-cli-flags) to use for customization

The Dev Studio will be started by default on port 2022, and accessible via: [http://localhost:2022](http://localhost:2022)

After successfully connecting the Studio to your local [Bridge Endpoint](https://docs.novu.co/framework/endpoint), you will be able to preview in real time any workflows and content defined in your code. This is ideal for quick prototyping, debugging, styling, and adjusting your workflows before syncing them to Novu Cloud.

## [Control and Payload forms](https://docs.novu.co/#control-and-payload-forms)

You can quickly modify the Step Controls and workflow Payload to preview your workflow's different states. This is helpful to quickly debug how the email will behave in case of a missing control, or iterate more complex content structures.

## [Syncing State](https://docs.novu.co/#syncing-state)

Syncing state to your Production or Development environment in Novu, is recommended to do via your CI pipeline. However, a sync can be made using the Local Studio for quick experimentation.

Click on the Sync button at the top right corner of the navigation bar. This will open the Sync State modal.

## [Tunnel URL](https://docs.novu.co/#tunnel-url)

By default the Novu CLI will automatically create a tunnel URL connected to your local computer. This tunnel will proxy any workflow engine requests on our cloud to your local machine.

## [Connect Studio to your local server](https://docs.novu.co/#connect-studio-to-your-local-server)

By default, the Studio will connect to the Novu [Bridge Endpoint](https://docs.novu.co/framework/endpoint) running on your local machine at `http://localhost:4000/api/novu` if your server is running on a different port or the workflows are served from a different endpoint path you can use the following optional parameters to connect:

```
npx novu@latest dev --port <YOUR_SERVER_PORT> --route <YOUR_NOVU_ROUTE_PATH>
```

- **YOUR\_SERVER\_PORT** - This accepts the port number where your server is running. Defaults to 4000.
- **YOUR\_NOVU\_ROUTE\_PATH** - This is the mounted path of the framework `serve` function. Defaults to `/api/novu`.

## [Novu CLI flags](https://docs.novu.co/#novu-cli-flags)

The Novu CLI command `npx novu@latest dev` supports a number of flags:

| Flag | Long form usage example | Description | Default value |
| --- | --- | --- | --- |
| \-p | \--port `<port>` | Bridge application port | 4000 |
| \-r | \--route `<route>` | Bridge application route | /api/novu |
| \-o | \--origin `<origin>` | Bridge application origin | [http://localhost](http://localhost) |
| \-d | \--dashboard-url `<url>` | Novu Cloud dashboard URL | [https://dashboard.novu.co](https://dashboard.novu.co) |
| \-sp | \--studio-port `<port>` | Local Studio server port | 2022 |
| \-t | \--tunnel `<url>` | Self hosted tunnel url | null |
| \-H | \--headless | Run bridge in headless mode | false |

Example: If bridge application is running on port `3002` and Novu account is in `EU` region.

```
npx novu@latest dev --port 3002 --dashboard-url https://eu.dashboard.novu.co
```

## [FAQ](https://docs.novu.co/#faq)

### Running Studio without a tunnel

[AWS Lambda\\ \\ Get started with Novu Framework in an AWS Lambda function](https://docs.novu.co/framework/quickstart/lambda) [Bridge Endpoint\\ \\ Learn how to configure the Novu Bridge Endpoint, the single HTTP endpoint your application exposes to communicate with the Novu Worker Engine.](https://docs.novu.co/framework/endpoint)

### On this page

[Control and Payload forms](https://docs.novu.co/#control-and-payload-forms) [Syncing State](https://docs.novu.co/#syncing-state) [Tunnel URL](https://docs.novu.co/#tunnel-url) [Connect Studio to your local server](https://docs.novu.co/#connect-studio-to-your-local-server) [Novu CLI flags](https://docs.novu.co/#novu-cli-flags) [FAQ](https://docs.novu.co/#faq)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/studio.mdx)Open in ChatGPTOpen in Claude