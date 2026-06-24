#!/usr/bin/env node
/**
 * Build Mintlify navigation.tabs from the Fumadocs meta.json tree.
 *
 * Resolution rules (Fumadocs):
 *   "---Title---"      -> a sidebar group (JSX stripped from the label)
 *   "name"             -> page if name.mdx exists, else nested group from name/ (title from its meta.json)
 *   "name/index"       -> page at the folder URL
 *   "...folder"        -> inline that folder's resolved items (no extra group wrapper)
 *   "...folder/page"   -> inline that single page
 *   "..."              -> remaining pages in the folder not explicitly listed
 *   "(group)"          -> route group: inlined, contributes no URL segment
 *
 * Emits page slugs as repo-root-relative paths (extension dropped, index folded,
 * route groups stripped) and validates every slug against the migrated tree.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'docs-old', 'content', 'docs');

const SECTIONS = [
  ['platform', 'Platform'],
  ['agents', 'Agents'],
  ['guides', 'Guides'],
  ['framework', 'Framework'],
  ['community', 'Community'],
  ['api-reference', 'API Reference'],
];

const readMeta = (dir) => {
  const p = path.join(dir, 'meta.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : null;
};
const fileExists = (p) => fs.existsSync(p) && fs.statSync(p).isFile();
const dirExists = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();
const isRouteGroup = (name) => /^\(.*\)$/.test(name);

const stripJsx = (s) =>
  s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const titleFromName = (name) =>
  name.replace(/^\(|\)$/g, '').replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// normalize a meta.json icon (PascalCase Lucide name) to a valid kebab-case Lucide icon
const ICON_ALIASES = { 'code-2': 'square-code', home: 'house', sparkle: 'sparkles', sliders: 'sliders-horizontal', 'plus-circle': 'circle-plus', android: 'smartphone', node: 'server', 'circle-info': 'info', layout: 'layout-dashboard', 'circle-help': 'circle-question-mark' };
const normalizeIcon = (s) => {
  const k = s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Za-z])([0-9])/g, '$1-$2').toLowerCase();
  return ICON_ALIASES[k] || k;
};

// remap stale meta.json refs to their real (renamed) page so they stay in the sidebar
const SLUG_REMAP = {
  'platform/concepts/notifications': 'platform/concepts/notification-event',
};

// build a URL slug from a urlBase + entry: drop /index, drop route-group segments
function slug(urlBase, entry) {
  const e = entry.replace(/(^|\/)index$/, '');
  const segs = (urlBase + '/' + e).split('/').filter((s) => s && !isRouteGroup(s) && s !== 'index');
  const s = segs.join('/');
  return SLUG_REMAP[s] || s;
}
function joinBase(urlBase, entry) {
  return (urlBase + '/' + entry).split('/').filter((s) => s && !isRouteGroup(s)).join('/');
}

const emittedSlugs = [];

// resolve a single meta entry -> array of items (page strings and/or nested groups)
function resolveEntry(entry, dirAbs, urlBase) {
  const fsPath = path.join(dirAbs, entry);
  const baseName = path.basename(entry);

  // explicit folder index page
  if (entry.endsWith('/index') && fileExists(fsPath + '.mdx')) {
    const s = slug(urlBase, entry);
    emittedSlugs.push(s);
    return [s];
  }
  // plain page
  if (fileExists(fsPath + '.mdx')) {
    const s = slug(urlBase, entry);
    emittedSlugs.push(s);
    return [s];
  }
  // folder
  if (dirExists(fsPath)) {
    const childBase = isRouteGroup(baseName) ? urlBase : joinBase(urlBase, entry);
    const items = resolvePages(fsPath, childBase);
    const meta = readMeta(fsPath);
    if (isRouteGroup(baseName) && !meta?.title) return items; // inline route group
    const group = { group: meta?.title ? stripJsx(meta.title) : titleFromName(baseName), pages: items };
    if (meta?.icon) group.icon = normalizeIcon(meta.icon); // restore Lucide group icon
    return [group];
  }
  // unknown -> best-effort page slug (validation will flag)
  const s = slug(urlBase, entry);
  emittedSlugs.push(s);
  return [s];
}

// spread: inline a folder's items or a single page
function resolveSpread(target, dirAbs, urlBase) {
  const fsPath = path.join(dirAbs, target);
  if (dirExists(fsPath)) return resolvePages(fsPath, joinBase(urlBase, target));
  const s = slug(urlBase, target);
  emittedSlugs.push(s);
  return [s];
}

// list folder children not explicitly named (for the "..." rest token)
function restItems(dirAbs, urlBase, named) {
  const out = [];
  for (const e of fs.readdirSync(dirAbs, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.name === 'meta.json') continue;
    const base = e.isDirectory() ? e.name : e.name.replace(/\.mdx$/, '');
    if (!e.isDirectory() && !e.name.endsWith('.mdx')) continue;
    if (named.has(base) || base === 'index') continue;
    out.push(...resolveEntry(base, dirAbs, urlBase));
  }
  return out;
}

// resolve a folder's pages list -> items[] (page strings + nested {group,pages})
function resolvePages(dirAbs, urlBase) {
  const meta = readMeta(dirAbs);
  let pages = meta?.pages;
  if (!pages) {
    // no meta: index first, then files, then folders (alphabetical)
    const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
    const files = entries.filter((e) => e.isFile() && e.name.endsWith('.mdx')).map((e) => e.name.replace(/\.mdx$/, ''));
    const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
    pages = [...files.sort(), ...dirs.sort()];
  }
  const named = new Set(
    pages.filter((p) => typeof p === 'string' && !p.startsWith('-') && !p.startsWith('...') && p !== '...')
      .map((p) => p.replace(/\/index$/, '').split('/')[0])
  );

  const result = [];
  let current = null; // current group object or null (-> result directly)
  const emit = (item) => (current ? current.pages : result).push(item);

  for (const entry of pages) {
    const sep = entry.match(/^-{2,}\s*(.*?)\s*-{2,}$/);
    if (sep) {
      current = { group: stripJsx(sep[1]), pages: [] };
      result.push(current);
    } else if (entry === '...') {
      restItems(dirAbs, urlBase, named).forEach(emit);
    } else if (entry.startsWith('...')) {
      resolveSpread(entry.slice(3), dirAbs, urlBase).forEach(emit);
    } else {
      resolveEntry(entry, dirAbs, urlBase).forEach(emit);
    }
  }
  return result;
}

// section top-level: produce groups[]; wrap leading loose pages under the section title
function resolveSection(sectionDir, sectionTitle) {
  const dirAbs = path.join(SRC, sectionDir);
  const items = resolvePages(dirAbs, sectionDir);
  // items already groups (every section starts with a separator); fold any loose strings
  const groups = [];
  let loose = null;
  for (const it of items) {
    if (typeof it === 'object' && it.group) groups.push(it);
    else {
      if (!loose) { loose = { group: sectionTitle, pages: [] }; groups.unshift(loose); }
      loose.pages.push(it);
    }
  }
  return groups.filter((g) => g.pages.length > 0);
}

const tabs = SECTIONS.map(([dir, label]) => ({ tab: label, groups: resolveSection(dir, label) }));

// ---- validate slugs against the migrated tree
const existing = new Set();
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (['docs-old', 'migration', 'node_modules', '.git', 'logo', 'images', '.agents'].includes(e.name) && d === ROOT) continue;
      walk(path.join(d, e.name));
    } else if (e.name.endsWith('.mdx')) {
      existing.add(path.relative(ROOT, path.join(d, e.name)).replace(/\\/g, '/').replace(/\.mdx$/, ''));
    }
  }
})(ROOT);

const droppedBroken = emittedSlugs.filter((s) => !existing.has(s));

// prune nav entries whose target file does not exist (stale/broken old meta.json refs)
function prune(items) {
  const out = [];
  for (const it of items) {
    if (typeof it === 'string') { if (existing.has(it)) out.push(it); }
    else { const pages = prune(it.pages); if (pages.length) out.push({ group: it.group, ...(it.icon ? { icon: it.icon } : {}), pages }); }
  }
  return out;
}
tabs.forEach((t) => (t.groups = prune(t.groups)));

// API completeness: append real API operation pages the (stale) meta.json omitted
const apiTab = tabs.find((t) => t.tab === 'API Reference');
const inNav = new Set();
(function collect(items) {
  for (const it of items) typeof it === 'string' ? inNav.add(it) : collect(it.pages);
})(apiTab.groups);
const uncoveredApi = [...existing]
  .filter((s) => s.startsWith('api-reference/') && s !== 'api-reference' && !inNav.has(s))
  .sort();
for (const s of uncoveredApi) {
  const tag = s.split('/')[1];
  let group = apiTab.groups.find((g) => g.pages.some((p) => typeof p === 'string' && p.startsWith(`api-reference/${tag}/`)));
  if (!group) { group = { group: titleFromName(tag), pages: [] }; apiTab.groups.push(group); }
  group.pages.push(s);
}

const navSlugs = new Set();
tabs.forEach((t) => (function c(items) { for (const it of items) typeof it === 'string' ? navSlugs.add(it) : c(it.pages); })(t.groups));
const uncovered = [...existing].filter((s) => !navSlugs.has(s) && !['index', 'quickstart'].includes(s));
const missing = []; // post-prune nav contains no missing targets

fs.writeFileSync(path.join(ROOT, 'migration', 'navigation.json'), JSON.stringify({ tabs }, null, 2));
console.log(`Pages in nav: ${navSlugs.size}   (files on disk: ${existing.size})`);
console.log(`\nDROPPED broken old-meta refs (no target file): ${droppedBroken.length}`);
droppedBroken.forEach((s) => console.log('  x', s));
console.log(`\nUNCOVERED (published file intentionally not in sidebar): ${uncovered.length}`);
uncovered.forEach((s) => console.log('  ·', s));
