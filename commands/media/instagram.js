const dl = require('../../utils/downloaders');
const config = require('../../config');

module.exports = {
  name: 'instagram', aliases: ['ig', 'igdl', 'insta'], category: 'media',
  description: 'Download Instagram posts/reels',
  usage: '.instagram <Instagram URL>',
  async execute(sock, msg, args, extra) {
    const text = args.join(' ').trim();
    const chatId = msg.key.remoteJid;
    if (!text || !/instagram\.com/i.test(text)) return extra.reply('Usage: .instagram <Instagram URL>');
    try {
      await sock.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });
      const items = await dl.instagram(text);
      const caption = `*DOWNLOADED BY ${config.botName.toUpperCase()}*`;
      for (const it of items.slice(0, 10)) {
        if (it.type === 'video') {
          await sock.sendMessage(chatId, { video: { url: it.url }, mimetype: 'video/mp4', caption }, { quoted: msg });
        } else {
          await sock.sendMessage(chatId, { image: { url: it.url }, caption }, { quoted: msg });
        }
      }
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      extra.reply('❌ ' + (e.message || 'Instagram download failed'));
    }
  },
};
