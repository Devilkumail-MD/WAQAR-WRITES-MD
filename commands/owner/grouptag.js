module.exports = {
  name: 'grouptag', aliases: ['gtag'], category: 'owner',
  description: 'Owner: hidden tag everyone in current group',
  usage: '.grouptag [message]',
  groupOnly: true, ownerOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const meta = extra.groupMetadata || await sock.groupMetadata(extra.from);
      const ids = (meta.participants||[]).map(p => p.id || p.lid).filter(Boolean);
      const text = args.join(' ') || '⚡';
      await sock.sendMessage(extra.from, { text, mentions: ids });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
