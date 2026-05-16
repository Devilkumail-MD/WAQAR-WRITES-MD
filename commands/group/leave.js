module.exports = {
  name: 'leave', aliases: ['exit'], category: 'group',
  description: 'Bot leaves the group', usage: '.leave',
  groupOnly: true, ownerOnly: true,
  async execute(sock, msg, args, extra) {
    await extra.reply('👋 Leaving group...');
    try { await sock.groupLeave(extra.from); } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
