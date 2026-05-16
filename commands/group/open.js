module.exports = {
  name: 'open', aliases: ['unmute'], category: 'group',
  description: 'Open group: everyone can send messages', usage: '.open',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    try { await sock.groupSettingUpdate(extra.from, 'not_announcement'); extra.reply('🔓 Group opened.'); }
    catch (e) { extra.reply('❌ ' + e.message); }
  }
};
