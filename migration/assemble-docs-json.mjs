#!/usr/bin/env node
/**
 * Assemble the final docs.json: Novu branding + navigation (from navigation.json)
 * + OpenAPI spec on the API Reference tab + redirects parsed from the old middleware.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const nav = JSON.parse(fs.readFileSync(path.join(ROOT, 'migration', 'navigation.json'), 'utf8'));

// ---- parse redirects from docs-old/src/middleware.ts (the redirectMap + root)
const mw = fs.readFileSync(path.join(ROOT, 'docs-old', 'src', 'middleware.ts'), 'utf8');
const mapBlock = mw.slice(mw.indexOf('const redirectMap'), mw.indexOf('if (pathname in redirectMap)'));
const pairRe = /(['"])(\/[^'"]+)\1\s*:\s*(['"])([^'"]+)\3/g;
const seen = new Set();
const redirects = [{ source: '/', destination: '/platform', permanent: true }];
let m;
while ((m = pairRe.exec(mapBlock))) {
  const source = m[2];
  const destination = m[4];
  if (source === destination || seen.has(source)) continue;
  seen.add(source);
  redirects.push({ source, destination, permanent: true });
}

// ---- attach OpenAPI spec to the API Reference tab
for (const tab of nav.tabs) {
  if (tab.tab === 'API Reference') tab.openapi = 'openapi.json';
}

const docs = {
  $schema: 'https://mintlify.com/docs.json',
  theme: 'mint',
  name: 'Novu',
  // Novu brand magenta. primary deepened to #D1006E to pass WCAG AA (≈5.4:1) on light
  // backgrounds; brighter #FF4CE1 used as the dark-mode accent.
  colors: { primary: '#D1006E', light: '#FF4CE1', dark: '#FF4CE1' },
  favicon: '/favicon.svg',
  // source docs used Lucide icons; set it as the global icon library so page/group/card
  // icon names (blocks, circle-help, layout-dashboard, mouse-pointer-click, …) render.
  icons: { library: 'lucide' },
  logo: { light: '/logo/light.svg', dark: '/logo/dark.svg', href: 'https://novu.co' },
  navigation: nav,
  navbar: {
    links: [
      { label: 'GitHub', href: 'https://github.com/novuhq/novu' },
      { label: 'Sign In', href: 'https://dashboard.novu.co/auth/sign-in' },
    ],
    primary: { type: 'button', label: 'Sign Up', href: 'https://dashboard.novu.co/auth/sign-up' },
  },
  contextual: {
    options: ['copy', 'view', 'chatgpt', 'claude', 'perplexity', 'mcp', 'cursor', 'vscode'],
  },
  footer: {
    socials: {
      x: 'https://x.com/novuhq',
      github: 'https://github.com/novuhq/novu',
      linkedin: 'https://linkedin.com/company/novuhq',
    },
  },
  redirects,
};

fs.writeFileSync(path.join(ROOT, 'docs.json'), JSON.stringify(docs, null, 2) + '\n');
console.log(`docs.json written: ${nav.tabs.length} tabs, ${redirects.length} redirects.`);
