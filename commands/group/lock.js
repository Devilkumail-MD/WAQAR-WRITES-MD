module.exports = {
  name: 'lock', aliases: [], category: 'group',
  description: 'Lock group: only admins can change settings', usage: '.lock',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    try { await sock.groupSettingUpdate(extra.from, 'locked'); extra.reply('🔒 Group locked (settings → admins only).'); }
    catch (e) { extra.reply('❌ ' + e.message); }
  }
};
