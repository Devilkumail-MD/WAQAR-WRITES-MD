const dl = require('../../utils/downloaders');

module.exports = {
  name: 'lyrics', aliases: ['lyric'], category: 'media',
  description: 'Get song lyrics (format: "artist - title" works best)',
  usage: '.lyrics <artist - title>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ').trim();
    const chatId = msg.key.remoteJid;
    if (!q) return extra.reply('Usage: .lyrics shape of you - ed sheeran');
    try {
      await sock.sendMessage(chatId, { react: { text: '🔎', key: msg.key } });
      const r = await dl.lyrics(q);
      const out = `🎵 *${r.title}*\n\n${r.lyrics}`.slice(0, 4000);
      await sock.sendMessage(chatId, { text: out }, { quoted: msg });
      await sock.sendMessage(chatId, { react: { text: '✅', key: msg.key } });
    } catch (e) {
      await sock.sendMessage(chatId, { react: { text: '❌', key: msg.key } });
      extra.reply('❌ Lyrics not found. Try format: artist - title');
    }
  },
};
