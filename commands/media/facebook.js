const dl = require('../../utils/downloaders');
const config = require('../../config');

module.exports = {
  name: 'facebook', aliases: ['fb', 'fbdl', 'fbdown'], category: 'media',
  description: 'Download Facebook videos',
  usage: '.facebook <Facebook video URL>',
  async execute(sock, msg, args, extra) {
    const text = args.join(' ').trim();
    const chatId = msg.key.remoteJid;
    if (!text || !/facebook\.com|fb\.watch/i.test(text)) return extra.reply('Usage: .facebook <Facebook URL>');
    try {
      await sock.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });
      const r = await dl.facebook(text);
      const url = r.hd || r.sd;
      const caption = `*DOWNLOADED BY ${config.botName.toUpperCase()}*`;
      await sock.sendMessage(chatId, { video: { url }, mimetype: 'video/mp4', caption }, { quoted: msg });
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      extra.reply('❌ ' + (e.message || 'Facebook download failed'));
    }
  },
};
