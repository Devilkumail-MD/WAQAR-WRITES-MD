module.exports = {
  name: 'tagadmins', aliases: ['tagadmin'], category: 'group',
  description: 'Tag all group admins', usage: '.tagadmins [message]',
  groupOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const meta = extra.groupMetadata || await sock.groupMetadata(extra.from);
      const admins = (meta.participants||[]).filter(p => p.admin).map(p => p.id);
      if (!admins.length) return extra.reply('No admins.');
      const text = (args.join(' ') || '👮 Calling all admins!') + '\n\n' + admins.map(a => '@'+a.split('@')[0]).join(' ');
      await sock.sendMessage(extra.from, { text, mentions: admins }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
