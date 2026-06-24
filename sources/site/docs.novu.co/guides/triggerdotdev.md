# Source: https://docs.novu.co/guides/triggerdotdev

# Novu and Trigger.dev integration guide

Integrate Novu with Trigger.dev to send notifications from background jobs. Covers setup, subscribers, and practical examples.

This guide walks you through integrating [Novu](https://novu.co/), the open-source notification infrastructure, with [Trigger.dev](https://trigger.dev/), a powerful open-source background jobs framework for TypeScript.

By combining Novu's robust notification workflows with Trigger.Dev's event-driven background job system allows you to send notifications across multiple channels (in-app, email, SMS, push, etc.) in response to events or background tasks — all within a seamless developer experience.

Whether you're processing payments, handling user onboarding, or running scheduled tasks, Trigger.dev lets you define workflows with fine-grained control and real-time observability. Novu plugs into those workflows to manage notification content and delivery, ensuring your service / product-to-user communication has a standard.

## [What You'll Learn](https://docs.novu.co/#what-youll-learn)

In this guide, you'll learn how to:

- Set up both Novu and Trigger.dev in your project
- Create and update subscribers via Novu's API
- Trigger Novu notification workflows from a Trigger.dev job
- Pass dynamic payload data to power your notification templates

If you haven't used or are unfamiliar with Trigger.dev, we recommend following [the quickstart guide in their docs](https://trigger.dev/docs/quick-start). This guide assumes you are familiar with the fundamentals.

## [Getting Started](https://docs.novu.co/#getting-started)

Install Novu's SDK in your project:

```
npm i @novu/api
```

Import Novu's SDK and provide the credentials to initialize the Novu instance:

```
import { Novu } from "@novu/api";
 
const novu = new Novu({ 
  secretKey: 'ApiKey ' + process.env['NOVU_SECRET_KEY']
});
```

For the sake of this guide, we will create a new dedicated task for 2 common Novu actions:

- Trigger Notification Workflow
- Add New Subscriber

## [Triggering Notifications](https://docs.novu.co/#triggering-notifications)

### [Core Requirements](https://docs.novu.co/#core-requirements)

When calling Novu's `trigger` method, you must provide the following information:

**Workflow ID**

`workflowId` **(string):** This identifies the specific notification workflow you want to execute.

**Note:** Ensure this workflow ID corresponds to an existing, active workflow in your Novu dashboard.

**Recipient Information**

`to` **(object):** This object specifies the recipient of the notification. At a minimum, it requires:

- `subscriberId` **(string):** A unique identifier for the notification recipient within your system (e.g., a user ID).

**Note:** If a subscriber with this `subscriberId` doesn't already exist in Novu, Novu will automatically create one when the workflow is triggered. You can also pass other identifiers like `email`, `phone`, etc., within the `to` object, depending on your workflow steps.

### [Basic Trigger Example](https://docs.novu.co/#basic-trigger-example)

Here's a simple Trigger.dev task that triggers a Novu workflow when the task runs.

```
import { task, retry } from "@trigger.dev/sdk/v3";
import { Novu } from "@novu/api";
 
// Initialize the Novu client with your API key
// It's recommended to store your secret key securely, e.g., in environment variables.
const novu = new Novu({ 
  secretKey: 'ApiKey ' + process.env['NOVU_SECRET_KEY']
}); // Add '!' if you're sure it's defined, or handle potential undefined case
 
export const notifyUserTask = task({
  id: "notify-user-task",
  run: async (
    payload: { // Payload received by the Trigger.dev task
      userId: string;
      email: string;
    },
    { ctx } // Access context if needed, e.g., for logging
  ) => {
    const { userId, email } = payload;
 
    console.log(`Attempting to trigger Novu workflow for subscriber: ${userId}`);
 
    // Use retry logic for resilience against transient network issues or brief API unavailability
    await retry.onThrow(
      async () => {
        try {
          const triggerResult = await novu.trigger({
            // 1. Specify the workflow to trigger
            workflowId: "your-workflow-id", // Replace with your actual workflow ID
 
            // 2. Specify the recipient
            to: {
              subscriberId: userId,
              email: email, // Include other identifiers if needed by your workflow
            },
 
            // 3. Payload (optional) - see next section
            payload: {}, // Empty payload for this basic example
          });
 
          console.log("Novu workflow triggered successfully:", triggerResult.data);
          return triggerResult.data; // Return data if needed elsewhere
 
        } catch (error: unknown) {
          // Log the specific error for better debugging
          const errorMessage = error instanceof Error ? error.message : 'Unknown error triggering Novu';
          console.error("Failed to trigger Novu workflow:", errorMessage, error);
          // Throw a new error to ensure retry logic catches it
          throw new Error(`Novu trigger failed: ${errorMessage}`);
        }
      },
      {
        maxAttempts: 3, // Configure retry attempts
        factor: 2,      // Configure backoff strategy
        minTimeoutInMs: 1000, // Wait at least 1 second before first retry
        // Add more retry options as needed
      }
    );
  },
});
```

## [Working with Dynamic Content](https://docs.novu.co/#working-with-dynamic-content)

### [Using Payloads](https://docs.novu.co/#using-payloads)

Often, you'll want your notifications to include dynamic data related to the event that triggered them. This is done using the `payload` property in the `novu.trigger` call.

### Understanding Payloads

### [Example Use Case](https://docs.novu.co/#example-use-case)

Imagine you want to send an email confirming a background job's completion:

### Email Template Variables

- **Subject:** `Job {{ jobName }} Completed Successfully!`
- **Body:** `Hi {{ userName }}, your job '{{ jobName }}' finished processing.`

To achieve this, you would pass the `userName` and `jobName` in the `payload` object when triggering the workflow.

### [Advanced Trigger Example](https://docs.novu.co/#advanced-trigger-example)

```
import { task, retry } from "@trigger.dev/sdk/v3";
import { Novu } from "@novu/api";
 
const novu = new Novu({ 
  secretKey: 'ApiKey ' + process.env['NOVU_SECRET_KEY']
});
 
export const notifyOnJobCompletion = task({
  id: "notify-on-job-completion",
  run: async (
    payload: {
      userId: string;
      email: string;
      name: string;
      jobId: string;
    }
  ) => {
    const { userId, email, name, jobId } = payload;
 
    await retry.onThrow(
      async () => {
        try {
          // Construct the payload specifically for Novu
          // This often uses data from the task's payload, but can include other computed values
          const novuPayload = {
            userName: name,   // Map 'name' from task payload to 'userName' for the template
            jobName: `Data Processing Job #${jobId}`, // Can include static text or transform data
          };
 
          await novu.trigger({
            workflowId: "inbox-test", // Use the appropriate workflow ID
            to: {
              subscriberId: userId,
              email: email,
            },
            payload: { // Pass the constructed payload to Novu
              ...novuPayload,
            },
          });
          
          console.log("Novu workflow triggered successfully with payload:", novuPayload);
          return novuPayload;
 
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error triggering Novu';
          console.error("Failed to trigger Novu workflow with payload:", errorMessage, error);
          throw new Error(`Novu trigger failed: ${errorMessage}`);
        }
      },
      { maxAttempts: 2 } // Retry the task up to 2 times
    );
  },
});
```

### [Key Points about Payloads](https://docs.novu.co/#key-points-about-payloads)

### Trigger.dev Task Payload

This is the data your Trigger.dev task receives when it's invoked. It contains the context needed for the task to run.

### Novu Trigger Payload

This is the data you _specifically send to Novu_ via the `payload` property in the `novu.trigger()` call. It's used for populating variables in your notification templates.

## [Implementation Examples](https://docs.novu.co/#implementation-examples)

### [AI Tasks](https://docs.novu.co/#ai-tasks)

This example demonstrates how to build a reliable AI content generation system that keeps users informed throughout the process using Novu notifications.

```
 
import { task, event, eventTrigger, retry } from "@trigger.dev/sdk/v3";
import { Novu } from "@novu/api";
import OpenAI from "openai";
 
// Initialize clients
const novu = new Novu({ 
  secretKey: 'ApiKey ' + process.env['NOVU_SECRET_KEY']
});
 
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});
 
// Helper functions for prompt generation
function generateTextPrompt(theme: string, description: string) {
  return [
    { role: "system", content: "You are a creative writer crafting marketing content." },
    { role: "user", content: `Write a short, engaging paragraph about ${theme}. Key points: ${description}` }
  ];
}
 
function generateImagePrompt(theme: string, description: string) {
  return `Create a professional marketing image that represents ${theme}. Style: modern, clean. Details: ${description}`;
}
 
// Event trigger for content generation
export const contentGenerationRequested = event({
  id: "content-generation-requested",
  trigger: eventTrigger({
    name: "content.generation.requested",
  }),
});
 
// Notification task for successful completion
export const notifyContentReady = task({
  id: "notify-content-ready",
  run: async ({ 
    userId, 
    email, 
    theme, 
    contentId,
    contentPreview,
    imageUrl
  }: { 
    userId: string;
    email: string;
    theme: string;
    contentId: string;
    contentPreview: string;
    imageUrl: string;
  }) => {
    await retry.onThrow(
      async () => {
        try {
          await novu.trigger({
            workflowId: "ai-generation-completed",
            to: {
              subscriberId: userId,
              email: email,
            },
            payload: {
              userName: email.split('@')[0],
              theme: theme,
              contentId: contentId,
              contentPreview: contentPreview,
              imageUrl: imageUrl,
              viewUrl: `https://yourapp.com/content/${contentId}`
            },
          });
          
          console.log("Content ready notification sent successfully");
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error("Failed to send content ready notification:", errorMessage);
          throw new Error(`Final notification failed: ${errorMessage}`);
        }
      },
      { maxAttempts: 3, factor: 2, minTimeoutInMs: 1000 }
    );
  },
});
 
// Error notification task
export const notifyError = task({
  id: "notify-error",
  run: async ({ 
    userId, 
    email, 
    theme, 
    errorMessage 
  }: { 
    userId: string;
    email: string;
    theme: string;
    errorMessage: string;
  }) => {
    await retry.onThrow(
      async () => {
        try {
          await novu.trigger({
            workflowId: "ai-generation-error",
            to: {
              subscriberId: userId,
              email: email,
            },
            payload: {
              userName: email.split('@')[0],
              theme: theme,
              errorMessage: errorMessage,
              supportEmail: "support@yourapp.com"
            },
          });
          
          console.log("Error notification sent successfully");
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error("Failed to send error notification:", errorMessage);
          // Not rethrowing here to prevent infinite loops when error notifications fail
        }
      },
      { maxAttempts: 2 }
    );
  },
});
 
// Main AI content generation task
export const generateContent = task({
  id: "generate-content",
  retry: {
    maxAttempts: 3,
  },
  run: async ({ userId, email, theme, description }: { 
    userId: string;
    email: string;
    theme: string;
    description: string; 
  }) => {
    console.log(`Starting AI content generation for theme: ${theme}`);
    
    // Generate text content
    const textResult = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: description }]
    });
 
    if (!textResult.choices[0]?.message?.content) {
      throw new Error("No text content generated, retrying...");
    }
    
    // Generate image content
    const imageResult = await openai.images.generate({
      model: "dall-e-3",
      prompt: description,
      size: "1024x1024"
    });
 
    if (!imageResult.data[0]?.url) {
      throw new Error("No image generated, retrying...");
    }
 
    return {
      text: textResult.choices[0].message.content,
      imageUrl: imageResult.data[0].url,
    };
  },
});
 
// Main job that orchestrates the entire workflow
export const processContentRequest = task({
  id: "process-content-request",
  events: [contentGenerationRequested],
  run: async (payload: { 
    userId: string;
    email: string;
    theme: string;
    description: string;
  }) => {
    try {
      // Validate input
      if (!payload.theme || !payload.description) {
        throw new Error("Missing required parameters");
      }
 
      // Generate content
      const result = await generateContent.run(payload);
      
      const contentId = payload.userId + '-' + Date.now();
      
      // Send completion notification
      await notifyContentReady.run({ 
        userId,
        email,
        theme,
        contentId,
        contentPreview: result.text.substring(0, 100) + "...",
        imageUrl: result.imageUrl
      });
      
      return {
        success: true,
        contentId: contentId,
        ...result
      };
    } catch (error) {
      // If anything fails, ensure user gets notified
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Content generation failed:", errorMessage);
      
      await notifyError.run({
        userId,
        email,
        theme,
        errorMessage: errorMessage
      });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  },
});
```

### Breakdown

### [Video processing](https://docs.novu.co/#video-processing)

This example shows how to build a video transcription service that notifies users when their video has been transcribed or if an error occurs during processing.

```
 
import { task, event, eventTrigger, retry } from "@trigger.dev/sdk/v3";
import { Novu } from "@novu/api";
import fs from "fs";
import { Deepgram } from "@deepgram/sdk";
 
// Initialize clients
const novu = new Novu({ 
  secretKey: 'ApiKey ' + process.env['NOVU_SECRET_KEY']
});
 
const deepgram = new Deepgram(process.env['DEEPGRAM_API_KEY']);
 
// Utility functions for video processing
async function downloadFile(url: string): Promise<string> {
  // Implementation of file download logic
  console.log(`Downloading file from ${url}`);
  // This would be the actual implementation to download a file
  return "/tmp/downloaded-video.mp4";
}
 
async function convertToWav(filePath: string): Promise<string> {
  // Implementation of conversion logic
  console.log(`Converting ${filePath} to WAV format`);
  // This would be the actual implementation to convert video to WAV
  return "/tmp/audio-extract.wav";
}
 
// Event trigger for transcription request
export const transcriptionRequested = event({
  id: "transcription-requested",
  trigger: eventTrigger({
    name: "video.transcription.requested",
  }),
});
 
// Notification task for successful transcription
export const notifyTranscriptionComplete = task({
  id: "notify-transcription-complete",
  run: async ({ 
    userId, 
    email, 
    videoName,
    transcriptionId,
    wordCount,
    duration
  }: { 
    userId: string;
    email: string;
    videoName: string;
    transcriptionId: string;
    wordCount: number;
    duration: string;
  }) => {
    await retry.onThrow(
      async () => {
        try {
          await novu.trigger({
            workflowId: "transcription-completed",
            to: {
              subscriberId: userId,
              email: email,
            },
            payload: {
              userName: email.split('@')[0],
              videoName: videoName,
              transcriptionId: transcriptionId,
              wordCount: wordCount,
              duration: duration,
              viewUrl: `https://yourapp.com/transcriptions/${transcriptionId}`
            },
          });
          
          console.log("Transcription complete notification sent successfully");
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error("Failed to send transcription complete notification:", errorMessage);
          throw new Error(`Notification failed: ${errorMessage}`);
        }
      },
      { maxAttempts: 3, factor: 2, minTimeoutInMs: 1000 }
    );
  },
});
 
// Error notification task
export const notifyTranscriptionError = task({
  id: "notify-transcription-error",
  run: async ({ 
    userId, 
    email, 
    videoName, 
    errorMessage 
  }: { 
    userId: string;
    email: string;
    videoName: string;
    errorMessage: string;
  }) => {
    await retry.onThrow(
      async () => {
        try {
          await novu.trigger({
            workflowId: "transcription-error",
            to: {
              subscriberId: userId,
              email: email,
            },
            payload: {
              userName: email.split('@')[0],
              videoName: videoName,
              errorMessage: errorMessage,
              supportEmail: "support@yourapp.com"
            },
          });
          
          console.log("Transcription error notification sent successfully");
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          console.error("Failed to send error notification:", errorMessage);
          // Not rethrowing here to prevent infinite loops when error notifications fail
        }
      },
      { maxAttempts: 2 }
    );
  },
});
 
// Main transcription task
export const transcribeVideo = task({
  id: "transcribe",
  retry: {
    maxAttempts: 3,
  },
  machine: { preset: "large-2x" }, // Use larger machine for faster processing
  run: async (payload: { 
    id: string; 
    url: string;
    userId?: string;
    email?: string;
    videoName?: string;
  }) => {
    try {
      console.log(`Starting transcription for video: ${payload.videoName || payload.id}`);
      
      // Download and process the video
      const downloadedFile = await downloadFile(payload.url);
      const extractedAudio = await convertToWav(downloadedFile);
 
      // Transcribe using Deepgram
      const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
        fs.createReadStream(extractedAudio),
        {
          model: "nova",
          language: "en-US",
          smart_format: true,
          diarize: true
        }
      );
 
      if (error || !result) {
        throw new Error(error || "Failed to transcribe video");
      }
 
      // Calculate some metadata from the result
      const wordCount = result.results?.utterances?.reduce((count, utterance) => count + utterance.words.length, 0) || 0;
      const duration = result.metadata?.duration 
        ? `${Math.floor(result.metadata.duration / 60)}:${Math.floor(result.metadata.duration % 60).toString().padStart(2, '0')}`
        : "Unknown";
 
      // Store in database
      const dbResult = await db.transcriptions.create(payload.id, result.results);
      
      return {
        transcriptionId: dbResult.id,
        wordCount,
        duration,
        transcript: result.results
      };
    } catch (error) {
      console.error("Error in transcription process:", error);
      throw error; // Rethrow to trigger retry
    }
  },
});
 
// Main job that orchestrates the entire workflow
export const processTranscriptionRequest = task({
  id: "process-transcription-request",
  events: [transcriptionRequested],
  run: async (payload: { 
    id: string;
    url: string;
    userId: string;
    email: string;
    videoName: string;
  }) => {
    try {
      // Validate input
      if (!payload.url) {
        throw new Error("Missing video URL");
      }
 
      // Transcribe video
      const result = await transcribeVideo.run(payload);
      
      // Send completion notification
      await notifyTranscriptionComplete.run({
        userId: payload.userId,
        email: payload.email,
        videoName: payload.videoName || "Your video",
        transcriptionId: result.transcriptionId,
        wordCount: result.wordCount,
        duration: result.duration
      });
      
      return {
        success: true,
        transcriptionId: result.transcriptionId,
        transcript: result.transcript
      };
    } catch (error) {
      // If anything fails, ensure user gets notified
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Transcription failed:", errorMessage);
      
      await notifyTranscriptionError.run({
        userId: payload.userId,
        email: payload.email,
        videoName: payload.videoName || "Your video",
        errorMessage: errorMessage
      });
      
      return {
        success: false,
        error: errorMessage
      };
    }
  },
});
 
// Type declaration for database operations (mock)
const db = {
  transcriptions: {
    create: async (id: string, results: unknown) => {
      console.log(`Storing transcription results for ${id} in database`);
      return { id, created: new Date() };
    }
  }
};
```

### Breakdown

## [Managing Subscribers](https://docs.novu.co/#managing-subscribers)

Before triggering notifications, Novu needs to know _who_ to notify. That's where subscribers come in. A **subscriber** in Novu represents a user (or entity) that can receive notifications through one or more channels (in-app, email, SMS, etc.).

### [When to Create Subscribers](https://docs.novu.co/#when-to-create-subscribers)

Create or update a subscriber in Novu when:

**New User Registration**

When a new user signs up or is added to your system

**Notification Eligibility**

When a user becomes eligible to receive notifications

**Data Updates**

When you want to ensure subscriber metadata (name, phone, etc.) is up-to-date

If you trigger a workflow with a `subscriberId` that doesn't exist, Novu will auto-create the subscriber. However, doing it explicitly ensures full control over subscriber data.

### [Subscriber Creation Example](https://docs.novu.co/#subscriber-creation-example)

```
import { task, retry } from "@trigger.dev/sdk/v3";
import { Novu } from "@novu/api";
 
const novu = new Novu({
  secretKey: 'ApiKey ' + process.env["NOVU_SECRET_KEY"]
});
 
export const createSubscriberTask = task({
  id: "create-subscriber-task",
  run: async (payload: {
    userId: string;
    email?: string;
    firtName?: string;
    lastName?: string;
    phone?: string;
    locale?: string;
    avatar?: string;
    data?: object;
  }) => {
    const { userId, email, name, phone, avatar } = payload;
 
    // Split full name into first and last (fallback to empty string)
    const [firstName, lastName = ""] = name.split(" ");
 
    // Create subscriber object for Novu
    const subscriber = {
      subscriberId: userId,
      email,
      firstName,
      lastName,
      phone,
      locale,
      avatar,
      data,
    };
 
    await retry.onThrow(
      async () => {
        console.log("Creating Novu subscriber:", subscriber);
 
        const result = await novu.subscribers.create(subscriber);
 
        console.log("Subscriber created successfully:", result);
        return result;
      },
      {
        maxAttempts: 2,
      }
    );
  },
});
```

### [Using Subscriber Data in Templates](https://docs.novu.co/#using-subscriber-data-in-templates)

Once you've added custom fields to a subscriber, you can use them in Novu templates using Handlebars:

Basic FieldsContact InfoCustom Data

Hi `{{subscriber.firstName}}`, welcome!

## [Best Practices](https://docs.novu.co/#best-practices)

### Data Management Best Practices

### Proactive Data Synchronization

### Enriching Subscriber Data

[Inngest\\ \\ This guide walks you through integrating Inngest with Novu notifications](https://docs.novu.co/guides/inngest) [Clerk\\ \\ This guide walks you through integrating Clerk webhooks with Novu notifications in a Next.js application.](https://docs.novu.co/guides/webhooks/clerk)

### On this page

[What You'll Learn](https://docs.novu.co/#what-youll-learn) [Getting Started](https://docs.novu.co/#getting-started) [Triggering Notifications](https://docs.novu.co/#triggering-notifications) [Core Requirements](https://docs.novu.co/#core-requirements) [Basic Trigger Example](https://docs.novu.co/#basic-trigger-example) [Working with Dynamic Content](https://docs.novu.co/#working-with-dynamic-content) [Using Payloads](https://docs.novu.co/#using-payloads) [Example Use Case](https://docs.novu.co/#example-use-case) [Advanced Trigger Example](https://docs.novu.co/#advanced-trigger-example) [Key Points about Payloads](https://docs.novu.co/#key-points-about-payloads) [Implementation Examples](https://docs.novu.co/#implementation-examples) [AI Tasks](https://docs.novu.co/#ai-tasks) [Video processing](https://docs.novu.co/#video-processing) [Managing Subscribers](https://docs.novu.co/#managing-subscribers) [When to Create Subscribers](https://docs.novu.co/#when-to-create-subscribers) [Subscriber Creation Example](https://docs.novu.co/#subscriber-creation-example) [Using Subscriber Data in Templates](https://docs.novu.co/#using-subscriber-data-in-templates) [Best Practices](https://docs.novu.co/#best-practices)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/guides/triggerdotdev.mdx)Open in ChatGPTOpen in Claude