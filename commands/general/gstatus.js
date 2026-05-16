module.exports = {
  name: 'gstatus', aliases: ['groupstatus2'], category: 'general',
  description: 'Show current group status (open/closed, locked/unlocked)',
  usage: '.gstatus',
  groupOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const m = extra.groupMetadata || await sock.groupMetadata(extra.from);
      const txt = '📊 *Group Status*\n\n' +
        '• Name: ' + m.subject + '\n' +
        '• Members: ' + (m.participants?.length||0) + '\n' +
        '• Admins: ' + (m.participants||[]).filter(p=>p.admin).length + '\n' +
        '• Chat: ' + (m.announce ? '🔒 Closed (admins only)' : '🔓 Open') + '\n' +
        '• Settings: ' + (m.restrict ? '🔒 Locked (admins only)' : '🔓 Unlocked') + '\n' +
        '• Created: ' + new Date(m.creation*1000).toLocaleString();
      extra.reply(txt);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
