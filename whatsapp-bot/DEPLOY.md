# Deployment Guide — 𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫

This bot runs anywhere Node.js 20+ runs. Below are step-by-step guides for **Heroku**, **Railway**, and a **VPS / Termux**.

> **Required env var:** `SESSION_ID` — your WAQAR WRITES session string (starts with `WAQAR-WRITES~`).
> Get it by pairing your WhatsApp number at the WAQAR WRITES session site, then paste the full string.

---

## 🚂 Railway (Easiest — Recommended)

1. Push this folder to a GitHub repo (private is fine).
2. Open [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
3. Pick this repo. Railway auto-detects Node.js + reads `railway.json` & `nixpacks.toml` (ffmpeg + node 20 already configured).
4. Go to **Variables** tab → Add:
   - `SESSION_ID` = `WAQAR-WRITES~......` (your full session string)
5. Deploy. Logs will show `✅ Bot connected successfully!`

That's it. Railway gives 500 hours free / month.

---

## 🟣 Heroku

1. Push this folder to GitHub.
2. Click "Deploy to Heroku" or:
   ```bash
   heroku login
   heroku create my-waqar-bot --stack=heroku-22
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git
   heroku config:set SESSION_ID="WAQAR-WRITES~......"
   git push heroku main
   heroku ps:scale worker=1 web=0
   heroku logs --tail
   ```
3. Bot uses **`worker` dyno** (not `web`) — important so it stays alive without HTTP traffic.

> Heroku free tier ended; eco dyno (~$5/mo) is recommended.

---

## 🐳 Docker (any host: Render, Fly.io, DigitalOcean, your VPS)

```bash
docker build -t waqar-bot .
docker run -d --name waqar-bot \
  -e SESSION_ID="WAQAR-WRITES~......" \
  -v $(pwd)/session:/app/session \
  -v $(pwd)/database:/app/database \
  --restart unless-stopped \
  waqar-bot
```

The `-v` mounts persist your session & user data across restarts.

---

## 💻 VPS (Ubuntu / Debian)

```bash
# Install Node 20 + ffmpeg
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs ffmpeg imagemagick libvips-dev build-essential

# Clone / upload bot folder
cd waqar-writes-md
npm install --legacy-peer-deps

# Set env
export SESSION_ID="WAQAR-WRITES~......"

# Run with PM2 (auto-restart)
sudo npm i -g pm2
pm2 start index.js --name waqar-bot
pm2 save
pm2 startup
```

---

## 📱 Termux (Android)

```bash
pkg update && pkg upgrade -y
pkg install -y nodejs git ffmpeg python build-essential libvips
git clone <your-repo-url>
cd waqar-writes-md
npm install --legacy-peer-deps
export SESSION_ID="WAQAR-WRITES~......"
node index.js
```

---

## 🔑 Getting a SESSION_ID

1. Visit the WAQAR WRITES session site.
2. Choose **Pair Code** method.
3. Enter your bot's WhatsApp number (e.g. `447520643901`).
4. Enter the 8-digit pair code in WhatsApp → **Linked Devices** → **Link a Device**.
5. After pairing, you'll get a string starting with `WAQAR-WRITES~......`. Copy the whole thing.
6. Paste it as `SESSION_ID` in your host's env vars.

⚠️ **Same session = ONE host only**. Running on Railway + Heroku + VPS at the same time will keep kicking each other off WhatsApp.

---

## 🆘 Troubleshooting

| Issue | Fix |
|---|---|
| `Connection closed: Stream Errored (conflict)` | Same session running elsewhere — stop one, OR generate a new SESSION_ID for this host. |
| `Connection Failure` | Wait 1-2 minutes, restart. If persists, regenerate SESSION_ID. |
| `Cannot find module 'sharp'` | `npm rebuild sharp` |
| GIFs not sending | Make sure `ffmpeg` is installed on the host. |
| `.chatbot on` doesn't reply | You must mention the bot or reply to its message — passive chat is off by design. |

---

## 📂 Persistent files

These folders should survive restarts (Railway/Heroku reset filesystem on redeploy unless mounted):
- `session/` — WhatsApp auth (regenerated from SESSION_ID env on first boot, but keeping it alive is faster).
- `database/` — users, groups, warns, mods, chatbot toggles, antiX settings.
