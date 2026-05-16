/**
 * TTS - Text to Speech (via Google Translate TTS, no API key needed)
 */

const axios = require('axios');

// Split text into <=200 char chunks at word boundaries (GT-TTS limit).
function chunkText(text, max = 200) {
  const out = [];
  const words = text.split(/\s+/);
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max) {
      if (cur) out.push(cur);
      cur = w;
    } else {
      cur = (cur ? cur + ' ' : '') + w;
    }
  }
  if (cur) out.push(cur);
  return out.length ? out : [text.slice(0, max)];
}

async function gtts(text, lang = 'en') {
  const chunks = chunkText(text, 200);
  const buffers = [];
  for (const chunk of chunks) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=${encodeURIComponent(lang)}&client=tw-ob&ttsspeed=1&total=${chunks.length}&idx=${buffers.length}&textlen=${chunk.length}`;
    const r = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
        'Accept': '*/*',
      },
    });
    buffers.push(Buffer.from(r.data));
  }
  return Buffer.concat(buffers);
}

module.exports = {
  name: 'tts',
  aliases: ['speak', 'say'],
  category: 'general',
  description: 'Convert text to speech (default English; use "ur:" / "hi:" prefix for language)',
  usage: '.tts <text>  |  .tts ur:salaam kaise ho',

  async execute(sock, msg, args, extra) {
    const chatId = extra.from;
    let text = args.join(' ').trim();
    if (!text) return extra.reply('Usage: .tts hi how are you\nLanguage prefix: .tts ur:salaam | .tts hi:namaste');

    // Optional language prefix: "ur:text" / "hi:text" / "en:text"
    let lang = 'en';
    const m = text.match(/^([a-z]{2}(?:-[A-Z]{2})?)\s*:\s*(.+)$/i);
    if (m) { lang = m[1].toLowerCase(); text = m[2].trim(); }

    try {
      await sock.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });
      const audio = await gtts(text, lang);
      if (!audio || audio.length === 0) throw new Error('Empty audio buffer');
      await sock.sendMessage(chatId, {
        audio,
        mimetype: 'audio/mp4',
        ptt: true,
      }, { quoted: msg });
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      await extra.reply('❌ TTS failed: ' + (e.message || 'unknown error'));
    }
  },
};
