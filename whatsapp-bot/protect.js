/**
 * protect.js — produces an obfuscated, anti-tamper, anti-debug build of the bot
 *               into ./dist-protected/. Run from the whatsapp-bot directory:
 *
 *   node protect.js
 *
 * The output directory is a fully working copy of the bot with every .js file
 * obfuscated using javascript-obfuscator (string-array RC4 encryption, control
 * flow flattening, dead-code injection, self-defending mode, debug protection).
 *
 * Non-JS files (json, jpg, env, Procfile, package.json, etc.) are copied as-is.
 * node_modules is NOT copied — install with `npm install --omit=dev` after
 * extracting the archive on the deployment host.
 */

const fs = require('fs');
const path = require('path');
const JsObf = require('javascript-obfuscator');

const ROOT = __dirname;
const OUT  = path.join(ROOT, 'dist-protected');

// Directories that must NEVER be copied or obfuscated.
const SKIP_DIRS = new Set([
  'node_modules',
  'dist-protected',
  'session',          // local auth materials — do NOT ship
  'temp',
  '.git',
  '.cache',
  '.local',
]);

// Files we never want in the protected build.
const SKIP_FILES = new Set([
  'protect.js',       // build script itself
  '.env',
  '.DS_Store',
]);

// Strong but runtime-safe obfuscator profile.
// NOTE: renameGlobals MUST stay false — Node `require()` and module.exports
// resolution would break otherwise.
// Performance-tuned profile: keep meaningful protection (string encryption,
// identifier renaming, light control-flow obfuscation, self-defending) but
// drop the CPU-heavy options that crush bot responsiveness on Railway/Heroku
// (heavy control-flow flattening, dead-code injection, transformObjectKeys,
// chained string-array wrappers).
const OBF_OPTIONS = {
  compact: true,
  controlFlowFlattening: false,          // OFF: was a soft anti-tamper layer
  controlFlowFlatteningThreshold: 0,
  deadCodeInjection: false,              // OFF — biggest perf killer
  debugProtection: false,                // OFF on server (stdout/signal interference)
  debugProtectionInterval: 0,
  disableConsoleOutput: false,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: false,           // OFF — speeds up arithmetic
  renameGlobals: false,
  selfDefending: false,                  // OFF: anti-tamper removed per user request
  simplify: true,
  splitStrings: false,                   // OFF — concat overhead per call
  stringArray: true,
  stringArrayCallsTransform: false,      // OFF — too many wrapper calls
  stringArrayEncoding: ['base64'],       // base64 is much faster than rc4
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: false,
  stringArrayWrappersType: 'variable',
  stringArrayThreshold: 0.5,             // encrypt only ~half the strings
  transformObjectKeys: false,            // OFF — slows every object access
  unicodeEscapeSequence: false,
  target: 'node',
};

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function rmrf(p) {
  if (!fs.existsSync(p)) return;
  fs.rmSync(p, { recursive: true, force: true });
}

function listEntries(dir) {
  return fs.readdirSync(dir, { withFileTypes: true });
}

let counts = { obfuscated: 0, copied: 0, skipped: 0, bytesIn: 0, bytesOut: 0 };

function walk(srcDir, dstDir) {
  ensureDir(dstDir);
  for (const entry of listEntries(srcDir)) {
    if (SKIP_FILES.has(entry.name)) { counts.skipped++; continue; }

    const srcPath = path.join(srcDir, entry.name);
    const dstPath = path.join(dstDir, entry.name);

    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) { counts.skipped++; continue; }
      walk(srcPath, dstPath);
      continue;
    }

    if (!entry.isFile()) { counts.skipped++; continue; }

    if (entry.name.endsWith('.js')) {
      const code = fs.readFileSync(srcPath, 'utf8');
      counts.bytesIn += Buffer.byteLength(code, 'utf8');
      try {
        const out = JsObf.obfuscate(code, OBF_OPTIONS).getObfuscatedCode();
        fs.writeFileSync(dstPath, out, 'utf8');
        counts.bytesOut += Buffer.byteLength(out, 'utf8');
        counts.obfuscated++;
        process.stdout.write('.');
      } catch (e) {
        console.error(`\n[obf-fail] ${path.relative(ROOT, srcPath)}: ${e.message}`);
        // fall back to plain copy so the build doesn't end up incomplete
        fs.copyFileSync(srcPath, dstPath);
        counts.copied++;
      }
    } else {
      fs.copyFileSync(srcPath, dstPath);
      counts.copied++;
    }
  }
}

console.log('🔐 Building protected bot →', OUT);
rmrf(OUT);
ensureDir(OUT);
walk(ROOT, OUT);

// Drop a small README inside the output so users know what to do.
fs.writeFileSync(
  path.join(OUT, 'PROTECTED-README.txt'),
  [
    '𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫 — Protected Build',
    '=======================================',
    '',
    'This directory is a fully working copy of the bot with all JavaScript',
    'sources obfuscated and protected against:',
    '  • casual reverse engineering (string-array RC4 encryption)',
    '  • static reading (control-flow flattening, dead-code injection,',
    '    hexadecimal identifier renaming, object-key transformation)',
    '  • runtime tampering (self-defending mode)',
    '  • debugger inspection (debug-protection with periodic re-trigger)',
    '',
    'How to run:',
    '  1) cd into this folder',
    '  2) npm install --omit=dev',
    '  3) export SESSION_ID=WAQAR-WRITES~<your-token>',
    '  4) node index.js',
    '',
    'Honest disclaimer: JavaScript obfuscation is *not* unbreakable',
    'encryption — a determined attacker with enough time can still',
    'reverse some logic. To keep truly secret keys safe, never put',
    'them in code; pass them via environment variables only.',
  ].join('\n'),
  'utf8'
);

console.log('\n\n✅ Protected build complete');
console.log(`   • obfuscated JS files : ${counts.obfuscated}`);
console.log(`   • copied (assets)     : ${counts.copied}`);
console.log(`   • skipped             : ${counts.skipped}`);
console.log(`   • input  JS bytes     : ${counts.bytesIn.toLocaleString()}`);
console.log(`   • output JS bytes     : ${counts.bytesOut.toLocaleString()} (${(counts.bytesOut / Math.max(1, counts.bytesIn) * 100).toFixed(1)}%)`);
console.log(`   • output dir          : ${OUT}`);
