module.exports = {
  name: 'close', aliases: ['mute'], category: 'group',
  description: 'Close group: only admins can send messages', usage: '.close',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    try { await sock.groupSettingUpdate(extra.from, 'announcement'); extra.reply('🔒 Group closed (only admins can chat).'); }
    catch (e) { extra.reply('❌ ' + e.message); }
  }
};
