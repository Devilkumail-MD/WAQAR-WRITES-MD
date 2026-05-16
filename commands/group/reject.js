module.exports = {
  name: 'reject', aliases: [], category: 'group',
  description: 'Reject a pending join request', usage: '.reject <number|all>',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    if (!args[0]) return extra.reply('Usage: .reject <number> or .reject all');
    try {
      let jids = [];
      if (args[0].toLowerCase() === 'all') {
        const reqs = await sock.groupRequestParticipantsList(extra.from);
        jids = reqs.map(r => r.jid);
      } else {
        jids = [args[0].replace(/\D/g,'') + '@s.whatsapp.net'];
      }
      if (!jids.length) return extra.reply('📭 Nothing to reject.');
      await sock.groupRequestParticipantsUpdate(extra.from, jids, 'reject');
      extra.reply('🚫 Rejected ' + jids.length + ' request(s).');
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
