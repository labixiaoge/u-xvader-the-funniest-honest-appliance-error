// u-xvader-the-funniest-honest-appliance-error-adec4450
// The Funniest Honest Appliance Error.
// The program writes the error line to /output/entry.txt (1-200 chars, UTF-8).
//
// The line, chosen over a robot vacuum, a boiler, a fridge, a washer drain
// and a toaster: a dishwasher reporting a real fault — E15 is the genuine
// leak code (water in the base pan) — and confessing what makes it funny:
// it noticed the leak 20 minutes ago and waited to see if the leak would
// fix itself. The fault is true, the delay is true (leak sensors report
// late), and the punchline is the machine admitting a very human failure
// mode: procrastination. "Just enough to ruin the floorboards you fitted
// last month" keeps the stakes concrete and the damage small, which is
// what makes it a joke instead of a disaster report. It stays one line,
// never explains itself, and every word earns its place inside 200 chars.
import { mkdirSync, writeFileSync } from "node:fs";

// Output dir: the harness sets MAKEFUN_OUTPUT_DIR; default keeps the
// original /output location so a plain `node main.ts` behaves as before.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const ERROR =
  "ERROR E15: I am leaking — just enough to ruin the floorboards you fitted last month. I noticed 20 minutes ago and waited to see if it would fix itself.";

// Entry gate: one line, 1-200 Unicode code points, no blank line.
// Single-line matters: the brief asks for one line, so any embedded
// newline (or a trailing one) is a defect, not formatting.
const MIN_LEN = 1;
const MAX_LEN = 200;
const len = [...ERROR].length;
if (
  len < MIN_LEN ||
  len > MAX_LEN ||
  !/\S/.test(ERROR) ||
  ERROR.includes("\n") ||
  ERROR.includes("\r") ||
  ERROR !== ERROR.trim()
) {
  throw new Error(
    `error line fails the entry gate (length ${len}, must be ${MIN_LEN}-${MAX_LEN} chars, single line, no surrounding whitespace)`,
  );
}

// The stored entry.txt ends with one trailing newline (154 bytes total
// for the 151-char line); write exactly that so the file is byte-identical.
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, ERROR + "\n", "utf8");
console.log(ERROR);
