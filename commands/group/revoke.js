module.exports = {
  name: 'revoke', aliases: ['resetlink'], category: 'group',
  description: 'Reset (revoke) the group invite link', usage: '.revoke',
  groupOnly: true, adminOnly: true, botAdminNeeded: true,
  async execute(sock, msg, args, extra) {
    try {
      const code = await sock.groupRevokeInvite(extra.from);
      await extra.reply('♻️ New invite link:\nhttps://chat.whatsapp.com/' + code);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
