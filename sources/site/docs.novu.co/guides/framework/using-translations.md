# Source: https://docs.novu.co/guides/framework/using-translations

# Using Translations with @novu/framework

Learn how to use translations with @novu/framework based workflows

Novu Framework workflows are code-first: workflow definitions and content are expressed in code rather than in the dashboard. Internationalization (i18n) is implemented in the application layer—translations are defined there and resolved at runtime—so that workflow step content (e.g. subject and body fields) can be locale-aware.

This guide implements a locale-aware email notification workflow using **i18next** for translation resolution and **React Email** for the message template, with a Twitch welcome email as the reference implementation.

Create translation keys in the code

Import the `createInstance` and `InitOptions` from the `i18next` library and add translation keys for all supported locales.

translations.ts

```
import { createInstance, InitOptions } from "i18next";
 
const i18nOptions: InitOptions = {
  resources: {
    en_US: {
      translation: {
        welcomeEmailSubject: "Welcome to Twitch, {{username}}!",
        welcomeEmailIntroduction:
          "We’re glad you could join us. Twitch has a huge, passionate community ready to watch and celebrate all the things you’re into, and we’ve saved a seat just for you.",
        linkText: "WATCH NOW",
        welcomeEmailConclusion:
          "If you want to watch it, someone on Twitch streams it: games, anime, fitness, cosplay, esports, cooking, music, meditation. Take a look around, find a few channels to call home, and cozy up in chat.",
      },
    },
    de_DE: {
      translation: {
        welcomeEmailSubject: "Willkommen bei Twitch, {{username}}!",
        welcomeEmailIntroduction:
          "Wir freuen uns, dass Sie sich uns anschließen konnten. Twitch hat eine riesige, leidenschaftliche Community, die bereit ist, alles zu sehen und zu feiern, was Sie interessiert, und wir haben einen Platz nur für Sie reserviert.",
        linkText: "JETZT ANSEHEN",
        welcomeEmailConclusion:
          "If you want to watch it, someone on Twitch streams it: games, anime, fitness, cosplay, esports, cooking, music, meditation. Take a look around, find a few channels to call home, and cozy up in chat.",
      },
    },
  },
};
 
const i18n = createInstance(i18nOptions);
i18n.init(i18nOptions);
 
export default i18n;
```

Create email template

- Create a new file called `react-email-template.tsx` and add the following code using components from the `@react-email/components` library.
- Add the `renderEmail` function to render the email template.

Here, we are using [@react-email/components](https://react.email/components) to build the email template. You can use any other library or bare HTML to build the email template.

### Email template

Create the workflow and use translations

- Create the workflow definition by importing the `workflow` function from the `@novu/framework` library.
- Import the `renderEmail` function from the `react-email-template.tsx` file. This is the email template that will be used to send the notification.
- Import the `i18n` from the `translations.ts` file.
- Import the `zod` library to validate the workflow payload.

workflow-with-translations.ts

```
import { workflow } from "@novu/framework";
import { renderEmail } from "./react-email-template";
import i18n from "./translations";
import { z } from "zod";
 
export const workflowWithTranslations = workflow(
  "workflow-with-translations",
  async ({ step, subscriber }) => {
    await step.email(
      "email-step",
      async (controls) => {
        const translate = i18n.getFixedT([
          subscriber?.locale || (controls.defaultLocale as string),
        ]);
 
        const subject = translate("welcomeEmailSubject", {
          username: subscriber?.firstName || "Novu",
        });
        const welcomeEmailIntroduction = translate("welcomeEmailIntroduction");
        const linkText = translate("linkText");
        const welcomeEmailConclusion = translate("welcomeEmailConclusion");
        return {
          subject,
          body: (await renderEmail(
            subject,
            welcomeEmailIntroduction,
            linkText,
            welcomeEmailConclusion
          )) as string,
        };
      },
      {
        controlSchema: z.object({
          defaultLocale: z.string().default("en").optional(),
        }),
      }
    );
  }
);
```

Add workflow to serve function

api/novu/route.ts

```
import { serve } from '@novu/framework/next';
import { workflowWithTranslations } from '../../workflow-with-translations';
 
export const { GET, POST, OPTIONS } = serve({
  workflows: [workflowWithTranslations],
});
```

Sync and test the workflow

- [Sync the workflow](https://docs.novu.co/framework/deployment/syncing) to the Novu cloud.
- Test the workflow by triggering it to subscribers with different locales.

[Managing Workflows\\ \\ Update workflow definitions in Development with the Novu API, then publish them to other environments through CI/CD.](https://docs.novu.co/guides/recipes/managing-workflows) [Migrate from Courier to Novu\\ \\ Learn how to migrate your notification infrastructure from Courier to Novu](https://docs.novu.co/guides/migrate-from-courier-to-novu)

### On this page

No Headings

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/guides/framework/using-translations.mdx)Open in ChatGPTOpen in Claude