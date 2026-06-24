# Source: https://docs.novu.co/platform/workflow/monitor-and-debug-workflow

# Monitor and Debug Workflows

Learn how to monitor workflow executions and debug issues from the Novu Activity Feed.

The Novu Activity Feed tracks the full execution lifecycle after a workflow is triggered. It provides real-time visibility into how workflows run, helping you understand what happened and why.

From the Activity Feed, you can inspect each workflow run and API request to see how each subscriber notification was processed.

![Workflow runs list](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fworkflow-runs-list.6d174504.png&w=3840&q=75)

Each environment has its own Activity Feed, ensuring execution data is isolated and easy to reason about.

## [Inspect workflow runs](https://docs.novu.co/#inspect-workflow-runs)

The Workflow Runs tab shows the details of every workflow triggered to each subscriber. Each run represents a single execution instance and reflects how the workflow behaved for that subscriber.

You can filter workflow runs using parameters such as time period, workflow identifier, and channel. Selecting a workflow run opens the run details view, which gives you access to execution outcomes of each step in the workflow and investigate delivery issues.

![workflow run](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fworkflow-run.9cf45782.png&w=3840&q=75)

The workflow run details include:

| Field | Description |
| --- | --- |
| **Workflow identifier** | The unique identifier of the workflow that was executed. |
| **Transaction ID** | A unique ID associated with the trigger event. Use this to correlate workflow runs with trigger requests and logs. |
| **Topic key** | The topic key used to trigger the workflow, if the workflow was triggered to a topic. |
| **Subscriber ID** | The identifier of the subscriber for whom this workflow run was executed. |
| **Triggered at** | The timestamp indicating when the workflow execution started. |
| **Status** | The current state of the workflow run. Possible statuses include Completed, Pending, and Failed. |
| **Severity** | The severity level associated with the workflow execution, if defined. |
| **Critical** | Indicates whether the workflow was marked as critical. |
| **Context data** | Context values passed when triggering the workflow. |
| **Trigger payload** | The payload data sent with the trigger event and used to personalize notification content. |

Each workflow run also includes execution details that show how Novu processed each step for a single subscriber. The timeline is ordered chronologically and reflects the internal state transitions of each step as the workflow runs.

Execution details are step-specific and vary depending on:

- The type of step
- Whether the step succeeded, was skipped, or failed
- Provider behavior and delivery outcomes

## [Inspect trigger requests](https://docs.novu.co/#inspect-trigger-requests)

The Requests tab in the Activity Feed shows detailed information about every request made to the Event API. Selecting a request opens a detailed view of how Novu processed it, the API response, and execution traces.

![Request tab](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frequest-tab.dce44669.png&w=3840&q=75)

You can filter requests using parameters such as time period, transaction ID, statuses or API endpoint. When you open a request, Novu displays details about the API call:

| Field | Description |
| --- | --- |
| **Endpoint** | The API endpoint that received the request, for example, `POST /v1/events/trigger` and a unique identifier for the API request. |
| **Received at** | Timestamp indicating when Novu received the request. |
| **Transaction ID** | The transaction associated with the trigger. Use this to correlate the request with workflow runs. |
| **Source** | Indicates where the request originated, either the **Dashboard** or the **API**. |
| **Request body** | The payload sent in the API call, including the workflow identifier, subscriber or topic targeting, and any additional data. |
| **Response body** | Novu’s response to the request, confirming whether it was acknowledged and processed successfully. |

Each request also includes API trace events that show how Novu handled the trigger internally.

Common trace entries include:

- Workflow execution started
- Request subscriber processing completed

[Trigger Workflow\\ \\ Learn how workflows are triggered in Novu using the Event API, including triggering workflows for individual subscribers, attaching context data, and broadcasting notifications to topics.](https://docs.novu.co/platform/workflow/trigger-workflow) [Translations\\ \\ Learn how to translate your workflow step content into multiple languages](https://docs.novu.co/platform/workflow/advanced-features/translations)

### On this page

[Inspect workflow runs](https://docs.novu.co/#inspect-workflow-runs) [Inspect trigger requests](https://docs.novu.co/#inspect-trigger-requests)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/workflow/monitor-and-debug-workflow.mdx)Open in ChatGPTOpen in Claude