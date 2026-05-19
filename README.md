<!-- Animated gradient banner -->
<p align="center">
  <a href="https://github.com/Devilkumail-MD/WAQAR-WRITES-MD">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,50:2c5364,100:00c6ff&height=220&section=header&text=WAQAR%20WRITES%20MD&fontSize=58&fontColor=ffffff&fontAlignY=38&desc=Fast%20Multi-Command%20WhatsApp%20Bot%20%E2%80%A2%20Built%20on%20Baileys&descSize=18&descAlignY=60&animation=fadeIn" alt="banner" />
  </a>
</p>

<!-- Animated typing line -->
<p align="center">
  <a href="https://github.com/Devilkumail-MD/WAQAR-WRITES-MD">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=2800&pause=900&color=00C6FF&center=true&vCenter=true&width=720&lines=Welcome+to+WAQAR+WRITES+MD;290%2B+Commands+%E2%80%A2+Prefix+%60.%60+%E2%80%A2+Node.js+20%2B;Deploy+on+Railway+in+under+2+minutes;Owner-only+startup+DM+%E2%80%A2+Smart+caching+%E2%80%A2+Anti-call" alt="typing" />
  </a>
</p>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/github/stars/Devilkumail-MD/WAQAR-WRITES-MD?style=for-the-badge&logo=github&color=00c6ff&logoColor=white&labelColor=0f2027" alt="stars" />
  <img src="https://img.shields.io/github/forks/Devilkumail-MD/WAQAR-WRITES-MD?style=for-the-badge&logo=git&color=2c5364&logoColor=white&labelColor=0f2027" alt="forks" />
  <img src="https://img.shields.io/github/last-commit/Devilkumail-MD/WAQAR-WRITES-MD?style=for-the-badge&logo=github&color=ff0080&logoColor=white&labelColor=0f2027" alt="last commit" />
  <img src="https://img.shields.io/github/repo-size/Devilkumail-MD/WAQAR-WRITES-MD?style=for-the-badge&logo=files&color=8a2be2&logoColor=white&labelColor=0f2027" alt="size" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=0f2027" alt="node" />
  <img src="https://img.shields.io/badge/Baileys-Latest-25D366?style=for-the-badge&logo=whatsapp&logoColor=white&labelColor=0f2027" alt="baileys" />
  <img src="https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white&labelColor=0f2027" alt="railway" />
  <img src="https://img.shields.io/badge/Prefix-.-FF6B6B?style=for-the-badge&logoColor=white&labelColor=0f2027" alt="prefix" />
  <img src="https://img.shields.io/badge/Commands-290%2B-FFD700?style=for-the-badge&logoColor=white&labelColor=0f2027" alt="commands" />
</p>

<!-- Profile / visitor counters -->
<p align="center">
  <img src="https://profile-counter.glitch.me/Devilkumail-MD-waqar-writes-md/count.svg" alt="visitors" />
</p>

<!-- Snake animation divider -->
<p align="center">
  <img src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg" alt="snake" />
</p>

<h1 align="center">𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫</h1>

<p align="center">
A fast, multi-command WhatsApp bot built on Baileys.<br/>
Prefix: <code>.</code> &nbsp;|&nbsp; Node.js 20+ &nbsp;|&nbsp; 290+ commands
</p>

<p align="center">
  <a href="#-deploy-to-railway-recommended"><img src="https://img.shields.io/badge/-DEPLOY%20NOW-00c6ff?style=for-the-badge&logoColor=white" alt="deploy" /></a>
  <a href="https://waqar-writes-md.replit.app/session/"><img src="https://img.shields.io/badge/-GET%20SESSION-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="session" /></a>
  <a href="#-common-issues"><img src="https://img.shields.io/badge/-TROUBLESHOOT-ff0080?style=for-the-badge&logoColor=white" alt="trouble" /></a>
</p>

---

## 🔑 Environment Variables

These are the **only** variables the bot reads. Anything else is unused — don't add extra junk.

### ✅ REQUIRED

| Variable | Description | Example |
|---|---|---|
| `SESSION_ID` | Your WAQAR WRITES session string. Pair your number at the session generator and paste the **full** string. | `WAQAR-WRITES~ABC123xyz...` |
| `SESSION_GEN_URL` | Custom session-generator URL (only if you self-host it) | default: `https://waqar-writes-md.replit.app/session/` |

### 🟡 RECOMMENDED (set on every host)

| Variable | What it does | Value |
|---|---|---|
| `NODE_ENV` | Cleaner logs + better performance in production | `production` |

### 🔵 OPTIONAL — only add if you want that feature

| Variable | Enables | How to get |
|---|---|---|
| `GEMINI_API_KEY` | `.gemini` AI chat | [ai.google.dev](https://ai.google.dev) (free tier) |
| `OPENAI_API_KEY` | `.gpt` AI chat | [platform.openai.com](https://platform.openai.com) |
---

## ⚙️ `whatsapp-bot/config.js` — All Settings

Anything that is **not** an env variable lives in [`whatsapp-bot/config.js`](./whatsapp-bot/config.js). Edit the file, commit, push → Railway redeploys automatically.

### 👑 Identity

| Key | Current value | What it does |
|---|---|---|
| `ownerNumber` | `['your number']` | Owner numbers (no `+`, no spaces). Both get the startup DM and owner-only commands. |
| `ownerName` | `['your name']` | Display names for each owner (same order as `ownerNumber`). |
| `prefix` | `your prefix like (+,.!)` | Command prefix. Change to `!`, `/`, `#`, etc. if you want. |

### 🔗 Links

| Key | Default | What it does |
|---|---|---|
| `sessionGenUrl` | `https://waqar-writes-md.replit.app/session/` | Session generator URL. Env `SESSION_GEN_URL` overrides this. |
| `updateZipUrl` | `https://github.com` | ZIP source for `.update`. Env `UPDATE_ZIP_URL` overrides this. |

### 🤖 Bot Behavior (toggles, default = OFF)

| Key | What happens when `true` |
|---|---|
| `selfMode` | Private mode — **only owners** can use commands. |
| `autoRead` | Bot auto-reads every message. |
| `autoTyping` | Shows "typing…" before replying. |
| `autoBio` | Auto-updates bot's WhatsApp bio. |
| `autoSticker` | Auto-converts every image/video sent to bot into a sticker. |
| `autoReact` | Bot auto-reacts to messages with emojis. |
| `autoReactMode` | `'bot'` = bot's own messages, `'all'` = everyone. |
| `autoDownload` | Auto-downloads media from links. |

### 👥 Default Group Settings (`defaultGroupSettings`)

Applied to **new** groups. Existing groups keep their own per-group settings (changed via in-chat commands).

| Key | Default | Effect when ON |
|---|---|---|
| `antilink` | `false` | Deletes/kicks on link posting (action: `antilinkAction` → `'delete'`, `'kick'`, `'warn'`) |
| `antitag` | `false` | Action on @everyone-style tags (action: `antitagAction`) |
| `antiall` | `false` | **Owner only** — blocks all messages from non-admins |
| `antiviewonce` | `false` | Reveals view-once media |
| `antibot` | `false` | Removes other bots from group |
| `anticall` | `false` | Auto-rejects voice/video calls |
| `antigroupmention` | `false` | Action on group-link mentions (action: `antigroupmentionAction`) |
| `welcome` | `false` | Sends welcome message (text: `welcomeMessage`) |
| `goodbye` | `false` | Sends goodbye message (text: `goodbyeMessage`) |
| `antiSpam` | `false` | Spam flood protection |
| `antidelete` | `false` | Resends deleted messages |
| `nsfw` | `false` | Allows NSFW commands in group |
| `detect` | `false` | Detects group setting changes (name/icon/desc) |
| `chatbot` | `false` | AI chatbot replies to every message |
| `autosticker` | `false` | Group-level auto-sticker |

---
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
3. Enter your bot's WhatsApp number (digits only, with country code, e.g. `923012345678`).
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


> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫 &nbsp;|&nbsp; Author: [Devilkumail-MD](https://github.com/Devilkumail-MD)
