module.exports = {
  name: 'requests', aliases: ['joinreq'], category: 'group',
  description: 'View pending join requests', usage: '.requests',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    try {
      const reqs = await sock.groupRequestParticipantsList(extra.from);
      if (!reqs || !reqs.length) return extra.reply('📭 No pending requests.');
      const text = '📬 Pending Requests (' + reqs.length + '):\n' + reqs.map((r,i) => (i+1)+'. @'+r.jid.split('@')[0]).join('\n');
      await sock.sendMessage(extra.from, { text, mentions: reqs.map(r=>r.jid) }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
