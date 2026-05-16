const dl = require('../../utils/downloaders');
const config = require('../../config');

module.exports = {
  name: 'ytmp4', aliases: ['ytv', 'mp4'], category: 'downloader',
  description: 'Download YouTube video (MP4, 360p)',
  usage: '.ytmp4 <youtube url or song name>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ').trim();
    if (!q) return extra.reply('Usage: .ytmp4 <youtube url or song name>');
    const chatId = msg.key.remoteJid;
    try {
      await sock.sendMessage(chatId, { react: { text: '⏳', key: msg.key } });
      const r = await dl.ytVideo(q, '360');
      const caption = `*${r.title}*\n${r.duration ? '⏱ ' + r.duration : ''}\n\n_Downloaded by ${config.botName}_`;
      await sock.sendMessage(chatId, { video: r.buffer, mimetype: 'video/mp4', caption, fileName: `${r.title}.mp4`.replace(/[^\w.\- ]/g,'') }, { quoted: msg });
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      extra.reply('❌ ' + (e.message || 'YouTube video download failed'));
    }
  },
};
