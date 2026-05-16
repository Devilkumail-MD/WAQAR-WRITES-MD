const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const FormData = require('form-data');
const axios = require('axios');

const MIME_EXT = {
  'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/png': 'png',
  'image/gif': 'gif', 'image/webp': 'webp',
  'video/mp4': 'mp4', 'video/3gpp': '3gp', 'video/quicktime': 'mov',
  'audio/mpeg': 'mp3', 'audio/mp4': 'm4a', 'audio/ogg': 'ogg',
  'audio/wav': 'wav', 'audio/aac': 'aac',
  'application/pdf': 'pdf', 'application/zip': 'zip',
};

function pickMedia(message) {
  if (!message) return null;
  if (message.imageMessage)    return { type: 'image',    msg: message.imageMessage,    label: '🖼️ Image' };
  if (message.videoMessage)    return { type: 'video',    msg: message.videoMessage,    label: '🎬 Video' };
  if (message.audioMessage)    return { type: 'audio',    msg: message.audioMessage,    label: '🎵 Audio' };
  if (message.stickerMessage)  return { type: 'sticker',  msg: message.stickerMessage,  label: '🌟 Sticker' };
  if (message.documentMessage) return { type: 'document', msg: message.documentMessage, label: '📄 Document' };
  return null;
}

const COMMON_HEADERS = { 'User-Agent': 'Mozilla/5.0 WaqarMD-Bot' };

// Each uploader returns { url, host, expires }
const UPLOADERS = [
  {
    name: 'Catbox',
    expires: 'permanent',
    maxBytes: 200 * 1024 * 1024,
    async upload(buf, filename) {
      const form = new FormData();
      form.append('reqtype', 'fileupload');
      form.append('fileToUpload', buf, { filename });
      const r = await axios.post('https://catbox.moe/user/api.php', form, {
        headers: { ...form.getHeaders(), ...COMMON_HEADERS },
        timeout: 25000, maxBodyLength: Infinity, maxContentLength: Infinity,
      });
      const url = String(r.data || '').trim();
      if (!url.startsWith('http')) throw new Error('Bad response');
      return url;
    },
  },
  {
    name: 'Uguu',
    expires: '48h',
    maxBytes: 128 * 1024 * 1024,
    async upload(buf, filename) {
      const form = new FormData();
      form.append('files[]', buf, { filename });
      const r = await axios.post('https://uguu.se/upload.php', form, {
        headers: { ...form.getHeaders(), ...COMMON_HEADERS },
        timeout: 60000, maxBodyLength: Infinity, maxContentLength: Infinity,
      });
      const url = r.data?.files?.[0]?.url;
      if (!url) throw new Error('No URL in response');
      return url;
    },
  },
  {
    name: 'Litterbox (Catbox)',
    expires: '72h',
    maxBytes: 1024 * 1024 * 1024,
    async upload(buf, filename) {
      const form = new FormData();
      form.append('reqtype', 'fileupload');
      form.append('time', '72h');
      form.append('fileToUpload', buf, { filename });
      const r = await axios.post('https://litterbox.catbox.moe/resources/internals/api.php', form, {
        headers: { ...form.getHeaders(), ...COMMON_HEADERS },
        timeout: 90000, maxBodyLength: Infinity, maxContentLength: Infinity,
      });
      const url = String(r.data || '').trim();
      if (!url.startsWith('http')) throw new Error('Bad response');
      return url;
    },
  },
  {
    name: 'TmpFiles',
    expires: '~1h',
    maxBytes: 100 * 1024 * 1024,
    async upload(buf, filename) {
      const form = new FormData();
      form.append('file', buf, { filename });
      const r = await axios.post('https://tmpfiles.org/api/v1/upload', form, {
        headers: { ...form.getHeaders(), ...COMMON_HEADERS },
        timeout: 60000, maxBodyLength: Infinity, maxContentLength: Infinity,
      });
      let url = r.data?.data?.url;
      if (!url) throw new Error('No URL in response');
      // Convert tmpfiles.org/<id>/<file> → tmpfiles.org/dl/<id>/<file> for direct download
      url = url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      return url;
    },
  },
];

async function uploadWithFallback(buf, filename) {
  const errors = [];
  for (const up of UPLOADERS) {
    if (buf.length > up.maxBytes) {
      errors.push(`${up.name}: file too large (limit ${(up.maxBytes / 1024 / 1024).toFixed(0)} MB)`);
      continue;
    }
    try {
      const url = await up.upload(buf, filename);
      return { url, host: up.name, expires: up.expires };
    } catch (e) {
      errors.push(`${up.name}: ${e.message}`);
    }
  }
  throw new Error('All hosts failed:\n' + errors.join('\n'));
}

module.exports = {
  name: 'url',
  aliases: ['upload', 'tourl', 'catbox'],
  category: 'tools',
  description: 'Upload media to a file host and get a direct URL (Catbox → Uguu → Litterbox → TmpFiles fallback)',
  usage: '.url (reply to media)',

  async execute(sock, msg, args, extra) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const quoted = ctx?.quotedMessage;

    let media = pickMedia(quoted) || pickMedia(msg.message);
    if (!media) {
      return extra.reply(
        '📤 *URL Uploader*\n\n' +
        'Reply to or send any media with `.url` to get a direct link.\n\n' +
        '*Supports:* images, videos, audio, stickers, documents.\n' +
        '*Hosts:* Catbox → Uguu → Litterbox → TmpFiles (auto-fallback).'
      );
    }

    await extra.react?.('⏳');

    try {
      const target = quoted
        ? { key: { remoteJid: extra.from, id: ctx.stanzaId, participant: ctx.participant }, message: quoted }
        : msg;

      const buf = await downloadMediaMessage(target, 'buffer', {});
      if (!buf || !buf.length) throw new Error('Empty media buffer');

      const sizeMb = (buf.length / (1024 * 1024)).toFixed(2);
      const mime = media.msg.mimetype || 'application/octet-stream';
      const ext = MIME_EXT[mime] || (mime.split('/')[1] || 'bin').split(';')[0];
      const filename = `${media.type}_${Date.now()}.${ext}`;

      const { url, host, expires } = await uploadWithFallback(buf, filename);

      await extra.react?.('✅');

      const caption =
        '✅ *Uploaded Successfully*\n\n' +
        `*Type:* ${media.label}\n` +
        `*Size:* ${sizeMb} MB\n` +
        `*Mime:* ${mime}\n` +
        `*Host:* ${host}\n` +
        `*Expires:* ${expires}\n\n` +
        `🔗 *URL:*\n${url}`;

      await sock.sendMessage(extra.from, { text: caption }, { quoted: msg });
    } catch (e) {
      console.error('url command error:', e.message);
      await extra.react?.('❌');
      await extra.reply('❌ Upload failed:\n' + e.message);
    }
  },
};
