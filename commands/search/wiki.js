const axios = require('axios');
module.exports = {
  name: 'wiki', aliases: ['wikipedia'], category: 'search',
  description: 'Search Wikipedia',
  usage: '.wiki <query>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .wiki <topic>');
    try {
      const r = await axios.get('https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(q), { timeout: 10000 });
      const d = r.data;
      const text = '📖 *' + d.title + '*\n\n' + (d.extract||'No summary.') + '\n\n🔗 ' + (d.content_urls?.desktop?.page||'');
      if (d.thumbnail?.source) {
        await sock.sendMessage(extra.from, { image: { url: d.thumbnail.source }, caption: text }, { quoted: msg });
      } else extra.reply(text);
    } catch (e) { extra.reply('❌ Not found.'); }
  }
};
