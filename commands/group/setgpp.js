const { downloadMediaMessage } = require('@whiskeysockets/baileys');
module.exports = {
  name: 'setgpp', aliases: ['setgrouppp','setgrouppic'], category: 'group',
  description: 'Set group profile picture (reply to an image)', usage: '.setgpp (reply to image)',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const q = ctx?.quotedMessage;
    if (!q?.imageMessage) return extra.reply('🖼️ Reply to an image with .setgpp');
    try {
      const buf = await downloadMediaMessage({ key:{remoteJid:extra.from,id:ctx.stanzaId,participant:ctx.participant}, message:q }, 'buffer', {});
      await sock.updateProfilePicture(extra.from, buf);
      extra.reply('✅ Group picture updated.');
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
