# Source: https://docs.novu.co/guides/recipes/managing-workflows

# Managing workflows with the Novu API

Update workflow definitions in Development with the Novu API, then publish them to other environments through CI/CD.

Use the Novu API to keep workflow definitions aligned with your codebase and promote them across environments. The sections below explain the production flow first, then show how to implement each phase.

Workflows are scoped to the environment. The same `workflowId` in Development and Production refers to two separate workflow records. Update definitions in Development, then sync when you are ready to publish. For more on environments, refer to [Publishable assets](https://docs.novu.co/platform/developer/environments#publishable-assets).

## [How workflow management works in production](https://docs.novu.co/#how-workflow-management-works-in-production)

Managing workflows in production is a two-phase process. You update workflow definitions in Development from your application code, then you publish those definitions to Staging and Production through CI/CD.

In a real application you usually manage many workflows (for example, `payout-initiated`, `weekly-digest`, and `order-shipped`). The flow is the same for each one: pick a stable `workflowId` per workflow, run the update-first helper for every ID in your list, then sync each ID in CI/CD.

### [Phase 1: Update workflow definitions in Development](https://docs.novu.co/#phase-1-update-workflow-definitions-in-development)

Store workflow definitions in your repository (steps, payload schema, and channel content). For each `workflowId`, call update first, because that is the path you use on almost every run. Create only when update returns **404** (that workflow does not exist yet in Development).

### [Phase 2: Publish workflows to other environments in CI/CD](https://docs.novu.co/#phase-2-publish-workflows-to-other-environments-in-cicd)

When definitions in Development are correct, publish them with [Sync a workflow](https://docs.novu.co/api-reference/workflows/sync-a-workflow). Run sync from your CI/CD pipeline (for example, after a merge to `main`) once per `workflowId` so Staging and Production receive the same set of workflows. Use your Development secret key when calling sync. Pass the target environment identifier from the [Novu Dashboard](https://dashboard.novu.co). Each sync copies one workflow from Development into the target environment under the same `workflowId`.

### [End-to-end sequence](https://docs.novu.co/#end-to-end-sequence)

1. Update workflow definitions in Development for each `workflowId` you manage as code.
2. Publish each workflow from Development to the target environment (Staging first, then Production, if you use both).

## [Prerequisites](https://docs.novu.co/#prerequisites)

Install the SDK for your stack and set your secret key from the [Novu Dashboard](https://dashboard.novu.co):

Node.js (@novu/api)Python (novu-py)

```
npm install @novu/api zod
```

## [Update workflow definitions in Development](https://docs.novu.co/#update-workflow-definitions-in-development)

This section implements _phase 1_: updating workflow definitions in Development.

For each `workflowId`, try update first and create on **404**:

1. Update the workflow with that `workflowId` and its full definition.
2. If update returns **404**, create a new workflow with the same `workflowId`.

Keep a list of every `workflowId` you manage as code (a constant array, a registry map, or exports from workflow modules) and loop over it in your deploy script or bootstrap job.

Node.jsPython

```
import { Novu } from "@novu/api";
 
const novu = new Novu({
  secretKey: process.env.NOVU_SECRET_KEY!,
});
 
/** Every workflowId you manage as code. */
const MANAGED_WORKFLOW_IDS = [
  "payout-initiated",
  "weekly-digest",
  "order-shipped",
] as const;
 
/** Build the definition for one workflowId from your in-repo registry. */
function buildWorkflowDefinition(workflowId: string) {
  // Example: return workflowDefinitions[workflowId];
  return {
    name: "Payout Initiated",
    description: "This workflow is used to initiate a payout",
    tags: ["payout"],
    preferences: { /* ... */ },
    origin: "external" as const,
    validatePayload: false,
    payloadSchema: { /* ... */ },
    steps: [ /* ... */ ],
  };
}
 
export async function createOrUpdateWorkflowInDevelopment(workflowId: string) {
  const definition = buildWorkflowDefinition(workflowId);
 
  try {
    return await novu.workflows.update(definition, workflowId);
  } catch (error: unknown) {
    const statusCode =
      error && typeof error === "object" && "statusCode" in error
        ? (error as { statusCode: number }).statusCode
        : undefined;
 
    if (statusCode === 404) {
      return await novu.workflows.create({
        ...definition,
        workflowId,
      });
    }
 
    throw error;
  }
}
 
export async function createOrUpdateAllWorkflowsInDevelopment() {
  for (const workflowId of MANAGED_WORKFLOW_IDS) {
    await createOrUpdateWorkflowInDevelopment(workflowId);
  }
}
```

For create and update field definitions, refer to [Create a workflow](https://docs.novu.co/api-reference/workflows/create-a-workflow) and [Update a workflow](https://docs.novu.co/api-reference/workflows/update-a-workflow).

## [Publish workflows with CI/CD](https://docs.novu.co/#publish-workflows-with-cicd)

This section implements _phase 2_: publishing workflows from Development to other environments in CI/CD.

After phase 1 has run for every managed `workflowId` and Development matches your repository, call [Sync a workflow](https://docs.novu.co/api-reference/workflows/sync-a-workflow) from CI/CD once per ID. Use your Development secret key and the target environment identifier from the [Novu Dashboard](https://dashboard.novu.co). Each workflow is copied under the same `workflowId` in the target environment.

Run sync after workflow definition changes land in your repository (for example, on merge to `main`). Production and other live environments are updated by syncing from Development, not by editing workflows directly in those environments.

Store these in your CI provider as secrets: `NOVU_SECRET_KEY` (Development) and `NOVU_TARGET_ENVIRONMENT_ID` (from the Novu Dashboard).

CI/CD (GitHub Actions)Node.jsPython

This job calls [Sync a workflow](https://docs.novu.co/api-reference/workflows/sync-a-workflow) (`PUT /v2/workflows/{workflowId}/sync`) once per `workflowId` after phase 1 has updated Development.

```
name: Publish Novu workflows
 
on:
  push:
    branches:
      - main
 
jobs:
  sync-workflows:
    runs-on: ubuntu-latest
    steps:
      - name: Sync workflows to target environment
        env:
          # Development secret key — workflows are copied FROM Development
          NOVU_SECRET_KEY: ${{ secrets.NOVU_SECRET_KEY }}
          NOVU_TARGET_ENVIRONMENT_ID: ${{ secrets.NOVU_TARGET_ENVIRONMENT_ID }}
        run: |
          MANAGED_WORKFLOW_IDS=(
            payout-initiated
            weekly-digest
            order-shipped
          )
 
          for WORKFLOW_ID in "${MANAGED_WORKFLOW_IDS[@]}"; do
            echo "Syncing ${WORKFLOW_ID}..."
            curl -sf -X PUT "https://api.novu.co/v2/workflows/${WORKFLOW_ID}/sync" \
              -H "Authorization: ApiKey ${NOVU_SECRET_KEY}" \
              -H "Content-Type: application/json" \
              -d "{\"targetEnvironmentId\": \"${NOVU_TARGET_ENVIRONMENT_ID}\"}"
          done
```

For sync request details, refer to [Sync a workflow](https://docs.novu.co/api-reference/workflows/sync-a-workflow).

## [Next steps](https://docs.novu.co/#next-steps)

For individual workflow operations, refer to these guides:

[**Create a workflow**\\ \\ Create a workflow with the Novu API.](https://docs.novu.co/api-reference/workflows/create-a-workflow) [**Update a workflow**\\ \\ Update a workflow with the Novu API.](https://docs.novu.co/api-reference/workflows/update-a-workflow) [**Delete a workflow**\\ \\ Delete a workflow with the Novu API.](https://docs.novu.co/api-reference/workflows/delete-a-workflow) [**Retrieve a workflow**\\ \\ Retrieve a workflow with the Novu API.](https://docs.novu.co/api-reference/workflows/retrieve-a-workflow) [**Sync a workflow**\\ \\ Sync a workflow with the Novu API.](https://docs.novu.co/api-reference/workflows/sync-a-workflow)

[Segment\\ \\ Learn how to set up Segment as a data source for Novu using Destination Functions. Send user events from Segment to trigger notifications in Novu.](https://docs.novu.co/guides/webhooks/segment) [Using Translations\\ \\ Learn how to use translations with @novu/framework based workflows](https://docs.novu.co/guides/framework/using-translations)

### On this page

[How workflow management works in production](https://docs.novu.co/#how-workflow-management-works-in-production) [Phase 1: Update workflow definitions in Development](https://docs.novu.co/#phase-1-update-workflow-definitions-in-development) [Phase 2: Publish workflows to other environments in CI/CD](https://docs.novu.co/#phase-2-publish-workflows-to-other-environments-in-cicd) [End-to-end sequence](https://docs.novu.co/#end-to-end-sequence) [Prerequisites](https://docs.novu.co/#prerequisites) [Update workflow definitions in Development](https://docs.novu.co/#update-workflow-definitions-in-development) [Publish workflows with CI/CD](https://docs.novu.co/#publish-workflows-with-cicd) [Next steps](https://docs.novu.co/#next-steps)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/guides/recipes/managing-workflows.mdx)Open in ChatGPTOpen in Claude