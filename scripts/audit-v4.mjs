// audit-v4.mjs — build-time checks adopted in blueprint §11.6.
// Run: npm run audit:v4  (node scripts/audit-v4.mjs)
// Fails (exit 1) on:
//   1. any `@uiarc-pro/` import (Arc Pro must never enter the build)
//   2. EUR/USD prices outside lib/data.ts (single source of truth)
//   3. new v4 T keys missing in EN or DE (faqTitle, slide*, date*, stepsComplete)
//   4. FAQ items with an unbalanced q/qDe/a/aDe set
//   5. DEMO_DAYS with no future enabled day (demo goes stale — update DAYS)
//   6. forbidden gradient/glass classes outside the approved nav backdrop-blur
//   7. the accent-strong hex #9D174D outside lib/arc-tokens.css
// Node stdlib only. No network.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const failures = [];
const fail = (msg) => failures.push(msg);

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) {
      if (e === "node_modules" || e === ".next") continue;
      walk(p, out);
    } else if (/\.(ts|tsx|css)$/.test(e)) out.push(p);
  }
  return out;
}

const SRC = walk(join(ROOT, "app"))
  .concat(walk(join(ROOT, "components")))
  .concat(walk(join(ROOT, "lib")));
const rel = (p) => p.replace(ROOT, "");
const read = (p) => readFileSync(p, "utf8");

// 1 — no Arc Pro imports
for (const p of SRC) {
  if (read(p).includes("@uiarc-pro/")) fail(`Arc Pro import in ${rel(p)}`);
}

// 2 — prices only in lib/data.ts
const priceRe = /€\s*\d|\d+\s*€|\$\s*\d|\d+\s*USD/i;
for (const p of SRC) {
  if (rel(p) === "lib/data.ts") continue;
  const lines = read(p).split("\n");
  lines.forEach((line, i) => {
    if (priceRe.test(line)) fail(`Price outside lib/data.ts — ${rel(p)}:${i + 1}: ${line.trim().slice(0, 100)}`);
  });
}

// 3 — EN/DE parity for the new v4 keys (exactly 2 occurrences: EN + DE)
const data = read(join(ROOT, "lib/data.ts"));
for (const key of ["faqTitle", "slideLabel", "slideConfirmed", "dateLabel", "datePlaceholder", "dateDemoNote", "stepsComplete"]) {
  const n = (data.match(new RegExp(`\\b${key}:`, "g")) || []).length;
  if (n !== 2) fail(`T key "${key}" occurs ${n}x in lib/data.ts (want 2: EN + DE)`);
}

// 4 — FAQ items balanced (q/qDe/a/aDe), at least 1 item
const faqCount = (re) => (data.match(re) || []).length;
const fq = faqCount(/\bq: "/g), fqd = faqCount(/\bqDe: "/g), fa = faqCount(/\ba: "/g), fad = faqCount(/\baDe: "/g);
if (fq === 0 || fq !== fqd || fq !== fa || fq !== fad) {
  fail(`FAQ unbalanced in lib/data.ts — q:${fq} qDe:${fqd} a:${fa} aDe:${fad}`);
}

// 5 — DEMO_DAYS has at least one future day (demo month pinned, goes stale)
const demoBlock = data.split("DEMO_DAYS")[1]?.split("];")[0] ?? "";
const dates = [...demoBlock.matchAll(/new Date\((\d{4}),\s*(\d{1,2}),\s*(\d{1,2})\)/g)]
  .map((m) => new Date(+m[1], +m[2], +m[3]));
const today = new Date();
today.setHours(0, 0, 0, 0);
if (dates.length === 0) fail("No demo days found in DEMO_DAYS");
else if (!dates.some((d) => d >= today)) {
  fail(`DEMO_DAYS all past (${dates.map((d) => d.toDateString()).join(", ")}) — update the demo month`);
}

// 6 — forbidden gradient/glass outside the approved nav blur
for (const p of SRC) {
  if (!/\.tsx?$/.test(p)) continue;
  const lines = read(p).split("\n");
  lines.forEach((line, i) => {
    const at = `${rel(p)}:${i + 1}`;
    if (line.includes("bg-gradient-to-")) fail(`Gradient class — ${at}`);
    if (line.includes("backdrop-blur") && !line.includes("sticky top-0 z-40")) {
      fail(`backdrop-blur outside the nav header — ${at}`);
    }
    if (/linear-gradient\([^)]*(purple|violet|indigo|blue|fuchsia)/i.test(line)) {
      fail(`Purple/blue gradient — ${at}`);
    }
    if (/\bglass(morphism)?\b/i.test(line) && !line.trim().startsWith("//")) {
      fail(`Glass class — ${at}`);
    }
  });
}

// 7 — accent-strong hex only in the two token-definition files
// (lib/arc-tokens.css maps it onto Arc; app/globals.css defines the
// Orchidea token --magenta-deep). Anywhere else it is a hardcoded leak.
const hexAllowed = new Set(["lib/arc-tokens.css", "app/globals.css"]);
for (const p of SRC) {
  if (hexAllowed.has(rel(p))) continue;
  if (read(p).includes("#9D174D") || read(p).includes("#9d174d")) {
    fail(`#9D174D outside the token files — ${rel(p)}`);
  }
}

if (failures.length) {
  console.error(`audit-v4: FAIL (${failures.length})`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log("audit-v4: PASS");
