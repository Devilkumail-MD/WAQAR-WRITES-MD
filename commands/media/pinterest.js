const dl = require('../../utils/downloaders');
const config = require('../../config');

module.exports = {
  name: 'pinterest', aliases: ['pin', 'pindl'], category: 'media',
  description: 'Download Pinterest pin (image or video)',
  usage: '.pinterest <Pinterest URL>',
  async execute(sock, msg, args, extra) {
    const text = args.join(' ').trim();
    const chatId = msg.key.remoteJid;
    if (!text || !/pinterest\.com|pin\.it/i.test(text)) return extra.reply('Usage: .pinterest <Pinterest URL>');
    try {
      await sock.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });
      const r = await dl.pinterest(text);
      const caption = `*DOWNLOADED BY ${config.botName.toUpperCase()}*`;
      if (r.type === 'video') {
        await sock.sendMessage(chatId, { video: { url: r.url }, mimetype: 'video/mp4', caption }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { image: { url: r.url }, caption }, { quoted: msg });
      }
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      extra.reply('❌ ' + (e.message || 'Pinterest download failed'));
    }
  },
};
