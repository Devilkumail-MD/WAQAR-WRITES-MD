# 𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫

Your Bot. Your Rules. — A WhatsApp Multi-Device bot built on Baileys.

> Prefix: `.` &nbsp;|&nbsp; Node.js 20+ &nbsp;|&nbsp; Owner: 𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺

---

## ⚙️ Environment Variables

### ✅ Required (must set)

| Variable | Description | Example |
|---|---|---|
| `SESSION_ID` | Your WAQAR WRITES session string. Get it by pairing your WhatsApp number at the WAQAR WRITES session generator site, then paste the **full** string here. | `WAQAR-WRITES~ABC123xyz...` |

> Without `SESSION_ID` the bot **will not connect** to WhatsApp.

---

### 🟡 Optional (recommended — features unlock when set)

| Variable | What it enables | Default |
|---|---|---|
| `GEMINI_API_KEY` | Gemini AI chat / image features (`.gemini`, AI commands) | _disabled_ |
| `OPENAI_API_KEY` | OpenAI chat / DALL-E features | _disabled_ |
| `NODE_ENV` | Set to `production` on hosts like Railway / Heroku for cleaner logs | `development` |

---

### 🔵 Optional (advanced / rarely needed)

| Variable | Purpose | Default |
|---|---|---|
| `YTDLP_BIN` | Custom path to a `yt-dlp` binary (for `.song`, `.video` downloaders) | auto-detect on `PATH` |
| `PUPPETEER_SKIP_DOWNLOAD` | Skip Chromium download during `npm install` (saves space on free tiers) | `false` |
| `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` | Same as above (legacy name) | `false` |
| `PUPPETEER_CACHE_DIR` | Where Puppeteer stores Chromium | `~/.cache/puppeteer` |
| `SESSION_GEN_URL` | Override session-generator URL shown in `.pair` command | built-in |
| `UPDATE_ZIP_URL` | Source ZIP URL used by `.update` command | GitHub repo zip |
| `TMPDIR` / `TMP` / `TEMP` | Temp directory for media processing | `/tmp` |

---

## 🚀 Quick Start

1. **Get your session** — go to the WAQAR WRITES session generator, pair your number, copy the full `WAQAR-WRITES~...` string.
2. **Set environment variable** on your host:
   ```env
   SESSION_ID=WAQAR-WRITES~your_full_session_string_here
   ```
3. **Deploy** — see [`DEPLOY.md`](./DEPLOY.md) for Railway / Heroku / VPS / Termux step-by-step guides.
4. Logs will show `✅ Bot connected successfully!` when ready.

---

## 👑 Owner Numbers

Owners are hard-coded in `config.js` (not env vars):

```js
ownerNumber: ['923375626980', '447520643901']
```

Edit and redeploy to change owners.

---

## 📦 Local Run

```bash
npm install
export SESSION_ID="WAQAR-WRITES~......"
node index.js
```

---

## 🆘 Common Issues

| Symptom | Fix |
|---|---|
| `Connection Failure` on boot | Wait 5–10 seconds — Baileys reconnects automatically. If it loops, your `SESSION_ID` is invalid → re-pair and update. |
| `SESSION_ID is not defined` | You forgot to set the env var on your host. |
| Bot connects but commands don't reply | Make sure you use the prefix `.` (e.g. `.menu`, `.repo`). |
| `.song` / `.video` fails | Host is missing `yt-dlp` and/or `ffmpeg`. Railway/Heroku configs in this repo already include them. |

---

## 📄 Docs

- [`DEPLOY.md`](./DEPLOY.md) — full deployment guide (Railway, Heroku, VPS, Termux)
- `.repo` command — live repository stats inside WhatsApp

---

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫
