const axios = require('axios');
module.exports = {
  name: 'img', aliases: ['gimage'], category: 'search',
  description: 'Search Google images',
  usage: '.img <query>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .img <query>');
    try {
      const url = 'https://duckduckgo.com/?q=' + encodeURIComponent(q) + '&iax=images&ia=images';
      const tokenR = await axios.get(url, { timeout: 10000, headers: { 'User-Agent':'Mozilla/5.0' } });
      const m = tokenR.data.match(/vqd=['"]([\d-]+)['"]/);
      if (!m) throw new Error('no token');
      const apiR = await axios.get('https://duckduckgo.com/i.js', { params: { l:'us-en', o:'json', q, vqd: m[1], f:',,,', p:'1' }, headers:{ 'User-Agent':'Mozilla/5.0', 'Referer': url }, timeout: 10000 });
      const results = (apiR.data.results||[]).slice(0,3);
      if (!results.length) return extra.reply('❌ No images.');
      for (const r of results) {
        try { await sock.sendMessage(extra.from, { image: { url: r.image }, caption: r.title||'' }, { quoted: msg }); } catch(_) {}
      }
    } catch (e) { extra.reply('❌ Image search failed.'); }
  }
};
