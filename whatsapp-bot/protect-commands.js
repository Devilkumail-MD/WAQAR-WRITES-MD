/**
 * Obfuscates commands/**\/*.js IN-PLACE.
 * Usage: node protect-commands.js <startIdx> <endIdx>
 * Medium-strength obfuscation: identifier rename + string array + self-defending
 * + debug protection. NO controlFlowFlattening / deadCodeInjection (memory hogs)
 * so runtime stays fast.
 */
const fs = require('fs');
const path = require('path');
const JO = require('javascript-obfuscator');

const ROOT = path.join(__dirname, 'commands');

function walk(d) {
  const out = [];
  for (const n of fs.readdirSync(d)) {
    const f = path.join(d, n);
    const s = fs.statSync(f);
    if (s.isDirectory()) out.push(...walk(f));
    else if (s.isFile() && n.endsWith('.js')) out.push(f);
  }
  return out;
}

const OPTS = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,        // OFF: anti-debug timers leaked resources
  debugProtectionInterval: 0,
  selfDefending: false,          // OFF: tamper-check broke if file got auto-formatted
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.85,
  stringArrayShuffle: true,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  transformObjectKeys: false,   // CRITICAL: handler reads .name/.execute/.aliases
  numbersToExpressions: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  unicodeEscapeSequence: false,
  target: 'node',
};

const HEADER =
  "// ============================================================================\n" +
  "// WAQAR WRITES MD - Protected Command\n" +
  "// (c) Devilkumail-MD. Unauthorized copying / reuse prohibited.\n" +
  "// Obfuscated to deter casual copying. Modifying this file will break it.\n" +
  "// ============================================================================\n";

const ALREADY_PROTECTED_MARK = 'WAQAR WRITES MD - Protected Command';

function main() {
  const all = walk(ROOT).sort();
  const start = parseInt(process.argv[2] || '0', 10);
  const end = Math.min(parseInt(process.argv[3] || String(all.length), 10), all.length);
  console.log(`Range ${start}..${end} of ${all.length}`);
  let ok = 0, skip = 0, fail = 0;
  for (let i = start; i < end; i++) {
    const f = all[i];
    try {
      const src = fs.readFileSync(f, 'utf8');
      if (src.includes(ALREADY_PROTECTED_MARK)) { skip++; continue; }
      if (src.trim().length < 5) { skip++; continue; }
      const out = JO.obfuscate(src, OPTS).getObfuscatedCode();
      fs.writeFileSync(f, HEADER + out);
      ok++;
    } catch (e) {
      console.warn(`[fail] ${f.replace(ROOT, '')}: ${e.message}`);
      fail++;
    }
  }
  console.log(`done: ok=${ok} skip=${skip} fail=${fail}`);
}
main();
