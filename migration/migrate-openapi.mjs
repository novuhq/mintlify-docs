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

// Acquire the OpenAPI spec. The old build fetched the COMPLETE spec from Speakeasy at
// build time; docs-old/openapi.json is a stale 36-path snapshot. Fetch the full spec
// (so v2 routes — topics, workflows, layouts, etc. — resolve), fall back to the snapshot.
const SPEC_URL = 'https://spec.speakeasy.com/novu/novu/json-development-with-code-samples';
const specDest = path.join(ROOT, 'openapi.json');
try {
  const res = await fetch(SPEC_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const spec = await res.json();
  fs.writeFileSync(specDest, JSON.stringify(spec));
  console.log(`Fetched complete spec: ${Object.keys(spec.paths || {}).length} paths (v${spec.info?.version}).`);
} catch (e) {
  console.warn(`Spec fetch failed (${e.message}); using docs-old/openapi.json snapshot.`);
  fs.copyFileSync(path.join(ROOT, 'docs-old', 'openapi.json'), specDest);
}
const { specOps, specBySig } = (() => {
  const s = JSON.parse(fs.readFileSync(specDest, 'utf8'));
  const set = new Set();
  const bySig = new Map(); // method + path with param names normalized -> actual "METHOD /path"
  for (const [p, ms] of Object.entries(s.paths || {})) {
    for (const m of Object.keys(ms)) {
      const op = `${m.toUpperCase()} ${p}`;
      set.add(op);
      bySig.set(`${m.toUpperCase()} ${p.replace(/\{[^}]+\}/g, '{}')}`, op);
    }
  }
  return { specOps: set, specBySig: bySig };
})();
// resolve a page's "METHOD /route" to a real spec operation, tolerating param-name drift
// (e.g. {variableId} vs {variableKey}); returns the spec's exact "METHOD /path" or null.
function resolveOp(method, route) {
  const exact = `${method} ${route}`;
  if (specOps.has(exact)) return exact;
  return specBySig.get(`${method} ${route.replace(/\{[^}]+\}/g, '{}')}`) || null;
}
const notInSpec = [];

let count = 0;
const generated = [];
for (const file of walk(SRC)) {
  const raw = fs.readFileSync(file, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch || !/_openapi:/.test(fmMatch[1])) continue; // skip manual pages
  const fm = fmMatch[1];

  // strip surrounding quotes — YAML quoted routes containing {param} (e.g. '/v2/x/{id}')
  const unquote = (v) => (v || '').trim().replace(/^['"]|['"]$/g, '');
  const method = unquote((fm.match(/^\s*method:\s*(\S+)/m) || [])[1]).toUpperCase();
  const route = unquote((fm.match(/^\s*route:\s*(\S+)/m) || [])[1]);
  const titleRaw = (fm.match(/^title:\s*(.+)$/m) || [])[1] || 'Endpoint';
  const title = titleRaw.trim().replace(/^['"]|['"]$/g, '');
  if (!method || !route) {
    console.warn('skip (no method/route):', path.relative(ROOT, file));
    continue;
  }
  const resolved = resolveOp(method, route);
  if (!resolved) notInSpec.push(`${method} ${route}  (${path.relative(SRC, file)})`);
  const openapi = resolved || `${method} ${route}`;

  const rel = path.relative(SRC, file); // e.g. messages/list-all-messages.mdx
  const dest = path.join(ROOT, 'api-reference', rel);
  const out = `---\ntitle: "${title.replace(/"/g, '\\"')}"\nopenapi: "${openapi}"\n---\n`;
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
if (notInSpec.length) {
  console.warn(`\n${notInSpec.length} page(s) reference operations NOT in the spec (will render empty):`);
  notInSpec.forEach((x) => console.warn('  -', x));
} else {
  console.log('All generated pages resolve to an operation in the spec.');
}
