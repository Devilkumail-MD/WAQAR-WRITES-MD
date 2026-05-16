module.exports = {
  name: 'inviteuser', aliases: ['sendinvite'], category: 'group',
  description: 'Send group invite link to a user in DM', usage: '.inviteuser <number>',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    if (!args[0]) return extra.reply('Usage: .inviteuser 92xxxxxxxxxx');
    const num = args[0].replace(/\D/g,'');
    try {
      const code = await sock.groupInviteCode(extra.from);
      const link = 'https://chat.whatsapp.com/' + code;
      await sock.sendMessage(num + '@s.whatsapp.net', { text: '📨 You are invited to join our group:\n' + link });
      extra.reply('✅ Invite sent to +' + num);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
