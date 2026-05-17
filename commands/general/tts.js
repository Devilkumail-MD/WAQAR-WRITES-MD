/**
 * TTS - Text to Speech (Google Translate TTS -> OGG/Opus for WhatsApp PTT)
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

if (ffmpegStatic) ffmpeg.setFfmpegPath(ffmpegStatic);

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

async function gttsMp3(text, lang) {
  const chunks = chunkText(text, 200);
  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunks[i])}&tl=${encodeURIComponent(lang)}&client=tw-ob&ttsspeed=1&total=${chunks.length}&idx=${i}&textlen=${chunks[i].length}`;
    const r = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 20000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
      },
    });
    buffers.push(Buffer.from(r.data));
  }
  return Buffer.concat(buffers);
}

function mp3ToOpusOgg(mp3Buf) {
  return new Promise((resolve, reject) => {
    const tmp = os.tmpdir();
    const inFile = path.join(tmp, `tts_${Date.now()}_${Math.random().toString(36).slice(2)}.mp3`);
    const outFile = inFile.replace(/\.mp3$/, '.ogg');
    fs.writeFileSync(inFile, mp3Buf);
    ffmpeg(inFile)
      .audioCodec('libopus')
      .audioBitrate('64k')
      .audioChannels(1)
      .audioFrequency(48000)
      .format('ogg')
      .on('end', () => {
        try {
          const out = fs.readFileSync(outFile);
          resolve(out);
        } catch (e) { reject(e); }
        finally {
          try { fs.unlinkSync(inFile); } catch {}
          try { fs.unlinkSync(outFile); } catch {}
        }
      })
      .on('error', (err) => {
        try { fs.unlinkSync(inFile); } catch {}
        try { fs.unlinkSync(outFile); } catch {}
        reject(err);
      })
      .save(outFile);
  });
}

module.exports = {
  name: 'tts',
  aliases: ['speak', 'say'],
  category: 'general',
  description: 'Text to speech (default English; use "ur:" / "hi:" / "ar:" prefix for language)',
  usage: '.tts <text>  |  .tts ur:salaam kaise ho',

  async execute(sock, msg, args, extra) {
    const chatId = extra.from;
    let text = args.join(' ').trim();
    if (!text) {
      return extra.reply(
        'Usage: .tts hello how are you\n' +
        'Language prefix:\n' +
        '  .tts ur:salaam kaise ho\n' +
        '  .tts hi:namaste\n' +
        '  .tts ar:marhaba'
      );
    }

    let lang = 'en';
    const m = text.match(/^([a-z]{2}(?:-[A-Z]{2})?)\s*:\s*(.+)$/i);
    if (m) { lang = m[1].toLowerCase(); text = m[2].trim(); }

    try {
      await sock.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });

      const mp3 = await gttsMp3(text, lang);
      if (!mp3 || mp3.length === 0) throw new Error('Empty TTS audio');

      let audioBuf;
      let mimetype = 'audio/ogg; codecs=opus';
      try {
        audioBuf = await mp3ToOpusOgg(mp3);
      } catch (e) {
        // ffmpeg fallback: send raw mp3 (not as PTT)
        audioBuf = mp3;
        mimetype = 'audio/mpeg';
      }

      await sock.sendMessage(
        chatId,
        { audio: audioBuf, mimetype, ptt: mimetype.startsWith('audio/ogg') },
        { quoted: msg }
      );
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      await extra.reply('TTS failed: ' + (e.message || 'unknown error'));
    }
  },
};
