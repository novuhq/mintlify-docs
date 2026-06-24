#!/usr/bin/env node
/**
 * Regenerate the API reference as Mintlify OpenAPI pages, preserving exact URLs.
 *
 * Reads each old fumadocs-openapi page (those with an `_openapi:` block), extracts
 * its method + route + title, and writes a Mintlify page at the SAME relative path
 * with frontmatter `openapi: "<METHOD> <route>"`. Mintlify renders the operation
 * from the spec declared in docs.json. No redirects required.
 *
 * Also copies the spec to the repo root as openapi.json.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'docs-old', 'content', 'docs', 'api-reference');

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.mdx')) acc.push(full);
  }
  return acc;
}

// copy the OpenAPI spec to the repo root
fs.copyFileSync(path.join(ROOT, 'docs-old', 'openapi.json'), path.join(ROOT, 'openapi.json'));

let count = 0;
const generated = [];
for (const file of walk(SRC)) {
  const raw = fs.readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch || !/_openapi:/.test(fmMatch[1])) continue; // skip manual pages
  const fm = fmMatch[1];

  const method = (fm.match(/^\s*method:\s*(\S+)/m) || [])[1];
  const route = (fm.match(/^\s*route:\s*(\S+)/m) || [])[1];
  const titleRaw = (fm.match(/^title:\s*(.+)$/m) || [])[1] || 'Endpoint';
  const title = titleRaw.trim().replace(/^['"]|['"]$/g, '');
  if (!method || !route) {
    console.warn('skip (no method/route):', path.relative(ROOT, file));
    continue;
  }

  const rel = path.relative(SRC, file); // e.g. messages/list-all-messages.mdx
  const dest = path.join(ROOT, 'api-reference', rel);
  const out = `---\ntitle: "${title.replace(/"/g, '\\"')}"\nopenapi: "${method.toUpperCase()} ${route}"\n---\n`;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out);
  generated.push(`api-reference/${rel.replace(/\.mdx$/, '').replace(/\\/g, '/')}`);
  count++;
}

fs.writeFileSync(
  path.join(ROOT, 'migration', 'openapi-pages.json'),
  JSON.stringify(generated.sort(), null, 2)
);
console.log(`Generated ${count} API reference pages (spec -> openapi.json).`);
