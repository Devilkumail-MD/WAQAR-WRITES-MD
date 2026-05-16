module.exports = {
  name: 'approve', aliases: [], category: 'group',
  description: 'Approve a pending join request', usage: '.approve <number|all>',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    if (!args[0]) return extra.reply('Usage: .approve <number> or .approve all');
    try {
      let jids = [];
      if (args[0].toLowerCase() === 'all') {
        const reqs = await sock.groupRequestParticipantsList(extra.from);
        jids = reqs.map(r => r.jid);
      } else {
        jids = [args[0].replace(/\D/g,'') + '@s.whatsapp.net'];
      }
      if (!jids.length) return extra.reply('📭 Nothing to approve.');
      await sock.groupRequestParticipantsUpdate(extra.from, jids, 'approve');
      extra.reply('✅ Approved ' + jids.length + ' request(s).');
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
