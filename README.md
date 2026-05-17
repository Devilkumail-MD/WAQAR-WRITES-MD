# 𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫

A fast, multi-command WhatsApp bot built on Baileys.
Prefix: `.` &nbsp;|&nbsp; Node.js 20+ &nbsp;|&nbsp; 290+ commands

---

## 🔑 Environment Variables

### ✅ REQUIRED (bot won't start without this)

| Variable | Description | Example |
|---|---|---|
| `SESSION_ID` | Your WAQAR WRITES session string. Pair your number at the session generator and paste the **full** string. | `WAQAR-WRITES~ABC123xyz...` |

### 🟡 RECOMMENDED

| Variable | What it enables | Default |
|---|---|---|
| `NODE_ENV` | Set to `production` on Railway/Heroku for cleaner logs and better performance | `development` |
| `SESSION_GEN_URL` | Override the session-generator URL (only if you self-host the generator) | `https://waqar-writes-md.replit.app/session/` |

### 🔵 OPTIONAL (unlocks AI features)

| Variable | Enables | How to get |
|---|---|---|
| `GEMINI_API_KEY` | `.gemini` AI chat command | [ai.google.dev](https://ai.google.dev) (free tier) |
| `OPENAI_API_KEY` | OpenAI chat / DALL-E | [platform.openai.com](https://platform.openai.com) |

### 🟤 ADVANCED (rarely needed)

| Variable | Purpose | Default |
|---|---|---|
| `PORT` | HTTP port (only if you add a healthcheck server) | none |
| `YTDLP_BIN` | Custom yt-dlp binary path for `.song` / `.video` | auto-detect |
| `PUPPETEER_SKIP_DOWNLOAD` | Skip Chromium download (saves space on free tiers) | `false` |
| `UPDATE_ZIP_URL` | Source ZIP for the `.update` command | GitHub repo |

> **Owner numbers** are hard-coded in `whatsapp-bot/config.js` — **not** env vars. Edit the file and redeploy to change them.

---

## 🚂 Deploy to Railway (Recommended)

Railway is the easiest host — free 500 hours/month, auto-deploys from GitHub on every push.

### Step-by-step:

1. **Fork or import this repo** to your GitHub.
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo** → pick this repo.
3. Railway auto-detects Node.js. It reads `whatsapp-bot/railway.json` + `whatsapp-bot/nixpacks.toml` (Node 20 + ffmpeg + libwebp already configured).
4. After first deploy fails (no SESSION_ID yet), go to **Variables** tab and add:

   ```
   SESSION_ID = WAQAR-WRITES~<your_full_session_string>
   NODE_ENV   = production
   ```

5. **Settings** → **Region** → pick the closest to your users:
   - Pakistan / India / Middle East → **Singapore (`sin1`)** or **Frankfurt (`fra1`)**
   - Europe → **Frankfurt (`fra1`)**
   - US → **us-west** or **us-east** (default)

   > Wrong region = +200-400ms extra latency on every command.

6. **Settings** → **Redeploy**.
7. Open **Deploy Logs**. You should see:

   ```
   📡 Session : 🔑 Retrieved from Waqar writes Session
   ✅ Bot connected successfully!
   📱 Bot Number: <your number>
   Bot is ready to receive messages!
   ```

   Both owners also receive a private "Bot is Online" DM.

### Keeping it awake (free tier)

Railway's free tier sleeps idle services. Two options:
- **Upgrade** to Pro ($5/mo) — never sleeps.
- **Free workaround**: set up [UptimeRobot](https://uptimerobot.com) to ping your Railway URL every 5 minutes.

---

## 🔑 Getting a SESSION_ID

1. Visit the session generator: **<https://waqar-writes-md.replit.app/session/>**
2. Choose **Pair Code** method.
3. Enter your bot's WhatsApp number (digits only, with country code, e.g. `447520643901`).
4. On your phone: **WhatsApp → Linked Devices → Link a Device → Link with phone number** → enter the 8-digit code shown.
5. Wait ~10 seconds. The page will show a string starting with `WAQAR-WRITES~......`.
6. Copy the **whole string** and paste it into Railway's `SESSION_ID` variable.

> ⚠️ **One session = one host at a time.** Running the same `SESSION_ID` on Railway + Heroku + VPS simultaneously will cause them to keep disconnecting each other.

---

## 💻 Other Hosting Options

See [`whatsapp-bot/DEPLOY.md`](./whatsapp-bot/DEPLOY.md) for full step-by-step guides for:
- **Heroku** (eco dyno ~$5/mo)
- **Docker** (any host — Render, Fly.io, DigitalOcean, VPS)
- **VPS** (Ubuntu/Debian with PM2)
- **Termux** (run on your Android phone)

---

## 📦 Local Run (testing)

```bash
cd whatsapp-bot
npm install --legacy-peer-deps
export SESSION_ID="WAQAR-WRITES~......"
export NODE_ENV=production
node index.js
```

---

## 👑 Owner Numbers

Hard-coded in `whatsapp-bot/config.js`:

```js
ownerNumber: ['923375626980', '447520643901'],
ownerName:   ['𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫', '𝙳𝙴𝚅𝙸𝙻 𝚇'],
```

Edit and push to change. Owners get the start-up DM and can use owner-only commands (`.mode`, `.setbotname`, `.update`, etc.).

---

## 🆘 Common Issues

| Symptom | Fix |
|---|---|
| `Connection Failure` on boot | Wait 5–10 sec — Baileys reconnects. If it loops, your `SESSION_ID` is invalid → regenerate. |
| `SESSION_ID is not defined` | Env var not set on host. Add it in Railway → Variables. |
| Bot connects but commands don't reply | Use the prefix `.` (e.g. `.menu`, `.ping`). Also check Railway region. |
| Commands respond **slowly** (>3 sec) | Railway region is far from you. Switch to Singapore or Frankfurt. |
| `Connection closed: Stream Errored (conflict)` | Same `SESSION_ID` is running somewhere else — stop the other instance OR generate a fresh session. |
| `.song` / `.video` fails | Host missing `yt-dlp` or `ffmpeg`. Railway/Heroku configs in repo already include them. |
| Old log text "KnightBot Session" still showing | Railway hasn't auto-redeployed. Go to Deployments tab → click latest commit → **Redeploy**. |

---

## 📁 Repo Structure

```
WAQAR-WRITES-MD/
├── whatsapp-bot/             # ← the bot
│   ├── index.js              # entry point (obfuscated)
│   ├── handler.js            # message handler (optimized hot path)
│   ├── config.js             # bot config + owner numbers
│   ├── commands/             # 290+ commands (obfuscated)
│   │   ├── admin/
│   │   ├── ai/
│   │   ├── downloader/
│   │   ├── fun/
│   │   ├── general/
│   │   ├── group/
│   │   ├── owner/
│   │   ├── search/
│   │   └── sticker/
│   ├── utils/                # shared helpers (plain)
│   ├── railway.json          # Railway build config
│   ├── nixpacks.toml         # Railway runtime packages (ffmpeg, etc.)
│   └── DEPLOY.md             # full deploy guide
└── README.md                 # ← you are here
```

---

## 🛡️ Code Protection

`index.js` and all command files are obfuscated to deter casual copying.
**No** anti-debug, **no** anti-tamper — won't break on minor edits or reformatting. Safe to run on any standard Node.js 20+ environment.

---

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫 &nbsp;|&nbsp; Author: [Devilkumail-MD](https://github.com/Devilkumail-MD)
