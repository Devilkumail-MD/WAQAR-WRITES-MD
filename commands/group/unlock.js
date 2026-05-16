module.exports = {
  name: 'unlock', aliases: [], category: 'group',
  description: 'Unlock group: anyone can change settings', usage: '.unlock',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    try { await sock.groupSettingUpdate(extra.from, 'unlocked'); extra.reply('🔓 Group unlocked.'); }
    catch (e) { extra.reply('❌ ' + e.message); }
  }
};
