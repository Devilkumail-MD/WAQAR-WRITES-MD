const dl = require('../../utils/downloaders');
const config = require('../../config');

module.exports = {
  name: 'video', aliases: ['ytmp4v', 'ytvideo'], category: 'media',
  description: 'Download YouTube video (MP4)',
  usage: '.video <youtube url or query>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ').trim();
    if (!q) return extra.reply('Usage: .video <youtube url or query>');
    const chatId = msg.key.remoteJid;
    try {
      await sock.sendMessage(chatId, { react: { text: '🎬', key: msg.key } });
      const r = await dl.ytVideo(q, '360');
      const caption = `*${r.title}*\n${r.duration ? '⏱ ' + r.duration : ''}\n\n_Downloaded by ${config.botName}_`;
      await sock.sendMessage(chatId, { video: r.buffer, mimetype: 'video/mp4', caption }, { quoted: msg });
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      extra.reply('❌ ' + (e.message || 'Video download failed'));
    }
  },
};
