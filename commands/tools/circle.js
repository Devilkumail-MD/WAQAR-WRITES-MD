const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const sharp = (() => { try { return require('sharp'); } catch (_) { return null; } })();
module.exports = {
  name: 'circle', aliases: ['round','rounded'], category: 'tools',
  description: 'Crop an image into a circle (reply to image)',
  usage: '.circle (reply to image)',
  async execute(sock, msg, args, extra) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const q = ctx?.quotedMessage;
    if (!q?.imageMessage) return extra.reply('🖼️ Reply to an image with .circle');
    if (!sharp) return extra.reply('❌ sharp module not available.');
    try {
      const buf = await downloadMediaMessage({ key:{remoteJid:extra.from,id:ctx.stanzaId,participant:ctx.participant}, message:q }, 'buffer', {});
      const img = sharp(buf);
      const meta = await img.metadata();
      const size = Math.min(meta.width||512, meta.height||512);
      const mask = Buffer.from('<svg width="'+size+'" height="'+size+'"><circle cx="'+(size/2)+'" cy="'+(size/2)+'" r="'+(size/2)+'" /></svg>');
      const out = await sharp(buf).resize(size, size, { fit: 'cover' }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
      await sock.sendMessage(extra.from, { image: out, caption: '⭕ Circle crop' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
