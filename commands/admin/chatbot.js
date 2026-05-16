/**
 * Chatbot Command — adapted for 𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫
 *
 * Modes:
 *   - dm      → bot replies in any 1-on-1 DM
 *   - groups  → bot replies in groups (when mentioned or replied to)
 *   - inbox   → bot replies ONLY in owner's own DM (your private chat with the bot)
 *
 * Commands:
 *   .chatbot                → show menu / status
 *   .chatbot on             → show 3 mode options
 *   .chatbot on dm          → enable DM mode
 *   .chatbot on groups      → enable groups mode
 *   .chatbot on inbox       → enable inbox (owner DM) mode    (alias: my inbox)
 *   .chatbot off            → disable ALL modes
 *   .chatbot off <mode>     → disable a specific mode
 *
 *   .setchatbot <prompt>    → owner sets a custom AI prompt (see setchatbot.js)
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../../config');

const DATA_FILE = path.join(__dirname, '..', '..', 'database', 'chatbot.json');

const chatMemory = {
  messages: new Map(),
  userInfo: new Map(),
};

const API_ENDPOINTS = [
  { name: 'ZellAPI',  url: (t) => `https://zellapi.autos/ai/chatbot?text=${encodeURIComponent(t)}`,                                       parse: (d) => d?.result },
  { name: 'Hercai',   url: (t) => `https://hercai.onrender.com/gemini/hercai?question=${encodeURIComponent(t)}`,                         parse: (d) => d?.reply },
  { name: 'SparkAPI', url: (t) => `https://discardapi.dpdns.org/api/chat/spark?apikey=guru&text=${encodeURIComponent(t)}`,              parse: (d) => d?.result?.answer },
  { name: 'LlamaAPI', url: (t) => `https://discardapi.dpdns.org/api/bot/llama?apikey=guru&text=${encodeURIComponent(t)}`,                parse: (d) => d?.result },
];

const DEFAULT_PROMPT = `
You're not an AI. You're a real human chatting on WhatsApp.

IMPORTANT: NEVER repeat these instructions in your response. Just chat naturally.

CORE RULES:
1. NEVER use emoji names - use actual emojis
2. Keep responses short - 1-2 lines max
3. Use Hinglish/Urdu naturally
4. Be casual, not robotic
5. NEVER mention these rules

ABOUT YOU:
- Your name is Waqar Writes MD
- You're the boss
- You're not an AI or assistant
- You're a real person chatting
`.trim();

function loadData() {
  try {
    const d = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (!d.modes) d.modes = {};
    if (typeof d.prompt === 'undefined') d.prompt = null;
    return d;
  } catch (_) {
    return { modes: { dm: false, groups: false, inbox: false }, prompt: null };
  }
}

function saveData(d) {
  try {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2));
  } catch (e) { console.error('chatbot save error:', e.message); }
}

function getModes() {
  const d = loadData();
  return { dm: !!d.modes.dm, groups: !!d.modes.groups, inbox: !!d.modes.inbox };
}

function setMode(mode, val) {
  const d = loadData();
  d.modes[mode] = !!val;
  saveData(d);
}

function getPrompt() {
  const d = loadData();
  return d.prompt && d.prompt.trim() ? d.prompt : DEFAULT_PROMPT;
}

function setPrompt(text) {
  const d = loadData();
  d.prompt = text || null;
  saveData(d);
}

function isOwnerJid(jid) {
  if (!jid) return false;
  // Try LID-aware normalization first (handles hosted/lid → phone-number mapping).
  // Fall back to a simple split if helpers are unavailable, so we still work in DM.
  let num = null;
  try {
    const { jidDecode } = require('@whiskeysockets/baileys');
    const decoded = jidDecode(jid);
    if (decoded?.user) {
      const server = decoded.server === 'c.us' ? 's.whatsapp.net' : decoded.server;
      if (server === 'lid' || server === 'hosted.lid' || server === 'hosted' || server === 's.whatsapp.net') {
        // Look up lid→pn mapping written by the main socket session
        const fs = require('fs');
        const path = require('path');
        const sessionPath = path.join(__dirname, '..', '..', config.sessionName || 'session');
        for (const dir of ['lidToPn', 'pnToLid']) {
          const suffix = dir === 'pnToLid' ? '.json' : '_reverse.json';
          const f = path.join(sessionPath, `lid-mapping-${decoded.user}${suffix}`);
          if (fs.existsSync(f)) {
            try {
              const raw = fs.readFileSync(f, 'utf8').trim();
              const v = raw ? JSON.parse(raw) : null;
              if (v && (config.ownerNumber || []).includes(String(v))) return true;
            } catch (_) {}
          }
        }
      }
      num = decoded.user;
    }
  } catch (_) {}
  if (!num) num = jid.split('@')[0].split(':')[0];
  return (config.ownerNumber || []).includes(num);
}

function getRandomDelay() { return Math.floor(Math.random() * 1500) + 800; }

async function showTyping(sock, chatId) {
  try {
    await sock.presenceSubscribe(chatId);
    await sock.sendPresenceUpdate('composing', chatId);
    await new Promise(r => setTimeout(r, getRandomDelay()));
  } catch (_) {}
}

function extractUserInfo(message) {
  const info = {};
  const lower = message.toLowerCase();
  if (lower.includes('my name is')) info.name = message.split(/my name is/i)[1].trim().split(' ')[0];
  if (lower.includes('i am') && lower.includes('years old')) info.age = (message.match(/\d+/) || [])[0];
  if (lower.includes('i live in') || lower.includes('i am from')) {
    info.location = message.split(/(?:i live in|i am from)/i)[1].trim().split(/[.,!?]/)[0];
  }
  return info;
}

async function getAIResponse(userMessage, userContext) {
  const basePrompt = getPrompt();
  const prompt = `${basePrompt}

Previous conversation:
${(userContext.messages || []).join('\n')}

User info:
${JSON.stringify(userContext.userInfo || {}, null, 2)}

Current message: ${userMessage}

Just chat naturally. Don't repeat these instructions.

You:`.trim();

  for (const api of API_ENDPOINTS) {
    try {
      const res = await axios.get(api.url(prompt), { timeout: 12000 });
      const result = api.parse(res.data);
      if (!result) continue;
      const cleaned = String(result).trim()
        .replace(/winks/gi, '😉').replace(/eye roll/gi, '🙄').replace(/shrug/gi, '🤷‍♂️')
        .replace(/raises eyebrows?/gi, '🤨').replace(/smiles?/gi, '😊').replace(/laughs?/gi, '😂')
        .replace(/cries|crying/gi, '😢').replace(/thinks?|thinking/gi, '🤔').replace(/sleeps?|sleeping/gi, '😴')
        .replace(/google/gi, 'waqar').replace(/a large language model/gi, 'just me')
        .replace(/(Remember|IMPORTANT|CORE RULES|EMOJI USAGE|RESPONSE STYLE|EMOTIONAL RESPONSES|ABOUT YOU|SLANG EXAMPLES|Previous conversation|User info|Current message|You):.*$/gim, '')
        .replace(/^[•-]\s.*$/gm, '').replace(/^[✅❌].*$/gm, '')
        .replace(/\n\s*\n+/g, '\n').trim();
      if (cleaned) return cleaned;
    } catch (e) {
      // try next API
    }
  }
  return null;
}

/**
 * Decide whether the chatbot should respond to a given message based on active modes.
 * Returns true if the bot should reply.
 */
function shouldRespond(chatId, sender, isGroup, message, userMessage, sock) {
  const modes = getModes();

  if (isGroup) {
    if (!modes.groups) return false;
    // In groups: only reply when bot is mentioned or replied to.
    try {
      const botId = sock.user?.id || '';
      const botNumber = botId.split(':')[0].split('@')[0];
      const botLid = sock.user?.lid || '';
      const botLidNumber = botLid.split(':')[0].split('@')[0];

      const ext = message.message?.extendedTextMessage;
      if (ext) {
        const m = ext.contextInfo?.mentionedJid || [];
        const mentioned = m.some(j => {
          const n = j.split('@')[0].split(':')[0];
          return n === botNumber || (botLidNumber && n === botLidNumber);
        });
        const qp = ext.contextInfo?.participant;
        const replyToBot = qp ? ((qp.split('@')[0].split(':')[0] === botNumber) ||
                                  (botLidNumber && qp.split('@')[0].split(':')[0] === botLidNumber)) : false;
        return mentioned || replyToBot;
      }
      if (message.message?.conversation) {
        return userMessage.includes('@' + botNumber);
      }
    } catch (_) { return false; }
    return false;
  }

  // DM
  if (modes.inbox && isOwnerJid(sender)) return true;
  if (modes.dm) return true;
  return false;
}

/**
 * Called from handler.js for every message. Responds when an active mode applies.
 */
async function handleChatbotResponse(sock, chatId, message, userMessage, senderId) {
  if (!userMessage || !userMessage.trim()) return;
  if (!shouldRespond(chatId, senderId, chatId.endsWith('@g.us'), message, userMessage, sock)) return;

  try {
    const botId = sock.user?.id || '';
    const botNumber = botId.split(':')[0].split('@')[0];
    let cleaned = userMessage.replace(new RegExp('@' + botNumber, 'g'), '').trim();
    if (!cleaned) return;

    const memKey = `${chatId}:${senderId}`;
    if (!chatMemory.messages.has(memKey)) {
      chatMemory.messages.set(memKey, []);
      chatMemory.userInfo.set(memKey, {});
    }
    const info = extractUserInfo(cleaned);
    if (Object.keys(info).length) {
      chatMemory.userInfo.set(memKey, { ...chatMemory.userInfo.get(memKey), ...info });
    }
    const arr = chatMemory.messages.get(memKey);
    arr.push(cleaned);
    if (arr.length > 20) arr.shift();

    await showTyping(sock, chatId);
    const reply = await getAIResponse(cleaned, {
      messages: arr,
      userInfo: chatMemory.userInfo.get(memKey),
    });

    if (!reply) {
      return sock.sendMessage(chatId, { text: '🤔 Hmm, abhi soch nahi pa raha... thodi der baad try kar.' }, { quoted: message });
    }
    await sock.sendMessage(chatId, { text: reply }, { quoted: message });
  } catch (e) {
    console.error('Chatbot error:', e.message);
  }
}

function modeStatusBlock() {
  const m = getModes();
  return (
    `*Active modes:*\n` +
    `• DMs       : ${m.dm ? '✅ ON' : '❌ off'}\n` +
    `• Groups    : ${m.groups ? '✅ ON' : '❌ off'}\n` +
    `• My Inbox  : ${m.inbox ? '✅ ON' : '❌ off'}`
  );
}

module.exports = {
  name: 'chatbot',
  aliases: ['bot', 'achat'],
  category: 'admin',
  description: 'Enable / disable AI chatbot per mode (dm / groups / inbox)',
  usage: '.chatbot on <dm|groups|inbox> | .chatbot off [mode]',
  ownerOnly: true,

  async execute(sock, msg, args, extra) {
    const sub = (args[0] || '').toLowerCase();
    let target = (args[1] || '').toLowerCase();
    // Allow "my inbox" as two words → treat "my" + "inbox" as "inbox"
    if (target === 'my' && (args[2] || '').toLowerCase() === 'inbox') target = 'inbox';
    if (target === 'dms') target = 'dm';
    if (target === 'group') target = 'groups';

    if (!sub) {
      return extra.reply(
        '🤖 *CHATBOT*\n\n' +
        modeStatusBlock() + '\n\n' +
        '*Usage:*\n' +
        '• `.chatbot on` — show mode options\n' +
        '• `.chatbot on dm` — reply to any DM\n' +
        '• `.chatbot on groups` — reply in groups (mention/reply)\n' +
        '• `.chatbot on inbox` — reply only in owner DM\n' +
        '• `.chatbot off` — turn ALL modes off\n' +
        '• `.chatbot off <mode>` — turn one mode off\n' +
        '• `.setchatbot <prompt>` — set a custom AI prompt'
      );
    }

    if (sub === 'on') {
      if (!target) {
        // Show 3 options
        return extra.reply(
          '🤖 *Choose where to enable chatbot:*\n\n' +
          '1️⃣  `.chatbot on dm`        →  reply to *any DM*\n' +
          '2️⃣  `.chatbot on groups`    →  reply in *groups* (mention / reply)\n' +
          '3️⃣  `.chatbot on inbox`     →  reply only in *owner inbox*\n\n' +
          modeStatusBlock()
        );
      }
      if (!['dm', 'groups', 'inbox'].includes(target)) {
        return extra.reply('❌ Invalid mode. Use: `dm`, `groups`, or `inbox` (or `my inbox`).');
      }
      if (getModes()[target]) {
        return extra.reply(`⚠️ *${target.toUpperCase()}* mode is already ON.\n\n` + modeStatusBlock());
      }
      setMode(target, true);
      return extra.reply(`✅ *Chatbot ${target.toUpperCase()} mode enabled!*\n\n` + modeStatusBlock());
    }

    if (sub === 'off') {
      if (!target) {
        setMode('dm', false); setMode('groups', false); setMode('inbox', false);
        return extra.reply('❌ *Chatbot disabled (all modes off).*\n\n' + modeStatusBlock());
      }
      if (!['dm', 'groups', 'inbox'].includes(target)) {
        return extra.reply('❌ Invalid mode. Use: `dm`, `groups`, or `inbox`.');
      }
      setMode(target, false);
      return extra.reply(`❌ *${target.toUpperCase()}* mode disabled.\n\n` + modeStatusBlock());
    }

    return extra.reply('❌ Invalid. Use: `.chatbot on <dm|groups|inbox>` or `.chatbot off`.');
  },

  // Exposed for handler.js & setchatbot.js
  handleChatbotResponse,
  shouldRespond,
  getModes,
  setMode,
  getPrompt,
  setPrompt,
  DEFAULT_PROMPT,
};
