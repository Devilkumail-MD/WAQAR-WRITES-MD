module.exports = {
  name: 'myprivacy', aliases: ['privacy'], category: 'owner',
  description: 'Show bot WhatsApp privacy settings',
  usage: '.myprivacy',
  ownerOnly: true,
  async execute(sock, msg, args, extra) {
    try {
      const p = await sock.fetchPrivacySettings(true);
      const txt = '🔐 *Bot Privacy Settings*\n\n' +
        '• Last seen: ' + (p.last||'?') + '\n' +
        '• Online: ' + (p.online||'?') + '\n' +
        '• Profile pic: ' + (p.profile||'?') + '\n' +
        '• Status: ' + (p.status||'?') + '\n' +
        '• Read receipts: ' + (p.readreceipts||'?') + '\n' +
        '• Groups add: ' + (p.groupadd||'?');
      extra.reply(txt);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
