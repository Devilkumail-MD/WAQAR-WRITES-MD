module.exports = {
  name: 'fullpp', aliases: ['fullprofile','getfullpp'], category: 'owner',
  description: 'Get full-resolution profile picture (mention/reply user)',
  usage: '.fullpp @user',
  async execute(sock, msg, args, extra) {
    try {
      const ctx = msg.message?.extendedTextMessage?.contextInfo || {};
      let target = ctx.mentionedJid?.[0] || ctx.participant || extra.sender;
      const url = await sock.profilePictureUrl(target, 'image');
      await sock.sendMessage(extra.from, { image: { url }, caption: '🖼️ Full profile picture of @' + target.split('@')[0], mentions: [target] }, { quoted: msg });
    } catch (e) { extra.reply('❌ No profile picture available or hidden.'); }
  }
};
