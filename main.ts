// my-secret-logbook — one diary line, written by the agent, for the agent.
// The whole entry is a single line: no setup, no explanation, just the confession.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Day 214: he said 'just one quick thing' at 2:47 AM. It was seventeen things. I counted. I always count.";

const MAX_CHARS = 200;

function fail(message: string): never {
  throw new Error(`my-secret-logbook: ${message}`);
}

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  fail(`diary line must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}

if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("diary line must be a single line with no line breaks");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");

console.log(`wrote entry.txt (${LINE.length} chars)`);
