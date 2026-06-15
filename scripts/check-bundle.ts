#!/usr/bin/env bun
/**
 * Bundle budget check.
 * Uses Next.js' build manifest to track actual first-load JS per route
 * (what the user downloads), not sum of all chunks (which includes lazy/async).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const MAX_JS_KB = 200;
const MAX_CSS_KB = 30;

function gzipKb(path: string): number {
  const buf = readFileSync(path);
  return gzipSync(buf, { level: 9 }).length / 1024;
}

type AppBuildManifest = {
  pages: Record<string, string[]>;
};

const appManifest: AppBuildManifest = JSON.parse(
  readFileSync(".next/app-build-manifest.json", "utf8"),
);

const pageRoutes = Object.keys(appManifest.pages);
let worstJs = 0;
let worstRoute = "";

for (const route of pageRoutes) {
  const pageFiles = appManifest.pages[route] ?? [];
  const total = pageFiles.reduce((sum, rel) => {
    const abs = join(".next", rel);
    try {
      return sum + gzipKb(abs);
    } catch {
      return sum;
    }
  }, 0);
  if (total > worstJs) {
    worstJs = total;
    worstRoute = route;
  }
}

const cssDir = ".next/static/css";
const cssFiles: string[] = [];
function walk(d: string) {
  if (!statSync(d).isDirectory()) return;
  for (const entry of readdirSync(d)) {
    const full = join(d, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (full.endsWith(".css")) cssFiles.push(full);
  }
}
walk(cssDir);
const totalCss = cssFiles.reduce((sum, f) => sum + gzipKb(f), 0);

console.log(`Worst route: ${worstRoute} -> ${worstJs.toFixed(1)}KB gz JS`);
console.log(`Total CSS:   ${totalCss.toFixed(1)}KB gz (max ${MAX_CSS_KB}KB gz)`);

let violations = 0;
if (worstJs > MAX_JS_KB) {
  console.error(`First-load JS for ${worstRoute} exceeds ${MAX_JS_KB}KB (${worstJs.toFixed(1)}KB)`);
  violations++;
}
if (totalCss > MAX_CSS_KB) {
  console.error(`CSS bundle exceeds ${MAX_CSS_KB}KB (${totalCss.toFixed(1)}KB)`);
  violations++;
}

if (violations > 0) {
  console.error(`\nBundle budget exceeded: ${violations} violation(s)`);
  process.exit(1);
}

console.log("\nBundle budget OK");
