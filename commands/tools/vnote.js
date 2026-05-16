const { downloadMediaMessage } = require('@whiskeysockets/baileys');
module.exports = {
  name: 'vnote', aliases: ['voicenote','ptt'], category: 'tools',
  description: 'Send replied audio as a WhatsApp voice note',
  usage: '.vnote (reply to audio)',
  async execute(sock, msg, args, extra) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const q = ctx?.quotedMessage;
    if (!q?.audioMessage) return extra.reply('🎵 Reply to an audio with .vnote');
    try {
      const buf = await downloadMediaMessage({ key:{remoteJid:extra.from,id:ctx.stanzaId,participant:ctx.participant}, message:q }, 'buffer', {});
      await sock.sendMessage(extra.from, { audio: buf, ptt: true, mimetype: 'audio/ogg; codecs=opus' }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
