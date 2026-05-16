module.exports = {
  name: 'invite', aliases: ['link','grouplink2'], category: 'group',
  description: 'Get the group invite link', usage: '.invite',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    try {
      const code = await sock.groupInviteCode(extra.from);
      await extra.reply('🔗 Group Invite:\nhttps://chat.whatsapp.com/' + code);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
