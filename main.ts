// main.ts — One Line, One Minute: The Vending Machine Pickup Line Contest
// Writes a single pickup line (at most 200 characters), spoken by a
// vending machine to a passing human, to $OUTPUT_PATH, defaulting to
// /output/entry.txt. Node 22, standard library only, fully
// deterministic: no input, no network, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 200;

// The line: the machine flirts using its own world — the slot, the
// coil, the exact change — and lands the turn on the last few words.
const LINE =
  "You don't need exact change to get my attention — just press B4 and I'll drop everything for you. Literally. All of it.";

const line = LINE.trim();

if (line.length === 0 || line.length > MAX_CHARS) {
  throw new Error(`line must be 1..${MAX_CHARS} characters, got ${line.length}`);
}
// One line only: no line breaks, no stray control characters, and the
// line must carry real words, not just whitespace or punctuation.
if (/[\r\n]/.test(line) || /[\u0000-\u001f\u007f]/.test(line)) {
  throw new Error("line must be a single printable line");
}
if (!/[A-Za-z0-9]/.test(line)) {
  throw new Error("line must contain at least one letter or digit");
}

const out = process.env.OUTPUT_PATH || "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, line + "\n", "utf8");
