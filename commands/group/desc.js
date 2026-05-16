module.exports = {
  name: 'desc', aliases: ['gdesc','setdesc'], category: 'group',
  description: 'Change group description', usage: '.desc <text>',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    const t = args.join(' ');
    try { await sock.groupUpdateDescription(extra.from, t || ''); extra.reply('✅ Group description updated.'); }
    catch (e) { extra.reply('❌ ' + e.message); }
  }
};
