module.exports = {
  name: 'everyone', aliases: ['all','totag'], category: 'group',
  description: 'Tag every member visibly', usage: '.everyone [message]',
  groupOnly: true, adminOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const meta = extra.groupMetadata || await sock.groupMetadata(extra.from);
      const ids = (meta.participants||[]).map(p => p.id || p.lid).filter(Boolean);
      const note = args.join(' ') || '📣 Attention everyone!';
      const list = ids.map((id,i) => (i+1)+'. @'+id.split('@')[0]).join('\n');
      await sock.sendMessage(extra.from, { text: note + '\n\n' + list, mentions: ids }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
