# Source: https://docs.novu.co/platform/workflow/advanced-features/translations

Advanced Features

# Translations

Learn how to translate your workflow step content into multiple languages

Novu supports multi-language translations for workflows, allowing notifications to dynamically adapt to each of your subscriber's preferred language. You can enable, configure, and manage translations across your notification workflows from the Novu dashboard.

The translations feature is in `beta` and available on `Team` and `Enterprise` [plans](https://novu.co/pricing).

Each workflow can support multiple locales. Novu automatically selects the correct translation based on the subscriber’s locale.

Novu currently supports locale codes in `language_REGION` format only, for example, `en_US`, `fr_FR`. Language-only locale codes such as `en` are not supported.

Benefits:

- Deliver notifications in the subscriber's preferred language
- Customize content per workflow or layout
- Improve communication across geographies

Manage translations from the [translation page](https://dashboard.novu.co/translations) in the Novu dashboard. Set a default language and add target languages as needed.

![Translation page](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftranslations-page.f75aef15.png&w=3840&q=75)

## [Enabling translations](https://docs.novu.co/#enabling-translations)

To use translations for a workflow, you need to enable them on the workflow level.

### [While creating a new workflow](https://docs.novu.co/#while-creating-a-new-workflow)

- Turn on the **Enable Translations** toggle
- Set the default locale, such as `en_US` or `en_GB`
- Add the target locales you wish to support, such as `fr_FR`, `es_ES`, `ja_JP`

### [While editing an existing workflow](https://docs.novu.co/#while-editing-an-existing-workflow)

- Open an existing workflow
- Turn on the **Enable Translations** toggle
- You don't need to take any action if the toggle is already on

You can configure the default and targeted locales on the [translation page](https://dashboard.novu.co/translations).

![Translation locale](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftranslations-default-and-target-locale.5285808f.gif&w=3840&q=75)

## [Translation groups](https://docs.novu.co/#translation-groups)

A translation group contains all language variants for a workflow identified by a unique workflow ID.

You can:

- Search for groups on the translations page
- View status per locale ('Outdated' or 'Up to date')
- Import or export translations for a specific locale, such as `en_US`
- Import or export translations for all workflows where translations are enabled

## [Translation JSON format](https://docs.novu.co/#translation-json-format)

Each locale supports JSON-based translation files. For example, the `en_US.json` file contains the default translations for the workflow. You can update the translation JSON files using the JSON editor on the translation page.

```
{
  "in-app": {
    "title": "Welcome to Novu!",
    "message": "Hi {{subscriber.firstName}}, let's get started!"
  },
  "email": {
    "subject": "Get Started",
    "body": "Thank you for joining us, {{subscriber.fullName}}"
  }
}
```

You can update translations by editing the JSON files in the editor on the translations page or by exporting and re-uploading them.

![Translation JSON format](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftranslations_locale_content_edit.94e091a7.gif&w=3840&q=75)

## [Exporting and importing translations](https://docs.novu.co/#exporting-and-importing-translations)

If you prefer to create/update translations in a JSON file outside the Novu dashboard, you can do so by exporting and importing them.

### [How to export translations](https://docs.novu.co/#how-to-export-translations)

1. Navigate to the translations page.
2. Select the workflow you want to export translations for
 - To export the default locale for all workflows with translations enabled, click the **Export** button.
3. Select the workflow locale you want to export.
4. Click the download icon to download the latest translation JSON file for the selected locale. ![Export translations](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fexport-translations.129dbf4a.png&w=3840&q=75)

### [How to import translations](https://docs.novu.co/#how-to-import-translations)

1. Navigate to the translations page.
2. Select the workflow you want to import translations into.
 - To import locale into all workflows with translations enabled, click the **Import** button.
3. Click on the locale, such as `en_US`, now click on the **Import translation(s)** button to upload the translation JSON file. ![Import translations](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimport-translations.eecbe80c.png&w=3840&q=75)

Translation files must be named using the `language_REGION.json` format, for example, `en_US.json`, `fr_FR.json`. Novu detects the locale automatically using the file name.

Translation changes in default locale such as `en_US` will mark other locales as _Outdated, needs update_

### [Master JSON file](https://docs.novu.co/#master-json-file)

Master JSON file is a JSON file that contains the default locale's translations keys of all the workflows where translations are enabled. You can import or export this file from the translations page. Below is an example of a master JSON file:

```
{
  "workflows": {
    "events-publish": {
      "key": "value"
    },
    "events-update": {
      "subject": "A new update",
      "content": "{{payload.eventName}} event has been updated"
    }
  }
}
```

![Master JSON file export and import options](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftranslations_master_json_file.d1749310.png&w=3840&q=75)

## [Using translation keys in step content editor](https://docs.novu.co/#using-translation-keys-in-step-content-editor)

In Email or In-App editors, use `{{t.key}}` to insert a translatable string. If the key already exists for the locale, it appears in the suggestions list.

Clicking **Add to Translations** automatically adds a new key to default locale.

Example:

```
{{t.subject}} → "Let's get you started"
 
{{t.product.details.description}}
```

![Using translation keys in step content editor](https://docs.novu.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftranslations_variable_use_in_step_editor.35206efd.gif&w=3840&q=75)

## [Testing translations](https://docs.novu.co/#testing-translations)

Use the Preview Context to:

- Simulate subscriber locale such as `fr_FR` or `ru_RU`
- Preview step content for the selected language.
- Update or correct missing translations on the fly.

## [Keeping translations up to date](https://docs.novu.co/#keeping-translations-up-to-date)

Any edit to the default locale will invalidate others. You’ll see a warning: `Outdated, needs update`. Re-export the default, update translated files, and re-upload.

## [Disabling translations](https://docs.novu.co/#disabling-translations)

A translation group can be disabled by clicking on the three dots and selecting **Disable & delete translations**. This action is irreversible and removes all associated translation data.

## [Translation in email layouts](https://docs.novu.co/#translation-in-email-layouts)

Translations feature in layouts works the same as in email steps. You can use `{{t.key}}` to insert a translatable string. If the key already exists for the locale, it appears in the suggestions list. To use translations in layouts, you need to enable translations in the layout settings. Checkout the below example video on how to use translations in layouts.

## [Manage translations via CLI](https://docs.novu.co/#manage-translations-via-cli)

The Novu CLI can download translation files from Novu Cloud to your machine, or upload local JSON files back to your workspace. This is useful for version control, bulk edits, and CI workflows.

Use `npx novu` (or a globally installed `novu` binary) with your Novu secret key and API URL to pull or push translations.

### [Pull translations](https://docs.novu.co/#pull-translations)

`novu translations pull` downloads all translation files from Novu Cloud into a local directory (default: `./translations`).

```
# Pull to the default directory (./translations)
npx novu translations pull -s YOUR_SECRET_KEY
 
# Pull to a custom directory
npx novu translations pull -s YOUR_SECRET_KEY -d ./my-translations
 
# Use the EU API endpoint
npx novu translations pull -s YOUR_SECRET_KEY -a https://eu.api.novu.co
```

| Option | Description |
| --- | --- |
| `-s, --secret-key <key>` | Your Novu secret key (required unless set via env) |
| `-a, --api-url <url>` | Novu API base URL (default: `https://api.novu.co`) |
| `-d, --directory <path>` | Output directory (default: `./translations`) |

### [Push translations](https://docs.novu.co/#push-translations)

`novu translations push` uploads translation JSON files from a local directory to Novu Cloud (default directory: `./translations`).

```
# Push from the default directory (./translations)
npx novu translations push -s YOUR_SECRET_KEY
 
# Push from a custom directory
npx novu translations push -s YOUR_SECRET_KEY -d ./my-translations
 
# Use the EU API endpoint
npx novu translations push -s YOUR_SECRET_KEY -a https://eu.api.novu.co
```

| Option | Description |
| --- | --- |
| `-s, --secret-key <key>` | Your Novu secret key (required unless set via env) |
| `-a, --api-url <url>` | Novu API base URL (default: `https://api.novu.co`) |
| `-d, --directory <path>` | Directory containing locale JSON files (default: `./translations`) |

### [File layout and format](https://docs.novu.co/#file-layout-and-format)

Files should use locale codes in the `language_REGION` form and contain valid JSON, for example:

```
translations/
├── en_US.json
├── fr_FR.json
├── es_ES.json
└── de_DE.json
```

Example content:

```
{
  "workflows": {
    "welcome": {
      "subject": "Welcome to our platform!",
      "body": "Thank you for joining us."
    }
  }
}
```

This matches the same `language_REGION.json` naming rules used when importing via the dashboard.

### [Environment variables](https://docs.novu.co/#environment-variables)

You can avoid repeating flags by setting:

```
export NOVU_SECRET_KEY="your_secret_key_here"
export NOVU_API_URL="https://api.novu.co"   # or https://eu.api.novu.co for EU
 
npx novu translations pull
npx novu translations push
```

### [Tips](https://docs.novu.co/#tips)

- Back up or commit existing translations before running **push**, so you can recover from mistakes.
- Validate JSON locally (for example with your editor or `jq`) before pushing.
- Run **pull** once to confirm the on-disk layout matches what Novu expects before automating in CI.

Never commit Novu secret keys. Use environment variables or your CI provider’s secrets store for `NOVU_SECRET_KEY`.

## [Best practices](https://docs.novu.co/#best-practices)

- Always finalize your default content before exporting.
- Avoid hardcoded language in the content editor.
- Use variables and translation keys consistently.
- Set subscriber locale properly to deliver notifications in the correct language.
- Ensure subscriber locales are mapped to a supported `language_REGION` format before sending them to Novu.

[Monitor and Debug Workflow\\ \\ Learn how to monitor workflow executions and debug issues from the Novu Activity Feed.](https://docs.novu.co/platform/workflow/monitor-and-debug-workflow) [Context\\ \\ Learn what Contexts are in Novu, how they differ from payloads, and how they help you organize and personalize notifications across workflows.](https://docs.novu.co/platform/workflow/advanced-features/contexts)

### On this page

[Enabling translations](https://docs.novu.co/#enabling-translations) [While creating a new workflow](https://docs.novu.co/#while-creating-a-new-workflow) [While editing an existing workflow](https://docs.novu.co/#while-editing-an-existing-workflow) [Translation groups](https://docs.novu.co/#translation-groups) [Translation JSON format](https://docs.novu.co/#translation-json-format) [Exporting and importing translations](https://docs.novu.co/#exporting-and-importing-translations) [How to export translations](https://docs.novu.co/#how-to-export-translations) [How to import translations](https://docs.novu.co/#how-to-import-translations) [Master JSON file](https://docs.novu.co/#master-json-file) [Using translation keys in step content editor](https://docs.novu.co/#using-translation-keys-in-step-content-editor) [Testing translations](https://docs.novu.co/#testing-translations) [Keeping translations up to date](https://docs.novu.co/#keeping-translations-up-to-date) [Disabling translations](https://docs.novu.co/#disabling-translations) [Translation in email layouts](https://docs.novu.co/#translation-in-email-layouts) [Manage translations via CLI](https://docs.novu.co/#manage-translations-via-cli) [Pull translations](https://docs.novu.co/#pull-translations) [Push translations](https://docs.novu.co/#push-translations) [File layout and format](https://docs.novu.co/#file-layout-and-format) [Environment variables](https://docs.novu.co/#environment-variables) [Tips](https://docs.novu.co/#tips) [Best practices](https://docs.novu.co/#best-practices)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/platform/workflow/advanced-features/translations.mdx)Open in ChatGPTOpen in Claude