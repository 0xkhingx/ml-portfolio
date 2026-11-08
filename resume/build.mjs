// Renders resume/resume.html to public/resume.pdf with headless Chrome.
// Usage: node resume/build.mjs   (set CHROME_PATH if Chrome lives elsewhere)
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const input = pathToFileURL(join(here, "resume.html")).href;
const output = resolve(here, "..", "public", "resume.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error("Chrome not found; set CHROME_PATH");

execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=8000", // let web fonts load
  `--print-to-pdf=${output}`,
  input,
]);
console.log("wrote", output);
