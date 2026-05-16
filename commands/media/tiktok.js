const dl = require('../../utils/downloaders');
const config = require('../../config');

module.exports = {
  name: 'tiktok', aliases: ['tt', 'ttdl', 'tiktokdl'], category: 'media',
  description: 'Download TikTok videos (no watermark)',
  usage: '.tiktok <TikTok URL>',
  async execute(sock, msg, args, extra) {
    const text = args.join(' ').trim();
    const chatId = msg.key.remoteJid;
    if (!text || !/tiktok\.com/i.test(text)) return extra.reply('Usage: .tiktok <TikTok URL>');
    try {
      await sock.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });
      const r = await dl.tiktok(text);
      const caption = `*DOWNLOADED BY ${config.botName.toUpperCase()}*${r.title ? '\n\n📝 ' + r.title : ''}`;
      await sock.sendMessage(chatId, { video: { url: r.videoUrl }, mimetype: 'video/mp4', caption }, { quoted: msg });
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      extra.reply('❌ ' + (e.message || 'TikTok download failed'));
    }
  },
};
