module.exports = {
  name: 'disappear', aliases: ['ephemeral'], category: 'group',
  description: 'Toggle disappearing messages (off|24h|7d|90d)', usage: '.disappear off|24h|7d|90d',
  groupOnly: true, adminOnly: true,
  async execute(sock, msg, args, extra) {
    const map = { off:0, '24h':86400, '7d':604800, '90d':7776000 };
    const opt = (args[0]||'').toLowerCase();
    if (!(opt in map)) return extra.reply('Usage: .disappear off | 24h | 7d | 90d');
    try { await sock.sendMessage(extra.from, { disappearingMessagesInChat: map[opt] }); extra.reply('✅ Disappearing messages: ' + opt); }
    catch (e) { extra.reply('❌ ' + e.message); }
  }
};
