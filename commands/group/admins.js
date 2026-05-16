module.exports = {
  name: 'admins', aliases: ['adminlist'], category: 'group',
  description: 'List group admins', usage: '.admins',
  groupOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const meta = extra.groupMetadata || await sock.groupMetadata(extra.from);
      const admins = (meta.participants||[]).filter(p => p.admin);
      if (!admins.length) return extra.reply('No admins.');
      const mentions = admins.map(a => a.id).filter(Boolean);
      const text = '👮 *Admins* (' + admins.length + '):\n' + admins.map((a,i) => (i+1)+'. @'+a.id.split('@')[0]+(a.admin==='superadmin'?' 👑':'')).join('\n');
      await sock.sendMessage(extra.from, { text, mentions }, { quoted: msg });
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
