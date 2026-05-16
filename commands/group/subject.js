module.exports = {
  name: 'subject', aliases: ['gname','setname'], category: 'group',
  description: 'Change group name', usage: '.subject <new name>',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    const t = args.join(' ').trim();
    if (!t) return extra.reply('Usage: .subject New Group Name');
    try { await sock.groupUpdateSubject(extra.from, t); extra.reply('✅ Group name updated.'); }
    catch (e) { extra.reply('❌ ' + e.message); }
  }
};
