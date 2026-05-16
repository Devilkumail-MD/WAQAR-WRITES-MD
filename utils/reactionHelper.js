/**
 * Shared helper for reaction-style commands.
 * Fetches anime GIFs from public APIs and sends them with a tagged caption.
 */

const axios = require('axios');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const HTTP_HEADERS = { 'User-Agent': UA, 'Accept': '*/*' };

const NEKOS_BEST_ACTIONS = new Set([
  'baka','bite','blush','bored','cry','cuddle','dance','facepalm','feed',
  'happy','highfive','hug','kick','kiss','laugh','lurk','nod','nom','nope',
  'pat','peck','poke','pout','punch','run','sad','shoot','shrug','slap',
  'sleep','smile','smug','stare','think','thumbsup','tickle','wave','wink',
  'yawn','yeet'
]);

const TENOR_KEY = 'AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ';

const TENOR_QUERY_MAP = {
  kill: 'anime kill', murder: 'anime kill',
  shoot: 'anime shoot', stab: 'anime stab',
  punch: 'anime punch', slap: 'anime slap',
  kick: 'anime kick', kiss: 'anime kiss',
  hug: 'anime hug', cuddle: 'anime cuddle',
  pat: 'anime headpat', poke: 'anime poke',
  bite: 'anime bite', lick: 'anime lick',
  bully: 'anime bully', tickle: 'anime tickle',
  bonk: 'anime bonk', yeet: 'anime yeet',
  feed: 'anime feed', highfive: 'anime high five',
  handhold: 'anime hand hold', wave: 'anime wave',
  wink: 'anime wink', smile: 'anime smile',
  smug: 'anime smug', laugh: 'anime laugh',
  cry: 'anime cry', sad: 'anime sad',
  happy: 'anime happy', dance: 'anime dance',
  sleep: 'anime sleep', think: 'anime thinking',
  pout: 'anime pout', blush: 'anime blush',
  facepalm: 'anime facepalm', nod: 'anime nod',
  nope: 'anime nope', shrug: 'anime shrug',
  baka: 'anime baka', stare: 'anime stare',
  thumbsup: 'anime thumbs up', boop: 'anime boop',
  choke: 'anime choke', dab: 'anime dab',
  hate: 'anime hate', love: 'anime love',
  hold: 'anime holding hands', nuzzle: 'anime nuzzle',
  smug2: 'anime smirk', wag: 'anime wag tail',
  awoo: 'anime awoo', glomp: 'anime glomp tackle hug',
  nom: 'anime nom eating', peck: 'anime peck kiss cheek',
  run: 'anime running', lurk: 'anime peeking',
  bored: 'anime bored', yawn: 'anime yawn',
  cringe: 'anime cringe',
};

async function fetchFromNekos(action) {
  const r = await axios.get(`https://nekos.best/api/v2/${action}`, {
    timeout: 10000, headers: HTTP_HEADERS,
  });
  return r.data?.results?.[0]?.url || null;
}

async function fetchFromTenor(action) {
  const q = TENOR_QUERY_MAP[action] || `anime ${action}`;
  const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(q)}&key=${TENOR_KEY}&client_key=waqar-md&limit=20&media_filter=gif,mp4&random=true`;
  const r = await axios.get(url, { timeout: 10000, headers: HTTP_HEADERS });
  const results = r.data?.results || [];
  if (!results.length) return null;
  const pick = results[Math.floor(Math.random() * results.length)];
  const mf = pick.media_formats || {};
  return mf.mp4?.url || mf.tinymp4?.url || mf.gif?.url || mf.tinygif?.url || mf.mediumgif?.url || null;
}

async function fetchGifUrl(action) {
  if (NEKOS_BEST_ACTIONS.has(action)) {
    try {
      const u = await fetchFromNekos(action);
      if (u) return u;
    } catch (_) {}
  }
  try {
    const u = await fetchFromTenor(action);
    if (u) return u;
  } catch (_) {}
  return null;
}

function getTarget(msg, extra) {
  const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
  const mentioned = ctx.mentionedJid || [];
  if (mentioned.length) return mentioned[0];
  if (ctx.participant) return ctx.participant; // replied-to user
  return null;
}

async function gifToMp4(gifBuf) {
  const { spawn } = require('child_process');
  const fs = require('fs');
  const os = require('os');
  const path = require('path');
  const tmpDir = os.tmpdir();
  const inFile = path.join(tmpDir, `r_${Date.now()}_${Math.random().toString(36).slice(2)}.gif`);
  const outFile = inFile.replace(/\.gif$/, '.mp4');
  fs.writeFileSync(inFile, gifBuf);
  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', [
      '-y', '-i', inFile,
      '-movflags', 'faststart', '-pix_fmt', 'yuv420p',
      '-vf', "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      '-f', 'mp4', outFile,
    ]);
    let err = '';
    ff.stderr.on('data', d => err += d.toString());
    ff.on('close', code => {
      try { fs.unlinkSync(inFile); } catch (_) {}
      if (code !== 0) {
        try { fs.unlinkSync(outFile); } catch (_) {}
        return reject(new Error('ffmpeg failed: ' + err.slice(-200)));
      }
      try {
        const buf = fs.readFileSync(outFile);
        fs.unlinkSync(outFile);
        resolve(buf);
      } catch (e) { reject(e); }
    });
    ff.on('error', reject);
  });
}

async function sendMedia(sock, msg, extra, { url, caption, mentions }) {
  try {
    const res = await axios.get(url, {
      responseType: 'arraybuffer', timeout: 20000, headers: HTTP_HEADERS,
    });
    let buf = Buffer.from(res.data);
    const lower = url.toLowerCase().split('?')[0];
    const isGif = lower.endsWith('.gif');
    const isMp4 = lower.endsWith('.mp4');

    if (isGif) {
      // WhatsApp needs MP4 for gifPlayback — convert via ffmpeg
      try {
        buf = await gifToMp4(buf);
      } catch (convErr) {
        // If conversion fails, fall back to image
        return sock.sendMessage(extra.from, { image: buf, caption, mentions }, { quoted: msg });
      }
    }

    if (isGif || isMp4) {
      await sock.sendMessage(extra.from, {
        video: buf, caption, mentions, gifPlayback: true,
      }, { quoted: msg });
    } else {
      await sock.sendMessage(extra.from, {
        image: buf, caption, mentions,
      }, { quoted: msg });
    }
  } catch (e) {
    console.error('reactionHelper sendMedia error:', e.message);
    await sock.sendMessage(extra.from, { text: caption, mentions }, { quoted: msg });
  }
}

/**
 * Send a reaction GIF with an auto-built caption.
 *  - If a target is mentioned/replied: caption is "<emoji> @sender <verb> @target"
 *  - If no target and requireTarget is false: caption is "<emoji> @sender <verb>"
 */
async function reactToCommand(sock, msg, emoji) {
  try {
    if (emoji && msg && msg.key) {
      await sock.sendMessage(msg.key.remoteJid, { react: { text: emoji, key: msg.key } });
    }
  } catch (_) { /* ignore */ }
}

async function reactionGif(sock, msg, extra, opts) {
  const {
    apiAction,
    fallbackAction,
    verbs,
    emoji = '',
    requireTarget = true,
    soloMessage = null,
    selfMessage = null
  } = opts;

  await reactToCommand(sock, msg, emoji || '💫');

  const senderTag = `@${extra.sender.split('@')[0]}`;
  const target = getTarget(msg, extra);

  if (!target && requireTarget && !soloMessage) {
    return extra.reply(`❌ Reply to or mention a user.\nExample: ${opts.usage || ''}`);
  }

  const verb = verbs[Math.floor(Math.random() * verbs.length)];
  let caption;
  let mentions = [extra.sender];

  if (target && target === extra.sender && selfMessage) {
    caption = `${emoji} ${selfMessage.replace('@me', senderTag)}`.trim();
  } else if (target) {
    const targetTag = `@${target.split('@')[0]}`;
    caption = `${emoji} ${senderTag} ${verb} ${targetTag}`.trim();
    mentions.push(target);
  } else {
    caption = `${emoji} ${(soloMessage || `${senderTag} ${verb}`).replace('@me', senderTag)}`.trim();
  }

  let url = await fetchGifUrl(apiAction);
  if (!url && fallbackAction) url = await fetchGifUrl(fallbackAction);

  if (!url) {
    return sock.sendMessage(extra.from, { text: caption, mentions }, { quoted: msg });
  }
  await sendMedia(sock, msg, extra, { url, caption, mentions });
}

/**
 * Percentage-based "rate" command. Deterministic per target so it doesn't change wildly.
 */
async function rate(sock, msg, extra, opts) {
  const { messages, emoji = '🎯', max = 100, suffix = '%' } = opts;
  await reactToCommand(sock, msg, emoji);
  const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
  const mentioned = ctx.mentionedJid || [];
  const targetId = mentioned[0] || ctx.participant || extra.sender;
  const targetTag = `@${targetId.split('@')[0]}`;

  const seed = targetId.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  const value = ((seed * 7 + Math.floor(Math.random() * 13)) % (max + 1));

  const tmpl = messages[Math.floor(Math.random() * messages.length)];
  const out = `${emoji} ${tmpl.replace('@user', targetTag).replace('{v}', `${value}${suffix}`)}`;
  await sock.sendMessage(extra.from, { text: out, mentions: [targetId] }, { quoted: msg });
}

/**
 * Plain text action (no GIF). Replaces @me / @user placeholders.
 */
async function textAction(sock, msg, extra, opts) {
  const { lines, requireTarget = false, emoji = '' } = opts;
  await reactToCommand(sock, msg, emoji || '💫');
  const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
  const target = (ctx.mentionedJid && ctx.mentionedJid[0]) || ctx.participant || null;
  if (requireTarget && !target) {
    return extra.reply('❌ Reply to or mention a user.');
  }
  const senderTag = `@${extra.sender.split('@')[0]}`;
  const targetTag = target ? `@${target.split('@')[0]}` : senderTag;
  const tmpl = lines[Math.floor(Math.random() * lines.length)];
  const out = `${emoji} ${tmpl.replace('@user', targetTag).replace('@me', senderTag)}`.trim();
  const mentions = [extra.sender];
  if (target && target !== extra.sender) mentions.push(target);
  await sock.sendMessage(extra.from, { text: out, mentions }, { quoted: msg });
}

module.exports = { reactionGif, rate, textAction, getTarget, fetchGifUrl };
