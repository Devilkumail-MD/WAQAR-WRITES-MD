module.exports = {
  name: 'rtag', aliases: ['randomtag'], category: 'group',
  description: 'Tag a random group member', usage: '.rtag [message]',
  groupOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const meta = extra.groupMetadata || await sock.groupMetadata(extra.from);
      const ids = (meta.participants||[]).map(p => p.id).filter(Boolean);
      if (!ids.length) return extra.reply('No members.');
      const pick = ids[Math.floor(Math.random()*ids.length)];
      const text = '🎲 Random pick: @' + pick.split('@')[0] + (args.length ? '\n\n' + args.join(' ') : '');
      await sock.sendMessage(extra.from, { text, mentions: [pick] }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
