module.exports = {
  name: 'pp', aliases: ['getpp2'], category: 'owner',
  description: 'Get profile picture of mentioned user',
  usage: '.pp @user',
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
      let target = ctx.mentionedJid?.[0] || ctx.participant || extra.sender;
      const url = await sock.profilePictureUrl(target, 'preview');
      await sock.sendMessage(extra.from, { image: { url }, caption: '@' + target.split('@')[0], mentions: [target] }, { quoted: msg });
    } catch (e) { extra.reply('❌ No profile picture.'); }
  }
};
