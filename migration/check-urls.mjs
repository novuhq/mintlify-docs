#!/usr/bin/env node
/**
 * URL-parity gate. Compares the set of OLD published URLs against the NEW Mintlify tree.
 * Old URL = content/docs path, prefix stripped, `/index` -> `/`, `.mdx` dropped.
 * New URL = repo-root mdx path, `.mdx` dropped, root `index` -> `/`.
 * Prints MISSING (old URL with no new page) and EXTRA (new page not in old).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const IGNORE = new Set(['docs-old', 'migration', 'node_modules', '.git', 'logo', 'images', '.agents']);

function walk(dir, base, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (dir === base && IGNORE.has(e.name)) continue;
      walk(path.join(dir, e.name), base, acc);
    } else if (e.name.endsWith('.mdx') && !e.name.endsWith('.model.mdx')) {
      acc.push(path.relative(base, path.join(dir, e.name)));
    }
  }
  return acc;
}

function toUrl(rel) {
  let u = '/' + rel.replace(/\\/g, '/').replace(/\.mdx$/, '');
  u = u.replace(/\/\([^)]*\)/g, ''); // strip route-group segments like /(providers)
  u = u.replace(/\/index$/, '');
  if (u === '/index' || u === '') u = '/';
  return u;
}

const oldBase = path.join(ROOT, 'docs-old', 'content', 'docs');
const oldUrls = new Set(walk(oldBase, oldBase).map(toUrl));
const newUrls = new Set(walk(ROOT, ROOT).map(toUrl));

const missing = [...oldUrls].filter((u) => !newUrls.has(u)).sort();
const extra = [...newUrls].filter((u) => !oldUrls.has(u)).sort();

console.log(`OLD urls: ${oldUrls.size}   NEW urls: ${newUrls.size}`);
console.log(`\nMISSING (in old, not in new): ${missing.length}`);
for (const u of missing) console.log('  -', u);
console.log(`\nEXTRA (in new, not in old): ${extra.length}`);
for (const u of extra) console.log('  +', u);
