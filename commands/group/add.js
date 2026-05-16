module.exports = {
  name: 'add', aliases: [], category: 'group',
  description: 'Add a member to the group by phone number',
  usage: '.add <number>',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    if (!args[0]) return extra.reply('📱 Usage: .add 92xxxxxxxxxx');
    const num = args[0].replace(/\D/g,'');
    const jid = num + '@s.whatsapp.net';
    try {
      const res = await sock.groupParticipantsUpdate(extra.from, [jid], 'add');
      const r = res && res[0];
      if (r && r.status === '200') return extra.reply('✅ Member added.');
      if (r && r.status === '403') return extra.reply('⚠️ Cannot add: their privacy blocks group adds. Sending invite...');
      return extra.reply('❌ Failed: ' + (r ? r.status : 'unknown'));
    } catch (e) { return extra.reply('❌ Error: ' + e.message); }
  }
};
