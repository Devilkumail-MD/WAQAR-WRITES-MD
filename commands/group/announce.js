module.exports = {
  name: 'announce', aliases: [], category: 'group',
  description: 'Toggle announcement mode (admins-only chat)', usage: '.announce on|off',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    const mode = (args[0]||'').toLowerCase();
    try {
      if (mode === 'on') { await sock.groupSettingUpdate(extra.from, 'announcement'); extra.reply('📢 Announcement mode ON.'); }
      else if (mode === 'off') { await sock.groupSettingUpdate(extra.from, 'not_announcement'); extra.reply('📢 Announcement mode OFF.'); }
      else extra.reply('Usage: .announce on | off');
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
