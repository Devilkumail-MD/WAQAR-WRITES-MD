const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'database', 'toggles.json');
function load() {
  try { return JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (_) { return {}; }
}
function save(d) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(d, null, 2));
}
function get(k, def=false) { return load()[k] ?? def; }
function set(k, v) { const d = load(); d[k] = v; save(d); return d; }
module.exports = { load, save, get, set };
