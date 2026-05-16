const dl = require('../../utils/downloaders');
const config = require('../../config');

module.exports = {
  name: 'play', aliases: ['song', 'songs', 'music'], category: 'downloader',
  description: 'Search YouTube and send the audio',
  usage: '.play <song name>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ').trim();
    if (!q) return extra.reply('Usage: .play despacito');
    const chatId = msg.key.remoteJid;
    try {
      await sock.sendMessage(chatId, { react: { text: '🎵', key: msg.key } });
      const r = await dl.ytAudio(q);
      const caption = `*${r.title}*\n${r.duration ? '⏱ ' + r.duration : ''}\n\n_Downloaded by ${config.botName}_`;
      if (r.thumbnail) {
        try { await sock.sendMessage(chatId, { image: { url: r.thumbnail }, caption }, { quoted: msg }); } catch {}
      }
      await sock.sendMessage(chatId, { audio: r.buffer, mimetype: 'audio/mpeg', fileName: `${r.title}.mp3`.replace(/[^\w.\- ]/g,'') }, { quoted: msg });
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      extra.reply('❌ ' + (e.message || 'Play failed'));
    }
  },
};
